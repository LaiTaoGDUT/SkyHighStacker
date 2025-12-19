import { _decorator, AssetManager, assetManager, Canvas, Component, Node, ProgressBar, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('initialize')
export class Boost extends Component {

  @property(ProgressBar)
  progressBar: ProgressBar | null = null;

  private loaded: number = 0;
  private total: number = 0;

  private loadBundle(bundleName: string): Promise<AssetManager.Bundle | null> {
    return new Promise<AssetManager.Bundle | null>(resolve => {
      assetManager.loadBundle(bundleName, (e, asset) => {
        if (e) {
          console.error(e);
          resolve(null)
          return;
        }
        resolve(asset);
      });
    })
  }

  private loadBase() {
    return new Promise<boolean>(resolve => {
      this.loadBundle('base').then((baseBundle) => {
        if (baseBundle === null) {
          console.error('加载主游戏资源包失败');
          resolve(false);
          return;
        }
        baseBundle.preloadDir(
          'common',
          (finished: number, total: number) => {
            const progress = finished / total;
            if (this.progressBar) {
              this.progressBar.progress = progress;
            }
          },
          (err) => {
            if (err) {
              console.error('预加载失败');
              resolve(false);
            }
          }
        );
        baseBundle.preloadDir(
          'game',
          (finished: number, total: number) => {
            const progress = finished / total;
            if (this.progressBar) {
              this.progressBar.progress = progress;
            }
          },
          (err) => {
            if (err) {
              console.error('预加载失败');
              resolve(false);
            }
          }
        );
        baseBundle.preloadDir(
          'gui',
          (finished: number, total: number) => {
            const progress = finished / total;
            if (this.progressBar) {
              this.progressBar.progress = progress;
            }
          },
          (err) => {
            if (err) {
              console.error('预加载失败');
              resolve(false);
            }
          }
        );
      });
    })
  }

  async start() {
    /** 1. 加载核心框架脚本包 */
    const oopsCoreBundle = await this.loadBundle('oops-core');
    if (oopsCoreBundle === null) {
      console.error('加载核心框架脚本包失败');
      return;
    }

    /** 2. 同时加载 主游戏资源包 与 核心框架内的main场景 */
    let loadFail = false;
    /** 2.1 加载主游戏资源包以及下面的common资源 */
    this.loadBundle('base').then((baseBundle) => {
      if (baseBundle === null) {
        console.error('加载主游戏资源包失败');
        loadFail = true;
        return;
      }
      baseBundle.preloadDir(
        'common',
        (finished: number, total: number) => {
          const progress = finished / total;
          if (this.progressBar) {
            this.progressBar.progress = progress;
          }
        },
        (err) => {
          if (err) {
            console.error('预加载失败');
            loadFail = true;
          }
        }
      );
    });
    /** 2.2 加载核心框架内的main场景，作为游戏的入口 */
    oopsCoreBundle.preloadScene(
      'main',
      (finished: number, total: number) => {
        const progress = finished / total;
        if (this.progressBar) {
          this.progressBar.progress = progress;
        }
      },
      (err) => {
        if (err) {
          console.error('预加载核心框架内的入口场景失败');
          loadFail = true;
        }
      }
    )

    if (loadFail) return;

    /** 3. 加载完成后，运行main场景 */
    oopsCoreBundle.loadScene('main', (err, scene) => {
      if (err) {
        console.error('加载核心框架内的入口场景失败');
        loadFail = true;
        return;
      }
      director.runScene(scene);
    });
  }
}

