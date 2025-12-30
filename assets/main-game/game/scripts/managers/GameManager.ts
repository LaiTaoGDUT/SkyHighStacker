import { _decorator, Component, Node, CCInteger, CCFloat, director, Director } from 'cc';
import { BlockController } from '../blocks/BlockController';
import { BackgroundController } from '../background/BackgroundController';
import { GameUI } from '../ui/GameUI';
import { CameraFollow } from '../CameraFollow';
import { eventManager, GameEvent } from './EventManager';

const { ccclass, property } = _decorator;

/**
 * 游戏状态枚举
 */
export enum GameState {
    Ready = 0,      // 准备开始
    Playing = 1,    // 游戏中
    Paused = 2,     // 暂停
    GameOver = 3    // 游戏结束
}

/**
 * 游戏管理器
 * 负责游戏整体流程控制、分数管理、难度递增等
 */
@ccclass('GameManager')
export class GameManager extends Component {
    // ========== 单例模式 ==========
    private static _instance: GameManager | null = null;
    
    public static get instance(): GameManager {
        return this._instance!;
    }

    // ========== 组件引用 ==========
    @property(Node)
    private blockContainer: Node | null = null;

    @property(Node)
    private backgroundNode: Node | null = null;

    @property(Node)
    private uiNode: Node | null = null;

    @property(Node)
    private cameraNode: Node | null = null;

    @property(Node)
    private blockPrefab: Node | null = null;

    // ========== 游戏配置 ==========
    @property(CCInteger)
    private initialBlockSpeed: number = 100; // 初始移动速度

    @property(CCFloat)
    private speedIncrement: number = 5; // 每层速度增量

    @property(CCInteger)
    private perfectAlignThreshold: number = 5; // 完美对齐阈值（像素）

    @property(CCInteger)
    private perfectAlignBonus: number = 50; // 完美对齐奖励分数

    @property(CCInteger)
    private normalAlignScore: number = 10; // 普通对齐分数

    @property(CCInteger)
    private comboMultiplier: number = 2; // 连击倍数

    // ========== 游戏状态 ==========
    private gameState: GameState = GameState.Ready;
    private currentScore: number = 0;
    private currentHeight: number = 0;
    private blockCount: number = 0;
    private comboCount: number = 0;
    
    // ========== 组件控制器 ==========
    private blockController: BlockController | null = null;
    private backgroundController: BackgroundController | null = null;
    private gameUI: GameUI | null = null;
    private cameraFollow: CameraFollow | null = null;

    // ========== 当前建筑块 ==========
    private currentBlock: Node | null = null;
    private lastBlock: Node | null = null;

    // ========== 生命周期方法 ==========
    protected onLoad(): void {
        GameManager._instance = this;
        
        console.log('[GameManager] 游戏管理器初始化');
        
        // 获取组件引用
        this.initializeComponents();
        
        // 注册输入事件
        this.registerInputEvents();
        
        // 注册游戏事件
        this.registerGameEvents();
    }

    protected start(): void {
        // 初始化游戏
        this.initializeGame();
    }

    protected onDestroy(): void {
        // 取消输入事件
        this.unregisterInputEvents();
        
        // 取消游戏事件
        this.unregisterGameEvents();
        
        GameManager._instance = null;
        
        console.log('[GameManager] 游戏管理器销毁');
    }

    // ========== 初始化方法 ==========
    
    /**
     * 初始化组件引用
     */
    private initializeComponents(): void {
        if (this.blockContainer) {
            this.blockController = this.blockContainer.getComponent(BlockController);
        }

        if (this.backgroundNode) {
            this.backgroundController = this.backgroundNode.getComponent(BackgroundController);
        }

        if (this.uiNode) {
            this.gameUI = this.uiNode.getComponent(GameUI);
        }

        if (this.cameraNode) {
            this.cameraFollow = this.cameraNode.getComponent(CameraFollow);
        }

        console.log('[GameManager] 组件初始化完成', {
            blockController: !!this.blockController,
            backgroundController: !!this.backgroundController,
            gameUI: !!this.gameUI,
            cameraFollow: !!this.cameraFollow
        });
    }

