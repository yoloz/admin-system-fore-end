<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { Md5 } from 'ts-md5'
import { useRouter } from 'vue-router'
import { validatePassword } from '@ued/utils/src/validate'

import { updatePwd } from '@/users/services/userServices'
import { IPwd, IUserForm } from '@/users/entity/user'
const dialog = ref(false)
const userFormRef = ref()
const loading = ref(false)
const confirmPasswordRules = (rule: any, value: any, callback: any): void => {
    if (value === '') {
        callback(new Error('请确认密码'))
    } else if (value !== form.newPassword) {
        callback(new Error('两次密码不一致，请重新输入'))
    } else {
        callback()
    }
}

const form = reactive<IPwd>({
    username: '', // 用户账号
    oldPassword: '', // 旧密码
    newPassword: '', // 新密码
    confirmPwd: '' // 确认密码

})
const param = reactive<IPwd>({
    username: '',
    oldPassword: '', // 旧密码
    newPassword: '' // 新密码

})

const infoRules = reactive<FormRules>({
    oldPassword: [
        { required: true, pattern: '[^ \x22]+', message: '旧密码不能为空', trigger: ['blur'] },
        { validator: validatePassword, trigger: ['blur'] }
    ],
    newPassword: [
        { required: true, pattern: '[^ \x22]+', message: '新密码不能为空', trigger: ['blur'] },
        { validator: validatePassword, trigger: ['blur'] }
    ],
    confirmPwd: [
        { required: true, pattern: '[^ \x22]+', message: '确认新密码不能为空', trigger: ['blur'] },
        { validator: confirmPasswordRules, trigger: 'blur' }
    ]
})

const router = useRouter()
const submit = (formEl: FormInstance) => {
    if (!formEl) return
    formEl.validate((valid: any) => {
        if (valid) {
            const md51: any = new Md5()
            const md52: any = new Md5()

            param.username = form.username
            param.oldPassword = md51.appendStr(form.oldPassword).end()
            param.newPassword = md52.appendStr(form.newPassword).end()

            updatePwd(param).then((res) => {
                dialog.value = false
                ElMessage.success('修改成功')
                router.replace('/login')
            })
        }
    })
}

const resetForm = (formEl: FormInstance) => formEl.resetFields()

const open = (info: IUserForm) => {
    form.username = info.username
    dialog.value = true
}

defineExpose({ open })

</script>
<template>
    <el-dialog v-model="dialog" title="修改密码" top="10vh" width="750px" :close-on-click-modal="false"
        @close="resetForm(userFormRef)">

        <custom-form-layout>
            <template #title>基本信息</template>
            <template #form>
                <el-form ref="userFormRef" label-position="top" :model="form" :rules="infoRules">
                    <el-row style="width:100%">
                        <el-col :span="12">
                            <el-form-item label="用户账号" prop="username">
                                <el-input v-model="form.username" disabled placeholder="请输入" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="当前密码" prop="oldPassword">
                                <el-input show-password autocomplete="new-password" v-model="form.oldPassword"
                                    placeholder="请输入" type="password" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="新密码" prop="newPassword">
                                <el-input show-password v-model="form.newPassword" placeholder="请输入" type="password" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="确认密码" prop="confirmPwd">
                                <el-input show-password v-model="form.confirmPwd" placeholder="请输入" type="password" />
                            </el-form-item>
                        </el-col>

                    </el-row>
                </el-form>
            </template>
        </custom-form-layout>
        <template #footer>
            <el-button type="primary" @click="submit(userFormRef)" :loading="loading">确定</el-button>
            <el-button @click="dialog = false">取消</el-button>
        </template>
    </el-dialog>
</template>
<style scoped lang="scss"></style>