<script lang="ts" setup>
import { ArrowRightBold } from '@element-plus/icons-vue'
import { ref } from 'vue'

interface IPropsType {
    title: string
}
defineProps<IPropsType>()

const shutdown = ref<boolean>(false)
const close = () => { shutdown.value = !shutdown.value }

</script>
<template>
    <div class="custom-collapse">
        <header @click="close">
            <el-icon class="header-icon" :class="shutdown ? 'icon-rotate' : ''">
                <ArrowRightBold />
            </el-icon>
            <h4>{{ title }}</h4>
        </header>
        <section v-if="shutdown" :style="{ padding: shutdown ? '10px' : '0px' }">
            <slot name="body"></slot>
        </section>
    </div>
</template>
<style lang="scss" scoped>
.custom-collapse {
    width: 100%;
    border: 1px solid var(--el-border-color);
    margin-bottom: 5px;

    header {
        width: 100%;
        height: 40px;
        padding: 0 10px;
        cursor: pointer;
        background-color: var(--custom-body-color);
        display: flex;
        align-items: center;
        gap: 10px;
        user-select: none;

        h4 {
            font-weight: 600;
        }

        .header-icon {
            transition: all .3s;
        }

        .icon-rotate {
            transform: rotate(90deg);
        }
    }
}
</style>