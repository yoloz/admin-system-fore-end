
/**
 * 正则校验-URL
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export const validateUrl = (rule: any, value: any, callback: any) => {
    const rex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'*+,;=.]+$/
    if (value !== '') {
        if (!rex.test(value)) {
            callback(new Error('请输入正确的URL'))
        } else {
            callback()
        }
    } else {
        callback(new Error('URL不能为空'))
    }
}
/**
* 正则校验-手机号
* @param {*} rule
* @param {*} value
* @param {*} callback
*/
export const validateMobile = (rule: any, value: any, callback: any) => {
    const rex = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if (value !== '' && value !== null) {
        if (!rex.test(value)) {
            callback(new Error('请输入正确的手机号'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}
/**
* 正则校验-非法字符校验
* @param {*} rule
* @param {*} value
* @param {*} callback
*/
export const validateStrValue = (rule: any, value: any, callback: any) => {
    const rex = /^[-()（）\u4e00-\u9fa5_a-zA-Z0-9]+$/
    if (!rex.test(value)) {
        callback(new Error('禁止输入非法字符,如：！@#￥%^……等'))
    } else {
        callback()
    }
}
/**
* 正则校验-姓名校验
* @param {*} rule
* @param {*} value
* @param {*} callback
*/
export const validateName = (rule: any, value: any, callback: any) => {
    const rex = /^[a-zA-Z0-9@.-_\u4e00-\u9fa5]{1,20}$/
    if (!rex.test(value)) {
        callback(new Error('支持1-20位中文、英文、数字、特殊符号(._@)'))
    } else {
        callback()
    }
}
/**
* 正则校验-密码校验
* @param {*} rule
* @param {*} value
* @param {*} callback
*/
export const validatePassword = (rule: any, value: any, callback: any) => {
    const rex = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{6,16}$/
    if (!rex.test(value)) {
        callback(new Error('密码必须包含大小写字母、数字，长度在6-16位'))
    } else {
        callback()
    }
}
/**
* 正则校验-IP校验
* @param {*} rule
* @param {*} value
* @param {*} callback
*/
export const validateIp = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback()
    } else {
        const rex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/
        if (!rex.test(value)) {
            callback(new Error('非法格式，请输入正确格式！'))
        } else {
            callback()
        }
    }
}
/**
*
* @param rule
* @param value
* @param callback
*/
export const validateInt = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback()
    } else {
        const rex = /^\d+$/
        if (!rex.test(value)) {
            callback(new Error('只能输入正整数'))
        } else {
            callback()
        }
    }
}
/**
* 正则校验-学号/教职工编号
* @param {*} rule
* @param {*} value
* @param {*} callback
*/
export const validateCode = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback()
    } else {
        const rex = /[a-zA-Z0-9]+$/
        if (!rex.test(value)) {
            callback(new Error('格式为6-20位纯数字/纯字母/字母加数字。'))
        } else {
            callback()
        }
    }
}

/**
* 正则校验-课程名称唯一
* @param {*} rule
* @param {*} value
* @param {*} callback
*/
export const validateCourseName = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback()
    } else {
        const rex = /[a-zA-Z0-9]+$/
        if (!rex.test(value)) {
            callback(new Error('格式为6-20位纯数字/纯字母/字母加数字。'))
        } else {
            callback()
        }
    }
}
/**
* 正则校验-镜像路径
* @param {*} rule
* @param {*} value
* @param {*} callback
*/
export const validateMirrorPath = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback()
    } else {
        const rex = /[a-zA-z]+:\/\/[^\s]*/
        if (!rex.test(value)) {
            callback(new Error('请输入正确镜像路径'))
        } else {
            callback()
        }
    }
}
/**
 * 检验邮箱地址
 * @param _rule
 * @param value
 * @param callback
 * @returns
 */
export const validateEmail = (_rule: any, value: any, callback: any) => {
    if (!value) {
        callback()
    } else {
        const rex = /^([0-9A-Za-z\-_/.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
        if (!rex.test(value)) {
            return callback(new Error('请输入合法的邮箱地址'))
        } else {
            return callback()
        }
    }
}