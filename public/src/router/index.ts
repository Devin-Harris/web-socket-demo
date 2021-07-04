import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard/index.vue')
  },
  {
    path: '/room/:id',
    name: 'Room',
    component: () => import(/* webpackChunkName: "about" */ '../views/Room/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
