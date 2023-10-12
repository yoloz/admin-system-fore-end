<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useSystemStore } from '@/stores/systemStore'

import DoubleHeader from './double-header.vue'
import DoubleAside from './double-aside.vue'

import BreadBody from '../sub-view/bread-body.vue'

const { getMenCollapse } = storeToRefs(useSystemStore())

const classObj = computed(() => {
    return {
        shrinkMenu: getMenCollapse.value
    }
})
</script>
<template>
  <el-container>
    <el-header class="page-header">
      <DoubleHeader />
    </el-header>
    <el-container class="page-body" :class="classObj">
      <el-aside class="body-aside">
        <DoubleAside />
      </el-aside>
      <el-main>
        <BreadBody />
      </el-main>
    </el-container>
    <el-footer class="page-footer">
      <custom-footer />
    </el-footer>
  </el-container>
</template>
<style lang="scss" scoped>
.page-header {
  width: 100%;
  height: $top-header-height;
  background: var(--top-header-bg-color);
  box-shadow: 0px 1px 1px 0px var(--top-header-border-shadow);
  user-select: none;
  padding: 0;
  z-index: 999;
  color: var(--el-color-white);
}

.page-body {
  width: 100%;
  height: calc(100vh - $top-header-height);
  background: var(--page-body-bg-color);
}

.shrinkMenu {
  .body-aside {
    width: $left-aside-menu-collapse-width !important;

    :deep(.el-menu--collapse) {
      width: $left-aside-menu-collapse-width !important;
    }
  }
}

.body-aside {
  background-color: var(--left-aside-bg-color);
  overflow: hidden;
  // transition: all 0.2s ease-in;
  border-right: 0.5px solid var(--left-aside-border-right-color);
  width: $left-aside-width;
  color: var(--el-color-white);
}

.page-footer {
  height: $footer-height;
  display: none;
}
</style>
