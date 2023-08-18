import { Page } from '@/entity/page'
import { IBaseEntity } from '@/entity/base'

// 异常信息通过请求查询
export interface ILog extends IBaseEntity {
    id: number
    username: string // 用户
    annotation: string // 功能
    method: string
    params?: string
    requestIp: string
    address: string
    browser: string
    costTime: number
    exception?: string
}

export namespace ILogList {
    export interface RequestForm extends Page.RequestForm {
        username?: string
        requestIp?: string
        beginTime?: string
        endTime?: string
        logType?: string
    }
    export interface ResponseData extends Page.ResponseData<ILog>, ILog {

    }
}
