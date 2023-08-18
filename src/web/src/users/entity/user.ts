import { Page } from '@/entity/page'
import { IBaseEntity } from '@/entity/base'
import { IRoleForm } from '@/roles/entity/role'

export interface IUserForm extends IBaseEntity {
    id?: number
    nickname?: string
    username: string
    password?: string
    enable?: boolean
    builtin?: boolean
    phone?: string
    email?: string
    loginIp?: string
    loginTime?: string
    roleIds?: number[] // 编辑更新操作
    roles?: Array<IRoleForm> // id,name,level,限查询返回
}

export interface IPwd {
    username: string
    oldPassword: string
    newPassword: string
    confirmPwd?: string
}

export namespace IUserList {
    // 定义查询条件
    export interface RequestForm extends Page.RequestForm {
        username?: string,
        enable?: boolean
    }
    export interface ResponseData extends Page.ResponseData<IUserForm>, IUserForm {

    }
}