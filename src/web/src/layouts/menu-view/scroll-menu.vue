<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElScrollbar } from 'element-plus'

import { useSystemStore } from '@/stores/systemStore'
import { IRouterMenu } from '@/menus/entity/menu'

import MenuItem from './menu-item.vue'

const systemStore = useSystemStore()
const { getMenCollapse } = storeToRefs(systemStore)

// const router = useRouter()
const route = useRoute()

interface Props {
    item: IRouterMenu[],
    basePath: string // parent path
}

const props = withDefaults(defineProps<Props>(), {
    item: () => [],
    basePath: () => ''
})

const scrollMenusRef = ref<InstanceType<typeof ElScrollbar>>()

// 滚动条滚动到激活菜单所在位置
const verticalMenusScroll = () => {
    nextTick(() => {
        const activeMenu: HTMLElement | null = document.querySelector('.el-menu li.is-active')
        if (!activeMenu) return false
        // eslint-disable-next-line no-console
        // console.log('verticalMenusScroll:', activeMenu.offsetTop)
        scrollMenusRef.value?.setScrollTop(activeMenu.offsetTop)
    })
}

onMounted(() => {
    verticalMenusScroll()
})

const resolvePath = (mpath: string) => {
    let rpath = ''
    if (props.basePath.length > 0) {
        rpath = props.basePath + '/' + mpath
    } else {
        rpath = mpath
    }
    // eslint-disable-next-line no-console
    // console.log('reslovepath:', props.basePath + ',' + mpath + ',' + rpath)
    return rpath
}

</script>

<template>
    <el-scrollbar ref="scrollMenusRef" class="vertical-menu-scrollbar">
        <el-menu :collapse="getMenCollapse" router :default-active="route.path">
            <!-- :base-path="props.basePath ? props.basePath : route.path" -->
            <MenuItem v-for="route in props.item" :key="route.path" :item="route" :base-path="resolvePath(route.path)" />
        </el-menu>
    </el-scrollbar>
</template>
<style lang="scss" scoped>
.vertical-menu-scrollbar {
    width: 100%;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 4px;
    background: var(--custom-input-inner-bg);
    color: var(--custom-menu-item);
    padding-left: 10px;

    :deep(.el-menu) {
        border: none;
        background-color: var(--custom-input-inner-bg);

        .el-sub-menu__title {
            height: 40px;

            .el-icon {
                right: 8px;
            }

            &:hover {
                background-color: var(--el-menu-item-bg-color);
            }
        }

        .el-menu-item {
            height: 40px;
            margin: 8px auto;

            &:hover {
                background-color: var(--el-menu-item-bg-color);
            }

            &.is-active {
                --el-menu-active-color: var(--el-text-color-primary);
                background-color: var(--el-menu-item-bg-color);
            }
        }

    }
}
</style>@/menus/entity/menu