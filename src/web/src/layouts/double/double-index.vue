<script lang="ts" setup>

import DoubleHeader from './double-header.vue'
import DoubleAside from './double-aside.vue'

// import BodyView from '../sub-view/body-view.vue'
import BlankView from '../blank-view.vue'

</script>
<template>
  <el-container>
    <el-header class="custom-header">
      <DoubleHeader />
    </el-header>
    <el-container class="custom-body">
      <el-aside class="body-aside">
        <DoubleAside />
      </el-aside>
      <el-main class="body-main">
        <!-- <BodyView/> -->
        <BlankView />
      </el-main>
    </el-container>
    <el-footer class="custom-footer">
      <custom-footer />
    </el-footer>
  </el-container>
</template>
<style lang="scss" scoped>
.custom-header {
  width: 100%;
  height: $custom-header-height;
  display: flex;
  background: var(--el-menu-bg-color);
  box-shadow: 0px 3px 6px 0px var(--custom-header-shadow);
  user-select: none;
  justify-content: space-between;
  padding: 0 12px;
  top: 0;
  z-index: 999;
}

.custom-body {
  width: 100%;
  height: calc(100vh - $custom-header-height);
}

.body-aside {
  position: relative;
  background-color: var(--custom-input-inner-bg);
  overflow: hidden;
  transition: all .2s ease-in;
  border-right: 0.5px solid var(--side-bar-border-right-color);
  width: $custom-aside-width;
  float: left;
  height: 100%;
}

.body-main {
  height: 100%;
  padding: 20px 40px;
}

// .body-main {
//   --el-main-padding: 0 !important;
//   overflow: hidden;
// }

.custom-footer {
  height: $custom-footer-height;
  display: none;
}
</style>