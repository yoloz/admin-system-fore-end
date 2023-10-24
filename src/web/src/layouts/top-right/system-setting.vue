<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'

import { getUserInfo } from '@/users/services/userServices'
import { logout } from '@/login/services/loginService'
import UpdatePwdDialog from '@/login/components/update-pwd-dialog.vue'
import PersonalInfoDialog from '@/login/components/personal-info-dialog.vue'
import { useSystemStore } from '@/stores/systemStore'
import { useUserStore } from '@/stores/userStore'

import HelpDrawer from './help-drawer.vue'
import LayoutDrawer from './layout-drawer.vue'

const router = useRouter()
const { getLoginUser } = storeToRefs(useUserStore())
const { setTheme } = useSystemStore()
const { setLoginUser, setPermission } = useUserStore()
// 版本抽屉
const drawerRef = ref()
const layoutDrawerRef = ref()
// 系统浅、深色切换
const isDark = ref(useDark())
const toggleDark = () => {
    setTheme(isDark.value)
    useToggle(isDark.value)
}
const updatePwdDialogRef = ref()
const personalInfoDialogRef = ref()

// 用户下拉菜单操作
const handleUserCommand = (command: string) => {
    if (command === 'c') {
        ElMessageBox.confirm('确认退出登录吗?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
                logout().then((res) => {
                    localStorage.removeItem('authorization')
                    router.push('/login')
                })
            })
            .catch((e) => {
                ElMessage.warning(e)
            })
    }
    if (command === 'a') personalInfoDialogRef.value.open(getLoginUser.value)
    if (command === 'b') updatePwdDialogRef.value.open(getLoginUser.value)
}

onMounted(() => {
    if (!getLoginUser.value.nickname) {
        getUserInfo()
            .then((resp: any) => {
                setLoginUser(resp.data.user)
                setPermission(resp.data.permission)
            })
            .catch((_e: any) => {})
    }
})
</script>
<template>
  <div class="header-setting">
    <div class="item">
      <el-switch
        :active-icon="Moon"
        :inactive-icon="Sunny"
        size="large"
        inline-prompt
        v-model="isDark"
        @click="toggleDark"
      />
    </div>
    <div class="item">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="布局配置"
        placement="bottom"
      >
        <el-icon>
          <i
            class="iconfont icon-disposition"
            @click="layoutDrawerRef.open()"
          ></i>
        </el-icon>
      </el-tooltip>
    </div>
    <div class="item">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="版本迭代"
        placement="bottom"
      >
        <el-icon>
          <i class="iconfont icon-banben" @click="drawerRef.open()"></i>
        </el-icon>
      </el-tooltip>
    </div>
    <div class="item">
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="`欢迎您，${getLoginUser.nickname}`"
        placement="bottom"
      >
        <el-dropdown trigger="click" @command="handleUserCommand">
          <div class="user-wrapper">
            <img
              src="data:image/png;base64,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"
            />
          </div>
          <!-- <div class="use r-wrapper"> -->
          <!-- <img
                                            :src='userPhoto'/> -->
          <!-- </div> -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">
                <el-icon> <i class="iconfont icon-user"></i> </el-icon
                >{{ getLoginUser.nickname }}
              </el-dropdown-item>
              <el-dropdown-item command="b">
                <el-icon> <i class="iconfont icon-password"></i> </el-icon
                >修改密码
              </el-dropdown-item>
              <el-dropdown-item command="c" divided>
                <el-icon> <i class="iconfont icon-icon_signout"></i> </el-icon
                >退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-tooltip>
    </div>
  </div>
  <update-pwd-dialog ref="updatePwdDialogRef"></update-pwd-dialog>
  <personal-info-dialog ref="personalInfoDialogRef"></personal-info-dialog>
  <help-drawer ref="drawerRef"></help-drawer>
  <layout-drawer ref="layoutDrawerRef"></layout-drawer>
</template>
<style scoped lang="scss">
.header-setting {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  user-select: none;
  flex: none;
  //父元素 display flex,子元素靠右margin-left auto
  //   margin-left: auto;
  float: right;

  .user-wrapper {
    cursor: pointer;

    img {
      width: 24px;
      height: 24px;
    }
  }

  .item {
    padding: 0 12px;
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;

    i.iconfont {
      font-size: 20px;
    }
  }
}
</style>
