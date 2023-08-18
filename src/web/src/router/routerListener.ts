import { Router, RouteRecordRaw } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/userStore'
import { ws } from '@/utils/websock'
import { useMenuStore } from '@/stores/menuStore'
import { getUserInfo } from '@/users/services/userServices'

// import { getRouterMenus } from '../menus/services/menuServices'

export default class RouterListener {
    // 路由
    router: Router
    // 白名单 [忽略拦截页面]
    whitelist: string[]
    // authorization
    authorization: string | null

    constructor(router: Router) {
        this.router = router
        this.whitelist = ['/login']
        this.authorization = localStorage.getItem('authorization')
    }

    start() {
        this.router.beforeEach((to, form, next) => {
            const path: string = to.path
            const isRelease: string | undefined = this.whitelist.find((item: string) => item === path)
            if (isRelease) return next()
            const authorization = localStorage.getItem('authorization')
            if (!authorization || authorization === 'undefined') {
                return next('/login')
            }
            const routeRecordRaw: any = this.router.getRoutes().find((router: any) => router.path === '/')
            if (!routeRecordRaw) {
                // eslint-disable-next-line no-console
                // console.log('browser refresh lost route, reloading...')
                loadSystemRoleRouter(this.router).then(() => next(to))
            } else {
                next()
            }
        })
    }
}

/**
     * 加载系统路由信息
     * 1. 请求路由信息
     * 2. 解析路由权限信息
     * 3. 解析Redirect地址
     * @param router vue-router
     * @returns Promise
     */
export const loadSystemRoleRouter = (router: Router): Promise<RouteRecordRaw[]> => {
    const { getLoginUser } = storeToRefs(useUserStore())
    return new Promise((resolve: (result: RouteRecordRaw[]) => void, reject) => {
        if (getLoginUser.value.id === 0) {
            const { setLoginUser, setPermission } = useUserStore()
            getUserInfo().then((res: any) => {
                setLoginUser(res.data.user)
                setPermission(res.data.permission)
            }).catch((e) => {
            })
        }
        // getRouterMenus(getLoginUser.value.id).then((res: any) => {
        //     const { updateRouterMenu } = useMenuStore()
        //     updateRouterMenu(res.data)
        // }).catch((e) => {
        // })
        ws.send('routerMenu_' + getLoginUser.value.id) // websocket + pina
        setTimeout(() => {
            const { getRouterMenu } = storeToRefs(useMenuStore())
            if (getRouterMenu.value) {
                const routerMenus = getRouterMenu.value
                routerMenus.forEach((r: any) => {
                    router.addRoute(r)
                })
                // eslint-disable-next-line no-console
                // console.log('dynamic router load success...')
                resolve(routerMenus as RouteRecordRaw[])
            } else {
                // eslint-disable-next-line no-console
                console.warn('dynamic router load timeout...')
                router.go(0)
                reject(new Error('获取路由菜单超时!'))
            }
        }, 500)
    })
}