<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Edit, MoreFilled } from '@element-plus/icons-vue'
import { dayjs, ElMessage, ElMessageBox } from 'element-plus'

import RoleMenuDrawer from './role-menu-drawer.vue'
import CreateRoleDialog from './create-role-dialog.vue'

import { IRoleUserRelationList, IRoleUserRelation } from '../entity/role'
import { removeRole, getUserByRole, delRoleUserRelation } from '../services/roleServices'
const detailsModel = ref(false)

const authRoleRef = ref()
const createRoleRef = ref()
// button auth
// 打开弹窗-编辑
const edit = () => {
    createRoleRef.value.open({ type: 'edit', row: rawRow.value })
}

const handleCommand = (command: string) => {
    switch (command) {
        case 'auth':
            authRoleRef.value.open(rawRow.value)
            break
        case 'del':
            ElMessageBox.confirm(
                '确认要删除吗? 删除后将无法恢复!', '警告',
                { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning' }
            ).then(() => {
                remove()
            })
            break
        default:
            break
    }
}
const remove = () => {
    removeRole([rawRow.value.roleId]).then(res => {
        ElMessage.success('删除成功')
        detailsModel.value = false
        emit('update-table')
    })
}
// 用户表格
const tableClassic = ref()
const params = reactive<IRoleUserRelationList.RequestForm>({
    id: 0,
    pageNumber: 1,
    pageSize: 15,
    totalRow: -1
})
const delParams = reactive<IRoleUserRelation>({
    id: 0,
    userIds: []
})
// 列表选择
const checked = ref<Array<any>>([])
const onSelectChange = (selection: any) => {
    checked.value = []
    selection.forEach((item: any) => {
        checked.value.push(item.userId)
    })
}
// 单个删除
const singleRemove = (userId: number) => {
    delParams.userIds = [userId]
    removeRoleUserRelation()
}
// 批量删除
const onBatchDeletion = () => {
    delParams.userIds = checked.value
    removeRoleUserRelation()
}
const loading = ref<boolean>(false)
const removeRoleUserRelation = () => {
    loading.value = true
    ElMessageBox.confirm(
        '确认要删除吗? 删除后将无法恢复!', '警告',
        { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning' }
    ).then(() => {
        delRoleUserRelation(delParams).then(res => {
            ElMessage.success('操作成功')
            tableClassic.value.refresh()
            loading.value = false
        }).catch(() => {
            loading.value = false
        })
    }).catch(() => {
        loading.value = false
    })
}
const rawRow = ref<any>()
const open = (row: any) => {
    params.id = row.id
    delParams.id = row.id
    detailsModel.value = true
    rawRow.value = row
}
const close = () => { }
type Emit = { (e: 'update-table'): void }
const emit = defineEmits<Emit>()
const updateTable = () => {
    detailsModel.value = false
    emit('update-table')
}
defineExpose({ open })
</script>
<template>
    <el-drawer class="hrm-drawer" v-model="detailsModel" :show-close="false" @close="close" size="1200px">
        <template #header="{ close, titleClass }">
            <div class="drawer-header" :class="titleClass">
                <div class="left">
                    <i class="iconfont icon-usernav"></i>
                </div>
                <div class="right">
                    <h4>{{ rawRow?.name }}</h4>
                </div>
            </div>
            <el-button style="margin-right: 15px;" :icon="Edit" type="primary" @click="edit">编辑</el-button>
            <!-- <el-dropdown @command="handleCommand" v-if="!rawRow?.builtin"> -->
                <el-dropdown @command="handleCommand">
                <el-button text bg><el-icon><MoreFilled /></el-icon></el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="auth">授权</el-dropdown-item>
                        <el-dropdown-item command="del">删除</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </template>
        <div class="drawer-body">
            <custom-title title="基本信息"></custom-title>
            <div class="drawer-body-infor">
                <li class="list-item">
                    <p class="label">角色名称</p>
                    <p class="value">{{ rawRow?.name }}</p>
                </li>
                <li class="list-item">
                    <p class="label">角色类型</p>
                    <p class="value">
                        <el-tag v-if="rawRow?.builtin" type="info">内置</el-tag>
                        <el-tag v-else>自定义</el-tag>
                    </p>
                </li>
                <li class="list-item">
                    <p class="label">角色等级</p>
                    <p class="value">{{ rawRow?.level }}</p>
                </li>
                <li class="list-item">
                    <p class="label">角色描述</p>
                    <el-tooltip placement="bottom-start" :content="rawRow?.desc">
                        <p class="value">{{ rawRow?.desc || '' }}</p>
                    </el-tooltip>
                </li>
                <li class="list-item">
                    <p class="label">创建者</p>
                    <el-tooltip placement="bottom-start" :content="rawRow?.createUser">
                        <p class="value">{{ rawRow?.createUser || '' }}</p>
                    </el-tooltip>
                </li>
                <li class="list-item">
                    <p class="label">创建时间</p>
                    <p class="value">{{ rawRow?.createTime ? dayjs(rawRow?.createTime).format("YYYY-MM-DD HH:mm:ss") : '' }}
                    </p>
                </li>
                <li class="list-item">
                    <p class="label">修改者</p>
                    <el-tooltip placement="bottom-start" :content="rawRow?.updateUser">
                        <p class="value">{{ rawRow?.updateUser || '' }}</p>
                    </el-tooltip>
                </li>
                <li class="list-item">
                    <p class="label">修改时间</p>
                    <p class="value">{{ rawRow?.updateTime ? dayjs(rawRow?.updateTime).format("YYYY-MM-DD HH:mm:ss") : '' }}
                    </p>
                </li>
            </div>
            <custom-title title="相关用户"></custom-title>
            <custom-table-layout>
                <template #table>
                    <custom-table v-if="detailsModel" ref="tableClassic" model="api" :api="getUserByRole" :params="params"
                        @selection-change="onSelectChange">
                        <el-table-column label="用户账号" min-width="120" prop="username" fixed="left"/>
                        <el-table-column label="用户昵称" prop="nickname" min-width="150" fixed="left" show-overflow-tooltip />
                        <el-table-column label="状态" min-width="100">
                            <template #default="scope">
                                <span class="status success" v-if="scope.row.enable">启用</span>
                                <span class="status pending" v-else>停用</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="手机号码" min-width="150" prop="phone" />
                        <el-table-column label="电子邮箱" min-width="150" prop="email" show-overflow-tooltip />
                        <el-table-column label="登录时间" min-width="150" show-overflow-tooltip>
                            <template #default="scope">
                                <span v-if="scope.row.loginTime">{{
                                    dayjs(scope.row.loginTime).format("YYYY-MM-DD HH:mm:ss")
                                }}</span>
                                <span v-else></span>
                            </template>
                        </el-table-column>
                        <el-table-column label="登录IP" property="loginIp" min-width="150" />
                        <el-table-column label="创建时间" prop="createTime" min-width="150" show-overflow-tooltip>
                            <template #default="scope">
                                <span v-if="scope.row.createTime">{{
                                    dayjs(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss")
                                }}</span>
                                <span v-else></span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" align="center" min-width="60">
                            <template #default="scope">
                                <el-tooltip content="将用户从该角色中移除">
                                    <el-button link type="danger" @click="singleRemove(scope.row.id)">移除</el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <template #tools>
                            <el-tooltip content="将选中用户从该角色中移除">
                                <el-button :disabled="checked.length <= 0" @click="onBatchDeletion"
                                    :loading="loading">批量移除</el-button>
                            </el-tooltip>

                        </template>
                    </custom-table>
                </template>
            </custom-table-layout>
        </div>
        <create-role-dialog ref="createRoleRef" @update-table="updateTable"></create-role-dialog>
        <role-menu-drawer ref="authRoleRef" @update-table="updateTable"></role-menu-drawer>
    </el-drawer>
</template>
<style lang="scss" scoped>
.drawer-header {
    display: flex;
    align-items: center;

    .left {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        line-height: 30px;
        text-align: center;
        border-radius: 3px;
        background-color: rgb(236, 238, 242);
    }

    .right {
        p {
            margin-bottom: 5px;
            font-size: 12px;
            color: #6b778c;
        }

        h4 {
            font-size: 16px;
            font-weight: 600;
            color: var(--dialog-title-text-color);
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

.drawer-body {
    &-infor {
        display: flex;
        width: 100%;
        padding: 16px;
        border-radius: 6px;
        background-color: var(--el-fill-color-light);
        margin-bottom: 20px;

        .list-item {
            list-style: none;
            flex: 1;

            .label {
                width: 132px;
                color: #6b778c;
                margin-bottom: 12px;
            }

            .value {
                max-width: 200px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    .title {
        opacity: 1;
        font-weight: bold;
        position: relative;
        text-indent: 14px;
        margin: 24px 0 16px;

        &::after {
            content: "";
            width: 6px;
            background: var(--el-color-primary);
            height: 15px;
            position: absolute;
            left: 0;
            border-radius: 2px;
            top: 2px;
        }

    }

    .status {
        padding-left: 16px;

        &::after {
            content: '';
            position: absolute;
            left: 4px;
            top: calc(50% - 4px);
            width: 8px;
            height: 8px;
            margin: 0 8px;
            border-radius: 50%;
        }
    }

    .success {
        &::after {
            background-color: var(--el-color-success);
        }
    }

    .pending {
        &::after {
            background-color: var(--el-color-info);
        }
    }

    .warning {
        &::after {
            background-color: var(--el-color-danger);
        }
    }
}
</style>