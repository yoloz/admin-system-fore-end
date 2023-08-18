export namespace ILogin {
  // 入参
  export interface RequestForm {
    // 用户名
    username: string
    // 密码
    password: string
    // 验证码
    code: string
    // uuid
    uuid: string
  }
  // 出参
  export interface ResponseData {
    token: string
    permissions?: Array<String>
  }
}