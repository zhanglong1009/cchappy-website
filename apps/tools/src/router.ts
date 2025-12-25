import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/Home.vue';
import HextechAram from './tools/hextech-aram/HextechAram.vue';
import PixelAvatar from './tools/pixel-avatar/PixelAvatar.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      meta: { title: '工具集' }
    },
    {
      path: '/hextech-aram',
      component: HextechAram,
      meta: { title: '海克斯大乱斗出装' }
    },
    {
      path: '/pixel-avatar',
      component: PixelAvatar,
      meta: { title: '像素头像生成器' }
    }
  ]
});

// 设置页面标题
router.afterEach((to) => {
  document.title = to.meta.title as string || '工具集';
});

export default router;