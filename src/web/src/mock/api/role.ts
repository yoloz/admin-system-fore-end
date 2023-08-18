import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

import { userlist } from './user'

export const roleoptions = [
    { roleId: 1, roleName: '管理员' },
    { roleId: 2, roleName: '操作员' },
    { roleId: 3, roleName: '安全员' }
]

export const rolelist = Mock.mock({
    totalRow: 100,
    'records|10': [
        {
            'roleId|+1': 1,
            'roleName|1': ['管理员',
                '操作员',
                '安全员',
                '普通'],
            'admin|1': ['init', null],
            remark: Mock.Random.cparagraph(),
            createTime: Mock.Random.date('yyyy-MM-dd'),
            updateTime: Mock.Random.date('yyyy-MM-dd')
        }
    ]
})

export default [
    {
        url: '/role/list',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: rolelist
            }
        }
    },
    {
        url: '/role/userList',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: userlist
            }
        }
    }
] as MockMethod[]