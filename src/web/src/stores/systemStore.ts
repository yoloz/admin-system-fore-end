import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', {
    state: () => {
        return {
            theme: {
                isDark: false
            },
            systemInfo: {
                name: '测试系统',
                path: '/favicon.ico'
            },
            layout: {
                layoutMode: 'Classic'
            },
            menuCollapse: false
        }
    },
    getters: {
        getSystemInfo(state) {
            return state.systemInfo
        },
        getTheme: (state) => state.theme,
        getLayout: (state) => state.layout,
        getMenCollapse: (state) => state.menuCollapse
    },
    actions: {
        setTheme(data: boolean) {
            this.theme.isDark = data
        },
        setLayout(layout: string) {
            this.layout = { layoutMode: layout }
        },
        setMenuCollapse(collapse: boolean) {
            this.menuCollapse = collapse
        }
    }
})