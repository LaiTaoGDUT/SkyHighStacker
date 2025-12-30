import { _decorator, Component, Node, Label, Button } from 'cc';
import { eventManager, GameEvent } from '../managers/EventManager';

const { ccclass, property } = _decorator;

/**
 * 游戏UI控制器
 * 负责显示分数、高度、连击数等游戏信息，以及游戏开始、暂停、结束界面
 */
@ccclass('GameUI')
export class GameUI extends Component {
    // ========== UI节点引用 ==========
    
    // 游戏中UI
    @property(Label)
    private scoreLabel: Label | null = null;

    @property(Label)
    private heightLabel: Label | null = null;

    @property(Label)
    private comboLabel: Label | null = null;

    @property(Node)
    private comboNode: Node | null = null; // 连击提示节点

    @property(Button)
    private pauseButton: Button | null = null;

    // 开始界面
    @property(Node)
    private startPanel: Node | null = null;

    @property(Button)
    private startButton: Button | null = null;

    @property(Label)
    private titleLabel: Label | null = null;

    // 暂停界面
    @property(Node)
    private pausePanel: Node | null = null;

    @property(Button)
    private resumeButton: Button | null = null;

    @property(Button)
    private restartButton: Button | null = null;

    // 游戏结束界面
    @property(Node)
    private gameOverPanel: Node | null = null;

    @property(Label)
    private finalScoreLabel: Label | null = null;

    @property(Label)
    private finalHeightLabel: Label | null = null;

    @property(Label)
    private highScoreLabel: Label | null = null;

    @property(Button)
    private playAgainButton: Button | null = null;

    // ========== 生命周期方法 ==========
    protected onLoad(): void {
        console.log('[GameUI] 游戏UI初始化');
        this.initializeUI();
        this.registerButtonEvents();
    }

    protected start(): void {
        // 显示开始界面
        this.showStartPanel();
    }

    protected onDestroy(): void {
        // 取消按钮事件
        this.unregisterButtonEvents();
        console.log('[GameUI] 游戏UI销毁');
    }

    // ========== 初始化方法 ==========

    /**
     * 初始化UI
     */
    private initializeUI(): void {
        // 隐藏所有面板
        this.hideAllPanels();

        // 初始化显示
        this.updateScore(0);
        this.updateHeight(0);
        this.updateCombo(0);
    }

    /**
     * 注册按钮事件
     */
    private registerButtonEvents(): void {
        // 开始按钮
        if (this.startButton) {
            this.startButton.node.on(Button.EventType.CLICK, this.onStartButtonClick, this);
        }

        // 暂停按钮
        if (this.pauseButton) {
            this.pauseButton.node.on(Button.EventType.CLICK, this.onPauseButtonClick, this);
        }

        // 恢复按钮
        if (this.resumeButton) {
            this.resumeButton.node.on(Button.EventType.CLICK, this.onResumeButtonClick, this);
        }

        // 重新开始按钮
        if (this.restartButton) {
            this.restartButton.node.on(Button.EventType.CLICK, this.onRestartButtonClick, this);
        }

        // 再玩一次按钮
        if (this.playAgainButton) {
            this.playAgainButton.node.on(Button.EventType.CLICK, this.onPlayAgainButtonClick, this);
        }
    }

    /**
     * 取消按钮事件
     */
    private unregisterButtonEvents(): void {
        if (this.startButton) {
            this.startButton.node.off(Button.EventType.CLICK, this.onStartButtonClick, this);
        }
        if (this.pauseButton) {
            this.pauseButton.node.off(Button.EventType.CLICK, this.onPauseButtonClick, this);
        }
        if (this.resumeButton) {
            this.resumeButton.node.off(Button.EventType.CLICK, this.onResumeButtonClick, this);
        }
        if (this.restartButton) {
            this.restartButton.node.off(Button.EventType.CLICK, this.onRestartButtonClick, this);
        }
        if (this.playAgainButton) {
            this.playAgainButton.node.off(Button.EventType.CLICK, this.onPlayAgainButtonClick, this);
        }
    }

    // ========== 面板控制 ==========

    /**
     * 隐藏所有面板
     */
    private hideAllPanels(): void {
        if (this.startPanel) this.startPanel.active = false;
        if (this.pausePanel) this.pausePanel.active = false;
        if (this.gameOverPanel) this.gameOverPanel.active = false;
    }

