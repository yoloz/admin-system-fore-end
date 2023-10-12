<script lang="ts" setup>
import { computed, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useSystemStore } from '@/stores/systemStore'

import ClassicAside from './classic-aside.vue'
import ClassicHeader from './classic-header.vue'

import TagBody from '../sub-view/tag-body.vue'

const systemStore = useSystemStore()
const { getMenCollapse } = storeToRefs(systemStore)
const { setMenuCollapse } = systemStore

const classObj = computed(() => {
    return {
        shrinkMenu: getMenCollapse.value
    }
})

const { body } = document

const autoMenuCollapse = () => {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < 992
}
const resizeHandler = () => {
    if (!document.hidden) {
        if (autoMenuCollapse()) {
            setMenuCollapse(true)
        } else {
            setMenuCollapse(false)
        }
    }
}
onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler)
})
onMounted(() => {
    if (autoMenuCollapse()) {
        setMenuCollapse(true)
    } else {
        setMenuCollapse(false)
    }
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
})
</script>
<template>
  <el-container class="page-container" :class="classObj">
    <el-aside class="left-aside">
      <ClassicAside />
    </el-aside>
    <el-container class="page-body">
      <el-header class="body-header">
        <ClassicHeader />
      </el-header>
      <el-main class="body-main">
        <TagBody />
      </el-main>
      <el-footer class="footer">
        <custom-footer></custom-footer>
      </el-footer>
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
}

.shrinkMenu {
  .left-aside {
    width: $left-aside-menu-collapse-width !important;

    :deep(.el-menu--collapse) {
      width: $left-aside-menu-collapse-width !important;
    }
  }
}

.left-aside {
  // transition: width 0.3s;
  width: $left-aside-width;
  background-color: var(--left-aside-bg-color);
  height: 100%;
  position: relative;
  border-right: 1px solid var(--left-aside-border-right-color);
}

.page-body {
  height: 100%;
  width: calc(100vh - $left-aside-width);
}

.page-body .body-header {
  width: 100%;
  height: $top-header-height;
  display: flex;
  box-shadow: 0px 1px 1px 0px var(--top-header-border-shadow);
  background: var(--top-header-bg-color);
  user-select: none;
  padding: 0;
  z-index: 999;
  color: var(--el-color-white);

  :deep(.el-breadcrumb__inner) {
    color: var(--el-color-white);
  }
}

.page-body .body-main {
  //   --el-main-padding: 0 !important;
  padding-top: 0 !important;
  height: calc(100% - $top-header-height);
  background: var(--page-body-bg-color);
  overflow: hidden;
}

.footer {
  height: $footer-height;
  display: none;
}
</style>
