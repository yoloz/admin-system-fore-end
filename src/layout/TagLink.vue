<!-- eslint-disable vue/multi-word-component-names -->
<script setup >
import { storeToRefs } from 'pinia'
import { Close } from '@element-plus/icons-vue'
import { nextTick, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useTagsViewStore } from '../stores/tagViewStore'

const route = useRoute()
const router = useRouter()

const { getVistedViews } = storeToRefs(useTagsViewStore())
const { addVisitedView, delVisitedView, delOthersVisitedViews } = useTagsViewStore()
watch(
    () => route.path,
    () => {
        addTags()
    }
)

onMounted(() => {
    addTags()
})

const isAffix = (tag) => {
    const firstView = getVistedViews.value.at(0)
    if (!firstView) return true
    if (firstView.path === tag.path) return true
    return false
}

// 判断当前点击的item项，是不是当前显示的路由项，如果是则高亮
const isActive = (param) => {
    return route.path === param.path
}

const addTags = () => {
    if (route?.name) {
        addVisitedView(route)
    }
    return false
}

// 关闭当前标签
const closeSelectedTag = (view) => {
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
const toLastView = (visitedViews, view) => {
    // visitedViews.at(-1)获取数组最后一个元素
    const latestView = visitedViews.at(-1)
    if (latestView) {
        router.push(latestView.fullPath)
    } else {
        router.push('/')
    }
}
// const { visible, top, left, selectedTag } = toRefs(state)
</script>
<template>
    <div class="tags-view-container">
        <div class="tags-view-wrapper">
            <router-link v-for="tag in getVistedViews" ref="refTag" :key="tag.path" v-slot="{ navigate }"
                :to="{ path: tag.path, query: tag.query }" custom>
                <div class="tags-view-item" :class="isActive(tag) ? 'active' : ''" @click.middle="''"
                    @contextmenu.prevent="''" @click="navigate">
                    {{ tag.name }}
                    <Close v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
                </div>
            </router-link>
        </div>
        <el-dropdown class="contextmenu">
            <span class="el-dropdown-link">
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item icon="el-icon-refresh-right" @click="refreshSelectedTag">刷新</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-close" @click="closeOthersTags">关闭其他</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
    height: var(--tag-view-height);
    width: 100%;
    background: var(--tags-view-background);
    border-bottom: 1px solid var(--tags-view-border-bottom);
    box-shadow: var(--tags-view-box-shadow);
    position: relative;
    z-index: 10;
    margin-left: 2px;

    .tags-view-wrapper {
        float: left;

        .tags-view-item {
            display: inline-block;
            position: relative;
            cursor: pointer;
            height: 27px;
            line-height: 26px;
            border: 1px solid var(--tags-view-item-border-color);
            color: var(--tags-view-item-color);
            background: var(--tags-view-item-background);
            padding: 0 8px;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 3px;

            &:first-of-type {
                margin-left: 10px;
            }

            &:last-of-type {
                margin-right: 15px;
            }

            &.active {
                background-color: var(--tags-view-item-active-background);
                color: var(--tags-view-item-active-color);
                border-color: var(--tags-view-item-active-border-color);

                &::before {
                    content: '';
                    background: var(--tags-view-background);
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 2px;
                }
            }

            .el-icon-close {
                border-radius: 6px;
                width: 12px;
                height: 12px;
                transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
                transform-origin: 100% 50%;
                vertical-align: -2px;

                &:hover {
                    background-color: var(--tags-view-close-icon-hover-background);
                    color: var(--tags-view-close-icon-hover-color);
                }
            }
        }
    }

    .contextmenu {
        // min-width: 95px;
        height: 100%;
        display: flex;
        align-items: center;
        float: right;

        .el-dropdown-link {
            margin-top: 5px;
            border-left: 1px solid var(--system-header-border-color);
            height: 25px;
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        i {
            color: var(--system-header-text-color);
        }
    }
}
</style>