import httpRequest from '@/utils/request'
import { IPwd, IUserForm, IUserList } from '@/users/entity/user'

/**
 * 获取用户列表接口
 * @param params
 * @returns
 */
export const queryUserList = (params: IUserList.RequestForm) => {
    return httpRequest.post<IUserList.ResponseData>('/user/list', params)
}

/**
 * 创建用户
 * @param form
 * @returns
 */
export const createUser = (form: IUserForm) => {
    return httpRequest.post('/user/add', form)
}
/**
 * 编辑用户
 * @param form
 * @returns
 */
export const updateUser = (form: IUserForm) => {
    return httpRequest.post('/user/edit', form)
}
/**
 * 删除用户
 * @param ids
 * @returns
 */
export const removeUser = (userIds: number[]) => {
    return httpRequest.post('/user/delete', userIds)
}
/**
 * 密码重置
 * @param params
 * @returns
 */
export const resetPwd = (params: any) => {
    return httpRequest.post('/user/resetPwd', params)
}
/**
 * 修改密码
 * @param params
 * @returns
 */
export const updatePwd = (param: IPwd) => {
    return httpRequest.post('/user/updatePwd', param)
}
/**
 * 停用  正常
 * @param params
 * @returns
 */
export const changeEnable = (params: any) => {
    return httpRequest.post('/user/changeEnable', params)
}

/**
 * 根据用户编号获取详细信息,如果编号为空则查询登陆用户
 * @param id
 * @returns
 */
export const getUserInfo = () => {
    return httpRequest.get('/user/userInfo')
}

/**
 * 用户授权角色
 * @param id
 * @returns
 */
export const authRole = (params: IUserForm) => {
    return httpRequest.post('/user/authRole', params)
}
/**
 * 导入数据
 * @param
 * @returns
 */
export const importData = (params: any) => {
    return httpRequest.upload('/user/importData', params)
}
/**
 * 导出所有数据
 * @param
 * @returns
 */
export const exportData = (params: IUserList.RequestForm) => {
    return httpRequest.download('/user/export', params)
}