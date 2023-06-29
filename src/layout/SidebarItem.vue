<template>
  <template v-if="!item.hidden">
    <template v-if="showSidebarItem(item.children, item)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
        <template #title>{{ onlyOneChild.name }}</template>
      </el-menu-item>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title>{{ item.name }}</template>
      <SidebarItem v-for="child in item.children" :key="child.path" :is-nest="true" :item="child"
        :base-path="resolvePath(child.path)" />
    </el-sub-menu>
    <!-- <template v-if="!item.children || item.children.length == 0">
      <el-menu-item :index="resolvePath('')" :class="{ 'submenu-title-noDropdown': !isNest }">
        <template #title>{{ item.name }}</template>
      </el-menu-item>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title>{{ item.name }}</template>
      <SidebarItem v-for="child in item.children" :key="child.path" :is-nest="true" :item="child"
        :base-path="resolvePath(child.path)" />
    </el-sub-menu> -->
  </template>
</template>

<script setup>
import { ref } from 'vue'
import { resolve } from 'path-browserify'

const props = defineProps({
  //每一个router Item
  item: {
    type: Object,
    required: true
  },
  //用于判断是不是子Item,设置响应的样式
  isNest: {
    type: Boolean,
    default: false
  },
  //基础路径，用于拼接
  basePath: {
    type: String,
    default: ''
  }
})

//显示sidebarItem 的情况
const onlyOneChild = ref()
const showSidebarItem = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    } else {
      return true
    }
  })

  if (showingChildren.length === 1 && !parent?.alwaysShow) {
    onlyOneChild.value = showingChildren[0]
    return true
  }
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noChildren: true }
    return true
  }
  return false
}

const resolvePath = (routePath) => {
  return resolve(props.basePath, routePath)
}
</script>
