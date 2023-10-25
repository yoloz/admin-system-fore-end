<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'

import { useUserStore } from '@/stores/userStore'

import { IRoleList, IRoleForm } from './entity/role'
import CreateRoleDialog from './components/create-role-dialog.vue'
import RoleDetailDrawer from './components/role-detail-drawer.vue'
import { queryRoleList, removeRole } from './services/roleServices'

const { getLoginUser } = storeToRefs(useUserStore())

const tableClassic = ref()

const detailRoleRef = ref()
const params = reactive<IRoleList.RequestForm>({
    pageNumber: 1,
    pageSize: 15,
    totalRow: -1
})
// 列表选择
const checked = ref<Array<number>>([])
const onSelectChange = (selection: IRoleForm[]) => {
    checked.value = []
    selection.forEach((item: IRoleForm) => {
        checked.value.push(item.id!)
    })
}
// 详情
const views = (row: IRoleForm) => {
    if (row.level >= getLoginUser.value.level) {
        detailRoleRef.value.open(row)
    } else {
        ElMessage.warning('权限等级不足!')
    }
}
// 新建
const createRoleRef = ref()
const create = () => createRoleRef.value.open({ type: 'add' })

const loading = ref<boolean>(false)

const checkbox = (row: any) => {
    return row.level >= getLoginUser.value.level && !row.builtin
}
// 批量删除
const onBatchDeletion = () => {
    commonsRemove(checked.value)
}
const commonsRemove = (ids: Array<number>) => {
    loading.value = true
    ElMessageBox.confirm(
        '确认要删除吗? 删除后将无法恢复!', '警告',
        { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning' }
    ).then(() => {
        removeRole(ids).then(res => {
            ElMessage.success('删除成功')
            loading.value = false
            checked.value = []
            tableClassic.value.refresh()
        }).catch(() => {
            loading.value = false
            checked.value = []
        })
    }).catch(() => {
        loading.value = false
    })
}
// 列表刷新
const refreshTable = () => tableClassic.value.refresh()
</script>
<template>
    <custom-table-layout>
        <template #header>
            <custom-header-layout>
                <template #left>
                    <span>角色管理</span>
                </template>
                <template #right>
                    <el-button type="primary" @click="create">新建角色</el-button>
                </template>
            </custom-header-layout>
        </template>
        <template #toolbar>
            <custom-table-toolbar>
                <template #left>
                    <el-input placeholder="请输入角色名称" clearable @change="refreshTable" v-model="params.name"
                        :prefix-icon="Search"></el-input>
                </template>
            </custom-table-toolbar>
        </template>
        <template #table>
            <custom-table ref="tableClassic" model="api" :api="queryRoleList" :params="params"
                @selection-change="onSelectChange" :selection="false">
                <el-table-column type="selection" fixed='left' width="50" align="center" :selectable="checkbox" />
                <el-table-column class-name="link" label="角色名称" show-overflow-tooltip fixed="left" width="200">
                    <template #default="scope">
                        <span @click="views(scope.row)">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="类型" show-overflow-tooltip width="100">
                    <template #default="scope">
                        <el-tag v-if="scope.row.builtin" type="info">内置</el-tag>
                        <el-tag v-else>自定义</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="desc" label="描述" show-overflow-tooltip min-width="200"></el-table-column>
                <el-table-column prop="createUser" label="创建者" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column label="创建时间" prop="createTime" width="200">
                    <template #default="scope">
                        <span v-if="scope.row.createTime">{{
                            dayjs(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss")
                        }}</span>
                       <span v-else></span>
                    </template>
                </el-table-column>
                <el-table-column prop="updateUser" label="修改者" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column label="修改时间" prop="updateTime" width="200">
                    <template #default="scope">
                        <span v-if="scope.row.updateTime">{{
                            dayjs(scope.row.updateTime).format("YYYY-MM-DD HH:mm:ss")
                        }}</span>
                        <span v-else></span>
                    </template>
                </el-table-column>
                <template #tools>
                    <el-button :disabled="checked.length <= 0" @click="onBatchDeletion" :loading="loading">批量删除</el-button>
                </template>
            </custom-table>
        </template>
    </custom-table-layout>
    <role-detail-drawer ref="detailRoleRef" @update-table="refreshTable"></role-detail-drawer>
    <create-role-dialog ref="createRoleRef" @update-table="refreshTable"></create-role-dialog>
</template>