<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

import { useMenuStore } from '@/stores/menuStore'
import { useSystemStore } from '@/stores/systemStore'

import ScrollMenu from '../menu-view/scroll-menu.vue'

const { getRouterMenu } = storeToRefs(useMenuStore())

const router = useRouter()
const { getSystemInfo, getMenCollapse } = storeToRefs(useSystemStore())

const onToRouter = (path: string | undefined): void => {
    if (path !== undefined) {
        router.push('/' + path)
    }
}

const classObj = computed(() => {
    return {
        hide: getMenCollapse.value
    }
})
</script>
<template>
  <el-container style="height: 100%; width: 100%">
    <el-header class="aside-header" :class="classObj" @click="onToRouter('')">
      <img class="logo" :src="getSystemInfo.path" />
      <h1 class="label">{{ getSystemInfo.name }}</h1>
    </el-header>
    <el-main class="aside-main">
      <ScrollMenu :item="getRouterMenu" />
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>
.aside-header {
  background-color: var(--left-aside-bg-color);
  height: $top-header-height;
  border-bottom: 1px solid var(--left-aside-border-color-lighter);
  color: var(--el-color-white);
  // box-shadow: 0px 3px 6px 0px var(--left-aside-border-color-lighter);
  display: flex;
  align-items: center;
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

.hide {
  h1.label {
    display: none;
  }
}

.aside-main {
  --el-main-padding: 0 !important;
  margin-top: 10px;

  :deep(.el-menu) {
    border: none;
    background-color: var(--left-aside-bg-color);

    .el-sub-menu__title {
      height: 40px;
      color: var(--el-color-white);

      .el-icon {
        right: 8px;
      }

      &:hover {
        background-color: var(--el-color-primary);
      }
    }

    .el-menu-item {
      height: 40px;
      margin: 8px auto;
      color: var(--el-color-white);

      &:hover {
        background-color: var(--el-color-primary);
      }

      &.is-active {
        background-color: var(--el-color-primary);
      }
    }
  }
}
</style>
