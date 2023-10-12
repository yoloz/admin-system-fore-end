<script lang="ts" setup>

const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    basePath: {
        type: String,
        default: ''
    }
})

const resolvePath = (mpath: string) => {
    let rpath = ''
    if (mpath.startsWith('/')) {
        rpath = mpath
    } else if (props.basePath.length > 0) {
        if (props.basePath.startsWith('/')) {
            if (!mpath || mpath === '') {
                rpath = props.basePath
            } else {
                rpath = props.basePath + '/' + mpath
            }
        } else {
            if (!mpath || mpath === '') {
                rpath = '/' + props.basePath
            } else {
                rpath = '/' + props.basePath + '/' + mpath
            }
        }
    } else {
        rpath = '/' + mpath
    }
    // eslint-disable-next-line no-console
    // console.log('reslovepath:', props.basePath + ',' + mpath + ',' + rpath)
    return rpath
}
</script>

<template>
    <template v-if="!item.meta?.hidden">
        <template v-if="!item.children || item.children.length == 0">
            <el-menu-item :index="resolvePath('')">
                <i :class="`iconfont ${item.meta?.icon}`" style="margin-left: 20px;margin-right: 10px;"></i>
                <template #title>
                    <span>{{ item.name }}</span>
                </template>
            </el-menu-item>
        </template>
        <el-sub-menu v-else :index="resolvePath('')">
            <template #title>
                <i :class="`iconfont ${item.meta?.icon}`" style="margin-left: 20px;margin-right: 10px;"></i>
                <span>{{ item.name }}</span>
            </template>
            <menu-item v-for="child in item.children" :key="child.path" :is-nest="true" :item="child"
                :base-path="resolvePath(child.path)" />
        </el-sub-menu>
    </template>
</template>
<style lang="scss" scoped></style>