    /**
     * 显示开始界面
     */
    public showStartPanel(): void {
        this.hideAllPanels();
        if (this.startPanel) {
            this.startPanel.active = true;
        }
        console.log('[GameUI] 显示开始界面');
    }

    /**
     * 隐藏开始界面，显示游戏UI
     */
    public showGameUI(): void {
        this.hideAllPanels();
        console.log('[GameUI] 显示游戏UI');
    }

    /**
     * 显示暂停界面
     */
    public showPausePanel(): void {
        if (this.pausePanel) {
            this.pausePanel.active = true;
        }
        console.log('[GameUI] 显示暂停界面');
    }

    /**
     * 隐藏暂停界面
     */
    public hidePausePanel(): void {
        if (this.pausePanel) {
            this.pausePanel.active = false;
        }
        console.log('[GameUI] 隐藏暂停界面');
    }

    /**
     * 显示游戏结束界面
     */
    public showGameOver(finalScore: number, finalHeight: number): void {
        this.hideAllPanels();
        
        if (this.gameOverPanel) {
            this.gameOverPanel.active = true;
        }

        // 显示最终分数和高度
        if (this.finalScoreLabel) {
            this.finalScoreLabel.string = `分数: ${finalScore}`;
        }
        if (this.finalHeightLabel) {
            this.finalHeightLabel.string = `高度: ${finalHeight}m`;
        }

        // TODO: 读取和显示最高分
        // 这里需要实现数据持久化
        if (this.highScoreLabel) {
            this.highScoreLabel.string = `最高分: ${finalScore}`;
        }

        console.log('[GameUI] 显示游戏结束界面', {
            finalScore,
            finalHeight
        });
    }

    // ========== 游戏信息更新 ==========

    /**
     * 更新分数显示
     */
    public updateScore(score: number): void {
        if (this.scoreLabel) {
            this.scoreLabel.string = `${score}`;
        }
    }

    /**
     * 更新高度显示
     */
    public updateHeight(height: number): void {
        if (this.heightLabel) {
            this.heightLabel.string = `${height}m`;
        }
    }

    /**
     * 更新连击数显示
     */
    public updateCombo(combo: number): void {
        if (this.comboNode) {
            // 只有连击数大于1时才显示
            this.comboNode.active = combo > 1;
        }

        if (this.comboLabel) {
            this.comboLabel.string = `连击 x${combo}`;
        }

        // TODO: 添加连击动画效果
    }

    /**
     * 显示完美对齐提示
     */
    public showPerfectHint(): void {
        // TODO: 显示"完美!"文字动画
        console.log('[GameUI] 显示完美对齐提示');
    }

    // ========== 按钮事件处理 ==========

    /**
     * 开始按钮点击
     */
    private onStartButtonClick(): void {
        console.log('[GameUI] 点击开始按钮');
        
        // 隐藏开始界面
        this.showGameUI();
        
        // 通知游戏管理器开始游戏
        eventManager.emit(GameEvent.GAME_START);
    }

    /**
     * 暂停按钮点击
     */
    private onPauseButtonClick(): void {
        console.log('[GameUI] 点击暂停按钮');
        
        // 显示暂停界面
        this.showPausePanel();
        
        // 通知游戏管理器暂停游戏
        eventManager.emit(GameEvent.GAME_PAUSE);
    }

    /**
     * 恢复按钮点击
     */
    private onResumeButtonClick(): void {
        console.log('[GameUI] 点击恢复按钮');
        
        // 隐藏暂停界面
        this.hidePausePanel();
        
        // 通知游戏管理器恢复游戏
        eventManager.emit(GameEvent.GAME_RESUME);
    }

    /**
     * 重新开始按钮点击
     */
    private onRestartButtonClick(): void {
        console.log('[GameUI] 点击重新开始按钮');
        
        // 通知游戏管理器重新开始
        eventManager.emit(GameEvent.GAME_RESTART);
    }

    /**
     * 再玩一次按钮点击
     */
    private onPlayAgainButtonClick(): void {
        console.log('[GameUI] 点击再玩一次按钮');
        
        // 通知游戏管理器重新开始
        eventManager.emit(GameEvent.GAME_RESTART);
    }
}

