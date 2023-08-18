<script lang="ts" setup>
import { useSlots } from 'vue'
interface Props { width: string | number }
withDefaults(defineProps<Props>(), { width: '100%' })
// 通过 useSlots 来获取父组件传进来的 slots 数据进行渲染
const footer = !!useSlots().footer
const title = !!useSlots().title
</script>
<template>
  <div class="custom-form-layout">
    <div class="title" v-if="title">
      <div class="title-mark"></div>
      <div class="title-text">
        <slot name="title"></slot>
      </div>
    </div>
    <div class="form" :style="{ width: width }">
      <slot name="form"></slot>
    </div>
    <div class="footer" v-if="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.custom-form-layout {
  padding: 12px;

  .title {
    display: flex;
    align-items: center;
    padding: 5px 0;
    &-mark {
      border-left-color: rgb(35, 98, 251);
      height: 14px;
      border-left-style: solid;
      border-left-width: 4px;
      border-radius: 2px;
    }

    &-text {
      flex-shrink: 0;
      margin-left: 8px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      line-height: 32px;
    }
  }

  .form {

    :deep(.el-select) {
      width: 100%;
    }

    :deep(.el-form-item__content) {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      gap: 24px;
    }

    :deep(.el-form-item) {
      padding: 12px 12px 0;
      margin-bottom: 0;
    }
    :deep(.el-input){
      width: 100% !important;
    }
  }

  .footer {
    margin-top: 42px;

    :deep(.el-button) {

      &:nth-child(1) {
        padding: 8px 46px;
      }

    }
  }
}
</style>