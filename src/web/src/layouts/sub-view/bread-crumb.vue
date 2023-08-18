<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'

import router from '@/router'

const route = useRoute()

const breadcrumbs = ref<RouteLocationMatched[]>([])

const home: any = router.getRoutes().find((item: any) => item.path === '/')

const updateBreadValue = () => {
    // 过滤含有name值,否则没值展示空白
    const mached = route.matched.filter(item => item.name)
    if (home) {
        mached.splice(0, 0, home)
    }
    // eslint-disable-next-line no-console
    // console.log('breadcrumbs:', route.path, mached)
    breadcrumbs.value = mached
}

watch(() => route.path, () => updateBreadValue())

onMounted(() => {
    updateBreadValue()
})

</script>
<template>
    <div class="custom-breadcrumb">
        <span>当前位置:&nbsp;</span>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path" :to="item.path">{{
                item.name
            }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<style lang="scss" scoped>
.custom-breadcrumb {
    height: 100%;
    overflow: hidden;
    font-size: 16px;
    display: flex;
    align-content: center;
    align-items: center;
    flex: none;
}
</style>