<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
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
  item: IRouterMenu[];
  basePath: string; // parent path
}

const props = withDefaults(defineProps<Props>(), {
    item: () => [],
    basePath: () => ''
})

const scrollMenusRef = ref<InstanceType<typeof ElScrollbar>>()

// 滚动条滚动到激活菜单所在位置
const verticalMenusScroll = () => {
    nextTick(() => {
        const activeMenu: HTMLElement | null = document.querySelector(
            '.el-menu li.is-active'
        )
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
  <el-scrollbar ref="scrollMenusRef">
    <el-menu :collapse="getMenCollapse" router :default-active="route.path">
      <!-- :base-path="props.basePath ? props.basePath : route.path" -->
      <MenuItem
        v-for="route in props.item"
        :key="route.path"
        :item="route"
        :base-path="resolvePath(route.path)"
      />
    </el-menu>
  </el-scrollbar>
</template>
<style lang="scss" scoped />
