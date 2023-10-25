<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { Edit, MoreFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import ResetPwdDialog from './reset-pwd-dialog.vue'
import CreateUserDialog from './create-user-dialog.vue'
import UserRoleDialog from './user-role-dialog.vue'

import { changeEnable, removeUser } from '../services/userServices'
import { IUserForm } from '../entity/user'

type Emit = { (e: 'update-table'): void };
const emit = defineEmits<Emit>()

const detailsModel = ref(false)
const resetPwdDialogRef = ref()

const userDetail = ref<IUserForm>()

const createUserDialogRef = ref()
const userRoleDialogRef = ref()

const edit = () => {
    if (userDetail.value?.roles?.length === 0) {
        ElMessage({ type: 'warning', message: '请先分配角色' })
    } else {
        createUserDialogRef.value.open('edit', userDetail.value)
    }
}
const handleCommand = (command: string) => {
    switch (command) {
        case 'reset':
            resetPwdDialogRef.value.open(userDetail.value)
            break
        case 'disabled':
            onBatchAbled()
            break
        case 'activation':
            onBatchAbled()
            break
        case 'delete':
            deleteUser(userDetail.value?.id!)
            break
        case 'auth':
            userRoleDialogRef.value.open(userDetail.value)
            break
        default:
            break
    }
}

// 删除用户
const deleteUser = (id: number) => {
    if (id) {
        ElMessageBox.confirm('确认删除用户吗?', '删除', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            removeUser([id]).then((res) => {
                ElMessage({ type: 'success', message: '删除成功' })
                updateTable()
            })
        })
    }
}
// 是否激活
const onBatchAbled = () => {
    const param = {
        id: userDetail.value?.id,
        enable: !userDetail.value?.enable
    }
    changeEnable(param).then((res) => {
        emit('update-table')
        ElMessage.success('操作成功')
        setTimeout(() => {
            detailsModel.value = false
        }, 100)
    })
}
const isDisabled = ref<boolean>(false)

const open = (row: any) => {
    detailsModel.value = true
    userDetail.value = row
}

const updateTable = () => {
    emit('update-table')
    detailsModel.value = false
}
// const cancelClick = () => {
//     detailsModel.value = false
// }

defineExpose({ open })
</script>
<template>
  <el-drawer
    class="hrm-drawer"
    v-model="detailsModel"
    :show-close="false"
    size="600px"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="drawer-header" :class="titleClass">
        <div class="left">
          <i class="iconfont icon-customer-center"></i>
        </div>
        <div class="right">
          <h4>{{ userDetail?.nickname }}</h4>
        </div>
      </div>
      <el-button
        style="margin-right: 15px"
        :icon="Edit"
        type="primary"
        @click="edit"
        :disabled="isDisabled"
        >编辑</el-button
      >
      <!-- <el-dropdown @command="handleCommand" v-if="!userDetail?.builtin"> -->
      <el-dropdown @command="handleCommand">
        <el-button text bg
          ><el-icon> <MoreFilled /> </el-icon
        ></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="disabled" v-if="userDetail?.enable"
              >停用</el-dropdown-item
            >
            <el-dropdown-item command="activation" v-else
              >启用</el-dropdown-item
            >
            <el-dropdown-item command="auth">分配角色</el-dropdown-item>
            <el-dropdown-item command="reset">重置密码</el-dropdown-item>
            <el-dropdown-item command="delete">删除用户</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <div class="drawer-body">
      <div class="drawer-body-header">
        <p>
          账号状态:
          <span
            class="status success"
            style="margin-left: 15px"
            v-if="userDetail?.enable"
            >启用</span
          >
          <span class="status pending" style="margin-left: 15px" v-else
            >停用</span
          >
        </p>
        <p>
          创建时间:
          <span style="margin-left: 15px">{{
            dayjs(userDetail?.createTime).format("YYYY-MM-DD HH:mm:ss")
          }}</span>
        </p>
      </div>
      <custom-title class="title" title="基本信息"></custom-title>

      <li class="list-item">
        <span class="label">用户账号: </span>
        <span class="value">{{ userDetail?.username || "-" }}</span>
      </li>
      <li class="list-item">
        <span class="label">用户角色: </span>
        <p>
          <el-tag
            type="info"
            text
            v-for="item in userDetail?.roles"
            :key="item.id"
            round
            >{{ item.name }}</el-tag
          >
        </p>
      </li>
      <li class="list-item">
        <span class="label">手机号码: </span>
        <span class="value">{{ userDetail?.phone || "-" }}</span>
      </li>
      <li class="list-item">
        <span class="label">电子邮箱: </span>
        <span class="value">{{ userDetail?.email || "-" }}</span>
      </li>
      <li class="list-item">
        <span class="label">登录时间: </span>
        <span class="value" v-if="userDetail?.loginTime">{{
          dayjs(userDetail.loginTime).format("YYYY-MM-DD HH:mm:ss")
        }}</span>
        <span class="value" v-else></span>
      </li>
      <li class="list-item">
        <span class="label">登录IP: </span>
        <span class="value">{{ userDetail?.loginIp || "-" }}</span>
      </li>
      <li class="list-item">
        <span class="label">创建者: </span>
        <span class="value">{{ userDetail?.createUser || "-" }}</span>
      </li>
      <li class="list-item">
        <span class="label">创建时间: </span>
        <span class="value">{{
          userDetail?.createTime
            ? dayjs(userDetail?.createTime).format("YYYY-MM-DD HH:mm:ss")
            : "-"
        }}</span>
      </li>
      <li class="list-item">
        <span class="label">最近修改者: </span>
        <span class="value">{{ userDetail?.updateUser || "-" }}</span>
      </li>
      <li class="list-item">
        <span class="label">最近修改时间: </span>
        <span class="value">{{
          userDetail?.updateTime
            ? dayjs(userDetail?.updateTime).format("YYYY-MM-DD HH:mm:ss")
            : "-"
        }}</span>
      </li>
    </div>
    <template #footer>
      <div style="flex: auto">
        <!-- <el-button @click="cancelClick">关闭</el-button> -->
      </div>
    </template>
  </el-drawer>
  <reset-pwd-dialog
    ref="resetPwdDialogRef"
    @refresh-table="updateTable"
  ></reset-pwd-dialog>
  <create-user-dialog
    ref="createUserDialogRef"
    @refresh-table="updateTable"
  ></create-user-dialog>
  <user-role-dialog
    ref="userRoleDialogRef"
    @refresh-table="updateTable"
  ></user-role-dialog>
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
  &-header {
    padding: 20px 0;
    margin-left: 15px;

    p {
      line-height: 30px;
    }

    .status {
      padding-left: 16px;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: -5px;
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

    .stop {
      font-weight: 900;
      color: red;
      font-size: 20px;
    }

    .start {
      font-weight: 900;
      color: rgb(7, 133, 70);
      font-size: 20px;
    }
  }

  .list-item {
    list-style: none;
    display: flex;
    align-items: center;
    height: 40px;
    align-items: stretch;
    margin-left: 15px;

    .el-tag {
      margin-right: 5px;
    }

    .label {
      width: 80px;
    }

    .value {
      text-align: left;
    }
  }
}
</style>
