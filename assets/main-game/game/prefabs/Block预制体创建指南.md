# Block 建筑块预制体创建指南

## 创建步骤

### 1. 创建基础节点

1. 在 Cocos Creator 编辑器中，打开 `assets/main-game/game/prefabs/` 目录
2. 在目录空白处右键 → **创建** → **Prefab**
3. 命名为 `Block`

### 2. 编辑 Block 预制体

双击打开 Block 预制体进行编辑：

#### 2.1 根节点配置

选中根节点（Block），设置以下属性：

**Node 属性**：
- Name: `Block`
- Position: `(0, 0, 0)`
- Rotation: `(0, 0, 0)`
- Scale: `(1, 1, 1)`

#### 2.2 添加 UITransform 组件

如果没有 UITransform 组件，点击 **Add Component** → **UI** → **UITransform**

设置参数：
- **Content Size**: `Width: 200`, `Height: 50`
- **Anchor Point**: `X: 0.5`, `Y: 0.5` (居中)

#### 2.3 添加 Sprite 组件

点击 **Add Component** → **2D** → **Sprite**

设置参数：
- **Type**: SIMPLE
- **Sprite Frame**: 暂时留空（或选择纯色图片）
- **Color**: 选择一个颜色（如 `#FF6B6B` 红色）
- **Size Mode**: CUSTOM

#### 2.4 添加 Block 脚本组件

点击 **Add Component** → **Custom Script** → 搜索 `Block`

设置参数：
- **Move Speed**: `100`
- **Move Range**: `300`

#### 2.5 （可选）添加描边效果

如果想让建筑块更美观，可以添加子节点作为描边：

1. 在 Block 节点下创建子节点，命名为 `Border`
2. 添加 UITransform 组件：
   - Content Size: `202 x 52`（比父节点略大）
3. 添加 Sprite 组件：
   - Color: 深色（如 `#333333`）
   - Size Mode: CUSTOM
4. 在层级面板中将 Border 拖到 Sprite 组件的下方（显示在后面）

### 3. 保存预制体

按 `Ctrl+S` (Windows) 或 `Cmd+S` (Mac) 保存预制体。

---

## 预制体结构示意

```
Block (根节点)
├── UITransform (200 x 50)
├── Sprite (颜色块)
└── Block (脚本组件)
    ├── Move Speed: 100
    └── Move Range: 300
```

---

## 进阶：创建多种颜色的建筑块

为了让游戏更丰富，可以创建多个不同颜色的建筑块变体：

### 方法 1：创建多个预制体变体

1. 复制 Block 预制体，命名为 `Block_Red`、`Block_Blue`、`Block_Green` 等
2. 分别设置不同的颜色

### 方法 2：在代码中动态设置颜色

在 `BlockController.ts` 中生成建筑块时，动态设置颜色：

```typescript
// 在 BlockController.ts 的 spawnBlock 方法中
const colors = [
    new Color(255, 107, 107), // 红色
    new Color(107, 255, 107), // 绿色
    new Color(107, 107, 255), // 蓝色
    new Color(255, 255, 107), // 黄色
    new Color(255, 107, 255), // 紫色
];

const randomColor = colors[Math.floor(Math.random() * colors.length)];
const blockComponent = block.getComponent(Block);
if (blockComponent) {
    blockComponent.setColor(randomColor);
}
```

---

## 测试建筑块

创建完成后，可以在场景中测试：

1. 将 Block 预制体拖到场景的 Canvas 中
2. 运行场景，观察建筑块是否正常显示
3. 检查尺寸和颜色是否符合预期
4. 删除测试节点

---

## 常见问题

### Q: 建筑块显示不出来？
A: 检查 Sprite 组件是否有 SpriteFrame，或者设置了 Color 颜色。

### Q: 建筑块尺寸不对？
A: 确认 UITransform 的 Content Size 设置为 `200 x 50`。

### Q: 无法添加 Block 脚本？
A: 确保 Block.ts 文件已保存，并且 Cocos Creator 已刷新资源（可能需要等待几秒）。

---

## 下一步

创建完 Block 预制体后，需要：

1. 在 GameManager 中引用这个预制体
2. 在 BlockController 中引用这个预制体
3. 搭建完整的游戏场景

