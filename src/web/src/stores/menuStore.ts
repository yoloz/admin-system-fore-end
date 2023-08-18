import { defineStore } from 'pinia'

import { IRouterMenu } from '@/menus/entity/menu'

// 浏览器同一时刻只有一个登陆用户，所以路由菜单一份
export const useMenuStore = defineStore('menus', {
    state: () => {
        return {
            routerMenus: [] as IRouterMenu[]
        }
    },
    getters: {
        getRouterMenu(state): IRouterMenu[] {
            return state.routerMenus
        }
    },
    actions: {
        updateRouterMenu(obj: any) {
            this.routerMenus = filterMenus(obj, 0)
        }
    }
})

const componentList = import.meta.glob([
    '@/layouts/index.vue',
    '@/layouts/blank-view.vue',
    '@/users/index.vue',
    '@/roles/index.vue',
    '@/menus/index.vue',
    '@/logs/right-log.vue',
    '@/logs/error-log.vue',
    '@/modules/**/index.vue'])

const loadComponent = (component: string) => {
    // return () => import(`@/${component}`)
    return componentList[`/src/${component}`]
}

// 遍历路由字符串，转换为组件对象
const filterMenus = (menulist: [], level: number) => {
    return menulist.filter((menu: any) => {
        if (menu.component) {
            menu.component = loadComponent(menu.component)
        }
        // 首层path绝对地址
        if (level === 0 && !menu.path.startsWith('/')) {
            menu.path = '/' + menu.path
        }
        if (menu.children && menu.children.length > 0) {
            menu.children = filterMenus(menu.children, level + 1)
        }
        return true
    })
}