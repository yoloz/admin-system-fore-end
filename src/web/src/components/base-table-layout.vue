<script lang="ts" setup>
/**
 * FBI
 * 表格页面通用布局方式
 * huangbaolin
 */
import { useSlots } from 'vue'
const slotTree = !!useSlots().tree
</script>
<template>
  <div style="width:100%">
    <section class="custom-table-layout">
      <div class="custom-table-layout-table">
        <slot name="header" />
        <slot name="toolbar" />
        <slot name="table" />
      </div>
      <div class="custom-table-layout-tree" v-if="slotTree">
        <slot name="tree" />
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.custom-table-layout {
  display: flex;
  position: relative;
  &-tree {
    margin-left: 16px;
    width: 200px;
    overflow: hidden;

    :deep(.el-tree) {
      margin-top: 12px;

      .tree-label {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  &-table {
    margin-bottom: 12px;
    // width: calc(100% - 276px);
    width: 100%;
    flex: 1;
    padding-bottom: 12px;
  }
}
</style>