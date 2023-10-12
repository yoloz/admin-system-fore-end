<script lang="ts" setup>
import TagsView from './tags-view.vue'

import BlankView from '../blank-view.vue'
</script>
<template>
  <TagsView />
  <!-- <div class="body-container"> -->
  <div class="body-view">
    <BlankView />
  </div>
  <!-- </div> -->
</template>
<style lang="scss" scoped>
.tags-view {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}

.body-container {
  width: 100%;
  //   height: calc(100% - $tag-view-height);
  padding: 0;
}
.body-view {
  width: 100%;
  height: calc(100% - $tag-view-height - 10px);
  background: var(--main-body-bg-color);
  margin-top: 10px;
  padding: 10px;
  overflow: auto;
}
</style>
