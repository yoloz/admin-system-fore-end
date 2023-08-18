<script lang="ts" setup>
interface IPropsType { title: string }
defineProps<IPropsType>()
</script>
<template>
    <div class="custom-title">{{ title }}</div>
</template>
<style lang="scss" scoped>
.custom-title {
    opacity: 1;
    font-weight: bold;
    position: relative;
    text-indent: 14px;
    margin: 24px 0 16px;

    &::after {
        content: "";
        width: 6px;
        background: var(--el-color-primary);
        height: 15px;
        position: absolute;
        left: 0;
        border-radius: 2px;
        top: 2px;
    }
}
</style>