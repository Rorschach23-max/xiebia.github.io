# HeartCanvas 3D 心形绘制实现详解

## 🎯 概述

HeartCanvas 是项目中的一个核心 3D 可视化组件，使用 Canvas 技术实现了一个具有动态效果的 3D 心形粒子系统。该组件结合了数学算法、图形渲染和动画优化，创造出令人惊叹的视觉效果。

## 🧮 心形数学原理

### 1. 3D 心形隐函数方程

**核心公式**：

```javascript
const heartFunction = (x: number, y: number, z: number): number => {
  return (
    Math.pow(x * x + (9 / 4) * y * y + z * z - 1, 3) -
    x * x * z * z * z -
    (9 / 80) * y * y * z * z * z
  );
};
```

**数学原理**：

- 这是一个 3D 隐函数方程，当函数值接近 0 时，点就在心形表面上
- `x² + 9y²/4 + z² - 1` 构成基础椭球体
- 立方项和交叉项创造心形的凹陷和尖端特征
- 通过调节判断条件 `heartValue < 0.1 && heartValue > -0.1` 控制心形"厚度"

### 2. 参数方程方法（经典心形）

**2D 心形参数方程**：

```javascript
const baseX = 16 * Math.pow(Math.sin(t), 3);
const baseY = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
```

**扩展到 3D**：

```javascript
// 生成多层心形，形成3D效果
const layers = 15;
for (let layer = 0; layer < layers; layer++) {
  const z = (layer / (layers - 1) - 0.5) * 0.8;
  const layerScale = 1 - Math.abs(z) * 0.3; // 根据z调整大小

  // 应用layerScale到x, y坐标
  const x = 16 * Math.pow(Math.sin(t), 3) * layerScale;
  const y = (...) * layerScale;
}
```

**设计亮点**：

- 通过 `layerScale` 实现心形的 3D 深度渐变效果
- 每层使用相同的参数方程，但尺寸逐渐变化
- 创造出立体的"厚度"感

## 🎨 粒子生成策略

### 1. 多重生成算法

项目采用**三层备选策略**确保心形生成的可靠性：

```javascript
// 1. 优先：3D参数方程（最可靠）
let mainPoints = generateHeartPointsParametric3D(particleCount);

// 2. 补充：2D参数方程扩展
if (mainPoints.length < particleCount * 0.8) {
  const additionalPoints = generateHeartPointsParametric(particleCount - mainPoints.length);
  mainPoints = [...mainPoints, ...additionalPoints];
}

// 3. 备选：隐函数随机采样
if (mainPoints.length < particleCount * 0.5) {
  const equationPoints = generateHeartPoints(particleCount - mainPoints.length);
  mainPoints = [...mainPoints, ...equationPoints];
}
```

**策略优势**：

- **可靠性**：多种算法互补，确保始终能生成足够的点
- **质量保证**：优先使用质量最高的参数方程方法
- **灵活性**：根据生成效果动态选择补充算法

### 2. 粒子点类型

#### 主心形点（6000 个）

- 严格按照心形方程生成
- 用于构建心形的主要轮廓
- 颜色相对稳定，提供清晰的形状

#### 随机心形点（2000 个）

```javascript
const generateRandomHeartPoints = (basePoints, maxVar) => {
  return basePoints.map(point => {
    const randScale = 1 + (Math.random() * 2 - 1) * maxVar; // ±20%变化
    return [point[0] * randScale, point[1] * randScale, point[2] * randScale];
  });
};
```

- 基于主心形点添加随机变化
- 创造动态的"粒子云"效果
- 增加视觉层次和动态感

## 🎬 3D 投影与渲染

### 1. 世界坐标到屏幕坐标转换

```javascript
const worldToScreen = (point: [number, number, number]): [number, number] => {
  const depth = 2;
  const scale = 500;
  const factor = depth / (depth + point[2]); // 透视投影

  return [
    canvasWidth / 2 + point[0] * scale * factor,
    canvasHeight / 2 + point[1] * scale * factor,
  ];
};
```

**透视投影原理**：

- `factor = depth / (depth + z)` 实现透视缩放
- 越远的点（z 值越大）缩放因子越小
- 创造 3D 深度感和立体效果

### 2. 深度感渲染

#### 颜色深度映射

```javascript
const getColor = (depth: number, isRandom: boolean = false): string => {
  const hue = isRandom ? baseHue - 10 : baseHue + ((depth * 20) % 10);
  const saturation = Math.max(50, colorSaturation - depth * 10);
  const lightness = Math.max(30, colorLightness - depth * 15);
  // HSL → RGB 转换...
};
```

**深度效果实现**：

- **色相变化**：深度不同的点有轻微色相偏移
- **饱和度降低**：远离中心的点饱和度降低
- **亮度减少**：距离越远，亮度越低
- 模拟 3D 光照和距离衰减效果

#### 粒子大小变化

```javascript
const size = 1.2 + ((depth * 3) % 1.8); // 主心形点
const size = 0.8 + ((depth * 2) % 1.2); // 随机点
```

