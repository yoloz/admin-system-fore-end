<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { FormInstance, FormRules } from 'element-plus'
import { Md5 } from 'ts-md5'

import router from '@/router'
import { useUserStore } from '@/stores/userStore'
import { useSystemStore } from '@/stores/systemStore'

import { ILogin } from './entity'
import { getCaptchaImage, login } from './services/loginService'

const { getSystemInfo } = storeToRefs(useSystemStore())
const { setLoginUser } = useUserStore()

const loginRef = ref<FormInstance>()
const loginForm = reactive<ILogin.RequestForm>({
    username: '',
    password: '',
    code: '',
    uuid: ''
})
const loginRules = reactive<FormRules>({
    username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})
// 获取验证码
const captchaImage = ref('')
const onloadCaptchaImage = (): void => {
    getCaptchaImage().then((res: any) => {
        loginForm.uuid = res.data.uuid
        captchaImage.value = res.data.image
    })
}
const loading = ref<boolean>(false)
const loginSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(valid => {
        if (valid) {
            const md5: any = new Md5()
            const pwd = md5.appendStr(loginForm.password).end()
            loading.value = true
            login({ ...loginForm, password: pwd }).then((res: any) => {
                setTimeout(() => {
                    localStorage.setItem('authorization', res.data.token)
                    setLoginUser({
                        id: res.data.userId
                    })
                    router.push('/')
                    loading.value = false
                }, 200)
            }).catch(() => {
                loading.value = false
                onloadCaptchaImage()
            })
        }
    })
}

onMounted(() => {
    onloadCaptchaImage()
})
</script>
<template>
    <div class="login">
        <div class="login-main">
            <div class="login-main-left">
                <img class="logo" :src="getSystemInfo.path" alt="">
            </div>
            <div class="login-main-form">
                <div class="form">
                    <h1 class="title">{{ getSystemInfo.name }}</h1>
                    <el-form ref="loginRef" status-icon :model="loginForm" :rules="loginRules">
                        <el-form-item prop="username">
                            <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-input v-model="loginForm.code" @keyup.enter.native="loginSubmit(loginRef)"
                                style="width:226px" placeholder="请输入验证码"></el-input>
                            <img class="code" :src="captchaImage" alt="" @click="onloadCaptchaImage">
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" :loading="loading" style="width:100%;height:44px;"
                        @click="loginSubmit(loginRef)">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    background-image: url(./resources/bg.png);
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &-main {
        width: 1400px;
        height: 640px;
        display: flex;

        &-left {
            width: 700px;
            height: 100%;
            background-image: url(./resources/form-left.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: relative;

            .logo {
                height: 80px;
                position: absolute;
                left: 30px;
                top: 40px;
            }
        }

        &-form {
            width: 700px;
            height: 100%;
            background-color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;

            .form {
                width: 380px;

                h1 {
                    color: #30384F;
                    font-family: 'Alibaba PuHuiTi';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 32.1951px;
                    line-height: 43px;
                    margin-bottom: 40px;
                }

                :deep(.el-form) {
                    .el-input__wrapper {
                        height: 44px;
                        font-size: 14px;
                        padding-left: 20px;
                    }
                }

                .code {
                    margin-left: 14px;
                    width: 140px;
                    height: 44px;
                }
            }
        }
    }
}
</style>