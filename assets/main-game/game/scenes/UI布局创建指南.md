# UI 布局创建详细指南

本指南详细说明如何在 MainGame 场景中创建游戏 UI 布局。

---

## UI 整体结构

```
UI (根节点)
├── GamePlayUI (游戏中UI)
│   ├── TopBar (顶部信息栏)
│   │   ├── ScoreLabel (分数)
│   │   ├── HeightLabel (高度)
│   │   └── PauseButton (暂停按钮)
│   └── ComboNode (连击提示)
│       └── ComboLabel (连击文字)
├── StartPanel (开始界面)
│   ├── Background (半透明背景)
│   ├── TitleLabel (标题)
│   ├── StartButton (开始按钮)
│   └── BestScoreLabel (最高分)
├── PausePanel (暂停界面)
│   ├── Background (半透明背景)
│   ├── PauseTitle (暂停标题)
│   ├── ResumeButton (继续按钮)
│   └── RestartButton (重新开始)
└── GameOverPanel (结束界面)
    ├── Background (半透明背景)
    ├── GameOverTitle (标题)
    ├── FinalScoreLabel (最终分数)
    ├── FinalHeightLabel (最终高度)
    ├── HighScoreLabel (最高分)
    └── PlayAgainButton (再玩一次)
```

---

## 详细创建步骤

### 第一步：创建 UI 根节点

1. 在 Canvas 下创建空节点，命名为 `UI`
2. 添加 **UITransform** 组件：
   - Width: `720`
   - Height: `1200`
   - Anchor: `(0.5, 0.5)`
3. Position: `(0, 0, 10)` (Z轴为10，确保在最前面)
4. 添加 **GameUI** 脚本组件（稍后关联引用）

---

### 第二步：创建游戏中 UI（GamePlayUI）

#### 2.1 创建 TopBar（顶部信息栏）

1. 在 UI 下创建空节点，命名为 `TopBar`
2. Position: `(0, 550, 0)` (靠近屏幕顶部)

#### 2.2 创建 ScoreLabel（分数显示）

1. 在 TopBar 下创建 **Label** 节点，命名为 `ScoreLabel`
2. Position: `(-250, 0, 0)` (左上角)
3. 设置 Label 组件：
   - **String**: `"0"`
   - **Font Size**: `48`
   - **Color**: 白色 `#FFFFFF`
   - **Horizontal Align**: LEFT
   - **Vertical Align**: CENTER
4. 添加 **UITransform** (如果没有)：
   - Width: `200`
   - Height: `60`

#### 2.3 创建 HeightLabel（高度显示）

1. 在 TopBar 下创建 **Label** 节点，命名为 `HeightLabel`
2. Position: `(250, 0, 0)` (右上角)
3. 设置 Label 组件：
   - **String**: `"0m"`
   - **Font Size**: `36`
   - **Color**: 白色 `#FFFFFF`
   - **Horizontal Align**: RIGHT
   - **Vertical Align**: CENTER
4. 添加 **UITransform**：
   - Width: `150`
   - Height: `50`

#### 2.4 创建 PauseButton（暂停按钮）

**方法一：使用简单 Label 按钮**

1. 在 TopBar 下创建 **Button** 节点，命名为 `PauseButton`
2. Position: `(0, 0, 0)` (顶部中间)
3. 设置 UITransform：
   - Width: `80`
   - Height: `80`
4. 设置 Button 组件：
   - **Target**: 选择当前节点
   - **Transition**: COLOR
   - **Normal Color**: `#FFFFFF`
   - **Pressed Color**: `#CCCCCC`
   - **Hover Color**: `#EEEEEE`
5. 添加 **Sprite** 组件作为背景：
   - Color: `#666666`
6. 创建子节点 Label，命名为 `Label`：
   - String: `"暂停"` 或 `"||"`
   - Font Size: `24`
   - Color: 白色

**方法二：使用图标按钮**（如果有图标资源）

- 将 Sprite Frame 设置为暂停图标

#### 2.5 创建 ComboNode（连击提示）

1. 在 UI 下创建空节点，命名为 `ComboNode`
2. Position: `(0, 200, 0)` (屏幕中上位置)
3. **重要**：取消勾选 **Active** (默认隐藏)

#### 2.6 创建 ComboLabel（连击文字）

1. 在 ComboNode 下创建 **Label** 节点，命名为 `ComboLabel`
2. Position: `(0, 0, 0)`
3. 设置 Label 组件：
   - **String**: `"连击 x2"`
   - **Font Size**: `64`
   - **Color**: 金色 `#FFD700`
   - **Horizontal Align**: CENTER
   - **Vertical Align**: CENTER
   - **Font**: 如果有粗体字体，选择粗体
4. 设置 UITransform：
   - Width: `300`
   - Height: `100`

---

### 第三步：创建开始界面（StartPanel）

