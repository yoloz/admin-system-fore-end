<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage, FormRules, FormInstance } from 'element-plus'

import { getRoleOptionByUser } from '@/roles/services/roleServices'

import { authRole } from '../services/userServices'
import { IUserForm } from '../entity/user'

const dialog = ref(false)
const roleList = ref<Array<any>>([])
const roleFormRef = ref()
const loading = ref(false)
const emit = defineEmits(['refresh-table'])

const userForm = reactive<IUserForm>({ username: '' })

const infoRules = reactive<FormRules>({
    roleIds: [{ required: true, message: '请选择用户角色', trigger: 'change' }]
})

const initRoleList = (userId: number) => {
    getRoleOptionByUser(userId).then((res: any) => {
        roleList.value = []
        res.data.forEach((item: any) => {
            roleList.value.push({
                label: item.name,
                id: item.id
            })
        })
    })
}

const submit = (formEl: FormInstance) => {
    if (!formEl) return
    formEl.validate((valid: any) => {
        if (valid) {
            loading.value = true
            authRole(userForm).then(res => {
                ElMessage.success('修改成功')
                dialog.value = false
                loading.value = false
                emit('refresh-table')
                loading.value = false
            })
        }
    })
}

const resetForm = () => {
    roleFormRef.value.resetFields()
}

const open = (data: IUserForm) => {
    initRoleList(data.id!)
    userForm.roleIds = data.roles!.map((item: any) => item.id)
    userForm.id = data.id!
    userForm.username = data.username!
    dialog.value = true
}

defineExpose({ open })

</script>
<template>
    <el-dialog v-model="dialog" title="分配角色" top="10vh" width="750px" @closed="resetForm" :close-on-click-modal="false">
        <custom-form-layout>
            <template #title>基本信息</template>
            <template #form>
                <el-form ref="roleFormRef" label-position="top" :model="userForm" label-width="120px" :rules="infoRules">
                    <el-row style="width:100%">
                        <el-col :span="12">
                            <el-form-item label="用户账号">
                                <el-input v-model="userForm.username" disabled maxlength="26" show-word-limit />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="用户角色" prop="roleIds">
                                <el-select v-model="userForm.roleIds" multiple placeholder="请选择" collapse-tags
                                    multiple-limit="4" collapse-tags-tooltip>
                                    <el-option v-for="item in roleList" :label="item.label" :value="item.id"
                                        :key="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </template>
        </custom-form-layout>
        <template #footer>
            <el-button type="primary" @click="submit(roleFormRef)" :loading="loading">确定</el-button>
            <el-button @click="dialog = false">取消</el-button>
        </template>
    </el-dialog>
</template>