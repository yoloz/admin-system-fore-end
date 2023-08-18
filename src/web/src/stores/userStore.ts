import { deepCopy } from '@ued/utils/src/utils'
import { defineStore } from 'pinia'

type LoginUser = {
    id: number,
    username: string,
    nickname: string,
    phone: string,
    email: string,
    level: number
}

export const useUserStore = defineStore('login', {
    state: () => {
        return {
            user: {
                id: 0,
                username: '',
                nickname: '',
                phone: '',
                email: '',
                level: Number.MAX_SAFE_INTEGER // 此用户最大的角色level
            } as LoginUser,
            permissions: [] as Array<String> // 用户所有的菜单权限列表
        }
    },
    getters: {
        getLoginUser(state): LoginUser {
            return state.user
        },
        getPermission(state): Array<String> {
            return state.permissions
        }
    },
    actions: {
        setLoginUser(data: any) {
            this.user = deepCopy(data)
        },
        setPermission(data: any) {
            this.permissions = deepCopy(data)
        }
    }
})