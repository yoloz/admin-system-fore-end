import httpRequest from '@/utils/request'

import { ILogList } from '../entity/log'

// 查询正常日志
export const getRightLogList = (params: ILogList.RequestForm) => {
    params.logType = 'right'
    return httpRequest.post<ILogList.ResponseData>('/log/list', params)
}
// 查询异常日志
export const getErrorLogList = (params: ILogList.RequestForm) => {
    params.logType = 'error'
    return httpRequest.post<ILogList.ResponseData>('/log/list', params)
}
// 读取异常详情
export const getException = (id: number) => {
    return httpRequest.post('/log/exception', { id })
}
// 删除日志
export const delLog = (ids: number[]) => {
    return httpRequest.post('/log/delete', ids)
}
// 导出日志
export const exportLog = (params: ILogList.RequestForm) => {
    return httpRequest.download('/log/export', params)
}
