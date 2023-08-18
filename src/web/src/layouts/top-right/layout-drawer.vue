<script setup lang="ts">
// import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useSystemStore } from '@/stores/systemStore'

// const router = useRouter()

const drawer = ref(false)

const systemStore = useSystemStore()
const { getLayout } = storeToRefs(systemStore)
const { setLayout } = useSystemStore()

const onCloseDrawer = () => {
    drawer.value = false
}

const open = () => {
    drawer.value = true
}
defineExpose({ open })
</script>
<template>
    <div class="layout-config-drawer">
        <el-drawer v-model="drawer" title="布局配置" size="310px" @close="onCloseDrawer">
            <el-scrollbar class="layout-mode-style-scrollbar">
                <el-form ref="formRef" :model="getLayout">
                    <div class="layout-mode-styles-box">
                        <el-divider border-style="dashed">布局方式</el-divider>
                        <div class="layout-mode-box-style">
                            <el-row class="layout-mode-box-style-row" :gutter="10">
                                <el-col :span="12">
                                    <div @click="setLayout('Classic')" class="layout-mode-style classic"
                                        :class="getLayout.layoutMode == 'Classic' ? 'active' : ''">
                                        <div class="layout-mode-style-box">
                                            <div class="layout-mode-style-aside"></div>
                                            <div class="layout-mode-style-container-box">
                                                <div class="layout-mode-style-header"></div>
                                                <div class="layout-mode-style-container"></div>
                                            </div>
                                        </div>
                                        <div class="layout-mode-style-name">经典</div>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div @click="setLayout('Double')" class="layout-mode-style double"
                                        :class="getLayout.layoutMode == 'Default' ? 'active' : ''">
                                        <div class="layout-mode-style-box">
                                            <div class="layout-mode-style-aside"></div>
                                            <div class="layout-mode-style-container-box">
                                                <div class="layout-mode-style-header"></div>
                                                <div class="layout-mode-style-container"></div>
                                            </div>
                                        </div>
                                        <div class="layout-mode-style-name">双栏</div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-form>
            </el-scrollbar>
        </el-drawer>
    </div>
</template>

<style scoped lang="scss">
.layout-config-drawer :deep(.el-input__inner) {
    padding: 0 0 0 6px;
}

.layout-config-drawer :deep(.el-input-group__append) {
    padding: 0 10px;
}

.layout-config-drawer :deep(.el-drawer__header) {
    margin-bottom: 0 !important;
}

.layout-config-drawer :deep(.el-drawer__body) {
    padding: 0;
}

.layout-mode-styles-box {
    padding: 20px;
}

.layout-mode-box-style-row {
    margin-bottom: 15px;
}

.layout-mode-style {
    position: relative;
    height: 100px;
    border: 1px solid var(--el-border-color-light);
    border-radius: var(--el-border-radius-small);

    &:hover,
    &.active {
        border: 1px solid var(--el-color-primary);
    }

    .layout-mode-style-name {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--el-color-primary-light-5);
        border-radius: 50%;
        height: 50px;
        width: 50px;
        border: 1px solid var(--el-color-primary-light-3);
    }

    .layout-mode-style-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    &.classic {
        display: flex;
        align-items: center;
        justify-content: center;

        .layout-mode-style-aside {
            width: 18%;
            height: 100%;
            background-color: var(--el-border-color-lighter);
        }

        .layout-mode-style-container-box {
            width: 82%;
            height: 100%;

            .layout-mode-style-header {
                width: 100%;
                height: 10%;
                background-color: var(--el-border-color);
            }

            .layout-mode-style-container {
                width: 100%;
                height: 90%;
                background-color: var(--el-border-color-extra-light);
            }
        }
    }

    &.double {
        display: flex;
        align-items: center;
        justify-content: center;

        .layout-mode-style-aside {
            width: 18%;
            height: 100%;
            background-color: var(--el-border-color);
        }

        .layout-mode-style-container-box {
            width: 82%;
            height: 100%;

            .layout-mode-style-header {
                width: 100%;
                height: 10%;
                background-color: var(--el-border-color);
            }

            .layout-mode-style-container {
                width: 100%;
                height: 90%;
                background-color: var(--el-border-color-extra-light);
            }
        }
    }
}
</style>
