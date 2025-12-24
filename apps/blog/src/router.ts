import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import BlogDetail from './views/BlogDetail.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'blog-detail',
      component: BlogDetail,
      props: true
    }
  ]
})

export default router
