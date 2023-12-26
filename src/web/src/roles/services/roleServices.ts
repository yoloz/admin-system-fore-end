import httpRequest from '@/utils/request'
import { IRoleForm, IRoleList, IRoleMenuRelation, IRoleUserRelation, IRoleUserRelationList } from '@/roles/entity/role'

// 获取角色列表
export const queryRoleList = (params: IRoleList.RequestForm) => {
    return httpRequest.post<IRoleList.ResponseData>('/role/list', params)
}
// 新增角色
export const createRole = (form: IRoleForm) => {
    return httpRequest.post('/role/add', form)
}
// 编辑角色
export const updateRole = (form: IRoleForm) => {
    return httpRequest.post('/role/edit', form)
}
// 删除角色
export const removeRole = (roleIds: number[]) => {
    return httpRequest.post('/role/delete', roleIds)
}
// 获取角色下拉菜单,仅拉取此用户可配置的角色[{id:"",name:""}...]
export const getRoleOptionByUser = (userId: number) => {
    return httpRequest.post<IRoleList.ResponseData>('/role/optionByUser', userId)
}
// 获取当前角色授权菜单
export const getMenuByRole = (params: IRoleMenuRelation) => {
    return httpRequest.post('/roleMenuRel/getMenuByRole', params)
}
// 编辑角色权限
export const updateRoleMenu = (params: IRoleMenuRelation) => {
    return httpRequest.post('/roleMenuRel/updateRoleMenu', params)
}
// 获取角色相关用户
export const getUserByRole = (params: IRoleUserRelation) => {
    return httpRequest.post<IRoleUserRelationList.ResponseData>('/roleUserRel/getUserByRole', params)
}
// 移除角色相关用户
export const delRoleUserRelation = (params: IRoleUserRelation) => {
    return httpRequest.post('/roleUserRel/userRemove', params)
}