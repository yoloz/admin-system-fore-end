<script lang="ts" setup>
// import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ScrollMenu from '../menu-view/scroll-menu.vue'

const route = useRoute()
const router = useRouter()
const menuRouter = ref<any>()

menuRouter.value = router.getRoutes().find((item) => item.path === `/${route.path.split('/')[1]}`)

watch(() => route.path, (n) => {
    menuRouter.value = router.getRoutes().find((item) => item.path === `/${n.split('/')[1]}`)
})

</script>
<template>
    <div class="wapper-menu-header">
        <div class="flexbox">
            <div class="flexbox-logo">
                <i :class="`iconfont ${menuRouter.meta?.icon}`"></i>
            </div>
            <div class="flexbox-body">
                <p class="title">{{ menuRouter.name }}</p>
                <p class="desc">{{ menuRouter.meta?.description }}</p>
            </div>
        </div>
    </div>
    <ScrollMenu :item="menuRouter?.children" :base-path="menuRouter?.path" />
</template>
<style lang="scss" scoped>
.wapper-menu-header {
    display: flex;
    align-items: center;
    padding: 24px 8px 16px;
    border-bottom: 2px solid var(--el-border-color-lighter);

    .flexbox {
        padding: 8px 10px;
        display: flex;
        align-items: center;
        width: 100%;
        text-align: left;

        overflow: hidden;
        font-weight: 400;
        text-overflow: ellipsis;
        white-space: nowrap;

        &-logo {
            width: 28px;
            height: 28px;
            text-align: center;
            line-height: 28px;
            background-color: var(--el-color-primary);
            color: #ffffff;
            border-radius: 4px;

            .iconfont {
                font-size: 20px;
            }
        }

        &-body {
            margin-left: 16px;
            overflow: hidden;

            .title {
                margin-bottom: 2px;
                font-weight: bold;
            }

            .desc {
                font-size: 12px;
            }
        }
    }

}
</style>