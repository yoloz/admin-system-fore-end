import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/login',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: {
                    token: 'test'
                }
            }
        }
    },
    {
        url: '/logout',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: {
                }
            }
        }
    },
    {
        url: '/captchaImage',
        method: 'post',
        response: () => {
            return {
                code: 200,
                data: {
                    uuid: '12345',
                    image: ''
                }
            }
        }
    }
] as MockMethod[]