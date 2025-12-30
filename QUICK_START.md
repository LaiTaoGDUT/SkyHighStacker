# 快速开始指南 - 摩天叠叠乐

## 🎮 项目概述

这是一个使用 Cocos Creator 3.8.7 开发的无尽搭楼游戏，玩法类似《都市摩天楼》和《Stack》。

## 📁 项目结构

```
SkyHighStacker/
├── assets/
│   ├── base/                   # 基础资源（首场景加载用）
│   ├── config/                 # 配置文件
│   ├── initialize/             # 初始化场景
│   ├── main-game/             # 主游戏模块 ⭐ 核心开发目录
│   │   ├── game/              # 游戏核心
│   │   │   ├── scenes/        # 场景文件
│   │   │   ├── scripts/       # 游戏脚本
│   │   │   ├── prefabs/       # 预制体
│   │   │   └── resources/     # 游戏资源
│   │   └── startMenu/         # 开始菜单
│   ├── oops-core/             # 核心框架（不要修改）
│   └── libs/                  # 第三方库
```

## ✅ 当前进度

### 已完成
- ✅ **游戏脚本系统**
  - GameManager.ts - 游戏管理器
  - BlockController.ts - 建筑块控制器
  - Block.ts - 建筑块组件
  - BackgroundController.ts - 背景控制器
  - GameUI.ts - UI 控制器
  - CameraFollow.ts - 摄像机跟随

- ✅ **场景文件**
  - MainGame.scene - 主游戏场景（基础结构）

- ✅ **文档**
  - 场景搭建指南.md - 详细的场景搭建说明
  - README.md - 模块说明文档

### 待完成
- 🚧 在 Cocos Creator 编辑器中搭建完整场景
- 🚧 创建建筑块预制体
- 🚧 准备背景图片资源
- 🚧 实现核心游戏逻辑
- 🚧 添加音效和特效

## 🚀 下一步操作

### 步骤 1: 在编辑器中搭建场景

1. **打开 Cocos Creator 3.8.7**

2. **打开主游戏场景**
   - 在项目资源面板中找到：
     ```
     assets/main-game/game/scenes/MainGame.scene
     ```
   - 双击打开场景

3. **参考场景搭建指南**
   - 打开文档：`assets/main-game/game/scenes/场景搭建指南.md`
   - 按照指南逐步搭建场景节点
   - 这个指南非常详细，包含每个节点的具体配置

4. **关键节点结构**
   ```
   Canvas
   ├── Camera (+ CameraFollow)
   ├── GameManager (+ GameManager)
   ├── Background (+ BackgroundController)
   │   ├── GroundLayer
   │   ├── CityLayer
   │   ├── SkyLayer
   │   └── SpaceLayer
   ├── BlockContainer (+ BlockController)
   └── UI (+ GameUI)
       ├── GameUI (游戏中界面)
       ├── StartPanel (开始界面)
       ├── PausePanel (暂停界面)
       └── GameOverPanel (结束界面)
   ```

### 步骤 2: 创建建筑块预制体

1. **创建预制体**
   - 在 `assets/main-game/game/prefabs/` 目录
   - 右键 → 创建 → Prefab
   - 命名为 `Block`

2. **编辑预制体**
   - 双击打开 Block 预制体
   - 添加 Sprite 组件
   - 设置尺寸：200 x 50
   - 添加 Block 组件
   - 设置颜色（可以是纯色或图片）

3. **关联到控制器**
   - 回到 MainGame 场景
   - 选中 BlockContainer 节点
   - 在 BlockController 组件中，将 Block 预制体拖拽到 Block Prefab 属性

### 步骤 3: 准备背景资源

需要准备 4 张背景图片（建议尺寸：720 x 1200）：

1. **ground.png** - 地面背景（0-500m）
   - 建议：城市地面、街道、建筑底部

2. **city.png** - 城市背景（500-1500m）
   - 建议：高楼大厦、城市天际线

3. **sky.png** - 天空背景（1500-3000m）
   - 建议：蓝天白云、云层

4. **space.png** - 太空背景（3000m+）
   - 建议：星空、地球、宇宙

**放置位置**：
```
assets/main-game/game/resources/backgrounds/
```

**在场景中使用**：
- 将图片拖拽到对应的背景层 Sprite 组件中

### 步骤 4: 完善游戏逻辑

现在脚本已经创建好了基础框架，需要实现一些 TODO 部分：

#### 4.1 完善 GameManager.ts

需要实现的关键方法：

```typescript
// 1. 生成第一个建筑块（地基）
private spawnFirstBlock(): void {
  // TODO: 创建第一个固定的建筑块作为地基
}

// 2. 生成下一个移动的建筑块
private spawnNextBlock(): void {
  // TODO: 使用 BlockController 创建新建筑块
}

// 3. 建筑块放置逻辑
private placeBlock(): void {
  // TODO: 
  // 1. 停止当前建筑块移动
  // 2. 计算与下方建筑块的重叠
  // 3. 判断对齐度
  // 4. 裁剪未对齐部分
  // 5. 计算分数
  // 6. 更新高度
  // 7. 生成下一个建筑块
}
```

#### 4.2 完善 BlockController.ts

需要实现的关键功能：

```typescript
// 1. 对象池初始化
private initializePool(): void {
  // TODO: 预创建一定数量的建筑块
}

// 2. 建筑块裁剪
public trimBlock(block: Node, newWidth: number, offset: number): void {
  // TODO: 调整建筑块的碰撞体和渲染尺寸
}

// 3. 掉落碎片
public spawnFallingPiece(position: Vec3, width: number): void {
  // TODO: 创建掉落动画的碎片
}
```

