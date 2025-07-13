# Xiebia 页面模块化结构

这个页面已经被重构为模块化的结构，以提高代码的可维护性和可重用性。

## 文件结构

```
src/pages/Xiebia/
├── index.tsx                 # 主页面文件 (入口)
├── index.less               # 主样式文件
├── README.md                # 文档说明
├── components/              # 组件目录
│   ├── index.ts            # 组件统一导出
│   ├── ChatSection.tsx     # 聊天区域组件
│   ├── Introduction.tsx    # 介绍组件
│   ├── MaskContainer.tsx   # 面具容器组件
│   ├── MaskList.tsx        # 面具列表组件
│   └── ScrollIndicator.tsx # 滚动指示器组件
└── hooks/                  # 自定义Hook目录
    ├── index.ts            # Hook统一导出
    ├── usePageScroll.ts    # 页面滚动逻辑
    └── useMaskScroll.ts    # 面具区域滚动逻辑
```

## 模块说明

### 🎯 主页面 (index.tsx)

- **职责**: 协调各个组件，处理顶层状态管理
- **状态**: 管理选中的面具、心形动画显示状态
- **事件处理**: Header 点击、面具选择等顶层事件

### 📦 组件模块

#### 1. ChatSection

- **职责**: 渲染聊天界面
- **功能**: 显示对话消息、头像、动画效果
- **Props**: `selectedMask`

#### 2. MaskList

- **职责**: 面具列表展示和选择
- **功能**: 滚动列表、选中状态、点击选择
- **Props**: `selectedMask`, `onMaskSelect`
- **Hook**: 使用 `useMaskScroll` 处理滚动

#### 3. MaskContainer

- **职责**: 第一屏的面具展示
- **功能**: 面具翻转动画、点击跳转
- **Props**: `onMaskClick`

#### 4. ScrollIndicator

- **职责**: 页面滚动指示器
- **功能**: 显示当前区域、点击跳转
- **Props**: `currentSection`, `onSectionClick`

#### 5. Introduction

- **职责**: 介绍文本组件
- **功能**: 显示页面介绍内容

### 🔧 自定义 Hook

#### 1. usePageScroll

- **职责**: 页面级滚动逻辑
- **功能**:
  - 页面区域切换
  - 键盘、鼠标、触摸事件处理
  - 防抖机制
- **返回**: `currentSection`, `pageContainerRef`, `scrollToSection`

#### 2. useMaskScroll

- **职责**: 面具列表滚动逻辑
- **功能**:
  - 阻止滚动事件冒泡
  - 手动处理滚动
  - 触摸事件支持
- **返回**: `maskItemsRef`

### 🚀 独立组件 (src/components/)

#### 1. HeartScene/HeartCanvas

- **职责**: 3D 心形动画
- **功能**: Canvas 绘制、粒子动画、性能优化
- **用途**: 开发测试组件

#### 2. InputModal

- **职责**: 输入弹窗
- **功能**: 表单验证、模态框
- **用途**: 开发测试组件

## 优势

### ✅ 可维护性

- 单一职责原则，每个文件职责明确
- 代码量合理，便于理解和修改
- 逻辑分离，样式、状态、事件分开管理

### ✅ 可重用性

- 组件独立，可在其他页面复用
- Hook 可复用，滚动逻辑可用于其他场景
- 接口清晰，便于扩展

### ✅ 可测试性

- 组件隔离，便于单元测试
- Hook 独立，便于逻辑测试
- 状态集中，便于集成测试

### ✅ 开发体验

- 文件分工明确，多人协作友好
- 热重载效率高，修改单个组件不影响整体
- 类型安全，TypeScript 接口清晰

## 使用方式

```tsx
// 导入单个组件
import { ChatSection, MaskList } from './components';

// 导入单个Hook
import { usePageScroll, useMaskScroll } from './hooks';

// 或者从统一导出导入
import { ChatSection, MaskList, usePageScroll } from './components/index';
```

## 扩展建议

1. **状态管理**: 如果状态更复杂，可以考虑使用 Context 或状态管理库
2. **样式隔离**: 可以为每个组件创建独立的样式文件
3. **类型定义**: 可以创建统一的类型定义文件
4. **工具函数**: 可以创建 utils 目录存放工具函数
