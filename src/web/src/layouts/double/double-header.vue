<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useMenuStore } from '@/stores/menuStore'

import SysLabel from '../top-left/system-label.vue'
import SysSetting from '../top-right/system-setting.vue'

const router = useRouter()

// const menulist = ref<Array<IRouterMenu>>()
const { getRouterMenu } = storeToRefs(useMenuStore())

// 当前选中菜单
const activeIndex = ref<string>('')
const onLoadActiveIndex = (): void => {
    activeIndex.value = '/' + router.currentRoute.value.path.split('/')[1]
}

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
    onLoadActiveIndex()
})

onMounted(() => {
    onLoadActiveIndex()
})
</script>
<template>
    <section class="custom-bar" v-if="loading">
        <el-progress :percentage="30" :show-text="false" :duration="0.5" :indeterminate="true" />
    </section>
    <div class="custom-header-left">
        <div class="header-logo">
            <SysLabel />
        </div>
        <div class="menu-wrapper">
            <el-menu :default-active="activeIndex" :router="true" mode="horizontal" :ellipsis="false">
                <div v-for="(item, index) in getRouterMenu" :key="index">
                    <el-menu-item v-if="!item.meta.hidden" :index="`${item.path}`">
                        <span class="menu-wrapper-title">{{ item.name }}</span>
                    </el-menu-item>
                </div>
            </el-menu>
        </div>
    </div>
    <SysSetting />
    <!-- header设置了position:fixed定位后，下一个div会上移,再设置一个空的div，设置成要占据的高度 -->
    <div class="header-mk"></div>
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

.custom-header-left {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    width: 100%;

    .header-logo {
        height: 100%;
        width: $custom-aside-width;
        position: relative;
    }

    .menu-wrapper {
        width: 100%;
        height: 100%;
        user-select: none;

        &-title {
            width: 60px;
            height: 32px;
            border-radius: 3px;
            text-align: center;
            line-height: 32px;

            &:hover {
                color: #3366ff;
                background-color: var(--custom-menu-hover);
            }
        }

        :deep(.el-menu) {
            height: 100%;
            border: 0;
            overflow: hidden;
            font-size: 14px;

            .el-menu-item.is-active {
                border-bottom: 0 !important;
            }

            .el-sub-menu.is-active {
                .menu-wrapper-title {
                    color: var(--el-color-primary);

                    &::before {
                        content: '';
                        width: 32px;
                        display: inline-block;
                        position: absolute;
                        bottom: 6px;
                        left: 50%;
                        margin-left: -16px;
                        height: 2px;
                        background-color: var(--el-color-primary);
                    }
                }

            }

            .el-menu-item.is-active:before {
                content: '';
                width: 32px;
                display: inline-block;
                position: absolute;
                bottom: 6px;
                left: 50%;
                margin-left: -16px;
                height: 2px;
                background-color: var(--el-color-primary);
            }

            .el-menu-item {
                border-bottom: 0 !important;
            }

            .el-sub-menu .el-sub-menu__title {
                border-bottom: 0 !important;
            }

            .el-sub-menu.is-active .el-sub-menu__title {
                border-bottom: 0 !important;
            }

            .el-sub-menu .el-sub-menu__icon-arrow {
                display: none;
            }
        }
    }
}

.header-mk {
    height: $custom-header-height;
}
</style>@/menus/services/menuServices