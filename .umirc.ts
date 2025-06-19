import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'xiebia',
  },
  routes: [
    {
      path: '/',
      redirect: '/xiebia',
    },
    {
      path: '/xiebia',
      component: './Xiebia',
    },
  ],
  npmClient: 'pnpm',
  base: '/',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  history: {
    type: 'hash',
  },
  alias: {
    '@': './src',
  },
});
