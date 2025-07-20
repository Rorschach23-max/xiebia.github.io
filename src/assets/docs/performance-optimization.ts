export const performanceOptimization = `# 前端性能优化指南

## 加载性能优化

### 1. 代码分割

\`\`\`javascript
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

### 2. 图片优化

- 使用 WebP 格式
- 实现图片懒加载
- 使用适当的尺寸

## 运行时性能优化

### 1. React 优化

\`\`\`javascript
import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(({ items }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return <div>{expensiveValue}</div>;
});
\`\`\`

## 最佳实践

1. 测量优先于优化
2. 关注关键渲染路径
3. 减少 JavaScript 主线程阻塞
4. 优化资源加载顺序`;
