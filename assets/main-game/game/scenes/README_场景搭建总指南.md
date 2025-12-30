# MainGame 场景搭建总指南

欢迎来到 **SkyHighStacker（摩天叠叠乐）** 主游戏场景搭建指南！

本文档是场景搭建的总入口，包含所有必要的文档链接和快速开始指南。

---

## 📚 文档目录

### 1. **[完整场景搭建清单](./完整场景搭建清单.md)** ⭐ 推荐首先查看
   - 包含完整的搭建步骤
   - 带复选框的任务清单
   - 适合一步步跟着做

### 2. **[场景搭建指南](./场景搭建指南.md)**
   - 原始的详细搭建指南
   - 包含更多技术细节
   - 适合深入理解

### 3. **[Block 预制体创建指南](../prefabs/Block预制体创建指南.md)**
   - Block 建筑块预制体的创建步骤
   - 进阶：多种颜色变体
   - 测试方法

### 4. **[UI 布局创建指南](./UI布局创建指南.md)**
   - 详细的 UI 布局创建步骤
   - 包含每个 UI 元素的配置
   - 样式优化建议

### 5. **[背景资源准备指南](../resources/背景资源准备指南.md)**
   - 背景图片的规格要求
   - 资源获取方式（AI 生成 / 素材网站）
   - 导入和使用方法

---

## 🚀 快速开始

### 方式一：完整搭建（推荐新手）

如果你是第一次搭建，建议按以下顺序进行：

1. **准备工作**（10 分钟）
   - 阅读本总指南
   - 查看 [完整场景搭建清单](./完整场景搭建清单.md)
   - 准备背景图片资源（可选，可先用纯色代替）

2. **创建 Block 预制体**（15 分钟）
   - 参考 [Block 预制体创建指南](../prefabs/Block预制体创建指南.md)
   - 创建并测试 Block 预制体

3. **搭建场景**（60-90 分钟）
   - 打开 [完整场景搭建清单](./完整场景搭建清单.md)
   - 按照清单逐步完成 7 个阶段
   - 每完成一个阶段，勾选对应的复选框

4. **测试验证**（10 分钟）
   - 运行场景
   - 检查是否有错误
   - 验证初始状态是否正确

**总时间**: 约 1.5 - 2 小时

---

### 方式二：快速搭建（适合有经验者）

如果你对 Cocos Creator 很熟悉，可以直接：

1. 查看场景结构示意图（见下文）
2. 创建 Block 预制体
3. 根据结构快速搭建节点
4. 关联组件引用
5. 运行测试

**总时间**: 约 30-45 分钟

---

## 📐 场景结构总览

```
MainGame 场景
└── Canvas (720 x 1200)
    ├── Camera
    │   └── CameraFollow 组件
    │
    ├── GameManager (游戏管理器)
    │   └── GameManager 组件
    │
    ├── Background (Z: -10, 背景层)
    │   ├── BackgroundController 组件
    │   ├── GroundLayer (地面，默认显示)
    │   ├── CityLayer (城市，默认隐藏)
    │   ├── SkyLayer (天空，默认隐藏)
    │   └── SpaceLayer (太空，默认隐藏)
    │
    ├── BlockContainer (Z: 0, 游戏内容层)
    │   └── BlockController 组件
    │
    └── UI (Z: 10, UI 层)
        ├── GameUI 组件
        ├── TopBar (顶部信息栏，游戏中显示)
        │   ├── ScoreLabel (分数)
        │   ├── HeightLabel (高度)
        │   └── PauseButton (暂停按钮)
        │
        ├── ComboNode (连击提示，默认隐藏)
        │   └── ComboLabel
        │
        ├── StartPanel (开始界面，默认显示)
        │   ├── Background (半透明背景)
        │   ├── TitleLabel (标题)
        │   ├── StartButton (开始按钮)
        │   └── BestScoreLabel (最高分)
        │
        ├── PausePanel (暂停界面，默认隐藏)
        │   ├── Background
        │   ├── PauseTitle
        │   ├── ResumeButton
        │   └── RestartButton
        │
        └── GameOverPanel (结束界面，默认隐藏)
            ├── Background
            ├── GameOverTitle
            ├── FinalScoreLabel
            ├── FinalHeightLabel
            ├── HighScoreLabel
            └── PlayAgainButton
```

---

## ⚙️ 关键配置参数

### Camera 配置
- **Projection**: Ortho
- **Ortho Height**: 600
- **CameraFollow**:
  - Follow Speed: 5
  - Smooth Time: 0.3
  - Offset Y: 200

### GameManager 配置
- **Initial Block Speed**: 100
- **Speed Increment**: 5
- **Perfect Align Threshold**: 5
- **Perfect Align Bonus**: 50
- **Normal Align Score**: 10

### BackgroundController 配置
- **Ground Threshold**: 0
- **City Threshold**: 500
- **Sky Threshold**: 1500
- **Space Threshold**: 3000

### BlockController 配置
- **Block Width**: 200
- **Block Height**: 50
- **Move Range**: 300
- **Default Speed**: 100

---

## 🎨 UI 颜色方案

### 按钮颜色
- **开始/再玩一次按钮**: 绿色 `#4CAF50`
- **继续按钮**: 蓝色 `#2196F3`
- **重新开始按钮**: 橙色 `#FF9800`
- **暂停按钮**: 灰色 `#666666`

### 文字颜色
- **普通文字**: 白色 `#FFFFFF`
- **高分文字**: 黄色 `#FFC107`
- **连击文字**: 金色 `#FFD700`
- **游戏结束标题**: 红色 `#F44336`

