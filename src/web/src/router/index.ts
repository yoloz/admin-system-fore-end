import { createRouter, createWebHashHistory } from 'vue-router'

import RouterListener from './routerListener'

/**
 * Vue Router配置类 01点55分
 */
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'login',
            path: '/login',
            component: () => import('@/login/index.vue')
        },
        {
            name: 'error',
            path: '/error',
            // path: '/:catchAll(.*)',
            component: () => import('@/layouts/error.vue')
        },
        {
            path: '/redirect',
            component: () => import('@/layouts/index.vue'),
            children: [
                {
                    path: '/redirect/:path*',
                    component: () => import('@/layouts/refresh-view.vue')
                }
            ]
        }
        // {
        //     path: '/',
        //     component: () => import('@/layouts/index.vue'),
        //     redirect: '/menus',
        //     children: [
        //         {
        //             name: '菜单管理',
        //             path: 'menus',
        //             meta: { icon: '', hidden: false },
        //             component: () => import('@/menus/index.vue')
        //         }
        //     ]
        // }
        // {
        //     path: '/',
        //     component: () => import('@/layouts/index.vue'),
        //     redirect: '/right-log',
        //     children: [
        //         {
        //             name: '操作日志',
        //             path: 'right-log',
        //             meta: { icon: '', hidden: false },
        //             component: () => import('@/logs/right-log.vue')
        //         }
        //     ]
        // },
        // {
        //     path: '/',
        //     component: () => import('@/layouts/index.vue'),
        //     redirect: '/error-log',
        //     children: [
        //         {
        //             name: '错误日志',
        //             path: 'error-log',
        //             meta: { icon: '', hidden: false },
        //             component: () => import('@/logs/error-log.vue')
        //         }
        //     ]
        // }
        // {
        //     path: '/',
        //     component: () => import('@/layouts/index.vue'),
        //     redirect: '/users',
        //     children: [
        //         {
        //             name: '用户管理',
        //             path: 'users',
        //             meta: { icon: '', hidden: false },
        //             component: () => import('@/users/index.vue')
        //         }
        //     ]
        // }
        // {
        //     path: '/',
        //     component: () => import('@/layouts/index.vue'),
        //     redirect: '/roles',
        //     children: [
        //         {
        //             name: '角色管理',
        //             path: 'roles',
        //             meta: { icon: '', hidden: false },
        //             component: () => import('@/roles/index.vue')
        //         }
        //     ]
        // }
    ]
})

new RouterListener(router).start()

export default router
