import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
const Login = () => import('@/views/login/login.vue')
const Main = () => import('@/views/main/main.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'main',
    path: '/main',
    component: Main
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from) => {
  //如果用户去的页面没有登录，则跳转到登录页
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    return firstMenu.url
  }
})
export default router