### 背景颜色（临时纯色方案）
- **地面**: 浅蓝色 `#87CEEB`
- **城市**: 中蓝色 `#5A9FD4`
- **天空**: 深蓝色 `#3B82F6`
- **太空**: 深紫黑 `#1E1B4B`
- **摄像机背景**: 深蓝色 `#334C78`

---

## ✅ 搭建完成检查清单

完成场景搭建后，逐项检查：

### 节点结构
- [ ] 所有节点都已创建
- [ ] 节点命名正确
- [ ] 层级结构正确
- [ ] Position 位置正确

### 组件配置
- [ ] 所有必要的组件都已添加
- [ ] 组件参数配置正确
- [ ] 脚本组件已正确添加

### 引用关联
- [ ] GameManager 的所有引用已关联
- [ ] GameUI 的所有引用已关联
- [ ] BackgroundController 的引用已关联
- [ ] BlockController 的引用已关联
- [ ] CameraFollow 已添加到 Camera

### UI 状态
- [ ] StartPanel 默认显示（Active: ✓）
- [ ] PausePanel 默认隐藏（Active: ✗）
- [ ] GameOverPanel 默认隐藏（Active: ✗）
- [ ] ComboNode 默认隐藏（Active: ✗）

### 背景状态
- [ ] GroundLayer 默认显示（Active: ✓）
- [ ] CityLayer 默认隐藏（Active: ✗）
- [ ] SkyLayer 默认隐藏（Active: ✗）
- [ ] SpaceLayer 默认隐藏（Active: ✗）

### 预制体
- [ ] Block 预制体已创建
- [ ] Block 预制体已在 GameManager 中引用
- [ ] Block 预制体已在 BlockController 中引用

### 运行测试
- [ ] 场景可以正常运行
- [ ] 无控制台错误
- [ ] StartPanel 正确显示
- [ ] 背景正确显示

---

## 🐛 常见问题排查

### 问题 1: 场景运行时报错 "Cannot read property of null"
**原因**: 组件引用未正确关联
**解决**: 检查 GameManager 和 GameUI 的所有引用属性是否都已拖拽关联

### 问题 2: UI 显示位置不对
**原因**: Canvas 的 Widget 组件未正确设置
**解决**: 确保 Canvas 的 Widget 所有对齐选项都已勾选，偏移值为 0

### 问题 3: 点击按钮无反应
**原因**: Button 组件的 Target 未设置，或被其他 UI 遮挡
**解决**: 设置 Button 的 Target 为当前节点，检查 Z 轴顺序

### 问题 4: 背景不显示
**原因**: Sprite 组件没有 SpriteFrame，或 Color 设置不正确
**解决**: 设置 Sprite 的 Color，或导入背景图片并设置 SpriteFrame

### 问题 5: 建筑块无法生成
**原因**: Block 预制体未创建或未关联
**解决**: 创建 Block 预制体，并在 GameManager 和 BlockController 中引用

### 问题 6: 摄像机不跟随
**原因**: CameraFollow 组件未添加，或 GameManager 未调用相关方法
**解决**: 确保 Camera 节点添加了 CameraFollow 组件

---

## 📝 下一步计划

场景搭建完成后，接下来的工作：

### 短期目标（Phase 1）
1. **完善事件通信**
   - UI 按钮与 GameManager 的通信
   - 使用事件系统解耦

2. **实现核心玩法**
   - 建筑块生成逻辑
   - 建筑块放置和裁剪
   - 碰撞检测

3. **基础功能测试**
   - 测试游戏流程
   - 调试分数系统
   - 验证摄像机跟随

### 中期目标（Phase 2）
1. **视觉效果优化**
   - 背景切换动画
   - 建筑块掉落动画
   - 完美对齐特效

2. **UI 动画**
   - 面板切换动画
   - 分数跳动效果
   - 连击提示动画

3. **音效音乐**
   - 背景音乐
   - 音效管理

### 长期目标（Phase 3）
1. **游戏完善**
   - 难度递增系统
   - 数据持久化
   - 成就系统

2. **性能优化**
   - 对象池优化
   - 资源管理优化
   - 渲染优化

3. **发布准备**
   - 多平台适配
   - 打包构建
   - 测试和调优

---

## 💡 开发建议

### 开发顺序建议
1. ✅ 搭建场景（当前阶段）
2. ⏭️ 实现核心玩法（建筑块生成和放置）
3. ⏭️ 实现 UI 交互（事件通信）
4. ⏭️ 添加视觉效果（动画和特效）
5. ⏭️ 添加音效音乐
6. ⏭️ 优化和打磨

### 调试技巧
- 使用 `console.log` 输出关键信息
- 在 Chrome DevTools 中调试
- 善用 Cocos Creator 的场景检查器
- 分步测试，逐个功能验证

### 代码规范
- 遵循项目的 TypeScript 编码规范
- 使用有意义的变量和方法命名
- 添加必要的注释
- 保持代码整洁

---

## 📞 获取帮助

如果在搭建过程中遇到问题：

1. **查看文档**: 先查看相关的详细指南文档
2. **检查控制台**: 查看是否有错误信息
3. **对照清单**: 使用搭建清单逐项检查
4. **查看示例**: 参考现有的场景文件
5. **搜索资源**: Cocos Creator 官方文档和社区

---

## 🎉 开始搭建

准备好了吗？让我们开始吧！

👉 **下一步**: 打开 [完整场景搭建清单](./完整场景搭建清单.md)

祝你搭建顺利！🚀

