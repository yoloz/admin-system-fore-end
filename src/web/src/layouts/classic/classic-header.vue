<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useSystemStore } from '@/stores/systemStore'

import BreadCrumb from '../sub-view/bread-crumb.vue'
import SysSetting from '../top-right/system-setting.vue'

const router = useRouter()
const systemStore = useSystemStore()
const { getMenCollapse } = storeToRefs(systemStore)

const { setMenuCollapse } = useSystemStore()

// 页面切换loading效果
const loading = ref<boolean>(false)
const onLoading = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
    }, 300)
}

watch(() => router.currentRoute.value.path, () => {
    onLoading()
})

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
    <section class="custom-bar" v-if="loading">
        <el-progress :percentage="30" :show-text="false" :duration="0.5" :indeterminate="true" />
    </section>
    <div class="hamburger" @click="toggleClick">
        <i class="iconfont icon-is-active" :class="{ 'icon-hamburger1': isActive }"></i>
    </div>
    <div class="header-right">
        <BreadCrumb />
        <SysSetting />
    </div>
    <!-- header设置了position:fixed定位后，下一个div会上移,再设置一个空的div，设置成要占据的高度 -->
    <!-- <div class="header-mk"></div> -->
</template>
<style scoped lang="scss">
.custom-bar {
    position: absolute;
    width: 100%;
    z-index: 99;
    top: 0;
    left: 0;

    :deep(.el-progress-bar__outer) {
        height: 3px !important;
    }
}

.hamburger {
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    margin-right: 12px;
    cursor: pointer;

    .iconfont {
        font-size: 20px;
    }
}

.header-right {
    display: flex;
    width: 100%;
}

.header-mk {
    height: $custom-header-height;
}
</style>