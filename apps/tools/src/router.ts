import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/Home.vue';
import Base64Converter from './tools/base64/Base64Converter.vue';
import HextechAram from './tools/hextech-aram/HextechAram.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      meta: { title: '工具集' }
    },
    {
      path: '/base64',
      component: Base64Converter,
      meta: { title: 'Base64 转换器' }
    },
    {
      path: '/hextech-aram',
      component: HextechAram,
      meta: { title: '海克斯大乱斗出装' }
    }
  ]
});

// 设置页面标题
router.afterEach((to) => {
  document.title = to.meta.title as string || '工具集';
});

export default router;