    /**
     * 初始化游戏
     */
    private initializeGame(): void {
        this.gameState = GameState.Ready;
        this.currentScore = 0;
        this.currentHeight = 0;
        this.blockCount = 0;
        this.comboCount = 0;

        // 更新UI
        if (this.gameUI) {
            this.gameUI.updateScore(this.currentScore);
            this.gameUI.updateHeight(this.currentHeight);
            this.gameUI.updateCombo(this.comboCount);
        }

        console.log('[GameManager] 游戏初始化完成');
    }

    /**
     * 注册输入事件
     */
    private registerInputEvents(): void {
        this.node.on(Node.EventType.TOUCH_START, this.onScreenTouch, this);
        console.log('[GameManager] 输入事件注册完成');
    }

    /**
     * 取消输入事件
     */
    private unregisterInputEvents(): void {
        this.node.off(Node.EventType.TOUCH_START, this.onScreenTouch, this);
    }

    /**
     * 注册游戏事件
     */
    private registerGameEvents(): void {
        // 监听来自 UI 的事件
        eventManager.on(GameEvent.GAME_START, this.onGameStart, this);
        eventManager.on(GameEvent.GAME_PAUSE, this.pauseGame, this);
        eventManager.on(GameEvent.GAME_RESUME, this.resumeGame, this);
        eventManager.on(GameEvent.GAME_RESTART, this.restartGame, this);
        
        console.log('[GameManager] 游戏事件注册完成');
    }

    /**
     * 取消游戏事件
     */
    private unregisterGameEvents(): void {
        eventManager.off(GameEvent.GAME_START, this.onGameStart);
        eventManager.off(GameEvent.GAME_PAUSE, this.pauseGame);
        eventManager.off(GameEvent.GAME_RESUME, this.resumeGame);
        eventManager.off(GameEvent.GAME_RESTART, this.restartGame);
    }

    /**
     * 响应游戏开始事件
     */
    private onGameStart(): void {
        this.startGame();
    }

    // ========== 游戏流程控制 ==========

    /**
     * 开始游戏
     */
    public startGame(): void {
        console.log('[GameManager] 游戏开始');
        
        this.gameState = GameState.Playing;
        
        // 生成第一个建筑块（地基）
        this.spawnFirstBlock();
        
        // 生成第二个移动的建筑块
        this.spawnNextBlock();
    }

    /**
     * 暂停游戏
     */
    public pauseGame(): void {
        if (this.gameState !== GameState.Playing) return;
        
        console.log('[GameManager] 游戏暂停');
        this.gameState = GameState.Paused;
        
        // 暂停所有动作
        director.pause();
    }

    /**
     * 恢复游戏
     */
    public resumeGame(): void {
        if (this.gameState !== GameState.Paused) return;
        
        console.log('[GameManager] 游戏恢复');
        this.gameState = GameState.Playing;
        
        // 恢复所有动作
        director.resume();
    }

    /**
     * 游戏结束
     */
    public gameOver(): void {
        console.log('[GameManager] 游戏结束', {
            finalScore: this.currentScore,
            finalHeight: this.currentHeight,
            blockCount: this.blockCount
        });
        
        this.gameState = GameState.GameOver;
        
        // 显示游戏结束界面
        if (this.gameUI) {
            this.gameUI.showGameOver(this.currentScore, Math.floor(this.currentHeight));
        }
    }

    /**
     * 重新开始游戏
     */
    public restartGame(): void {
        console.log('[GameManager] 重新开始游戏');
        
        // 重新加载场景
        director.loadScene(director.getScene()!.name);
    }

    // ========== 建筑块管理 ==========

