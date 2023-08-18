<script lang="ts" setup>
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { nextTick, reactive, ref, toRaw } from 'vue'

import IconSelect from './icon-list-view.vue'

import { iconfonts } from '../entity/iconfonts'
import { getSelectOptions, createMenu, updateMenu } from '../services/menuServices'
import { IMenuForm } from '../entity/menu'

// 打开弹窗
const dialog = ref<boolean>(false)
// 表单
const menuFormRef = ref<FormInstance>()
const menuForm = reactive<IMenuForm>({
    name: '',
    path: '',
    component: '',
    type: 0, // 0:目录 1:菜单 2:按钮
    hidden: false,
    order: 1,
    pid: 0,
    permission: '' // 权限标识，当权限动态改变时，页面未刷新，后端会据此判断是否有权限
})

const menuRules = reactive<FormRules>({
    type: [
        { required: true, message: '类型不能为空', trigger: 'blur' }
    ],
    name: [
        { required: true, pattern: '[^ \x22]+', message: '名称不能为空', trigger: 'blur' }
    ],
    hidden: [
        { required: true, message: '是否可见不能为空', trigger: 'blur' }
    ],
    path: [
        { required: true, pattern: '[^ \x22]+', message: '请求地址不能为空', trigger: 'blur' }
    ],
    order: [
        { required: true, message: '位置排序不能为空', trigger: 'blur' }
    ]
})
// 提交
type Emit = { (e: 'update-table'): void }
const emit = defineEmits<Emit>()
const loading = ref<boolean>(false)
const submit = (formRef: FormInstance | undefined) => {
    if (!formRef) return
    formRef.validate(valid => {
        if (valid) {
            if (menuForm.type !== 0) {
                if (!menuForm.permission || menuForm.permission.length === 0) {
                    ElMessage.warning('权限标识不能为空')
                    loading.value = false
                    return
                }
            }
            if (menuForm.type === 1) {
                if (!menuForm.component || menuForm.component.length === 0) {
                    ElMessage.warning('文件路径不能为空')
                    loading.value = false
                    return
                }
            }
            if (menuForm.pid === 0) {
                if (menuForm.path.indexOf('/') !== 0) {
                    menuForm.path = '/' + menuForm.path
                }
            }
            if (menuForm.redirect && menuForm.redirect.length > 0 && menuForm.redirect.indexOf('/') !== 0) {
                menuForm.redirect = '/' + menuForm.redirect
            }
            if (menuForm.component && menuForm.component.length > 0 && menuForm.component.indexOf('/') === 0) {
                menuForm.component = menuForm.component.slice(1)
            }
            loading.value = true
            if (dialogType.value === 'add') {
                createMenu(menuForm).then(() => {
                    ElMessage.success('创建成功')
                    dialog.value = false
                    emit('update-table')
                }).catch(() => {
                    dialog.value = false
                })
            }
            if (dialogType.value === 'edit') {
                updateMenu(menuForm).then(() => {
                    ElMessage.success('修改成功')
                    dialog.value = false
                    emit('update-table')
                }).catch(() => {
                    dialog.value = false
                })
            }
            loading.value = false
        }
    })
}
const treeProps = {
    children: 'children',
    label: 'name',
    value: 'id'
}
const dialogType = ref<string>('add')
const selectOptions = ref<any>()
const title = ref<string>('新建')
const open = (type: string, row: any) => {
    dialog.value = true
    getSelectOptions().then((res: any) => {
        selectOptions.value = res.data
    })
    nextTick(() => {
        dialogType.value = type
        if (type === 'add') {
            title.value = '新建'
        } else {
            const rowobj = toRaw(row)
            title.value = '编辑'
            menuForm.id = rowobj.id
            menuForm.name = rowobj.name
            menuForm.path = rowobj.path
            menuForm.redirect = rowobj.redirect
            menuForm.component = rowobj.component
            menuForm.pid = rowobj.pid
            menuForm.type = rowobj.type
            menuForm.icon = rowobj.icon
            menuForm.hidden = rowobj.hidden
            menuForm.order = rowobj.order
            menuForm.permission = rowobj.permission
        }
    })
}
// 关闭弹窗
const closed = () => {
    dialog.value = false
    if (!menuFormRef.value) return
    menuFormRef.value.resetFields()
}

const selectedIcon = (name: string) => {
    menuForm.icon = name
}
defineExpose({ open })
</script>
<template>
    <el-dialog v-model="dialog" :title="`${title}菜单`" @close="closed" width="600px" :close-on-click-modal="false">
        <el-form ref="menuFormRef" :model="menuForm" :rules="menuRules" label-width="120px">
            <el-form-item label="类型" prop="type">
                <el-radio-group v-model="menuForm.type">
                    <el-radio-button :label="0">目录</el-radio-button>
                    <el-radio-button :label="1">菜单</el-radio-button>
                    <el-radio-button :label="2">按钮</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="名称" prop="name">
                <el-input v-model="menuForm.name" style="width: 300px" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item v-show="menuForm.type !== 2" label="是否隐藏" prop="hidden">
                <el-radio-group v-model="menuForm.hidden">
                    <el-radio-button label="false">否</el-radio-button>
                    <el-radio-button label="true">是</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-show="menuForm.type !== 2" label="图标" prop="icon">
                <el-popover placement="top" :width="450" trigger="click">
                    <template #reference>
                        <el-input v-model="menuForm.icon" style="width: 200px;" placeholder="点击选择图标" clearable>
                            <i v-if="menuForm.icon" slot="prefix" :class="`iconfont ${menuForm.icon}`"
                                class="el-input__icon" style="height: 30px;width: 16px;"></i>
                            <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                        </el-input>
                    </template>
                    <IconSelect :icons="iconfonts" @selected="selectedIcon" />
                </el-popover>
            </el-form-item>
            <el-form-item v-show="menuForm.type !== 0" label="权限标识" prop="permission">
                <el-input v-model="menuForm.permission" placeholder="权限标识" style="width: 200px;" />
            </el-form-item>
            <el-form-item v-if="menuForm.type !== 2" label="请求地址" prop="path">
                <el-input v-model="menuForm.path" placeholder="请输入路由地址" style="width: 300px;" />
            </el-form-item>
            <el-form-item v-if="menuForm.type === 0" label="重定向地址" prop="redirect">
                <el-input v-model="menuForm.redirect" placeholder="请输入重定向地址" style="width: 300px;" />
            </el-form-item>
            <el-form-item label="位置排序" prop="order">
                <el-input-number v-model.number="menuForm.order" :min="1" :max="999" controls-position="right"
                    style="width: 200px;" />
            </el-form-item>
            <el-form-item v-show="menuForm.type !== 2" label="文件路径" prop="component">
                <el-input v-model="menuForm.component" style="width: 300px;" placeholder="请输入展示文件路径" />
            </el-form-item>
            <el-form-item label="上级目录" prop="pid">
                <el-tree-select :props="treeProps" v-model="menuForm.pid" :data="selectOptions" check-strictly
                    :render-after-expand="false" style="width: 300px;" placeholder="选择上级目录" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="submit(menuFormRef)" :loading="loading">保存</el-button>
            <el-button @click="dialog = false">取消</el-button>
        </template>
    </el-dialog>
</template>