#### 4.3 完善 BackgroundController.ts

需要实现的功能：

```typescript
// 视差滚动
private updateParallax(height: number): void {
  // TODO: 实现背景滚动效果
}

// 背景循环
private loopBackground(layer: Node, offset: number): void {
  // TODO: 实现背景无缝循环
}
```

### 步骤 5: 测试和调试

1. **运行场景**
   - 点击 Cocos Creator 顶部的播放按钮
   - 或按快捷键 Ctrl/Cmd + P

2. **测试流程**
   - ✓ 场景是否正确加载
   - ✓ 是否显示开始界面
   - ✓ 点击开始按钮是否响应
   - ✓ 建筑块是否能生成和移动
   - ✓ 点击屏幕是否能放置建筑块
   - ✓ 分数和高度是否正确显示
   - ✓ 背景是否能根据高度切换
   - ✓ 摄像机是否能跟随

3. **查看控制台**
   - 打开浏览器开发者工具（F12）
   - 查看 Console 标签页
   - 所有组件都有详细的日志输出

4. **常见问题**
   - 如果报错 "找不到组件"：检查脚本是否正确保存
   - 如果节点引用为 null：检查编辑器中是否正确关联
   - 如果建筑块不移动：检查 Block 组件的参数设置

## 📝 开发建议

### 开发优先级

**Phase 1 - 核心玩法** (1-2天)
1. 完成场景搭建
2. 创建建筑块预制体
3. 实现建筑块生成和移动
4. 实现点击放置功能
5. 实现基础碰撞检测
6. 实现分数计算

**Phase 2 - 视觉效果** (1-2天)
1. 添加背景图片
2. 实现背景切换
3. 完善摄像机跟随
4. 添加 UI 动画效果
5. 添加完美对齐提示

**Phase 3 - 完善打磨** (1-2天)
1. 添加音效
2. 添加粒子特效
3. 实现数据持久化
4. 性能优化
5. 添加更多视觉细节

### 调试技巧

1. **使用日志**
   ```typescript
   console.log('[组件名] 描述', { 相关数据 });
   ```

2. **检查引用**
   ```typescript
   if (!this.someNode) {
     console.error('[组件名] someNode 未关联');
     return;
   }
   ```

3. **监控性能**
   - Cocos Creator 顶部菜单 → Developer → Show FPS
   - 保持 60 FPS

### 代码规范

- 类名使用 PascalCase：`GameManager`
- 变量名使用 camelCase：`currentScore`
- 常量使用 UPPER_SNAKE_CASE：`MAX_SPEED`
- 私有属性加 private 关键字
- 使用 TypeScript 类型，避免 any
- 添加详细的注释

## 📚 参考文档

### 项目文档
- `assets/main-game/game/README.md` - 模块说明
- `assets/main-game/game/scenes/场景搭建指南.md` - 场景搭建详细步骤
- 项目根目录规范文档 - 完整的开发规范

### 脚本文档
每个脚本文件都有详细的注释，包括：
- 类的职责说明
- 关键方法的说明
- 参数的含义

### 外部资源
- [Cocos Creator 官方文档](https://docs.cocos.com/creator/3.8/manual/)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)

## 🎯 核心玩法说明

### 游戏流程
1. 玩家点击"开始游戏"
2. 第一个建筑块（地基）固定在底部
3. 第二个建筑块从上方水平移动
4. 玩家点击屏幕，建筑块停止并下落
5. 计算与下方建筑块的重叠度
6. 裁剪未对齐的部分
7. 增加分数和高度
8. 生成下一个建筑块
9. 重复 3-8 直到游戏结束

### 对齐判定
- **完美对齐**（误差 ≤ 5px）：+50 分，增加连击
- **普通对齐**：+10 分，打断连击
- **未对齐**：游戏结束

### 难度递增
- 每层建筑块的移动速度 +5
- 可选：建筑块宽度逐渐减小

### 背景变化
- 0-500m: 地面
- 500-1500m: 城市
- 1500-3000m: 天空
- 3000m+: 太空

## 💡 提示

1. **先简单后复杂**
   - 先实现基础功能
   - 再添加视觉效果
   - 最后优化和打磨

2. **经常测试**
   - 每完成一个功能就测试
   - 不要等所有功能都做完才测试

3. **保持简洁**
   - 核心玩法要简单易懂
   - 不要一开始就加太多功能

4. **注重手感**
   - 这类游戏最重要的是手感
   - 调整移动速度、对齐阈值等参数
   - 多次测试找到最佳数值

5. **使用版本控制**
   - 定期提交代码
   - 遵循 Git 提交规范

## 🤝 获取帮助

如果遇到问题：
1. 查看控制台日志
2. 检查节点引用是否正确
3. 参考场景搭建指南
4. 查看脚本中的注释
5. 参考 Cocos Creator 官方文档

## 🎉 开始开发

现在你已经了解了项目的整体结构和开发流程，可以开始在 Cocos Creator 编辑器中搭建场景了！

**第一步**: 打开 `MainGame.scene` 场景
**第二步**: 打开 `场景搭建指南.md` 文档
**第三步**: 按照指南逐步搭建场景

祝你开发顺利！🚀

---

**最后更新**: 2025-12-29
**版本**: v0.1.0

