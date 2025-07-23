export const projectArchitecture = `# Xiebia 项目架构设计文档

## 项目概述

Xiebia 是一个基于现代前端技术栈构建的交互式 Web 应用，融合了 2D 界面和 3D 图形渲染技术，提供沉浸式的用户体验。

### 核心技术栈

- **框架**: UmiJS Max v4.4.11（企业级前端应用框架）
- **UI 库**: Ant Design v5.4.0 + Ant Design Pro Components v2.4.4
- **3D 渲染**: Three.js v0.158.0 + React Three Fiber v8.15.19 + React Three Drei v9.88.13
- **语言**: TypeScript + React 18
- **构建工具**: Webpack（UmiJS 内置）
- **代码规范**: ESLint + Prettier + Stylelint + Husky

## 整体架构

本项目采用分层模块化架构，遵循关注点分离和单一职责原则：

### 1. **展示层（Presentation Layer）**
- React 组件
- 3D 场景组件
- 页面路由组件

### 2. **业务逻辑层（Business Logic Layer）**
- 自定义 Hooks
- 状态管理逻辑
- 交互控制逻辑

### 3. **数据层（Data Layer）**
- Models（UmiJS 数据流）
- Services（API 调用）
- 本地状态管理

### 4. **基础设施层（Infrastructure Layer）**
- 工具函数
- 常量定义
- 类型定义
- Mock 数据

## 目录结构详解

\`\`\`
xiebia/
├── public/                 # 静态资源
├── src/                    # 源代码
│   ├── components/         # 全局公共组件
│   │   ├── Header/         # 页面头部组件
│   │   ├── HeartScene/     # 3D心形动画场景
│   │   ├── SvgIcon/        # SVG 图标组件
│   │   ├── InputModal/     # 输入模态框
│   │   ├── Guide/          # 引导组件
│   │   ├── Introduction/   # 介绍组件
│   │   └── AnimationControl/ # 动画控制组件
│   ├── pages/              # 页面组件
│   │   ├── Home/           # 首页
│   │   ├── Xiebia/         # 主功能页面（模块化结构）
│   │   ├── Table/          # 表格页面
│   │   └── Access/         # 权限测试页面
│   ├── hooks/              # 全局自定义 Hooks
│   ├── models/             # 数据模型（UmiJS 数据流）
│   ├── services/           # API 服务层
│   │   └── demo/           # 演示服务
│   ├── utils/              # 工具函数库
│   ├── constants/          # 常量定义
│   ├── assets/             # 静态资源
│   │   └── docs/           # 文档资源
│   ├── app.ts              # 应用运行时配置
│   └── access.ts           # 权限配置
├── mock/                   # Mock 数据
├── docs/                   # 项目文档
├── .umirc.ts              # UmiJS 配置文件
├── package.json           # 项目依赖
└── ...                    # 其他配置文件
\`\`\`

## 核心特性与设计模式

### 1. **模块化页面架构**

以 \`Xiebia\` 页面为例，采用模块化设计：

\`\`\`
pages/Xiebia/
├── index.tsx              # 页面入口，状态协调
├── components/            # 页面专用组件
│   ├── ChatSection.tsx    # 聊天区域
│   ├── MaskList.tsx      # 面具列表
│   ├── MaskContainer.tsx # 面具容器
│   └── ScrollIndicator.tsx # 滚动指示器
└── hooks/                # 页面专用 Hooks
    ├── usePageScroll.ts  # 页面滚动逻辑
    └── useMaskScroll.ts  # 面具滚动逻辑
\`\`\`

### 2. **3D 图形渲染架构**

- **Three.js 核心**: 负责 3D 场景、几何体、材质、光照
- **React Three Fiber**: Three.js 的 React 包装，提供声明式 3D 开发
- **React Three Drei**: 常用 3D 组件库，简化复杂 3D 功能
- **后处理效果**: 使用 @react-three/postprocessing 添加视觉效果

### 3. **状态管理策略**

\`\`\`typescript
// 全局状态：UmiJS Models
// 页面状态：React useState + 自定义 Hooks
// 组件状态：本地 state
// 3D 场景状态：React Three Fiber 状态

// 示例：页面级状态管理
const usePageState = () => {
  const [selectedMask, setSelectedMask] = useState(null);
  const [showHeart, setShowHeart] = useState(false);
  return { selectedMask, setSelectedMask, showHeart, setShowHeart };
};
\`\`\`

## 设计原则与最佳实践

### 1. **单一职责原则**
- 每个组件专注单一功能
- Hooks 封装特定逻辑
- 服务层专注数据获取

### 2. **组件复用性**
- Props 接口设计灵活
- 组件功能内聚，耦合度低
- 支持主题和样式定制

### 3. **性能优化策略**

\`\`\`typescript
// 组件优化
const OptimizedComponent = React.memo(Component);

// 计算缓存
const expensiveValue = useMemo(() => 
  computeExpensiveValue(deps), [deps]);

// 回调缓存
const handleClick = useCallback(() => {
  // 处理逻辑
}, [deps]);

// 3D 场景优化
const Scene = () => (
  <Canvas dpr={[1, 2]} performance={{ min: 0.5 }}>
    <Suspense fallback={<Loader />}>
      <Scene3D />
    </Suspense>
  </Canvas>
);
\`\`\`

### 4. **代码质量保障**

- **TypeScript**: 类型安全，减少运行时错误
- **ESLint**: 代码规范检查
- **Prettier**: 代码格式化
- **Husky**: Git 提交钩子
- **Lint-staged**: 提交前代码检查

### 5. **开发与构建优化**

- **热重载**: 开发时快速反馈
- **代码分割**: 按需加载，减少初始包大小
- **Tree Shaking**: 去除未使用代码
- **路由懒加载**: 页面级代码分割

## 数据流架构

\`\`\`
用户交互 → 事件处理 → 状态更新 → 组件重渲染 → UI 更新

// 3D 渲染数据流
状态变化 → Three.js 对象更新 → 渲染循环 → 屏幕显示
\`\`\`

## 扩展性考虑

### 1. **新功能模块添加**
- 在 \`pages/\` 下创建新模块
- 遵循现有的模块化结构
- 复用全局组件和 Hooks

### 2. **3D 功能扩展**
- 新增 3D 组件到 \`components/\`
- 复用现有 3D 基础设施
- 考虑性能影响和优化

### 3. **状态管理扩展**
- 复杂状态使用 UmiJS Models
- 中等复杂度使用 Context
- 简单状态使用本地 state

## 部署与运维

- **构建命令**: \`npm run build\`
- **开发服务器**: \`npm run dev\`
- **代码检查**: \`npm run lint\`
- **格式化**: \`npm run format\`

本架构设计注重可维护性、可扩展性和性能优化，为xiebia.top的长期发展提供了坚实的技术基础。`;
