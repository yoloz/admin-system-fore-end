<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { useSystemStore } from '@/stores/systemStore'

import BreadCrumb from '../sub-view/bread-crumb.vue'
import SysSetting from '../top-right/system-setting.vue'

const systemStore = useSystemStore()
const { getMenCollapse } = storeToRefs(systemStore)

const { setMenuCollapse } = useSystemStore()

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
  <el-row :gutter="10" style="width: 100%">
    <el-col :span="1">
      <div class="hamburger" @click="toggleClick">
        <i
          class="iconfont icon-is-active"
          :class="{ 'icon-hamburger1': isActive }"
        ></i>
      </div>
    </el-col>
    <el-col :span="18" class="header-menu">
      <BreadCrumb />
    </el-col>
    <el-col :span="5">
      <SysSetting />
    </el-col>
  </el-row>
  <!-- header设置了position:fixed定位后，下一个div会上移,再设置一个空的div，设置成要占据的高度 -->
  <!-- <div class="header-mk"></div> -->
</template>
<style scoped lang="scss">
.hamburger {
  cursor: pointer;
  line-height: $top-header-height;
  margin-left: 10px;

  .iconfont {
    font-size: 20px;
  }
}

.header-right {
  display: flex;
  width: 100%;
}

.header-mk {
  height: $top-header-height;
}
</style>
