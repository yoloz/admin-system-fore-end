<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

import { IRoleMenuRelation } from '../entity/role'
import { getMenuByRole, updateRoleMenu } from '../services/roleServices'

const treeRef = ref()
const params = reactive<IRoleMenuRelation>({
    id: 0,
    menuIds: []
})
const defaultProps = {
    children: 'children',
    label: 'name',
    value: 'id'
}
const treeData = ref<Array<any>>([])
const defaultTreeNode = ref<number[]>([])
const initRoleMenu = (roleId: number) => {
    getMenuByRole({ id: roleId }).then(res => {
        defaultTreeNode.value = res.data.keys
        treeData.value = res.data.menus
    })
}
type Emit = { (e: 'update-table'): void }
const emit = defineEmits<Emit>()

const loading = ref<boolean>(false)
const submit = () => {
    loading.value = true
    params.menuIds = treeRef.value.getCheckedKeys()
    updateRoleMenu(params).then(res => {
        ElMessage.success('保存成功')
        drawer.value = false
        emit('update-table')

        loading.value = false
    }).catch(() => {
        loading.value = false
    })
}
const drawer = ref<boolean>(false)
const open = (row: any) => {
    drawer.value = true
    params.id = row.id
    initRoleMenu(row.id)
}
const closed = () => {
    treeData.value = []
    defaultTreeNode.value = []
}

defineExpose({ open })
</script>
<template>
    <el-drawer v-model="drawer" size="400px" title="角色授权" :show-close="false" @close="closed" :close-on-click-modal="false">
        <el-tree ref="treeRef" node-key="id" highlight-current show-checkbox :data="treeData"
            :default-checked-keys="defaultTreeNode" :props="defaultProps"></el-tree>
        <template #footer>
            <el-button type="primary" @click="submit" :loading="loading">保存</el-button>
            <el-button @click="drawer = false">取消</el-button>
        </template>
    </el-drawer>
</template>
<style lang="scss" scoped>
// :deep(.el-tree-node__content) {
//     height: 36px;
// }
</style>