    /**
     * 生成第一个建筑块（地基）
     */
    private spawnFirstBlock(): void {
        if (!this.blockController || !this.blockPrefab) {
            console.error('[GameManager] 无法生成建筑块：缺少必要组件');
            return;
        }

        // TODO: 使用对象池创建建筑块
        // 暂时先简单创建
        console.log('[GameManager] 生成第一个建筑块（地基）');
        
        this.blockCount++;
    }

    /**
     * 生成下一个建筑块
     */
    private spawnNextBlock(): void {
        if (!this.blockController || !this.blockPrefab) {
            console.error('[GameManager] 无法生成建筑块：缺少必要组件');
            return;
        }

        // TODO: 使用对象池创建建筑块
        // 计算当前速度（随难度递增）
        const currentSpeed = this.initialBlockSpeed + (this.blockCount * this.speedIncrement);
        
        console.log('[GameManager] 生成新建筑块', {
            blockIndex: this.blockCount,
            speed: currentSpeed
        });
        
        this.blockCount++;
    }

    /**
     * 建筑块放置
     */
    private placeBlock(): void {
        if (!this.currentBlock) return;

        // TODO: 实现建筑块放置逻辑
        // 1. 停止当前建筑块移动
        // 2. 计算与下方建筑块的重叠
        // 3. 裁剪未对齐部分
        // 4. 计算分数
        // 5. 更新高度
        // 6. 生成下一个建筑块

        console.log('[GameManager] 建筑块放置');
    }

    /**
     * 计算对齐度和得分
     */
    private calculateScore(alignmentOffset: number): void {
        let scoreToAdd = this.normalAlignScore;
        
        // 判断是否完美对齐
        if (Math.abs(alignmentOffset) <= this.perfectAlignThreshold) {
            scoreToAdd = this.perfectAlignBonus;
            this.comboCount++;
            
            // 连击加成
            if (this.comboCount > 1) {
                scoreToAdd *= (1 + (this.comboCount - 1) * 0.1); // 每次连击额外加10%
            }
            
            console.log('[GameManager] 完美对齐！', {
                combo: this.comboCount,
                score: scoreToAdd
            });
        } else {
            // 打断连击
            this.comboCount = 0;
        }

        // 添加分数
        this.currentScore += Math.floor(scoreToAdd);
        
        // 更新UI
        if (this.gameUI) {
            this.gameUI.updateScore(this.currentScore);
            this.gameUI.updateCombo(this.comboCount);
        }

        // 触发分数更新事件
        eventManager.emit(GameEvent.SCORE_UPDATE, this.currentScore);
    }

    /**
     * 更新游戏高度
     */
    private updateHeight(newHeight: number): void {
        this.currentHeight = newHeight;
        
        // 更新UI
        if (this.gameUI) {
            this.gameUI.updateHeight(Math.floor(this.currentHeight));
        }

        // 更新背景
        if (this.backgroundController) {
            this.backgroundController.updateBackground(this.currentHeight);
        }

        // 更新摄像机
        if (this.cameraFollow) {
            this.cameraFollow.updateTargetHeight(this.currentHeight);
        }

        // 触发高度更新事件
        eventManager.emit(GameEvent.HEIGHT_UPDATE, this.currentHeight);

        console.log('[GameManager] 高度更新', { height: this.currentHeight });
    }

    // ========== 输入处理 ==========

    /**
     * 屏幕点击处理
     */
    private onScreenTouch(): void {
        if (this.gameState === GameState.Ready) {
            // 第一次点击开始游戏
            this.startGame();
        } else if (this.gameState === GameState.Playing) {
            // 游戏中点击放置建筑块
            this.placeBlock();
        }
    }

    // ========== 公共接口 ==========

    /**
     * 获取当前游戏状态
     */
    public getGameState(): GameState {
        return this.gameState;
    }

    /**
     * 获取当前分数
     */
    public getCurrentScore(): number {
        return this.currentScore;
    }

    /**
     * 获取当前高度
     */
    public getCurrentHeight(): number {
        return this.currentHeight;
    }

    /**
     * 获取建筑块数量
     */
    public getBlockCount(): number {
        return this.blockCount;
    }
}

