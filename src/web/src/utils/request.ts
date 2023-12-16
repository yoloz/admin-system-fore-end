import { HttpRequest } from '@ued/request'
import { ElMessage } from 'element-plus'

import router from '../router'

const httpRequest = new HttpRequest()

// axios基准路径,mock直接当前路径，即VITE_BASE_URL===''，在配置文件.env.development中配置
httpRequest.instance.defaults.baseURL = import.meta.env.VITE_BASE_URL
httpRequest.instance.defaults.timeout = 10000

httpRequest.instance.interceptors.request.use(
    (config: any) => {
        config.headers.accept = '*/*'
        // 长时间闲置登录会携带过期token导致登录一直失败，去除登录携带token
        if (config.url !== '/login') {
            config.headers.authorization = localStorage.getItem('authorization')
        }
        return config
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

httpRequest.instance.interceptors.response.use(
    (result: any) => {
        const status = result.status
        const contentType = result.headers['content-type']
        if (contentType === 'multipart/from-data') {
            if (result.data) {
                return result.data
            } else {
                ElMessage({ type: 'error', message: '下载文件失败' })
                return Promise.reject(result.msg)
            }
        } else {
            const code = result.data.code
            if (status === 200 && code === 200) {
                return result.data
            } else if (status === 200 && code === 500) {
                ElMessage({ type: 'error', message: result.data.msg })
                return Promise.reject(result.msg)
            } else if (status === 201) {
                ElMessage({ type: 'error', message: '认证错误或会话超时,请重新登陆' })
                setTimeout(() => {
                    router.replace('/login')
                }, 100)
                return Promise.reject(new Error('认证错误或会话超时,请重新登陆'))
            } else if (status === 202) {
                ElMessage({ type: 'error', message: '无权限操作,请联系管理员' })
                return Promise.reject(new Error('无权限操作,请联系管理员'))
            } else {
            // eslint-disable-next-line no-console
            // console.warn('success', result)
                ElMessage({ type: 'error', message: '系统异常' })
                return Promise.reject(new Error('系统异常'))
            }
        }
    },
    (error: any) => {
        // eslint-disable-next-line no-console
        // console.warn('error', error)
        // const msg = error.response.data
        switch (error.code) {
            case 'ECONNABORTED':
                ElMessage({ type: 'error', message: '系统连接超时,请稍后重试' })
                return Promise.reject(new Error('系统连接超时,请稍后重试'))
            case 'ERR_BAD_RESPONSE':
                ElMessage({ type: 'error', message: '系统响应错误,请确认请求是否准确' })
                return Promise.reject(new Error('系统响应错误,请确认请求是否准确'))
            case 'ERR_BAD_REQUEST':
                ElMessage({ type: 'error', message: '系统拒绝请求,请确认是否有操作权限' })
                return Promise.reject(new Error('系统拒绝请求,请确认是否有操作权限'))
            default:
                ElMessage({ type: 'error', message: '系统异常' })
                return Promise.reject(new Error('系统异常'))
        }
    }
)

export default httpRequest