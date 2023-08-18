<script lang="ts" setup>

import { storeToRefs } from 'pinia'

import { useMenuStore } from '@/stores/menuStore'

import SysLabel from '../top-left/system-label.vue'
import ScrollMenu from '../menu-view/scroll-menu.vue'

// const menulist = ref<Array<IRouterMenu>>()
const { getRouterMenu } = storeToRefs(useMenuStore())

</script>
<template>
    <el-container style="height: 100%;width: 100%;">
        <el-header class="aside-header">
            <SysLabel />
        </el-header>
        <el-main class="aside-main">
            <ScrollMenu :item="getRouterMenu" />
        </el-main>
    </el-container>
</template>
<style lang="scss" scoped>
.aside-header {
    background: var(--el-menu-bg-color);
    height: $custom-header-height;
    // border-bottom: 0.5px solid var(--side-bar-border-right-color);
    box-shadow: 0px 3px 6px 0px var(--custom-header-shadow);
}

.aside-main {
    --el-main-padding: 0 !important;
}
</style>@/menus/services/menuServices