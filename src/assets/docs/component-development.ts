export const componentDevelopment = `# 组件化开发实践

## 组件设计原则

### 单一职责

每个组件只负责一个功能或一个页面区域。

### 可复用性

通过 props 接口设计，让组件能够在不同场景下复用。

### 可测试性

组件应该易于测试，避免复杂的内部状态。

## 组件分类

### 1. 基础组件

如 Button、Input、Modal 等通用 UI 组件。

### 2. 业务组件

如 UserCard、ProductList 等带有业务逻辑的组件。

### 3. 页面组件

如 HomePage、ProfilePage 等完整的页面组件。

## 最佳实践

1. 使用 TypeScript 定义清晰的接口
2. 编写完整的 PropTypes 或 TypeScript 类型
3. 提供默认值和错误处理
4. 使用 React.memo 优化性能
5. 编写单元测试

## 示例代码

\`\`\`typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'primary' 
}) => {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
\`\`\``;
