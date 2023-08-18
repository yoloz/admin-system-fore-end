<script lang="ts" setup>
interface IPropsType {
    title: string
}
defineProps<IPropsType>()
</script>
<template>
    <div class="custom-card">
        <header>
            {{ title }}
        </header>
        <section>
            <slot name="body"></slot>
        </section>
    </div>
</template>
<style lang="scss" scoped>
.custom-card {
    position: relative;
    min-width: 400px;
    border: 1px solid var(--el-border-color);

    &::before {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 4px;
        content: " ";
        background-color: #0052cc;
        border-radius: 2px;
    }

    header {
        margin-bottom: 10px;
        padding: 16px 12px 0;
        justify-content: space-between;
        line-height: 34px;
        font-weight: 700;
        color: var(--el-text-color-primary);
        font-size: 16px;
    }
    section{
        padding:0 16px 16px;
    }
}
</style>