<script lang="ts" setup>
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { nextTick, reactive, ref } from 'vue'

import { IRoleForm } from '../entity/role'
import { createRole, updateRole } from '../services/roleServices'
// 表单
const roleFormRef = ref<FormInstance>()
const roleForm = reactive<IRoleForm>({
    name: '',
    level: 1
})
const roleRules = reactive<FormRules>({
    name: [
        {
            required: true,
            pattern: '[^ \x22]+',
            message: '角色名称不能为空',
            trigger: 'blur'
        }
    ],
    level: [{ required: true, message: '级别不能为空', trigger: 'blur' }]
})
// 提交
type Emit = { (e: 'update-table'): void };
const emit = defineEmits<Emit>()
const loading = ref<boolean>(false)
const submit = (formRef: FormInstance | undefined) => {
    if (!formRef) return
    formRef.validate((valid) => {
        if (valid) {
            loading.value = true
            if (dialogType.value === 'add') {
                createRole(roleForm)
                    .then((res) => {
                        ElMessage.success('创建成功')
                        dialog.value = false
                        emit('update-table')
                    })
                    .catch(() => {
                        dialog.value = false
                    })
            }
            if (dialogType.value === 'edit') {
                roleForm.id = roleId.value
                updateRole(roleForm)
                    .then((res) => {
                        ElMessage.success('修改成功')
                        dialog.value = false
                        emit('update-table')
                    })
                    .catch(() => {
                        dialog.value = false
                    })
            }
            loading.value = false
        }
    })
}
// 打开弹窗
const dialog = ref<boolean>(false)
const title = ref<string>('新建')
interface ITableData {
  type: string;
  row: any;
}
const roleId = ref<number>(0)
const roleLevel = ref<number>(1)
const dialogType = ref<string>('add')
const open = ({ type, row }: ITableData) => {
    dialog.value = true
    nextTick(() => {
        dialogType.value = type

        if (type === 'add') title.value = '新建'
        if (type === 'edit') {
            title.value = '编辑'
            roleId.value = row.id
            roleLevel.value = row.level
            roleForm.name = row.name
            roleForm.desc = row.desc
        }
    })
}
// 关闭弹窗
const closed = () => {
    if (!roleFormRef.value) return
    roleFormRef.value.resetFields()
}
defineExpose({ open })
</script>
<template>
  <el-dialog
    v-model="dialog"
    :title="`${title}角色`"
    @close="closed"
    width="550px"
    :close-on-click-modal="false"
  >
    <custom-form-layout>
      <template #title>基本信息</template>
      <template #form>
        <el-form
          ref="roleFormRef"
          :model="roleForm"
          :rules="roleRules"
          label-position="top"
        >
          <el-row style="width: 100%">
            <el-col :span="24">
              <el-form-item label="名称" prop="name">
                <el-input
                  v-model="roleForm.name"
                  placeholder="请输入角色名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="级别" prop="level">
                <el-input-number
                  v-model="roleForm.level"
                  :min="roleLevel"
                  controls-position="right"
                />
                <span style="color: #c0c0c0; font-size: 13px"
                  >数值越小级别越大</span
                >
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="描述" prop="desc">
                <el-input
                  v-model="roleForm.desc"
                  placeholder="请输入描述信息"
                  show-word-limit
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 2 }"
                  maxlength="64"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </custom-form-layout>
    <template #footer>
      <el-button type="primary" @click="submit(roleFormRef)" :loading="loading"
        >保存</el-button
      >
      <el-button @click="dialog = false">取消</el-button>
    </template>
  </el-dialog>
</template>
