<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import CreateMenuDialog from './components/create-menu-dialog.vue'
import { getMenuList, removeMenu } from './services/menuServices'
import { IMenuForm, IMenuList } from './entity/menu'
const createMenuRef = ref()

const tableListRef = ref()
const searchMenu = ref()

const loading = ref<boolean>(false)

// 列表选择
const checked = ref<Array<number>>([])
const params = reactive<IMenuList.RequestForm>({
    pageNumber: 1,
    pageSize: 15,
    totalRow: -1
})

// 添加菜单对话框
const addMenu = () => {
    createMenuRef.value.open('add')
}

// 批量删除
const onBatchDeletion = () => {
    const ids = checked.value
    ElMessageBox.confirm('确认删除所选菜单吗?', '删除', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        removeMenu(ids).then((res) => {
            ElMessage({ type: 'success', message: '删除成功' })
            refreshTable()
        })
    })
}
const setSelectionChange = (selection: IMenuForm[]) => {
    checked.value = []
    checked.value = selection.map((el: IMenuForm) => el.id!)
}

// 搜索框
const queryByName = () => {
    params.name = searchMenu.value
    refreshTable()
}

const edit = (row: any) => {
    createMenuRef.value.open('edit', row)
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
          <span>菜单管理</span>
        </template>
        <template #right>
          <el-button type="primary" @click="addMenu" style="margin-right: 10px"
            >添加菜单</el-button
          >
        </template>
      </custom-header-layout>
    </template>
    <template #toolbar>
      <custom-table-toolbar>
        <template #left>
          <el-input
            @change="queryByName"
            :prefix-icon="Search"
            clearable
            placeholder="请输入菜单名称"
            v-model="searchMenu"
          />
        </template>
      </custom-table-toolbar>
    </template>
    <template #table>
      <custom-table
        ref="tableListRef"
        model="api"
        :api="getMenuList"
        :params="params"
        :footer="false"
        @selection-change="setSelectionChange"
        row-key="id"
      >
        <el-table-column
          label="菜单标题"
          class-name="link"
          fixed="left"
          show-overflow-tooltip
        >
          <template #default="scope">
            <span @click="edit(scope.row)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="菜单类型" prop="type" fixed="left">
          <template #default="scope">
            <el-tag type="info" v-if="scope.row.type === 0"> 目录</el-tag>
            <el-tag type="info" v-else-if="scope.row.type === 1"> 菜单</el-tag>
            <el-tag type="info" v-else> 按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="路由地址" show-overflow-tooltip prop="path">
          <template #default="scope">
            <span v-if="scope.row.path"> {{ scope.row.path }}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="重定向地址"
          show-overflow-tooltip
          prop="redirect"
        >
          <template #default="scope">
            <span v-if="scope.row.redirect"> {{ scope.row.redirect }}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="组件路径"
          show-overflow-tooltip
          prop="component"
        >
          <template #default="scope">
            <span v-if="scope.row.component"> {{ scope.row.component }}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="权限标识" prop="permission" show-overflow-tooltip/>
        <el-table-column label="位置" prop="order" />
        <el-table-column label="菜单图标" property="nickname">
          <template #default="scope">
            <i
              v-if="scope.row.icon"
              :class="`iconfont ${scope.row.icon}`"
              style="height: 30px; width: 16px"
            ></i>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column prop="hidden" label="是否隐藏">
          <template #default="scope">
            <el-tag type="info" v-if="scope.row.hidden">是</el-tag>
            <el-tag type="info" v-else>否</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column label="创建时间" width="220">
                    <template #default="scope">
                        <span v-if="scope.row.createTime">{{
                            dayjs(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss")
                        }}</span>
                        <span v-else></span>
                    </template>
                </el-table-column> -->
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
  <create-menu-dialog
    ref="createMenuRef"
    @update-table="refreshTable"
  ></create-menu-dialog>
</template>
<style lang="scss" scoped>
.sys-table-header {
  width: 100%;
  display: flex;
  align-items: center;

  &-left {
    display: flex;
    align-items: center;

    .title {
      margin-right: 14px;
      font-weight: 500;
      font-size: 16px;
      color: #000;
    }

    p {
      color: #6b778c;
      font-size: 16px;

      span {
        color: #172b4d;
        padding: 5px;
      }
    }
  }

  &-right {
    margin-left: auto;
    display: flex;
    align-items: center;
    column-gap: 12px;

    .el-select {
      width: 120px;

      .el-input {
        height: 32px;

        .el-input__wrapper {
          background: #dfe1e6;
        }
      }
    }
  }

  .header-msg {
    line-height: 32px;
    flex-shrink: 0;
    padding-right: 20px;
    font-weight: 600;

    span {
      color: #0052cc;
    }
  }

  .header-btn-group {
    .el-button {
      display: inline-flex;
      align-items: center;
      font-size: 14px;

      color: #344563;
      margin-right: 10px;
    }
  }
}

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
