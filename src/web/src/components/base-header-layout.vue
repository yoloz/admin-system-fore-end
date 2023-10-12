<script lang="ts" setup>
</script>
<template>
  <div class="table-header" style="width:100%">
    <div class="table-header-label">
      <slot name="left" />
    </div>
    <div>
      <slot name="right" />
    </div>

  </div>
</template>
<style lang="scss" scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  &-label {
    font-size: 24px;
    font-weight: 500;
  }
}
</style>
