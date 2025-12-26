/*
 * @Author: dgflash
 * @Date: 2022-02-11 09:32:47
 * @LastEditors: dgflash
 * @LastEditTime: 2023-08-21 15:19:56
 */
import { _decorator, director, Game, game, Node, profiler, screen, sys } from "cc";
import { Config } from "../module/config/Config";
import { AudioManager } from "./common/audio/AudioManager";
import { MessageManager } from "./common/event/MessageManager";
import { ResLoader } from "./common/loader/ResLoader";
import { Logger } from "./common/log/Logger";
import { RandomManager } from "./common/random/RandomManager";
import { StorageManager } from "./common/storage/StorageManager";
import { TimerManager } from "./common/timer/TimerManager";
import configJson from "db://assets/config/config.json";
import { GameConfig } from "../module/config/GameConfig";
import { GameQueryConfig } from "../module/config/GameQueryConfig";
import { EventMessage } from "./common/event/EventMessage";
import { message } from "./common/event/MessageManager";
import { resLoader } from "./common/loader/ResLoader";
import { StorageSecuritySimple } from "./common/storage/StorageSecuritySimple";

const { ccclass, property } = _decorator;

/** 框架版本号 */
export var version: string = "2.0.0.20250514";


/** 框架核心模块访问入口 */
@ccclass('oops')
export class oops {
  /** ----------核心模块---------- */

  /** 日志管理 */
  public log = Logger.instance;
  /** 游戏配置 */
  public config = new Config();
  /** 本地存储 */
  public storage: StorageManager = new StorageManager();
  /** 资源管理 */
  public res: ResLoader = resLoader;
  /** 全局消息 */
  public message: MessageManager = message;
  /** 随机工具 */
  public random = RandomManager.instance;
  /** 游戏时间管理 */
  public timer: TimerManager | null = null;
  /** 游戏音乐管理 */
  public audio: AudioManager | null = null;

  /** 框架常驻节点 */
  private persist: Node = null!

  private static _instance: oops;
  // 对外暴露获取实例的方法
  public static get instance() {
    // 若实例不存在，创建新实例
    if (!this._instance) {
      this._instance = new oops();
      // 初始化全局数据（只执行一次）
      this._instance.onLoad();
    }
    return this._instance;
  }

  onLoad() {
    console.log(`oops Framework ${version}`);
    this.initModule();
    this.loadConfig();
  }

  private initModule() {
    // 创建持久根节点
    this.persist = new Node("OopsFrameworkPersistNode");
    director.addPersistRootNode(this.persist);

    // Web平台查询参数管理
    this.config.query = new GameQueryConfig();
    // 创建时间模块
    this.timer = this.persist.addComponent(TimerManager)!;
  }

  private async loadConfig() {
    this.config.game = new GameConfig(configJson);

    this.storage.init(new StorageSecuritySimple());

    // 创建音频模块
    this.audio = this.persist.addComponent(AudioManager);
    this.audio.load();

    // 设置默认资源包
    this.res.defaultBundleName = this.config.game.bundleDefault;

    // 初始化统计信息
    this.config.game.stats ? profiler.showStats() : profiler.hideStats();
    // 初始化每秒传输帧数
    game.frameRate = this.config.game.frameRate;

    this.init();
  }

  private init() {
    // 游戏显示事件
    game.on(Game.EVENT_SHOW, this.onShow, this);
    // 游戏隐藏事件
    game.on(Game.EVENT_HIDE, this.onHide, this);

    // 游戏尺寸修改事件
    if (!sys.isMobile) {
      screen.on("window-resize", () => {
        this.message.dispatchEvent(EventMessage.GAME_RESIZE);
      }, this);

      screen.on("fullscreen-change", () => {
        this.message.dispatchEvent(EventMessage.GAME_FULL_SCREEN);
      }, this);
    }

    screen.on("orientation-change", () => {
      this.message.dispatchEvent(EventMessage.GAME_ORIENTATION);
    }, this);
  }

  private onShow() {
    this.timer && this.timer.load();              // 处理回到游戏时减去逝去时间
    this.audio && this.audio.resumeAll();         // 恢复所有暂停的音乐播放
    director.resume();              // 恢复暂停场景的游戏逻辑，如果当前场景没有暂停将没任何事情发生
    game.resume();                  // 恢复游戏主循环。包含：游戏逻辑，渲染，事件处理，背景音乐和所有音效
    this.message.dispatchEvent(EventMessage.GAME_SHOW);
  }

  private onHide() {
    this.timer && this.timer.save();       // 处理切到后台后记录切出时间
    this.audio && this.audio.pauseAll();         // 暂停所有音乐播放
    director.pause();              // 暂停正在运行的场景，该暂停只会停止游戏逻辑执行，但是不会停止渲染和 UI 响应。 如果想要更彻底得暂停游戏，包含渲染，音频和事件
    game.pause();                  // 暂停游戏主循环。包含：游戏逻辑、渲染、输入事件派发（Web 和小游戏平台除外）
    this.message.dispatchEvent(EventMessage.GAME_HIDE);
  }
}
