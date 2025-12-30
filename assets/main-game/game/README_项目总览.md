# SkyHighStacker 项目总览

欢迎来到 **SkyHighStacker（摩天叠叠乐）** 项目！

---

## 📖 项目简介

这是一个使用 Cocos Creator 3.8.7 开发的无尽搭楼游戏，玩法类似《都市摩天楼》。玩家需要在移动的建筑块上点击屏幕，将建筑块叠加起来，搭建越来越高的摩天大楼。

---

## 🎮 核心玩法

1. 建筑块在屏幕上方水平移动
2. 玩家点击屏幕，建筑块停止并落下
3. 与下方建筑块对齐得分
4. 完美对齐获得额外奖励和连击
5. 未对齐部分会掉落
6. 对齐度太低时游戏结束
7. 随着高度增加，背景和难度动态变化

---

## 🏗️ 项目结构

```
assets/main-game/game/
├── scenes/                          # 场景文件
│   ├── MainGame.scene              # 主游戏场景
│   ├── 场景搭建指南.md              # 详细搭建指南
│   ├── UI布局创建指南.md           # UI 创建指南
│   ├── 完整场景搭建清单.md          # 搭建清单
│   └── README_场景搭建总指南.md    # 总指南（推荐首先查看）
│
├── scripts/                         # 游戏脚本
│   ├── managers/                   # 管理器
│   │   ├── GameManager.ts          # 游戏管理器（核心）
│   │   ├── EventManager.ts         # 事件管理器
│   │   └── 事件系统使用指南.md      # 事件系统文档
│   │
│   ├── blocks/                     # 建筑块系统
│   │   ├── Block.ts                # 建筑块组件
│   │   └── BlockController.ts      # 建筑块控制器
│   │
│   ├── background/                 # 背景系统
│   │   └── BackgroundController.ts # 背景控制器
│   │
│   ├── ui/                         # UI 系统
│   │   └── GameUI.ts               # 游戏 UI 控制器
│   │
│   ├── utils/                      # 工具类
│   └── CameraFollow.ts             # 摄像机跟随
│
├── prefabs/                         # 预制体
│   └── Block预制体创建指南.md       # Block 预制体创建指南
│
└── resources/                       # 游戏资源
    └── 背景资源准备指南.md          # 背景资源准备文档
```

---

## 🚀 快速开始

### 1. 环境要求

- **Cocos Creator**: 3.8.7
- **TypeScript**: 启用
- **Node.js**: 14.0 或更高版本

### 2. 开始搭建

#### 新手推荐流程：

1. **阅读文档**（15 分钟）
   - 📄 [项目总览](./README_项目总览.md)（当前文档）
   - 📄 [场景搭建总指南](./scenes/README_场景搭建总指南.md)

2. **创建预制体**（15 分钟）
   - 📄 [Block 预制体创建指南](./prefabs/Block预制体创建指南.md)

3. **搭建场景**（60-90 分钟）
   - 📄 [完整场景搭建清单](./scenes/完整场景搭建清单.md)
   - 📄 [UI 布局创建指南](./scenes/UI布局创建指南.md)

4. **准备资源**（可选）
   - 📄 [背景资源准备指南](./resources/背景资源准备指南.md)

5. **理解事件系统**（15 分钟）
   - 📄 [事件系统使用指南](./scripts/managers/事件系统使用指南.md)

**总时间**: 约 2 小时

---

## 📚 核心文档索引

### 🎨 场景搭建
- **[README_场景搭建总指南.md](./scenes/README_场景搭建总指南.md)** ⭐ 推荐首先查看
  - 包含所有文档链接
  - 快速开始指南
  - 场景结构总览

- **[完整场景搭建清单.md](./scenes/完整场景搭建清单.md)**
  - 带复选框的任务清单
  - 7 个阶段的详细步骤
  - 适合一步步跟着做

- **[场景搭建指南.md](./scenes/场景搭建指南.md)**
  - 原始详细指南
  - 更多技术细节

- **[UI布局创建指南.md](./scenes/UI布局创建指南.md)**
  - UI 元素的详细创建步骤
  - 包含样式和颜色建议
  - 优化技巧

### 🎯 预制体创建
- **[Block预制体创建指南.md](./prefabs/Block预制体创建指南.md)**
  - Block 建筑块的创建步骤
  - 进阶：多种颜色变体
  - 测试方法

