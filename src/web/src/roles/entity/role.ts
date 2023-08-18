import { Page } from '@/entity/page'
import { IBaseEntity } from '@/entity/base'
import { IUserForm } from '@/users/entity/user'
import { IMenuForm } from '@/menus/entity/menu'

export interface IRoleForm extends IBaseEntity {
    id?: number
    name: string
    level: number
    builtin?: boolean
    desc?: string
}

export namespace IRoleList {
    export interface RequestForm extends Page.RequestForm {
        name?: string
    }
    export interface ResponseData extends Page.ResponseData<IRoleForm>, IRoleForm {

    }
}

export interface IRoleUserRelation {
    id: number
    userIds?: number[]
}

export namespace IRoleUserRelationList {
    export interface RequestForm extends Page.RequestForm {
        id: number
    }
    export interface ResponseData extends Page.ResponseData<IUserForm>, IUserForm {

    }
}

export interface IRoleMenuRelation {
    id: number
    menuIds?: number[]
}

export namespace IRoleMenuRelationList {
    export interface RequestForm extends Page.RequestForm {
        id: number
    }
    export interface ResponseData extends Page.ResponseData<IMenuForm>, IMenuForm {

    }
}
