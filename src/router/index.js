import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../layout/TheWelcome.vue'

export const constantRoutes = [
  {
    path: '/',
    name: 'home',
    redirect: '/about',
    component: HomeView,
    hidden: true   //此处的hidden只是个标记相当于bool flag,并不会把该路由隐藏
  },
  {
    path: '/about',
    name: 'about',
    hidden: false,
    redirect: '/about/test1',
    component: HomeView,
    children: [{
      path: 'test1',
      name: '选项一',
      component: () => import('../views/HelloWorld.vue')
    },
    {
      path: 'test2',
      name: '选项二',
      component: () => import('../views/HelloWorld.vue')
    }
    ]
  },
  {
    path: '/home',
    name: '导航一',
    component: HomeView,
    hidden: false,   //此处的hidden只是个标记相当于bool flag,并不会把该路由隐藏
    children: [{
      path: 'test3',
      name: '选项三',
      component: () => import('../views/HelloWorld.vue')
    },
    {
      path: 'test4',
      name: '选项四',
      component: () => import('../views/HelloWorld.vue')
    }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router
