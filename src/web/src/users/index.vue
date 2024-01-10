<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Search, MoreFilled, Download } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { utils, writeFileXLSX } from 'xlsx'

import { useUserStore } from '@/stores/userStore'

import UserDrawer from './components/user-drawer.vue'
import CreateUserDialog from './components/create-user-dialog.vue'
import { queryUserList, removeUser } from './services/userServices'
import { IUserForm, IUserList } from './entity/user'

const { getLoginUser } = storeToRefs(useUserStore())

const createUserDialogRef = ref()

const tableListRef = ref()

const loading = ref<boolean>(false)
const userDrawerRef = ref()

// 列表选择
const checked = ref<Array<number>>([])
const params = reactive<IUserList.RequestForm>({
    pageNumber: 1,
    pageSize: 15,
    totalRow: -1
})

// 添加用户对话框
const addUser = () => {
    createUserDialogRef.value.open('add')
}

// 批量删除
const onBatchDeletion = () => {
    const ids = checked.value
    ElMessageBox.confirm('确认删除所选用户吗?', '删除', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        removeUser(ids).then((res) => {
            ElMessage({ type: 'success', message: '删除成功' })
            refreshTable()
        }).catch(() => {})
    })
}
const setSelectionChange = (selection: IUserForm[]) => {
    checked.value = []
    checked.value = selection.map((el: IUserForm) => el.id!)
}

// 根据用户编号获取详细信息
const getUserDetail = (row: any) => {
    const levels = row.roles!.map((item: any) => item.level)
    levels.sort(function (a: number, b: number) {
        return a - b
    })
    if (levels[0] >= getLoginUser.value.level) {
        userDrawerRef.value.open(row)
    } else {
        ElMessage.warning('权限等级不足!')
    }
}
const exportTable = () => {
    queryUserList(params).then((res: any) => {
        const ws = utils.json_to_sheet(res.data.records)
        const wb = utils.book_new()
        utils.book_append_sheet(wb, ws, 'Sheet1')
        writeFileXLSX(wb, Date.now() + '.xlsx')
    }).catch(() => {})
}

const checkbox = (row: any) => {
    const levels = row.roles!.map((item: any) => item.level)
    levels.sort(function (a: number, b: number) {
        return a - b
    })
    return levels[0] >= getLoginUser.value.level && !row.builtin
}

const refreshTable = () => {
    tableListRef.value.refresh()
}
</script>

<template>
  <custom-table-layout>
    <template #header>
      <custom-header-layout>
        <template #left>
          <span>用户管理</span>
        </template>
        <template #right>
          <el-button type="primary" @click="addUser" style="margin-right: 10px"
            >添加用户</el-button
          >
          <el-dropdown>
            <el-button text bg
              ><el-icon><MoreFilled /> </el-icon
            ></el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="exportTable" :icon="Download">
                  <span>导出当前页</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </custom-header-layout>
    </template>
    <template #toolbar>
      <custom-table-toolbar>
        <template #left>
          <el-input
            @change="refreshTable"
            :prefix-icon="Search"
            clearable
            placeholder="请输入用户账号"
            v-model="params.username"
          />
          <el-select
            v-model="params.enable"
            placeholder="启/停"
            clearable
            @change="refreshTable"
          >
            <el-option label="启用" :value="true"></el-option>
            <el-option label="停用" :value="false"></el-option>
          </el-select>
        </template>
      </custom-table-toolbar>
    </template>
    <template #table>
      <custom-table
        ref="tableListRef"
        model="api"
        :api="queryUserList"
        :params="params"
        @selection-change="setSelectionChange"
        :selection="false"
      >
        <el-table-column
          type="selection"
          fixed="left"
          width="50"
          align="center"
          :selectable="checkbox"
        />
        <el-table-column
          label="用户账号"
          min-width="100"
          class-name="link"
          fixed="left"
          show-overflow-tooltip
        >
          <template #default="scope">
            <span @click="getUserDetail(scope.row)">{{
              scope.row.username
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户昵称"
          property="nickname"
          fixed="left"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column label="用户角色" min-width="120" show-overflow-tooltip>
          <template #default="scope">
            <custom-tag-group>
              <el-tag v-for="role in scope.row.roles" :key="role.id">{{
                role.name
              }}</el-tag>
            </custom-tag-group>
          </template>
        </el-table-column>
        <el-table-column
          label="手机号码"
          class-name="number"
          prop="phone"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column
          label="电子邮箱"
          prop="email"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column label="用户类型" min-width="100" show-overflow-tooltip>
          <template #default="scope">
            <el-tag v-if="scope.row.builtin" type="info">内置</el-tag>
            <el-tag v-else>自定义</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="登录时间" min-width="150" show-overflow-tooltip>
          <template #default="scope">
            <span>{{
              scope.row.loginTime
                ? dayjs(scope.row.loginTime).format("YYYY-MM-DD HH:mm:ss")
                : ""
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="登录IP"
          property="loginIp"
          min-width="120"
          show-overflow-tooltip
        />
        <el-table-column label="用户状态" min-width="100" show-overflow-tooltip>
          <template #default="scope">
            <span class="status success" v-if="scope.row.enable">启用</span>
            <span class="status pending" v-else>停用</span>
          </template>
        </el-table-column>
        <template #tools>
          <el-button
            :disabled="checked.length <= 0"
            @click="onBatchDeletion"
            :loading="loading"
            >批量删除</el-button
          >
        </template>
      </custom-table>
    </template>
  </custom-table-layout>

  <create-user-dialog
    ref="createUserDialogRef"
    @refresh-table="refreshTable"
  ></create-user-dialog>
  <user-drawer ref="userDrawerRef" @update-table="refreshTable"></user-drawer>
</template>
<style lang="scss" scoped>
.status {
  padding-left: 16px;

  &::after {
    content: "";
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
</style>
