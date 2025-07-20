# React Hooks 使用指南

## 简介

React Hooks 是 React 16.8 引入的新特性，允许你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## 主要 Hooks

### useState

`useState` 是最基础的 Hook，用于在函数组件中添加状态。

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>点击我</button>
    </div>
  );
}
```

### useEffect

`useEffect` 用于处理副作用，如数据获取、订阅或手动更改 DOM。

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 更新文档标题
    document.title = `你点击了 ${count} 次`;
  }, [count]); // 只有当 count 发生变化时才重新执行

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>点击我</button>
    </div>
  );
}
```

### useContext

`useContext` 用于在函数组件中消费 Context。

```javascript
import React, { useContext } from 'react';

const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme === 'dark' ? '#333' : '#FFF' }}>
      我是一个 {theme} 主题按钮
    </button>
  );
}
```

## 自定义 Hooks

自定义 Hook 是一个函数，其名称以 "use" 开头，函数内部可以调用其他的 Hook。

```javascript
import { useState, useEffect } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// 使用自定义 Hook
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
```

## 最佳实践

1. **Hook 调用顺序保持一致**：不要在循环、条件或嵌套函数中调用 Hook
2. **只在顶层调用 Hook**：确保每次渲染都以相同的顺序调用 Hook
3. **使用 ESLint 插件**：`eslint-plugin-react-hooks` 帮助检查 Hook 规则
4. **合理使用依赖数组**：在 useEffect 中正确指定依赖项
