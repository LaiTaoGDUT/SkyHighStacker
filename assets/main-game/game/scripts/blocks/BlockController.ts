import { _decorator, Component, Node, Vec3, CCFloat, Prefab, instantiate } from 'cc';

const { ccclass, property } = _decorator;

/**
 * 建筑块控制器
 * 负责管理所有建筑块的生成、移动、碰撞检测等
 */
@ccclass('BlockController')
export class BlockController extends Component {
    // ========== 预制体引用 ==========
    @property(Prefab)
    private blockPrefab: Prefab | null = null;

    // ========== 配置参数 ==========
    @property(CCFloat)
    private blockWidth: number = 200; // 建筑块宽度

    @property(CCFloat)
    private blockHeight: number = 50; // 建筑块高度

    @property(CCFloat)
    private moveRange: number = 300; // 移动范围

    @property(CCFloat)
    private defaultSpeed: number = 100; // 默认移动速度

    // ========== 运行时数据 ==========
    private blockPool: Node[] = []; // 对象池
    private activeBlocks: Node[] = []; // 活跃的建筑块
    private currentMovingBlock: Node | null = null; // 当前移动的建筑块

    // ========== 生命周期方法 ==========
    protected onLoad(): void {
        console.log('[BlockController] 建筑块控制器初始化');
        this.initializePool();
    }

    protected start(): void {
        // 初始化逻辑
    }

    protected onDestroy(): void {
        // 清理资源
        this.clearAllBlocks();
        console.log('[BlockController] 建筑块控制器销毁');
    }

    // ========== 对象池管理 ==========

    /**
     * 初始化对象池
     */
    private initializePool(): void {
        // TODO: 预创建一定数量的建筑块
        console.log('[BlockController] 对象池初始化');
    }

    /**
     * 从对象池获取建筑块
     */
    private getBlockFromPool(): Node | null {
        if (this.blockPool.length > 0) {
            return this.blockPool.pop()!;
        }

        // 如果对象池为空，创建新的
        if (this.blockPrefab) {
            const newBlock = instantiate(this.blockPrefab);
            return newBlock;
        }

        return null;
    }

    /**
     * 回收建筑块到对象池
     */
    private recycleBlock(block: Node): void {
        if (!block) return;

        // 重置状态
        block.active = false;
        block.setPosition(Vec3.ZERO);

        // 放回对象池
        this.blockPool.push(block);
    }

    // ========== 建筑块生成 ==========

    /**
     * 生成新的建筑块
     */
    public spawnBlock(position: Vec3, speed: number, direction: number): Node | null {
        const block = this.getBlockFromPool();
        
        if (!block) {
            console.error('[BlockController] 无法生成建筑块');
            return null;
        }

        // 设置位置
        block.setPosition(position);
        block.active = true;

        // 添加到场景
        this.node.addChild(block);

        // 添加到活跃列表
        this.activeBlocks.push(block);

        // 设置为当前移动的建筑块
        this.currentMovingBlock = block;

        // TODO: 初始化建筑块组件的移动参数
        console.log('[BlockController] 生成建筑块', {
            position,
            speed,
            direction
        });

        return block;
    }

    /**
     * 停止当前建筑块移动
     */
    public stopCurrentBlock(): void {
        if (!this.currentMovingBlock) return;

        // TODO: 停止建筑块的移动
        console.log('[BlockController] 停止当前建筑块');

        this.currentMovingBlock = null;
    }

    // ========== 建筑块对齐和裁剪 ==========

    /**
     * 计算两个建筑块的重叠区域
     */
    public calculateOverlap(topBlock: Node, bottomBlock: Node): { offset: number; overlapWidth: number } {
        const topPos = topBlock.getPosition();
        const bottomPos = bottomBlock.getPosition();

        // 计算水平偏移量
        const offset = topPos.x - bottomPos.x;

        // 计算重叠宽度
        const overlapWidth = this.blockWidth - Math.abs(offset);

        console.log('[BlockController] 计算重叠区域', {
            offset,
            overlapWidth
        });

        return { offset, overlapWidth };
    }

    /**
     * 裁剪建筑块
     */
    public trimBlock(block: Node, newWidth: number, offset: number): void {
        if (!block) return;

        // TODO: 调整建筑块的碰撞体和渲染尺寸
        // 这里需要根据实际的建筑块组件实现

        console.log('[BlockController] 裁剪建筑块', {
            newWidth,
            offset
        });
    }

    /**
     * 生成掉落的建筑块碎片
     */
    public spawnFallingPiece(position: Vec3, width: number): void {
        // TODO: 创建掉落动画的碎片
        console.log('[BlockController] 生成掉落碎片', {
            position,
            width
        });
    }

    // ========== 工具方法 ==========

    /**
     * 清理所有建筑块
     */
    private clearAllBlocks(): void {
        // 清理活跃的建筑块
        this.activeBlocks.forEach(block => {
            if (block && block.isValid) {
                block.destroy();
            }
        });
        this.activeBlocks = [];

        // 清理对象池
        this.blockPool.forEach(block => {
            if (block && block.isValid) {
                block.destroy();
            }
        });
        this.blockPool = [];

        this.currentMovingBlock = null;
    }

    /**
     * 获取最后一个建筑块
     */
    public getLastBlock(): Node | null {
        if (this.activeBlocks.length === 0) return null;
        return this.activeBlocks[this.activeBlocks.length - 1];
    }

    /**
     * 获取活跃建筑块数量
     */
    public getActiveBlockCount(): number {
        return this.activeBlocks.length;
    }

    /**
     * 获取当前建筑块总高度
     */
    public getTotalHeight(): number {
        return this.activeBlocks.length * this.blockHeight;
    }
}

