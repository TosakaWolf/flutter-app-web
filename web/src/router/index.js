import { createRouter, createWebHistory } from 'vue-router'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/helloworld'
  },
  {
    path: '/helloworld',
    name: 'helloworld',
    meta: { title: 'hello world' },
    component: () => import('@/views/HelloWorld.vue')
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: '404',
  //   meta: { title: '404' },
  //   component: () => import('@/views/404')
  // }
]

// 本地所有的页面 需要配合后台返回的数据生成页面
export const asyncRoutes = []

const createNewRouter = () =>
  createRouter({
    // 控制滚动 https://next.router.vuejs.org/zh/guide/advanced/scroll-behavior.html
    // https://next.router.vuejs.org/zh/api/#scrollbehavior
    scrollBehavior: () => ({ y: 0 }),
    history: createWebHistory(import.meta.env.VITE_APP_BASE_URL), // history为必填项
    routes: constantRoutes
  })
const router = createNewRouter()


export default router
