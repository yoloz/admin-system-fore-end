<script lang="ts" setup>
import { useSlots } from 'vue'
const bottom = !!useSlots().bottom
</script>
<template>
  <header class="table-toolbar-header">
    <div class="table-toolbar-header-operate">
      <slot name="left"></slot>
    </div>
    <div class="table-toolbar-header-search">
      <slot name="right"></slot>
    </div>
  </header>
  <section class="table-toolbar-section" v-if="bottom">
    <slot name="bottom"></slot>
  </section>
</template>
<style lang="scss" scoped>
.table-toolbar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  &-operate {
    display: flex;
    align-items: center;
    gap: 10px;
    :deep(.el-input) {
      width: 220px;
      height: 32px
    }

    :deep(.selected—title)  {
      padding-right: 20px;
      font-weight: 600;

      span {
        color: rgb(0, 82, 204);
      }
    }
  }

  &-search {
    display: flex;
    align-items: center;
    gap: 10px;
    :deep(.el-form--inline) {
      .el-form-item {
        margin-bottom: 0;
        margin-right: 20px;

        &:nth-last-child(1) {
          margin-right: 0;
        }
      }

    }
  }
}
:deep(.el-button+.el-button){
  margin: 0;
}
.table-toolbar-section {
  margin-bottom: 12px;
}
</style>