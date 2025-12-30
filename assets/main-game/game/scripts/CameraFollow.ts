import { _decorator, Component, Node, Vec3, CCFloat, math } from 'cc';

const { ccclass, property } = _decorator;

/**
 * 摄像机跟随控制器
 * 负责让摄像机平滑跟随建筑物高度
 */
@ccclass('CameraFollow')
export class CameraFollow extends Component {
    // ========== 跟随目标 ==========
    @property(Node)
    private targetNode: Node | null = null; // 跟随的目标节点

    // ========== 跟随参数 ==========
    @property(CCFloat)
    private followSpeed: number = 5.0; // 跟随速度

    @property(CCFloat)
    private smoothTime: number = 0.3; // 平滑时间

    @property(CCFloat)
    private offsetY: number = 200; // Y轴偏移量（摄像机相对目标的偏移）

    @property(CCFloat)
    private minHeight: number = 0; // 最小高度

    @property(CCFloat)
    private maxHeight: number = 10000; // 最大高度

    // ========== 运行时数据 ==========
    private targetHeight: number = 0; // 目标高度
    private currentVelocity: number = 0; // 当前速度（用于平滑阻尼）
    private isFollowing: boolean = false; // 是否正在跟随

    // ========== 生命周期方法 ==========
    protected onLoad(): void {
        console.log('[CameraFollow] 摄像机跟随控制器初始化');
    }

    protected start(): void {
        // 初始化位置
        this.resetPosition();
    }

    protected update(deltaTime: number): void {
        if (!this.isFollowing) return;

        // 平滑跟随目标高度
        this.smoothFollow(deltaTime);
    }

    // ========== 跟随控制 ==========

    /**
     * 开始跟随
     */
    public startFollow(): void {
        this.isFollowing = true;
        console.log('[CameraFollow] 开始跟随');
    }

    /**
     * 停止跟随
     */
    public stopFollow(): void {
        this.isFollowing = false;
        console.log('[CameraFollow] 停止跟随');
    }

    /**
     * 重置位置
     */
    public resetPosition(): void {
        this.targetHeight = 0;
        const pos = this.node.getPosition();
        this.node.setPosition(pos.x, this.minHeight, pos.z);
        console.log('[CameraFollow] 重置摄像机位置');
    }

    /**
     * 更新目标高度
     */
    public updateTargetHeight(height: number): void {
        // 限制在最小和最大高度之间
        this.targetHeight = math.clamp(height + this.offsetY, this.minHeight, this.maxHeight);
    }

    /**
     * 平滑跟随
     */
    private smoothFollow(deltaTime: number): void {
        const currentPos = this.node.getPosition();
        
        // 使用平滑阻尼实现跟随效果
        const newY = this.smoothDamp(
            currentPos.y,
            this.targetHeight,
            this.currentVelocity,
            this.smoothTime,
            deltaTime
        );

        // 更新位置
        this.node.setPosition(currentPos.x, newY, currentPos.z);
    }

    /**
     * 平滑阻尼函数
     * 实现类似Unity的SmoothDamp效果
     */
    private smoothDamp(
        current: number,
        target: number,
        currentVelocity: number,
        smoothTime: number,
        deltaTime: number
    ): number {
        // 防止除以零
        smoothTime = Math.max(0.0001, smoothTime);
        
        const omega = 2 / smoothTime;
        const x = omega * deltaTime;
        const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
        
        let change = current - target;
        const originalTo = target;
        
        // 计算最大变化量
        const maxChange = this.followSpeed * smoothTime;
        change = math.clamp(change, -maxChange, maxChange);
        target = current - change;
        
        const temp = (currentVelocity + omega * change) * deltaTime;
        this.currentVelocity = (currentVelocity - omega * temp) * exp;
        
        let output = target + (change + temp) * exp;
        
        // 防止超调
        if (originalTo - current > 0.0 === output > originalTo) {
            output = originalTo;
            this.currentVelocity = (output - originalTo) / deltaTime;
        }
        
        return output;
    }

    // ========== 立即跟随（无平滑） ==========

    /**
     * 立即移动到目标位置（无平滑效果）
     */
    public snapToTarget(): void {
        const currentPos = this.node.getPosition();
        this.node.setPosition(currentPos.x, this.targetHeight, currentPos.z);
        this.currentVelocity = 0;
        console.log('[CameraFollow] 立即移动到目标位置', { height: this.targetHeight });
    }

    // ========== 工具方法 ==========

    /**
     * 设置跟随速度
     */
    public setFollowSpeed(speed: number): void {
        this.followSpeed = speed;
    }

    /**
     * 设置平滑时间
     */
    public setSmoothTime(time: number): void {
        this.smoothTime = time;
    }

    /**
     * 设置Y轴偏移量
     */
    public setOffsetY(offset: number): void {
        this.offsetY = offset;
    }

    /**
     * 获取当前高度
     */
    public getCurrentHeight(): number {
        return this.node.getPosition().y;
    }

    /**
     * 获取目标高度
     */
    public getTargetHeight(): number {
        return this.targetHeight;
    }

    /**
     * 是否正在跟随
     */
    public getIsFollowing(): boolean {
        return this.isFollowing;
    }
}

