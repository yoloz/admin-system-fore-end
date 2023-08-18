import httpRequest from '@/utils/request'
// import { mockMenu } from '@/mock/mockMenu'

import { IMenuForm, IMenuList } from '../entity/menu'

// 查询菜单列表
export const getMenuList = (params: IMenuList.RequestForm) => {
    return httpRequest.post<IMenuList.ResponseData>('/menu/list', params)
}
// 新增菜单
export const createMenu = (form: IMenuForm) => {
    return httpRequest.post('/menu/add', form)
}
// 编辑菜单
export const updateMenu = (form: IMenuForm) => {
    return httpRequest.post('/menu/edit', form)
}
// 删除菜单
export const removeMenu = (ids: number[]) => {
    return httpRequest.post('/menu/delete', { ids })
}
// 展示可选择的菜单，除掉按钮
export const getSelectOptions = () => {
    return httpRequest.get<IMenuList.ResponseData>('/menu/sOptions')
}
// 查询路由菜单
export const getRouterMenus = (userId: number) => {
    // return new Promise((resolve, reject) => {
    //     resolve(mockMenu)
    // })
    return httpRequest.post('/menu/getRouterMenus', userId)
}
// 导入数据
export const importData = (params: any) => {
    return httpRequest.upload('/menu/import', params)
}
// 导出所有数据
export const exportData = (params: IMenuList.RequestForm) => {
    return httpRequest.download('/menu/export', params)
}