### 🖼️ 资源准备
- **[背景资源准备指南.md](./resources/背景资源准备指南.md)**
  - 背景图片规格要求
  - AI 生成 / 素材网站获取
  - 导入和配置方法

### ⚡ 事件系统
- **[事件系统使用指南.md](./scripts/managers/事件系统使用指南.md)**
  - 事件系统的使用方法
  - 实际案例
  - 最佳实践

---

## 🎯 核心系统说明

### 1. GameManager（游戏管理器）

**位置**: `scripts/managers/GameManager.ts`

**职责**:
- 游戏状态管理（开始、暂停、结束）
- 分数计算和高度更新
- 难度递增控制
- 建筑块生成协调
- 事件监听和触发

**关键方法**:
```typescript
startGame()      // 开始游戏
pauseGame()      // 暂停游戏
resumeGame()     // 恢复游戏
restartGame()    // 重新开始
gameOver()       // 游戏结束
```

### 2. EventManager（事件管理器）

**位置**: `scripts/managers/EventManager.ts`

**职责**:
- 事件注册和监听
- 事件触发和分发
- 模块间解耦通信

**使用示例**:
```typescript
// 监听事件
eventManager.on(GameEvent.GAME_START, this.onGameStart, this);

// 触发事件
eventManager.emit(GameEvent.GAME_START);

// 取消监听
eventManager.off(GameEvent.GAME_START, this.onGameStart);
```

### 3. GameUI（游戏 UI）

**位置**: `scripts/ui/GameUI.ts`

**职责**:
- UI 面板管理（开始、暂停、结束）
- 分数、高度、连击显示
- 按钮事件处理
- UI 动画效果

**关键方法**:
```typescript
updateScore(score)       // 更新分数
updateHeight(height)     // 更新高度
updateCombo(combo)       // 更新连击
showGameOver()           // 显示结束界面
```

### 4. BlockController（建筑块控制器）

**位置**: `scripts/blocks/BlockController.ts`

**职责**:
- 建筑块生成和管理
- 对象池管理
- 建筑块对齐计算
- 裁剪和掉落处理

**关键方法**:
```typescript
spawnBlock()            // 生成建筑块
stopCurrentBlock()      // 停止当前块
calculateOverlap()      // 计算重叠
trimBlock()            // 裁剪建筑块
```

### 5. Block（建筑块组件）

**位置**: `scripts/blocks/Block.ts`

**职责**:
- 单个建筑块的移动
- 碰撞检测
- 尺寸调整
- 状态管理

**关键方法**:
```typescript
initialize()           // 初始化
stopMoving()          // 停止移动
fix()                 // 固定
adjustWidth()         // 调整宽度
```

### 6. BackgroundController（背景控制器）

**位置**: `scripts/background/BackgroundController.ts`

**职责**:
- 根据高度切换背景
- 视差滚动效果
- 背景无缝循环

**关键方法**:
```typescript
updateBackground(height)  // 更新背景
```

**高度阈值**:
- 0-500m: 地面层
- 500-1500m: 城市层
- 1500-3000m: 天空层
- 3000m+: 太空层

### 7. CameraFollow（摄像机跟随）

**位置**: `scripts/CameraFollow.ts`

**职责**:
- 平滑跟随建筑物高度
- 摄像机位置控制

**关键方法**:
```typescript
startFollow()            // 开始跟随
stopFollow()            // 停止跟随
updateTargetHeight()    // 更新目标高度
```

---

## 🎨 游戏配置参数

### GameManager 配置
```typescript
initialBlockSpeed: 100      // 初始移动速度
speedIncrement: 5          // 每层速度增量
perfectAlignThreshold: 5   // 完美对齐阈值（像素）
perfectAlignBonus: 50      // 完美对齐奖励分数
normalAlignScore: 10       // 普通对齐分数
comboMultiplier: 2         // 连击倍数
```

### BlockController 配置
```typescript
blockWidth: 200           // 建筑块宽度
blockHeight: 50          // 建筑块高度
moveRange: 300           // 移动范围
defaultSpeed: 100        // 默认速度
```

### CameraFollow 配置
```typescript
followSpeed: 5           // 跟随速度
smoothTime: 0.3         // 平滑时间
offsetY: 200            // Y轴偏移量
minHeight: 0            // 最小高度
maxHeight: 10000        // 最大高度
```

### BackgroundController 配置
```typescript
groundThreshold: 0       // 地面层阈值
cityThreshold: 500      // 城市层阈值
skyThreshold: 1500      // 天空层阈值
spaceThreshold: 3000    // 太空层阈值
```

