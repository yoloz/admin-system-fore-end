<script lang="ts" setup>
interface IPropsType {
    type: string
    value: string
}
defineProps<IPropsType>()
</script>
<template>
    <span :class="type">
        <slot></slot>
    </span>
</template>
<style lang="scss" scoped>
span {
    position: relative;
    padding-left: 6px;
    display: inline-flex;
    gap: 8px;
    line-height: 20px;
    align-items: center;
    justify-content: center;

    &::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }
}

.info {
    &::before {
        background-color: #87CEEB;
    }

}

.primary {
    &::before {
        background-color: #00a4da;
    }

}

.warning {
    &::before {
        background-color: #FFD700;
    }
}

.success {
    &::before {
        background-color: #ADFF2F;
    }
}

.error {
    &::before {
        background-color: #ea4e22;
    }
}
</style>