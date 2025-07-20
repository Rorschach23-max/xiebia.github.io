export const projectArchitecture = `# 项目架构设计思路

## 整体架构

本项目采用模块化的设计思路，主要分为以下几个层次：

1. **展示层** - React 组件
2. **业务逻辑层** - 自定义 Hooks
3. **数据层** - 状态管理
4. **工具层** - 工具函数和常量

## 目录结构

\`\`\`
src/
├── components/     # 公共组件
├── pages/         # 页面组件
├── hooks/         # 自定义 Hooks
├── constants/     # 常量定义
├── utils/         # 工具函数
└── assets/        # 静态资源
\`\`\`

## 设计原则

### 单一职责原则

每个组件、Hook 和函数都应该有一个明确的职责。

### 可复用性

组件设计时考虑复用性，通过 props 提供灵活的配置。

### 性能优化

- 使用 React.memo 避免不必要的重渲染
- 使用 useMemo 和 useCallback 优化计算
- 懒加载非关键组件

## 状态管理

使用 React 内置的状态管理，结合自定义 Hooks 实现状态逻辑的复用。`;
