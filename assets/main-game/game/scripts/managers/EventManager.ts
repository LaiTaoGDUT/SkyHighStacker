import { _decorator } from 'cc';

const { ccclass } = _decorator;

/**
 * 游戏事件类型枚举
 */
export enum GameEvent {
    // 游戏流程事件
    GAME_START = 'game:start',           // 游戏开始
    GAME_PAUSE = 'game:pause',           // 游戏暂停
    GAME_RESUME = 'game:resume',         // 游戏恢复
    GAME_RESTART = 'game:restart',       // 游戏重新开始
    GAME_OVER = 'game:over',            // 游戏结束

    // 建筑块事件
    BLOCK_SPAWN = 'block:spawn',         // 建筑块生成
    BLOCK_PLACE = 'block:place',         // 建筑块放置
    BLOCK_PERFECT = 'block:perfect',     // 完美对齐
    BLOCK_MISS = 'block:miss',          // 未对齐，游戏结束

    // 分数和高度事件
    SCORE_UPDATE = 'score:update',       // 分数更新
    HEIGHT_UPDATE = 'height:update',     // 高度更新
    COMBO_UPDATE = 'combo:update',       // 连击更新
    
    // UI 事件
    UI_BUTTON_CLICK = 'ui:button:click', // UI 按钮点击
}

/**
 * 事件回调函数类型
 */
type EventCallback = (data?: any) => void;

/**
 * 事件管理器（单例）
 * 负责游戏内的事件分发和监听
 */
@ccclass('EventManager')
export class EventManager {
    private static _instance: EventManager | null = null;

    // 事件监听器映射表
    private eventMap: Map<string, EventCallback[]> = new Map();

    /**
     * 获取单例实例
     */
    public static getInstance(): EventManager {
        if (!this._instance) {
            this._instance = new EventManager();
        }
        return this._instance;
    }

    /**
     * 私有构造函数，防止外部实例化
     */
    private constructor() {
        console.log('[EventManager] 事件管理器初始化');
    }

    /**
     * 监听事件
     * @param event 事件名称
     * @param callback 回调函数
     * @param target 回调函数的上下文（this）
     */
    public on(event: string, callback: EventCallback, target?: any): void {
        if (!this.eventMap.has(event)) {
            this.eventMap.set(event, []);
        }

        // 如果指定了 target，绑定 this
        const boundCallback = target ? callback.bind(target) : callback;
        this.eventMap.get(event)!.push(boundCallback);

        // console.log(`[EventManager] 监听事件: ${event}`);
    }

    /**
     * 取消监听事件
     * @param event 事件名称
     * @param callback 回调函数
     */
    public off(event: string, callback: EventCallback): void {
        if (!this.eventMap.has(event)) return;

        const callbacks = this.eventMap.get(event)!;
        const index = callbacks.indexOf(callback);
        
        if (index !== -1) {
            callbacks.splice(index, 1);
            // console.log(`[EventManager] 取消监听事件: ${event}`);
        }

        // 如果没有监听器了，删除这个事件
        if (callbacks.length === 0) {
            this.eventMap.delete(event);
        }
    }

    /**
     * 触发事件
     * @param event 事件名称
     * @param data 事件数据
     */
    public emit(event: string, data?: any): void {
        if (!this.eventMap.has(event)) {
            // console.warn(`[EventManager] 触发事件失败，没有监听器: ${event}`);
            return;
        }

        const callbacks = this.eventMap.get(event)!;
        
        // console.log(`[EventManager] 触发事件: ${event}`, data);

        // 执行所有回调函数
        callbacks.forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`[EventManager] 事件回调执行错误: ${event}`, error);
            }
        });
    }

    /**
     * 监听一次性事件（触发后自动移除）
     * @param event 事件名称
     * @param callback 回调函数
     * @param target 回调函数的上下文（this）
     */
    public once(event: string, callback: EventCallback, target?: any): void {
        const onceCallback = (data?: any) => {
            callback.call(target, data);
            this.off(event, onceCallback);
        };
        this.on(event, onceCallback, target);
    }

    /**
     * 清除指定事件的所有监听器
     * @param event 事件名称
     */
    public clear(event: string): void {
        if (this.eventMap.has(event)) {
            this.eventMap.delete(event);
            console.log(`[EventManager] 清除事件所有监听器: ${event}`);
        }
    }

    /**
     * 清除所有事件监听器
     */
    public clearAll(): void {
        this.eventMap.clear();
        console.log('[EventManager] 清除所有事件监听器');
    }

    /**
     * 检查事件是否有监听器
     * @param event 事件名称
     */
    public hasListeners(event: string): boolean {
        return this.eventMap.has(event) && this.eventMap.get(event)!.length > 0;
    }

    /**
     * 获取事件的监听器数量
     * @param event 事件名称
     */
    public getListenerCount(event: string): number {
        if (!this.eventMap.has(event)) return 0;
        return this.eventMap.get(event)!.length;
    }

    /**
     * 销毁事件管理器
     */
    public destroy(): void {
        this.clearAll();
        EventManager._instance = null;
        console.log('[EventManager] 事件管理器销毁');
    }
}

/**
 * 导出单例实例的快捷访问
 */
export const eventManager = EventManager.getInstance();

