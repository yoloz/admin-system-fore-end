<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useSystemStore } from '@/stores/systemStore'

import BreadCrumb from './bread-crumb.vue'

import BlankView from '../blank-view.vue'

const systemStore = useSystemStore()
const { getMenCollapse } = storeToRefs(systemStore)
const { setMenuCollapse } = systemStore

const isActive = ref<boolean>(false)
// 切换左侧栏关闭和隐藏
const toggleClick = () => {
    if (isActive.value) {
        setMenuCollapse(false)
    } else {
        setMenuCollapse(true)
    }
    isActive.value = getMenCollapse.value
}
</script>
<template>
  <div class="body-bread">
    <div class="hamburger" @click="toggleClick">
      <i
        class="iconfont icon-hamburger-left"
        :class="{ 'icon-hamburger-right': isActive }"
      ></i>
    </div>
    <BreadCrumb />
  </div>
  <div class="body-view">
    <BlankView />
  </div>
</template>
<style lang="scss" scoped>
.body-bread {
  // height: $tag-view-height;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}
.body-bread .hamburger {
  cursor: pointer;
  margin-right: 20px;

  .iconfont {
    font-size: 20px;
  }
}

.body-view {
  // height: calc(100vh - var(--tag-view-height));
  width: 100%;
  height: calc(100% - $tag-view-height);
  background: var(--main-body-bg-color);
  margin-top: 10px;
  padding: 10px;
  overflow: auto;
}
</style>
