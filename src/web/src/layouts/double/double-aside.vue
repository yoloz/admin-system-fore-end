<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ScrollMenu from '../menu-view/scroll-menu.vue'

const route = useRoute()
const router = useRouter()
const menuRouter = ref<any>()

menuRouter.value = router
    .getRoutes()
    .find((item) => item.path === `/${route.path.split('/')[1]}`)

watch(
    () => route.path,
    (n) => {
        menuRouter.value = router
            .getRoutes()
            .find((item) => item.path === `/${n.split('/')[1]}`)
    }
)
</script>
<template>
  <el-container>
    <el-header class="aside-header">
      <div class="logo">
        <i :class="`iconfont ${menuRouter.meta?.icon}`"></i>
      </div>
      <div class="body">
        <p class="title">{{ menuRouter.name }}</p>
        <p class="desc">{{ menuRouter.meta?.description }}</p>
      </div>
    </el-header>
    <el-main class="aside-body">
      <ScrollMenu :item="menuRouter?.children" :base-path="menuRouter?.path" />
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>
.aside-header {
  padding-left: 20px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  // text-align: left;
  border-bottom: 1px solid var(--left-aside-border-color-lighter);
}

.aside-header .logo {
  width: 28px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  // background-color: var(--el-color-primary);
  color: #ffffff;
  border-radius: 4px;

  .iconfont {
    font-size: 20px;
  }
}

.aside-header .body {
  margin-left: 10px;
  overflow: hidden;
  // font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;

  .title {
    margin-bottom: 2px;
    font-weight: bold;
  }

  .desc {
    font-size: 12px;
  }
}

.aside-body {
  --el-main-padding: 0 !important;

  :deep(.el-menu) {
    border: none;
    background-color: var(--left-aside-bg-color);

    .el-sub-menu__title {
      height: 40px;

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
