import { Router } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Ref } from 'vue'
import { ElMessage } from 'element-plus'
import { WebsocketEvents } from 'websocket-ts'

import { ws } from '@/utils/websock'
import { useUserStore } from '@/stores/userStore'
import { useMenuStore } from '@/stores/menuStore'
import { getUserInfo } from '@/users/services/userServices'

import { getRouterMenus } from '../menus/services/menuServices'

export default class RouterListener {
    // 路由
    router: Router
    // 白名单 [忽略拦截页面]
    whitelist: string[]
    // authorization
    authorization: string | null

    constructor(router: Router) {
        this.router = router
        this.whitelist = ['/login', '/error']
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
                const { getRouterMenu } = storeToRefs(useMenuStore())
                loadSystemRouter(getRouterMenu).then(() => {
                    if (getRouterMenu.value.length > 0) {
                        getRouterMenu.value.forEach((r: any) => {
                            this.router.addRoute(r)
                        })
                        next(to)
                    } else {
                        return next('/error')
                    }
                }).catch((e: Error) => {
                    ElMessage.error(e.message)
                    return next('/error')
                })
            } else {
                next()
            }
        })
    }
}

async function loadSystemRouter(getRouterMenu: Ref<any>) {
    const userId = await loadUserInfo()
    if (userId === 0) {
        return new Error('load user fail...')
    }
    return await httpload(userId, getRouterMenu)
    // return await wsload(userId, getRouterMenu)
}

function loadUserInfo() {
    return new Promise((resolve: (value: number) => void, _reject) => {
        const { getLoginUser } = storeToRefs(useUserStore())
        if (getLoginUser.value.id && getLoginUser.value.id > 0) {
            resolve(getLoginUser.value.id)
        } else {
            const { setLoginUser, setPermission } = useUserStore()
            getUserInfo().then((res: any) => {
                setLoginUser(res.data.user)
                setPermission(res.data.permission)
                resolve(res.data.user.id)
            }).catch((_e) => {
                resolve(0)
            })
        }
    })
}

// eslint-disable-next-line no-unused-vars
function httpload(userId: number, ref: Ref<any>) {
    return new Promise((resolve, reject) => {
        getRouterMenus(userId).then((res: any) => {
            const { updateRouterMenu } = useMenuStore()
            updateRouterMenu(res.data)
            resolve(ref)
        }).catch((e) => {
            reject(e)
        })
    })
}

// eslint-disable-next-line no-unused-vars
async function wsload(userId: number, ref: Ref<any>) {
    if (ws.underlyingWebsocket?.readyState === ws.underlyingWebsocket?.OPEN) {
        ws.send('routerMenu_' + userId)
    } else if (ws.underlyingWebsocket?.readyState === ws.underlyingWebsocket?.CONNECTING) {
        ws.addEventListener(WebsocketEvents.open, (i, e) => {
            i.send('routerMenu_' + userId)
        })
    } else {
        return new Error('WS connection error...')
    }
    return waitRouterMenu(ref)
}

async function waitRouterMenu(ref: Ref<any>) {
    for (let i = 0; i < 5; i++) {
        if (ref.value.length === 0) {
            await delay(500)
        }
    }
    return ref
}

function delay(interval: number) {
    return new Promise(resolve => {
        setTimeout(resolve, interval)
    })
}