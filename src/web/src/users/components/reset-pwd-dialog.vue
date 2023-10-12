<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage, FormRules, FormInstance } from 'element-plus'
import { Md5 } from 'ts-md5'
import { validatePassword } from '@ued/utils/src/validate'

import { IUserForm } from '../entity/user'
import { resetPwd } from '../services/userServices'

const dialog = ref(false)

const pwdFormRef = ref()
const loading = ref(false)
const emit = defineEmits(['refresh-table'])
type formType = {
    password: string
    id: number | undefined
    username?: string
}
const passwordForm = reactive<formType>({ password: '', id: undefined, username: '' })

const infoRules = reactive<FormRules>({
    password: [{ required: true, message: '请输入新密码', trigger: 'blur' }, { validator: validatePassword, trigger: ['blur'] }]

})

const submit = (formEl: FormInstance) => {
    if (!formEl) return
    formEl.validate((valid: any) => {
        if (valid) {
            delete passwordForm.username
            loading.value = true
            const md5: any = new Md5()
            const pwd = md5.appendAsciiStr(passwordForm.password).end()
            resetPwd({ ...passwordForm, password: pwd }).then(res => {
                ElMessage.success('修改成功')
                loading.value = false
                dialog.value = false
                emit('refresh-table')
                loading.value = false
            })
        }
    })
}
const resetForm = () => {
    pwdFormRef.value.resetFields()
}
const open = (data: IUserForm) => {
    passwordForm.password = ''
    passwordForm.id = data.id!
    passwordForm.username = data.username!
    dialog.value = true
}

defineExpose({ open })
</script>
<template>
    <el-dialog v-model="dialog" title="重置密码" top="10vh" width="750px" @closed="resetForm" :close-on-click-modal="false">
        <custom-form-layout>
            <template #title>基本信息</template>
            <template #form>
                <el-form ref="pwdFormRef" label-position="top" :model="passwordForm" label-width="120px" :rules="infoRules">
                    <el-row style="width:100%">
                        <el-col :span="12">
                            <el-form-item label="用户账号">
                                <el-input v-model="passwordForm.username" disabled maxlength="26" show-word-limit />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="新密码" prop="password">
                                <el-input v-model.trim="passwordForm.password" maxlength="16" show-word-limit show-password
                                    type="password" placeholder="请输入" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </template>
        </custom-form-layout>
        <template #footer>
            <el-button type="primary" @click="submit(pwdFormRef)" :loading="loading">确定</el-button>
            <el-button @click="dialog = false">取消</el-button>
        </template>
    </el-dialog>
</template>