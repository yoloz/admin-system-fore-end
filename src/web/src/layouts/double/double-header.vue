<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useMenuStore } from '@/stores/menuStore'
import { useSystemStore } from '@/stores/systemStore'

import SysSetting from '../top-right/system-setting.vue'

const router = useRouter()
const { getSystemInfo } = storeToRefs(useSystemStore())

const onToRouter = (path: string | undefined): void => {
    if (path !== undefined) {
        router.push('/' + path)
    }
}

// const menulist = ref<Array<IRouterMenu>>()
const { getRouterMenu } = storeToRefs(useMenuStore())

// 当前选中菜单
const activeIndex = ref<string>('')
const onLoadActiveIndex = (): void => {
    activeIndex.value = '/' + router.currentRoute.value.path.split('/')[1]
}

watch(
    () => router.currentRoute.value.path,
    () => {
    // onLoading()
        onLoadActiveIndex()
    }
)

onMounted(() => {
    onLoadActiveIndex()
})
</script>
<template>
  <div class="header-left" @click="onToRouter('')">
    <img class="logo" :src="getSystemInfo.path" />
    <h1 class="label">{{ getSystemInfo.name }}</h1>
  </div>
  <el-row :gutter="10">
    <el-col :span="19" class="header-menu">
      <el-menu
        :default-active="activeIndex"
        :router="true"
        mode="horizontal"
        :ellipsis="false"
      >
        <div v-for="(item, index) in getRouterMenu" :key="index">
          <el-menu-item v-if="!item.meta.hidden" :index="`${item.path}`">
            <span class="header-menu-title">{{ item.name }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-col>
    <el-col :span="5">
      <SysSetting />
    </el-col>
  </el-row>
  <!-- header设置了position:fixed定位后，下一个div会上移,再设置一个空的div，设置成要占据的高度 -->
  <!-- <div class="header-mk"></div> -->
</template>
<style scoped lang="scss">
.header-left {
  height: 100%;
  min-width: $left-aside-width;
  float: left;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  cursor: pointer;
  flex: none;

  img.logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  h1.label {
    margin-left: 12px;
    font-size: 16px;
    font-weight: 400;
    user-select: none;
    font-family: "PingFang-bold";
  }
}

.header-menu {
  &-title {
    width: 70px;
    height: 40px;
    border-radius: 3px;
    text-align: center;
    line-height: 40px;

    &:hover {
      color: var(--el-color-white);
      background-color: var(--el-color-primary);
    }
  }

  .el-menu {
    height: 100%;
    border: 0;
    overflow: hidden;
    font-size: 14px;
    background-color: var(--top-header-bg-color);

    .el-menu-item {
      border-bottom: 0 !important;
      color: var(--el-color-white);
      background-color: var(--top-header-bg-color);

      &:hover {
        background-color: var(--top-header-bg-color);
        border-radius: 4px;
      }
    }

    .el-menu-item.is-active {
      border-bottom: 0 !important;
    }

    .el-menu-item.is-active:before {
      content: "";
      width: 32px;
      display: inline;
      position: absolute;
      bottom: 6px;
      left: 50%;
      margin-left: -16px;
      height: 2px;
      background-color: var(--el-color-primary);
    }
  }
}
</style>
