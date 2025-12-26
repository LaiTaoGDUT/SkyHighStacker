import { _decorator, AssetManager, assetManager, Component, ProgressBar, director, SceneAsset, js } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('initialize')
export class initialize extends Component {

  @property(ProgressBar)
  progressBar: ProgressBar | null = null;

  private coreTotalPercent: number = 0.2;
  private coreTotalLoadNum: number = 0;

  private loadBundle(bundleName: string): Promise<AssetManager.Bundle | null> {
    console.log(`[Initialize] 开始加载资源包: ${bundleName}`);
    return new Promise<AssetManager.Bundle | null>(resolve => {
      assetManager.loadBundle(bundleName, (e, asset) => {
        if (e) {
          console.error(`[Initialize] 加载资源包 ${bundleName} 失败`, e);
          resolve(null)
          return;
        }
        console.log(`[Initialize] 加载资源包 ${bundleName} 成功`);
        resolve(asset);
      });
    })
  }

  private loadCore() {
    console.log('[Initialize] 准备加载核心框架脚本包(oops-core)');
    return new Promise<boolean>(resolve => {
      this.loadBundle('oops-core').then((oopsCoreBundle) => {
        if (oopsCoreBundle === null) {
          console.error('加载核心框架脚本包失败');
          resolve(false);
          return;
        }

        console.log('[Initialize] oops-core分包加载成功，开始预加载core与module资源');
        this.coreTotalLoadNum = 2;

        Promise.all([
          new Promise<boolean>((resolve) => {
            console.log('[Initialize] 开始预加载oops-core分包的core');
            oopsCoreBundle.loadDir(
              'core',
              (err) => {
                if (err) {
                  console.error('预加载oops-core分包的core失败');
                  resolve(false);
                } else {
                  console.log('[Initialize] 预加载oops-core分包的core成功');
                  if (this.progressBar) {
                    this.progressBar.progress += this.coreTotalPercent / this.coreTotalLoadNum;
                  }
                  resolve(true);
                }
              }
            )
          }),
          new Promise<boolean>((resolve) => {
            console.log('[Initialize] 开始预加载oops-core分包的module');
            oopsCoreBundle.loadDir(
              'module',
              (err) => {
                if (err) {
                  console.error('预加载oops-core分包的module失败');
                  resolve(false);
                } else {
                  console.log('[Initialize] 预加载oops-core分包的module成功');
                  if (this.progressBar) {
                    this.progressBar.progress += this.coreTotalPercent / this.coreTotalLoadNum;
                  }
                  resolve(true);
                }
              }
            )
          })
        ]).then((results) => {
          if (results.every((result) => result)) {
            console.log('[Initialize] 核心框架(core和module)预加载成功，准备初始化oops单例');
            const oops = js.getClassByName('oops') as any;
            oops.instance;
            resolve(true);
          } else {
            console.error('[Initialize] 核心框架(core和module)预加载存在失败');
            resolve(false);
          }
        });
      });
    })
  }

  private loadBase() {
    console.log('[Initialize] 准备加载主游戏资源包(main-game)');
    return new Promise<SceneAsset | null>(resolve => {
      this.loadBundle('main-game').then((baseBundle) => {
        if (baseBundle === null) {
          console.error('加载主游戏资源包失败');
          resolve(null);
          return;
        }

        console.log('[Initialize] base分包加载成功，开始预加载startMenu场景');
        baseBundle.loadScene(
          'startMenu',
          (finished: number, total: number) => {
            const progress = (finished / total) * (1 - this.coreTotalPercent) + this.coreTotalPercent;
            if (this.progressBar) {
              this.progressBar.progress = progress;
            }
            // 这里progress事件很多，可以不用每次都打印
          },
          (err, scene) => {
            if (err) {
              console.error('预加载开始菜单场景失败');
              resolve(null);
            } else {
              console.log('[Initialize] startMenu场景预加载成功');
              resolve(scene);
            }
          }
        )
      });
    })
  }

  async start() {
    console.log('[Initialize] ====== Step 1: 加载核心框架脚本包 ======');
    const loadRes = await this.loadCore();
    if (!loadRes) {
      console.error('[Initialize] Step 1 失败，终止后续流程');
      return;
    }
    console.log('[Initialize] ====== Step 1 完成 ======');

    console.log('[Initialize] ====== Step 2: 加载主游戏资源包 ======');
    const scene = await this.loadBase();
    if (!scene) {
      console.error('[Initialize] Step 2 失败，终止后续流程');
      return;
    }
    console.log('[Initialize] ====== Step 2 完成 ======');

    console.log('[Initialize] ====== Step 3: 运行开始菜单场景 ======');
    director.runScene(scene);
    console.log('[Initialize] Step 3 完成，已切换到startMenu场景');
  }
}

