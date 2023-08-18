import httpRequest from '@/utils/request'

import { ILogin } from '../entity'

// 登录
export const login = (param: ILogin.RequestForm) => {
    return httpRequest.post<ILogin.ResponseData>('/login', param)
}
// 退出登录
export const logout = () => {
    return httpRequest.post('/logout')
}
// 获取验证码
export const getCaptchaImage = () => {
    return httpRequest.get('/captchaImage')
}