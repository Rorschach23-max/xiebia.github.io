// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'xiebia' };
}

// 使用空对象配置，而不是false
export const layout = () => {
  return {
    pure: true, // 使用纯净模式，不添加默认布局
    contentStyle: { padding: 0, margin: 0 }, // 移除内容区域的内边距
  };
};
