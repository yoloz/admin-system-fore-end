<script lang="ts" setup>
import TagsView from './tags-view.vue'

import BlankView from '../blank-view.vue'
</script>
<template>
    <TagsView />
    <div class="body-view">
        <BlankView />
    </div>
</template>
<style lang="scss" scoped>
.body-view {
    height: calc(100% - var(--tag-view-height));
    padding: 20px 40px;
    overflow: auto;
}
</style>