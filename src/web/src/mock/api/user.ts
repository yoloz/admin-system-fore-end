import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

import { roleoptions } from './role'

export const userlist = Mock.mock({
    totalRow: 100,
    'records|15': [
        {
            'id|+1': 1,
            username: '@cname',
            phone: /^1(3|4|5|6|7|8|9)[0-9]\d{8}$/,
            email: '@email',
            nickname: '@cname',
            'builtin|1': [true, false],
            'enable|1': [true, false],
            loginIp: Mock.Random.ip(),
            loginTime: Mock.Random.date('yyyy-MM-dd'),
            createTime: Mock.Random.date('yyyy-MM-dd'),
            updateTime: Mock.Random.date('yyyy-MM-dd')
        }
    ]
})

export default [
    {
        url: '/user/list',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: userlist
            }
        }
    },
    {
        url: '/user/getInfo',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: {
                    user: {
                        'id|+1': 1,
                        username: '@cname',
                        phone: /^1(3|4|5|6|7|8|9)[0-9]\d{8}$/,
                        email: '@email',
                        nickname: '@cname',
                        roles: roleoptions,
                        loginIp: Mock.Random.ip(),
                        loginTime: Mock.Random.date('yyyy-MM-dd')
                    }
                }
            }
        }
    }
] as MockMethod[]