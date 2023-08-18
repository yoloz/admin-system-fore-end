<script lang="ts" setup>
import { computed, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useSystemStore } from '@/stores/systemStore'

import ClassicAside from './classic-aside.vue'
import ClassicHeader from './classic-header.vue'

import BodyView from '../sub-view/body-view.vue'

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
    <el-container class="custom-container" :class="classObj">
        <el-aside class="custom-aside">
            <ClassicAside />
        </el-aside>
        <el-container class="custom-body">
            <el-header class="body-header">
                <ClassicHeader />
            </el-header>
            <el-main class="body-main">
                <BodyView />
            </el-main>
            <el-footer class="custom-footer">
                <custom-footer></custom-footer>
            </el-footer>
        </el-container>
    </el-container>
</template>
<style lang="scss" scoped>
.custom-container {
    width: 100%;
    height: 100%;
}

.shrinkMenu {
    .custom-aside {
        width: 54px !important;
    }

    // .custom-body {
    //     margin-left: 54px !important;
    // }
}

.custom-aside {
    transition: width 0.3s;
    width: $custom-aside-width !important;
    background-color: var(--custom-input-inner-bg);
    height: 100%;
    position: relative;
    border-right: 0.5px solid var(--side-bar-border-right-color);
}

.custom-body {
    // min-width: 1200px;
    background: 'var(--custom-plan-color)';
    transition: margin-left 0.3s;
    // position: relative;
    // margin-left: $custom-aside-width;

    .body-header {
        width: 100%;
        height: $custom-header-height;
        display: flex;
        background: var(--el-menu-bg-color);
        box-shadow: 0px 3px 6px 0px var(--custom-header-shadow);
        user-select: none;
        // justify-content: space-between;
        padding: 0 12px;
        z-index: 999;
    }

    .body-main {
        --el-main-padding: 0 !important;
        overflow: hidden;
    }
}

.custom-footer {
    height: $custom-footer-height;
    display: none;
}
</style>