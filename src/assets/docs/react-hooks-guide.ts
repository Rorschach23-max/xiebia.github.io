export const reactHooksGuide = `# React Hooks 使用指南

## 简介

React Hooks 是 React 16.8 引入的新特性，允许你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## 主要 Hooks

### useState

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

### useEffect

\`\`\`javascript
useEffect(() => {
  document.title = \`你点击了 \${count} 次\`;
}, [count]);
\`\`\`

### useContext

\`\`\`javascript
const value = useContext(MyContext);
\`\`\`

## 自定义 Hooks

你可以创建自己的 Hooks 来复用状态逻辑：

\`\`\`javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  
  return { count, increment, decrement };
}
\`\`\`

## 最佳实践

1. 只在函数最顶层使用 Hook
2. 只在 React 函数中调用 Hook
3. 使用 ESLint 插件来强制执行这些规则`;
