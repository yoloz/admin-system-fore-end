import { Page } from '@/entity/page'

export interface IMenuForm {
    id?: number
    name: string
    path: string
    redirect?: string
    component: any
    pid?: number
    type: number // 0:目录 1:菜单 2:按钮
    icon?: string
    hidden: boolean
    order: number
    permission: string
    children?: Array<IMenuForm>
}

export interface IRouterMenu{
    id: number
    name: string
    path: string
    redirect?: string
    component: any
    meta: {
        icon?: string
        hidden: boolean
    }
    children?: Array<IRouterMenu>
}

export namespace IMenuList {
    export interface RequestForm extends Page.RequestForm {
        name?: string
    }
    export interface ResponseData extends Page.ResponseData<IMenuForm>, IMenuForm {

    }
}