- 使用深度值计算粒子大小
- 避免使用随机函数，提高性能
- 创造自然的大小渐变效果

## ⚡ 性能优化策略

### 1. 预计算和缓存

#### 点坐标预生成

```javascript
// 只在第一次或数据为空时生成
if (heartPointsRef.current.length === 0) {
  heartPointsRef.current = generateHeartPointsParametric3D(particleCount);
  randomPointsRef.current = generateRandomHeartPoints(heartPointsRef.current, randomMaxVar);
}
```

#### 颜色缓存系统

```javascript
const colorCache = new Map<string, string>();

const getColor = (depth: number, isRandom: boolean = false): string => {
  const cacheKey = `${Math.round(depth * 10)}_${isRandom}`;

  if (colorCache.has(cacheKey)) {
    return colorCache.get(cacheKey)!;
  }

  // 计算颜色并缓存...
  colorCache.set(cacheKey, color);
  return color;
};
```

**缓存优势**：

- 避免重复的 HSL→RGB 颜色计算
- 显著减少 CPU 开销
- 基于深度分层的智能缓存策略

### 2. 渲染优化

#### 视锥裁剪

```javascript
// 扩大边界检查，减少绘制调用
if (screenX < -10 || screenX > canvasWidth + 10 ||
    screenY < -10 || screenY > canvasHeight + 10) {
  continue;
}
```

#### 批量渲染

- 将相似的绘制操作批量处理
- 减少 Canvas API 调用次数
- 预计算避免重复数学运算

### 3. 动画控制

#### 智能动画状态管理

```javascript
useEffect(() => {
  if (isVisible) {
    animate();
  } else {
    // 隐藏时清空画布，释放GPU资源
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  return () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }
  };
}, [isVisible]);
```

## 🎪 动画效果实现

### 1. 心跳动画算法

```javascript
const animate = () => {
  const frameRatio = currentFrame / framesCount;

  // 主心形：标准正弦波
  const animationRatio = (Math.sin(frameRatio * Math.PI * 2) + 1) / 2;

  // 随机点：相位偏移的正弦波
  const randomRatio = (Math.sin(frameRatio * Math.PI * 2 + Math.PI / 4) + 1) / 2;

  drawHeart(animationRatio, randomRatio);
  currentFrame = (currentFrame + 1) % framesCount;
};
```

**动画特点**：

- **同步心跳**：120 帧一个完整周期
- **相位差异**：主心形和随机点有 π/4 相位差，增加层次感
- **平滑插值**：正弦函数确保动画的平滑性

### 2. 缩放效果

```javascript
const mainScale = 1.2 + animationRatio * 0.4; // 1.2 - 1.6 范围
const randomScale = 1.2 + randomRatio * 0.4; // 轻微不同步
```

- 基础尺寸 1.2，动态变化范围 33%
- 主心形和随机点使用不同的缩放比例
- 创造丰富的动态层次效果

## 🎨 视觉设计系统

### 1. 色彩参数

```javascript
const baseHue = 350; // 基础色相：玫瑰红
const colorSaturation = 90; // 高饱和度：鲜艳效果
const colorLightness = 70; // 中等亮度：平衡对比度
```

### 2. 画布规格

```javascript
const canvasWidth = 1000; // 画布宽度
const canvasHeight = 800; // 画布高度
const particleCount = 6000; // 主心形粒子数
const randomParticleCount = 2000; // 随机粒子数
```

**参数选择原因**：

- **高分辨率**：1000×800 提供清晰的显示效果
- **粒子密度**：8000 个总粒子保证心形的细腻度
- **性能平衡**：数量足够呈现效果，又不会造成性能问题

## 🔬 技术架构亮点

### 1. 数学与艺术的结合

- **隐函数方程**：严谨的数学基础
- **参数方程**：经典的几何美学
- **3D 投影**：现代计算机图形学技术

### 2. 多重容错机制

- **三层算法备选**：确保心形生成的可靠性
- **智能点生成**：自适应生成策略
- **性能降级**：在低性能设备上自动优化

### 3. 现代前端技术整合

- **React Hooks**：状态和生命周期管理
- **TypeScript**：类型安全和代码质量
- **Canvas API**：高性能图形渲染

## 💡 扩展可能性

### 1. 交互增强

```javascript
// 鼠标追踪效果
const addMouseInteraction = (mouseX, mouseY) => {
  const force = calculateMouseForce(mouseX, mouseY);
  applyForceToParticles(force);
};
```

### 2. 主题切换

```javascript
// 动态颜色主题
const colorThemes = {
  romantic: { hue: 350, saturation: 90, lightness: 70 },
  cool: { hue: 240, saturation: 80, lightness: 60 },
  warm: { hue: 30, saturation: 85, lightness: 65 },
};
```

### 3. 物理模拟

- 添加重力效果
- 粒子间相互作用
- 碰撞检测与反弹
