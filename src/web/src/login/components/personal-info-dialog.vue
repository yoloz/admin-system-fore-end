<script lang="ts" setup>

import { storeToRefs } from 'pinia'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
// import { validateMobile, validateEmail } from '@ued/utils/src/validate'

import { useUserStore } from '@/stores/userStore'
import { updateUser } from '@/users/services/userServices'
import { IUserForm } from '@/users/entity/user'

const { getLoginUser } = storeToRefs(useUserStore())
const { setLoginUser } = useUserStore()
// const emit = defineEmits(['on-refresh'])
const dialog = ref(false)
const userFormRef = ref()
const loading = ref(false)
const userForm = reactive<IUserForm>({
    username: ''
})
const infoRules = reactive<FormRules>({
    // phone: [{ validator: validateMobile }],
    // email: [{ validator: validateEmail, message: '电子邮箱格式不正确', trigger: 'blur' }],
    nickname: [{ required: true, pattern: '[^ \x22]+', message: '请输入用户昵称', trigger: 'blur' }]
})

const submit = (formEl: FormInstance) => {
    if (!formEl) return
    formEl.validate((valid: any) => {
        if (valid) {
            loading.value = true
            // The operand of a 'delete' operator must be optional in TS, so object attr need optional (like loginIp?: string)
            // delete userForm.roles
            delete userForm.loginIp
            delete userForm.loginTime

            updateUser(userForm).then((res) => {
                setLoginUser({
                    id: getLoginUser.value.id,
                    username: getLoginUser.value.username,
                    nickname: userForm.nickname || getLoginUser.value.username,
                    phone: userForm.phone || '',
                    email: userForm.email || '',
                    level: getLoginUser.value.level
                })
                ElMessage.success('更新成功')
                dialog.value = false
                loading.value = false
            }).catch(() => {})
        }
    })
}

const open = (info: IUserForm) => {
    userForm.id = info.id
    userForm.username = info.username
    userForm.nickname = info.nickname
    userForm.email = info.email
    userForm.phone = info.phone
    dialog.value = true
}
onMounted(() => {

})

const resetForm = (formEl: FormInstance) => {
    formEl.resetFields()
    // location.reload()
}

defineExpose({ open })

</script>
<template>
    <el-dialog v-model="dialog" title="个人信息" top="10vh" width="750px" :close-on-click-modal="false"
        @close="resetForm(userFormRef)">
        <custom-form-layout>
            <template #title>基本信息</template>
            <template #form>
                <el-form ref="userFormRef" label-position="top" :model="userForm" :rules="infoRules">
                    <el-row style="width:100%">
                        <el-col :span="12">
                            <el-form-item label="用户账号" prop="username">
                                <el-input v-model="userForm.username" maxlength="20" show-word-limit disabled />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="昵称" prop="nickname">
                                <el-input v-model="userForm.nickname" maxlength="20" show-word-limit placeholder="请输入" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="userForm.email" placeholder="请输入" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="手机号" prop="phone">
                                <el-input v-model="userForm.phone" placeholder="请输入" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </template>
        </custom-form-layout>
        <template #footer>
            <el-button type="primary" @click="submit(userFormRef)" :loading="loading">更新</el-button>
            <el-button @click="dialog = false">取消</el-button>
        </template>
    </el-dialog>
</template>
<style scoped lang="scss">
.avatar-uploader .avatar {
    width: 78px;
    height: 78px;
    display: block;
    border-color: gray;

}

:deep(.el-icon.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    margin-left: 20px;
    border: 1px dashed rgb(204, 206, 204);
    width: 78px;
    height: 78px;
    text-align: center;
}
</style>