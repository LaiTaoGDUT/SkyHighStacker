import { _decorator, Component, Node, UITransform, Vec3, CCFloat } from 'cc';

const { ccclass, property } = _decorator;

/**
 * 背景层级枚举
 */
enum BackgroundLayer {
    Ground = 0,     // 地面 0-500m
    City = 1,       // 城市 500-1500m
    Sky = 2,        // 天空 1500-3000m
    Space = 3       // 太空 3000m+
}

/**
 * 背景控制器
 * 负责根据高度动态切换背景、实现视差滚动效果
 */
@ccclass('BackgroundController')
export class BackgroundController extends Component {
    // ========== 背景层节点 ==========
    @property(Node)
    private groundLayer: Node | null = null;

    @property(Node)
    private cityLayer: Node | null = null;

    @property(Node)
    private skyLayer: Node | null = null;

    @property(Node)
    private spaceLayer: Node | null = null;

    // ========== 高度阈值配置 ==========
    @property(CCFloat)
    private groundThreshold: number = 0;

    @property(CCFloat)
    private cityThreshold: number = 500;

    @property(CCFloat)
    private skyThreshold: number = 1500;

    @property(CCFloat)
    private spaceThreshold: number = 3000;

    // ========== 视差滚动速度 ==========
    @property(CCFloat)
    private groundParallaxSpeed: number = 1.0;

    @property(CCFloat)
    private cityParallaxSpeed: number = 0.8;

    @property(CCFloat)
    private skyParallaxSpeed: number = 0.5;

    @property(CCFloat)
    private spaceParallaxSpeed: number = 0.3;

    // ========== 运行时数据 ==========
    private currentLayer: BackgroundLayer = BackgroundLayer.Ground;
    private currentHeight: number = 0;
    private backgroundLayers: Node[] = [];

    // ========== 生命周期方法 ==========
    protected onLoad(): void {
        console.log('[BackgroundController] 背景控制器初始化');
        this.initializeLayers();
    }

    protected start(): void {
        // 设置初始背景
        this.updateBackground(0);
    }

    // ========== 初始化方法 ==========

    /**
     * 初始化背景层
     */
    private initializeLayers(): void {
        // 收集所有背景层
        if (this.groundLayer) this.backgroundLayers.push(this.groundLayer);
        if (this.cityLayer) this.backgroundLayers.push(this.cityLayer);
        if (this.skyLayer) this.backgroundLayers.push(this.skyLayer);
        if (this.spaceLayer) this.backgroundLayers.push(this.spaceLayer);

        // 初始化时隐藏除地面外的所有层
        this.hideAllLayersExcept(BackgroundLayer.Ground);

        console.log('[BackgroundController] 背景层初始化完成', {
            layerCount: this.backgroundLayers.length
        });
    }

    // ========== 背景更新 ==========

    /**
     * 根据当前高度更新背景
     */
    public updateBackground(height: number): void {
        this.currentHeight = height;

        // 判断应该显示哪个背景层
        const targetLayer = this.getTargetLayer(height);

        // 如果背景层改变，执行切换
        if (targetLayer !== this.currentLayer) {
            this.switchToLayer(targetLayer);
        }

        // 更新视差滚动
        this.updateParallax(height);
    }

    /**
     * 根据高度获取目标背景层
     */
    private getTargetLayer(height: number): BackgroundLayer {
        if (height >= this.spaceThreshold) {
            return BackgroundLayer.Space;
        } else if (height >= this.skyThreshold) {
            return BackgroundLayer.Sky;
        } else if (height >= this.cityThreshold) {
            return BackgroundLayer.City;
        } else {
            return BackgroundLayer.Ground;
        }
    }

    /**
     * 切换到指定背景层
     */
    private switchToLayer(targetLayer: BackgroundLayer): void {
        console.log('[BackgroundController] 切换背景层', {
            from: BackgroundLayer[this.currentLayer],
            to: BackgroundLayer[targetLayer],
            height: this.currentHeight
        });

        this.currentLayer = targetLayer;
        this.hideAllLayersExcept(targetLayer);

        // TODO: 添加背景切换动画效果（淡入淡出）
    }

    /**
     * 隐藏除指定层外的所有背景层
     */
    private hideAllLayersExcept(layer: BackgroundLayer): void {
        if (this.groundLayer) {
            this.groundLayer.active = (layer === BackgroundLayer.Ground);
        }
        if (this.cityLayer) {
            this.cityLayer.active = (layer === BackgroundLayer.City);
        }
        if (this.skyLayer) {
            this.skyLayer.active = (layer === BackgroundLayer.Sky);
        }
        if (this.spaceLayer) {
            this.spaceLayer.active = (layer === BackgroundLayer.Space);
        }
    }

    // ========== 视差滚动 ==========

    /**
     * 更新视差滚动效果
     */
    private updateParallax(height: number): void {
        // 根据当前层应用不同的视差速度
        let parallaxSpeed = this.groundParallaxSpeed;

        switch (this.currentLayer) {
            case BackgroundLayer.Ground:
                parallaxSpeed = this.groundParallaxSpeed;
                break;
            case BackgroundLayer.City:
                parallaxSpeed = this.cityParallaxSpeed;
                break;
            case BackgroundLayer.Sky:
                parallaxSpeed = this.skyParallaxSpeed;
                break;
            case BackgroundLayer.Space:
                parallaxSpeed = this.spaceParallaxSpeed;
                break;
        }

        // 应用视差偏移
        // TODO: 根据实际需求实现背景滚动逻辑
        // 这里可以实现无缝循环背景
    }

    /**
     * 实现背景无缝循环
     */
    private loopBackground(layer: Node, offset: number): void {
        if (!layer) return;

        const uiTransform = layer.getComponent(UITransform);
        if (!uiTransform) return;

        const height = uiTransform.height;
        
        // TODO: 实现背景循环逻辑
        // 当背景移出屏幕时，将其移到另一端
    }

    // ========== 工具方法 ==========

    /**
     * 获取当前背景层
     */
    public getCurrentLayer(): BackgroundLayer {
        return this.currentLayer;
    }

    /**
     * 获取当前高度
     */
    public getCurrentHeight(): number {
        return this.currentHeight;
    }

    /**
     * 获取背景层名称
     */
    public getLayerName(layer: BackgroundLayer): string {
        return BackgroundLayer[layer];
    }
}

