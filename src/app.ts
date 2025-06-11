// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

import logo from '@/assets/wechat_avatar.jpg';

export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'xiebia' };
}

export const layout = () => {
  return {
    logo,
    menu: {
      locale: false,
    },
    footerRender: false, // 移除底部footer
    rightContentRender: false, // 移除右上角内容
    actionsRender: false, // 移除侧边栏底部操作区
  };
};
