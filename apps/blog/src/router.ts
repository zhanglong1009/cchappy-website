import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import BlogDetail from './views/BlogDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blog/:id',
      name: 'blog-detail',
      component: BlogDetail,
      props: true
    }
  ]
})

export default router