---

## 🎮 游戏流程

### 启动流程
```
1. 场景加载
   ↓
2. 初始化 GameManager
   ↓
3. 初始化各个控制器
   ↓
4. 注册事件监听
   ↓
5. 显示开始界面
   ↓
6. 等待玩家点击"开始"
```

### 游戏循环
```
1. 玩家点击"开始"
   ↓
2. 生成第一个建筑块（地基）
   ↓
3. 生成移动的建筑块
   ↓
4. 玩家点击屏幕
   ↓
5. 建筑块停止并固定
   ↓
6. 计算对齐度和分数
   ↓
7. 更新高度和背景
   ↓
8. 摄像机跟随
   ↓
9. 生成下一个建筑块
   ↓
10. 回到步骤 4（循环）
```

### 游戏结束
```
建筑块对齐度过低
   ↓
触发游戏结束
   ↓
显示最终分数和高度
   ↓
更新最高分
   ↓
显示"再玩一次"按钮
```

---

## 🎯 开发计划

### ✅ Phase 1 - 核心玩法（已完成）
- [x] 场景结构设计
- [x] 核心脚本框架
- [x] 事件系统实现
- [x] UI 布局设计
- [x] 文档编写

### 🚧 Phase 2 - 功能实现（进行中）
- [ ] 建筑块生成和移动逻辑
- [ ] 建筑块放置和裁剪
- [ ] 分数计算系统
- [ ] 摄像机跟随实现
- [ ] 背景切换实现

### ⏭️ Phase 3 - 视觉效果
- [ ] 建筑块掉落动画
- [ ] 完美对齐粒子特效
- [ ] 背景切换动画
- [ ] UI 动画效果
- [ ] 分数跳动动画

### ⏭️ Phase 4 - 音效音乐
- [ ] 背景音乐
- [ ] 建筑块放置音效
- [ ] 完美对齐音效
- [ ] UI 按钮音效
- [ ] 音效管理器

### ⏭️ Phase 5 - 优化完善
- [ ] 对象池优化
- [ ] 性能优化
- [ ] 难度平衡调整
- [ ] 数据持久化
- [ ] 成就系统（可选）

---

## 🛠️ 技术栈

- **引擎**: Cocos Creator 3.8.7
- **语言**: TypeScript（严格模式）
- **框架**: oops-core
- **资源管理**: Asset Bundle
- **架构模式**: 
  - MVC（Model-View-Controller）
  - 事件驱动（Event-Driven）
  - 单例模式（Singleton）
  - 对象池（Object Pool）

---

## 📝 编码规范

### 类和组件命名
```typescript
// PascalCase
@ccclass('GameManager')
export class GameManager extends Component { }
```

### 变量和属性命名
```typescript
// camelCase
private currentScore: number = 0;
@property(Node)
public blockNode: Node | null = null;

// UPPER_SNAKE_CASE（常量）
private readonly MAX_BLOCK_SIZE: number = 100;
```

### 方法命名
```typescript
// camelCase
private initializeGame(): void { }
private spawnBlock(): void { }
```

### 日志规范
```typescript
console.log('[模块名] 日志信息', { 上下文数据 });
```

---

## 🐛 调试技巧

### 1. 启用详细日志

在各个脚本中启用日志输出，帮助调试。

### 2. 使用场景检查器

在 Cocos Creator 编辑器中，使用场景检查器查看节点状态。

### 3. Chrome DevTools

按 F12 打开开发者工具，查看控制台输出和错误。

### 4. 断点调试

在 TypeScript 代码中设置断点，配合 Source Maps 调试。

---

## 📞 获取帮助

### 文档资源
- 项目内的各种 `.md` 文档
- Cocos Creator 官方文档
- TypeScript 官方文档

### 社区资源
- Cocos Creator 论坛
- Cocos Creator Discord
- GitHub Issues

---

## 🎉 开始开发

现在你已经了解了项目的整体结构，可以开始开发了！

**推荐步骤**:
1. 📖 阅读 [场景搭建总指南](./scenes/README_场景搭建总指南.md)
2. 🎨 按照 [完整场景搭建清单](./scenes/完整场景搭建清单.md) 搭建场景
3. ⚡ 学习 [事件系统使用指南](./scripts/managers/事件系统使用指南.md)
4. 🚀 开始实现核心玩法

---

**祝你开发顺利！** 🚀

