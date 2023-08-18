import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

export const loglist = Mock.mock({
    totalRow: 100,
    'records|15': [
        {
            'operId|+1': 1,
            'title|1': ['基础信息', '后勤管理', '演练管理', '系统管理'],
            'businessType|1': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            operName: Mock.Random.name(),
            operUrl: Mock.Random.domain(),
            'status|1': [0, 1],
            requestMethod: Mock.Random.string(),
            operIp: Mock.Random.ip(),
            operLocation: Mock.Random.city(),
            operTime: Mock.Random.date('yyyy-MM-dd'),
            costTime: Mock.Random.natural()
        }
    ]
})

export default [
    {
        url: '/logs/list',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: loglist
            }
        }
    }
] as MockMethod[]