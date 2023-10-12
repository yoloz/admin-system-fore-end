<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ArrowDown, RefreshRight, CircleClose } from '@element-plus/icons-vue'
import { nextTick, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useTagsViewStore } from '@/stores/tagViewStore'

const route = useRoute()
const router = useRouter()

const { getVistedViews } = storeToRefs(useTagsViewStore())
const { addVisitedView, delVisitedView, delOthersVisitedViews } =
  useTagsViewStore()
watch(
    () => route.path,
    () => {
        addTags()
    }
)

onMounted(() => {
    addTags()
})

// const isAffix = (tag: any) => {
//     const firstView = getVistedViews.value.at(0)
//     if (!firstView) return true
//     if (firstView.path === tag.path) return true
//     return false
// }

// 判断当前点击的item项，是不是当前显示的路由项，如果是则高亮
const isActive = (param: { path: any }) => {
    return route.path === param.path
}

const addTags = () => {
    if (route?.name) {
        addVisitedView(route)
    }
    return false
}

// 关闭当前标签
const closeSelectedTag = (view: any) => {
    delVisitedView(view).then((visitedViews) => {
        if (isActive(view)) {
            toLastView(visitedViews, view)
        }
    })
}
// 刷新标签
const refreshSelectedTag = () => {
    const { fullPath } = route
    nextTick(() => {
        router.replace({
            path: `/redirect${fullPath}`
        })
    })
}

// 关闭其他标签
const closeOthersTags = () => {
    delOthersVisitedViews({ path: route.fullPath })
}

// 跳转最后一个标签
const toLastView = (visitedViews: any, view: any) => {
    // visitedViews.at(-1)获取数组最后一个元素
    const latestView = visitedViews.at(-1)
    if (latestView) {
        router.push(latestView.fullPath)
    } else {
        router.push('/')
    }
}
</script>
<template>
  <div class="tags-view-container">
    <div class="tags-view-wrapper">
      <router-link
        v-for="tag in getVistedViews"
        ref="refTag"
        :key="tag.path"
        v-slot="{ navigate }"
        :to="{ path: tag.path, query: tag.query }"
        custom
      >
        <el-tag
          effect="dark"
          :type="isActive(tag) ? '' : 'info'"
          :closable="!isActive(tag)"
          @click="navigate"
          @close="closeSelectedTag(tag)"
        >
          {{ tag.name }}
        </el-tag>
      </router-link>
    </div>
    <el-dropdown class="contextmenu">
      <span class="el-dropdown-link">
        <el-icon>
          <ArrowDown />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="refreshSelectedTag"
            ><el-icon> <RefreshRight /> </el-icon>刷新</el-dropdown-item
          >
          <el-dropdown-item @click="closeOthersTags"
            ><el-icon> <CircleClose /> </el-icon>关闭其他</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  // height: var(--tag-view-height);
  height: $tag-view-height;
  width: 100%;
}

.tags-view-wrapper {
  float: left;
//   margin-left: 10px;
  :deep(.el-tag) {
    margin: 6px;
    cursor: pointer;
  }
}

.contextmenu {
  height: 100%;
  align-items: center;
  float: right;

  .el-dropdown-link {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