#### 3.1 创建 StartPanel 根节点

1. 在 UI 下创建空节点，命名为 `StartPanel`
2. Position: `(0, 0, 0)`
3. 添加 UITransform：
   - Width: `720`
   - Height: `1200`

#### 3.2 创建半透明背景

1. 在 StartPanel 下创建 **Sprite** 节点，命名为 `Background`
2. Position: `(0, 0, 0)`
3. 设置 Sprite 组件：
   - Type: SIMPLE
   - Color: 黑色半透明 `#000000`，Alpha: `180` (约70%透明度)
4. 设置 UITransform：
   - Width: `720`
   - Height: `1200`

#### 3.3 创建 TitleLabel（游戏标题）

1. 在 StartPanel 下创建 **Label** 节点，命名为 `TitleLabel`
2. Position: `(0, 300, 0)`
3. 设置 Label 组件：
   - **String**: `"摩天叠叠乐"`
   - **Font Size**: `72`
   - **Color**: 白色 `#FFFFFF`
   - **Horizontal Align**: CENTER
   - **Vertical Align**: CENTER
   - **Font**: 如果有可用的粗体字体，选择粗体
4. 设置 UITransform：
   - Width: `600`
   - Height: `120`

可选：添加描边效果（LabelOutline 组件）
- 点击 Add Component → 2D → LabelOutline
- Color: 黑色 `#000000`
- Width: `3`

#### 3.4 创建 StartButton（开始按钮）

1. 在 StartPanel 下创建 **Button** 节点，命名为 `StartButton`
2. Position: `(0, 0, 0)` (屏幕中心)
3. 设置 UITransform：
   - Width: `250`
   - Height: `80`
4. 设置 Sprite 组件（按钮背景）：
   - Type: SLICED (如果有九宫格图片) 或 SIMPLE
   - Color: 绿色 `#4CAF50`
5. 设置 Button 组件：
   - Transition: COLOR
   - Normal Color: `#4CAF50`
   - Pressed Color: `#45a049`
   - Hover Color: `#66BB6A`
6. 创建子节点 **Label**，命名为 `ButtonLabel`：
   - Position: `(0, 0, 0)`
   - String: `"开始游戏"`
   - Font Size: `40`
   - Color: 白色
   - Horizontal/Vertical Align: CENTER

#### 3.5 创建 BestScoreLabel（最高分显示）

1. 在 StartPanel 下创建 **Label** 节点，命名为 `BestScoreLabel`
2. Position: `(0, -200, 0)`
3. 设置 Label 组件：
   - String: `"最高分: 0"`
   - Font Size: `36`
   - Color: 黄色 `#FFC107`
   - Horizontal/Vertical Align: CENTER

---

### 第四步：创建暂停界面（PausePanel）

#### 4.1 创建 PausePanel 根节点

1. 在 UI 下创建空节点，命名为 `PausePanel`
2. Position: `(0, 0, 0)`
3. **重要**：取消勾选 **Active** (默认隐藏)
4. 添加 UITransform：
   - Width: `720`
   - Height: `1200`

#### 4.2 创建半透明背景

1. 在 PausePanel 下创建 **Sprite** 节点，命名为 `Background`
2. Position: `(0, 0, 0)`
3. 设置 Sprite 和 UITransform（同 StartPanel 的背景）

#### 4.3 创建 PauseTitle（暂停标题）

1. 在 PausePanel 下创建 **Label** 节点，命名为 `PauseTitle`
2. Position: `(0, 200, 0)`
3. 设置 Label 组件：
   - String: `"游戏暂停"`
   - Font Size: `64`
   - Color: 白色
   - Horizontal/Vertical Align: CENTER

#### 4.4 创建 ResumeButton（继续按钮）

1. 在 PausePanel 下创建 **Button** 节点，命名为 `ResumeButton`
2. Position: `(0, 50, 0)`
3. 设置 UITransform：
   - Width: `250`
   - Height: `80`
4. 设置 Sprite 和 Button（同 StartButton，但颜色可以用蓝色 `#2196F3`）
5. 创建子节点 Label：
   - String: `"继续"`

#### 4.5 创建 RestartButton（重新开始按钮）

1. 在 PausePanel 下创建 **Button** 节点，命名为 `RestartButton`
2. Position: `(0, -60, 0)`
3. 设置 UITransform、Sprite、Button（同上，颜色可以用橙色 `#FF9800`）
4. 创建子节点 Label：
   - String: `"重新开始"`

---

### 第五步：创建游戏结束界面（GameOverPanel）

#### 5.1 创建 GameOverPanel 根节点

1. 在 UI 下创建空节点，命名为 `GameOverPanel`
2. Position: `(0, 0, 0)`
3. **重要**：取消勾选 **Active** (默认隐藏)
4. 添加 UITransform：
   - Width: `720`
   - Height: `1200`

