import { _decorator, Component, Node, Vec3, CCFloat, UITransform, Color, Sprite } from 'cc';

const { ccclass, property } = _decorator;

/**
 * 建筑块组件
 * 负责单个建筑块的移动、碰撞、裁剪等逻辑
 */
@ccclass('Block')
export class Block extends Component {
    // ========== 移动参数 ==========
    @property(CCFloat)
    private moveSpeed: number = 100; // 移动速度

    @property(CCFloat)
    private moveRange: number = 300; // 移动范围

    // ========== 运行时数据 ==========
    private moveDirection: number = 1; // 移动方向 (1 或 -1)
    private isMoving: boolean = false; // 是否正在移动
    private isFixed: boolean = false; // 是否已固定
    private startPosition: Vec3 = new Vec3(); // 起始位置
    private currentWidth: number = 0; // 当前宽度
    private currentHeight: number = 0; // 当前高度

    // ========== 组件引用 ==========
    private uiTransform: UITransform | null = null;
    private sprite: Sprite | null = null;

    // ========== 生命周期方法 ==========
    protected onLoad(): void {
        // 获取组件
        this.uiTransform = this.getComponent(UITransform);
        this.sprite = this.getComponent(Sprite);

        // 保存初始尺寸
        if (this.uiTransform) {
            this.currentWidth = this.uiTransform.width;
            this.currentHeight = this.uiTransform.height;
        }
    }

    protected update(deltaTime: number): void {
        if (!this.isMoving || this.isFixed) return;

        // 水平移动
        this.horizontalMove(deltaTime);
    }

    // ========== 初始化方法 ==========

    /**
     * 初始化建筑块
     */
    public initialize(position: Vec3, speed: number, direction: number): void {
        this.node.setPosition(position);
        this.startPosition.set(position);
        this.moveSpeed = speed;
        this.moveDirection = direction;
        this.isMoving = true;
        this.isFixed = false;

        console.log('[Block] 建筑块初始化', {
            position,
            speed,
            direction
        });
    }

    /**
     * 重置建筑块状态
     */
    public reset(): void {
        this.isMoving = false;
        this.isFixed = false;
        this.moveDirection = 1;
        this.node.setPosition(Vec3.ZERO);

        // 恢复原始尺寸
        if (this.uiTransform) {
            this.uiTransform.width = this.currentWidth;
            this.uiTransform.height = this.currentHeight;
        }
    }

    // ========== 移动控制 ==========

    /**
     * 水平移动
     */
    private horizontalMove(deltaTime: number): void {
        const currentPos = this.node.getPosition();
        
        // 计算新位置
        let newX = currentPos.x + this.moveSpeed * this.moveDirection * deltaTime;

        // 检查边界
        const leftBound = this.startPosition.x - this.moveRange;
        const rightBound = this.startPosition.x + this.moveRange;

        if (newX <= leftBound) {
            newX = leftBound;
            this.moveDirection = 1; // 反向
        } else if (newX >= rightBound) {
            newX = rightBound;
            this.moveDirection = -1; // 反向
        }

        // 更新位置
        this.node.setPosition(newX, currentPos.y, currentPos.z);
    }

    /**
     * 停止移动
     */
    public stopMoving(): void {
        this.isMoving = false;
        console.log('[Block] 停止移动', {
            position: this.node.getPosition()
        });
    }

    /**
     * 固定建筑块
     */
    public fix(): void {
        this.isFixed = true;
        this.isMoving = false;
        console.log('[Block] 固定建筑块');
    }

    // ========== 尺寸调整 ==========

    /**
     * 调整建筑块宽度（裁剪）
     */
    public adjustWidth(newWidth: number, offsetX: number): void {
        if (!this.uiTransform) return;

        // 更新宽度
        this.uiTransform.width = newWidth;
        this.currentWidth = newWidth;

        // 调整位置（因为锚点在中心）
        const currentPos = this.node.getPosition();
        this.node.setPosition(
            currentPos.x + offsetX / 2,
            currentPos.y,
            currentPos.z
        );

        console.log('[Block] 调整宽度', {
            newWidth,
            offsetX
        });
    }

    /**
     * 设置颜色
     */
    public setColor(color: Color): void {
        if (this.sprite) {
            this.sprite.color = color;
        }
    }

    // ========== 获取信息 ==========

    /**
     * 获取当前位置
     */
    public getPosition(): Vec3 {
        return this.node.getPosition();
    }

    /**
     * 获取当前宽度
     */
    public getWidth(): number {
        return this.currentWidth;
    }

    /**
     * 获取当前高度
     */
    public getHeight(): number {
        return this.currentHeight;
    }

    /**
     * 是否正在移动
     */
    public getIsMoving(): boolean {
        return this.isMoving;
    }

    /**
     * 是否已固定
     */
    public getIsFixed(): boolean {
        return this.isFixed;
    }

    /**
     * 获取移动方向
     */
    public getMoveDirection(): number {
        return this.moveDirection;
    }

    /**
     * 设置移动速度
     */
    public setMoveSpeed(speed: number): void {
        this.moveSpeed = speed;
    }

    /**
     * 设置移动范围
     */
    public setMoveRange(range: number): void {
        this.moveRange = range;
    }
}

