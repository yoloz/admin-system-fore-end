<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { Md5 } from 'ts-md5'
import { validateMobile, validateEmail, validatePassword } from '@ued/utils/src/validate'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/userStore'
import { IRoleForm } from '@/roles/entity/role'
import { getRoleOptionByUser } from '@/roles/services/roleServices'

import { IUserForm } from '../entity/user'
import { createUser, updateUser } from '../services/userServices'

const { getLoginUser } = storeToRefs(useUserStore())

const dialog = ref(false)
const userFormRef = ref()
const disabled = ref()
const mode = ref('add')
const loading = ref(false)

const emit = defineEmits(['refresh-table'])
const userForm = reactive<IUserForm>({
    username: '',
    nickname: '',
    enable: true
})

const infoRules = reactive<FormRules>({
    username: [{ required: true, pattern: '[^ \x22]+', message: '用户账号不能为空', trigger: 'blur' }],
    nickname: [{ required: true, pattern: '[^ \x22]+', message: '用户昵称不能为空', trigger: 'blur' }],
    roleIds: [{ required: true, type: 'array', message: '用户角色不能为空', trigger: 'change' }],
    password: [{ required: true, message: '登录密码不能为空', trigger: 'blur' }, { validator: validatePassword, trigger: ['blur'] }],
    phone: [{ validator: validateMobile }],
    email: [{ validator: validateEmail }]

})

const submit = (formEl: FormInstance) => {
    if (!formEl) return
    formEl.validate((valid: any) => {
        if (valid) {
            loading.value = true
            const md5: any = new Md5()
            if (mode.value === 'add') {
                delete userForm.id
                md5.appendStr(userForm.password)
                createUser({ ...userForm, password: md5.end() }).then(res => {
                    ElMessage.success('添加成功')
                    loading.value = false
                    emit('refresh-table')
                    loading.value = false
                })
            } else {
                updateUser({ ...userForm }).then(res => {
                    ElMessage.success('修改成功')
                    loading.value = false
                    emit('refresh-table')
                    loading.value = false
                })
            }
            loading.value = false
            dialog.value = false
        }
    })
}
const resetForm = (formEl: FormInstance) => formEl.resetFields()
const roleOptions = ref<Array<any>>([])
const initRoleOption = (id: any, roles: any) => {
    if (mode.value === 'add') {
        getRoleOptionByUser(id || getLoginUser.value.id).then((res: any) => {
            roleOptions.value = []
            res.data.forEach((item: IRoleForm) => {
                roleOptions.value.push({
                    label: item.name,
                    id: item.id
                })
            })
        })
    } else {
        roleOptions.value = []
        roles.forEach((item: any) => {
            roleOptions.value.push({
                label: item.name,
                id: item.id
            })
        })
    }
}
const open = (type: 'add' | 'edit', data: IUserForm) => {
    dialog.value = true
    mode.value = type
    if (type === 'edit') {
        initRoleOption(data.id, data.roles)
        disabled.value = true
        userForm.id = data.id // 用户id
        userForm.username = data.username // 用户账号
        const roleIds = data.roles?.map((el: any) => el.id)
        userForm.roleIds = roleIds
        userForm.password = data.password // 用户密码
        userForm.nickname = data.nickname // 用户昵称
        userForm.phone = data.phone // 手机号
        userForm.email = data.email
    } else {
        initRoleOption(null, null)
        disabled.value = false
        userForm.username = '' // 用户账号
        userForm.roleIds = []
        userForm.password = ''// 用户密码
        userForm.nickname = ''// 用户昵称
        userForm.phone = undefined // 手机号
        userForm.email = ''
    }
}
defineExpose({ open })

</script>
<template>
    <el-dialog v-model="dialog" :title="`${mode === 'add' ? '新增' : '编辑'}用户`" top="10vh" width="750px"
        :close-on-click-modal="false" @close="resetForm(userFormRef)">
        <custom-form-layout>
            <template #title>基本信息</template>
            <template #form>
                <el-form ref="userFormRef" label-position="top" :model="userForm" :rules="infoRules">
                    <el-row style="width:100%">
                        <el-col :span="12">
                            <el-form-item label="用户账号" prop="username">
                                <el-input v-model="userForm.username" maxlength="20" show-word-limit placeholder="请输入"
                                    :disabled="disabled" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="用户昵称" prop="nickname">
                                <el-input v-model="userForm.nickname" maxlength="20" show-word-limit placeholder="请输入" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="mode !== 'edit'">
                            <el-form-item label="登录密码" prop="password">
                                <el-input show-password autocomplete="new-password" maxlength="16" show-word-limit
                                    v-model.trim="userForm.password" placeholder="请输入" type="password"
                                    :disabled="mode === 'edit'" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="用户角色" prop="roleIds">
                                <el-select v-model="userForm.roleIds" multiple placeholder="请选择" collapse-tags
                                    :disabled="disabled" multiple-limit="4" collapse-tags-tooltip>
                                    <el-option v-for="item in roleOptions" :label="item.label" :value="item.id"
                                        :key="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="手机号码" prop="phone">
                                <el-input v-model.trim="userForm.phone" placeholder="请输入" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="电子邮箱" prop="email">
                                <el-input v-model.trim="userForm.email" placeholder="请输入" />
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