#### 5.2 创建半透明背景

（同前面的背景创建步骤）

#### 5.3 创建 GameOverTitle（游戏结束标题）

1. 在 GameOverPanel 下创建 **Label** 节点，命名为 `GameOverTitle`
2. Position: `(0, 300, 0)`
3. 设置 Label 组件：
   - String: `"游戏结束"`
   - Font Size: `64`
   - Color: 红色 `#F44336`
   - Horizontal/Vertical Align: CENTER

#### 5.4 创建分数和高度显示

**FinalScoreLabel**：
1. 创建 Label 节点，命名为 `FinalScoreLabel`
2. Position: `(0, 150, 0)`
3. String: `"分数: 0"`
4. Font Size: `48`
5. Color: 白色

**FinalHeightLabel**：
1. 创建 Label 节点，命名为 `FinalHeightLabel`
2. Position: `(0, 90, 0)`
3. String: `"高度: 0m"`
4. Font Size: `40`
5. Color: 白色

**HighScoreLabel**：
1. 创建 Label 节点，命名为 `HighScoreLabel`
2. Position: `(0, 20, 0)`
3. String: `"最高分: 0"`
4. Font Size: `36`
5. Color: 黄色 `#FFC107`

#### 5.5 创建 PlayAgainButton（再玩一次按钮）

1. 在 GameOverPanel 下创建 **Button** 节点，命名为 `PlayAgainButton`
2. Position: `(0, -120, 0)`
3. 设置 UITransform、Sprite、Button（同前面的按钮）
4. 创建子节点 Label：
   - String: `"再玩一次"`

---

## 第六步：关联 GameUI 组件引用

选中 UI 根节点，在 **GameUI** 组件的属性面板中，逐一拖拽关联以下节点：

### 游戏中 UI
- **Score Label**: 拖拽 `ScoreLabel` 节点
- **Height Label**: 拖拽 `HeightLabel` 节点
- **Combo Label**: 拖拽 `ComboLabel` 节点
- **Combo Node**: 拖拽 `ComboNode` 节点
- **Pause Button**: 拖拽 `PauseButton` 节点

### 开始界面
- **Start Panel**: 拖拽 `StartPanel` 节点
- **Start Button**: 拖拽 `StartButton` 节点
- **Title Label**: 拖拽 `TitleLabel` 节点

### 暂停界面
- **Pause Panel**: 拖拽 `PausePanel` 节点
- **Resume Button**: 拖拽 `ResumeButton` 节点
- **Restart Button**: 拖拽 `RestartButton` 节点

### 游戏结束界面
- **Game Over Panel**: 拖拽 `GameOverPanel` 节点
- **Final Score Label**: 拖拽 `FinalScoreLabel` 节点
- **Final Height Label**: 拖拽 `FinalHeightLabel` 节点
- **High Score Label**: 拖拽 `HighScoreLabel` 节点
- **Play Again Button**: 拖拽 `PlayAgainButton` 节点

---

## 第七步：保存场景

按 `Ctrl+S` (Windows) 或 `Cmd+S` (Mac) 保存场景。

---

## 样式优化建议

### 1. 使用更好的字体
- 导入中文字体（如思源黑体、阿里巴巴普惠体等）
- 在 Label 组件中选择导入的字体

### 2. 添加按钮缩放动画
在 Button 组件中：
- Transition 选择 **SCALE**
- Pressed Scale: `0.9`
- Duration: `0.1`

### 3. 添加描边和阴影
为重要的 Label 添加：
- **LabelOutline** 组件（描边）
- **LabelShadow** 组件（阴影）

### 4. 使用精美的按钮图片
- 导入按钮背景图片（PNG格式）
- 设置 Sprite 的 Type 为 SLICED
- 设置九宫格参数

---

## 测试 UI

创建完成后运行场景，测试：

1. ✅ StartPanel 默认显示
2. ✅ PausePanel 和 GameOverPanel 默认隐藏
3. ✅ ComboNode 默认隐藏
4. ✅ 所有按钮可以正常点击
5. ✅ 文字显示清晰，位置合适
6. ✅ 颜色搭配美观

---

## 下一步

完成 UI 布局后：
1. 继续创建背景系统
2. 创建建筑块容器
3. 配置摄像机
4. 关联 GameManager 的所有引用
5. 实现 UI 和 GameManager 之间的事件通信

---

## 常见问题

### Q: Label 文字显示不全？
A: 增大 UITransform 的 Width 和 Height。

### Q: 按钮点击没有反应？
A: 确保 Button 组件的 Target 指向正确的节点，并且按钮前面没有其他UI遮挡。

### Q: UI 在不同分辨率下显示不正常？
A: 使用 Widget 组件设置对齐方式，或使用百分比布局。

### Q: 半透明背景不透明？
A: 检查 Sprite 组件的 Color 的 Alpha 值是否小于255。

