import { IRouterMenu } from '@/menus/entity/menu'

export const mockMenu: IRouterMenu[] = [
    {
        id: 0,
        name: '首页',
        path: '/',
        redirect: '/base',
        meta: { hidden: true },
        component: 'layouts/index.vue'
    },
    {
        id: 1,
        name: '基础信息',
        path: 'base',
        redirect: '/base/user',
        meta: { icon: 'icon-icon-Databases', hidden: false },
        component: 'layouts/index.vue',
        children: [
            {
                id: 2,
                name: '人员管理',
                path: 'user',
                meta: { icon: 'icon-database-stroke', hidden: false },
                component: 'users/index.vue'
            }
        ]
    },
    {
        id: 3,
        name: '权限管理',
        path: 'auth',
        redirect: '/auth/role',
        meta: { icon: 'icon-mobanguanli', hidden: false },
        component: 'layouts/index.vue',
        children: [
            {
                id: 4,
                name: '角色管理',
                path: 'role',
                meta: { icon: 'icon-task', hidden: false },
                component: 'roles/index.vue'
            }
        ]
    },
    {
        id: 5,
        name: '资源管理',
        path: 'resource',
        redirect: '/resource/menu',
        meta: { icon: 'icon-guizeguanli', hidden: false },
        component: 'layouts/index.vue',
        children: [
            {
                id: 6,
                name: '菜单管理',
                path: 'menu',
                meta: { icon: 'icon-type', hidden: false },
                component: 'menus/index.vue'
            }
        ]
    },
    {
        id: 7,
        name: '系统管理',
        path: 'system',
        meta: { icon: 'icon-disposition', hidden: false },
        redirect: '/system/logs',
        component: 'layouts/index.vue',
        children: [
            {
                id: 8,
                name: '日志管理',
                path: 'logs',
                meta: { icon: 'icon-logs', hidden: false },
                redirect: '/logs/log',
                component: 'layouts/blank-view.vue',
                children: [
                    {
                        id: 9,
                        name: '操作日志',
                        path: 'log',
                        meta: { hidden: false },
                        component: 'logs/index.vue'
                    },
                    {
                        id: 10,
                        name: '错误日志',
                        path: 'errorlog',
                        meta: { hidden: false },
                        component: 'logs/error-log.vue'
                    }
                ]
            }
        ]
    }

]