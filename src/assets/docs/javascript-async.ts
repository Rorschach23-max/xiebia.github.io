export const javascriptAsync = `# JavaScript 异步编程

## Promise

Promise 是处理异步操作的一种方式：

\`\`\`javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('数据加载成功');
    }, 1000);
  });
};

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
\`\`\`

## async/await

更简洁的异步编程语法：

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('获取数据失败:', error);
    throw error;
  }
}
\`\`\`

## 错误处理

异步操作中的错误处理非常重要：

\`\`\`javascript
const handleAsyncOperation = async () => {
  try {
    const result = await riskyOperation();
    console.log('操作成功:', result);
  } catch (error) {
    console.error('操作失败:', error);
    // 适当的错误处理
  }
};
\`\`\`

## 最佳实践

1. 总是处理 Promise 的错误
2. 使用 async/await 替代 Promise 链
3. 避免在循环中使用 async/await
4. 使用 Promise.all 处理并发操作`;
