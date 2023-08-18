<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

import { useSystemStore } from '@/stores/systemStore'

const router = useRouter()
const { getSystemInfo, getMenCollapse } = storeToRefs(useSystemStore())

const onToRouter = (path: string | undefined): void => {
    if (path !== undefined) {
        router.push('/' + path)
    }
}

const classObj = computed(() => {
    return {
        hide: getMenCollapse.value
    }
})

</script>
<template>
    <div class="systag" :class="classObj" @click="onToRouter('')">
        <img class="logo" :src="getSystemInfo.path">
        <h1 class="label">{{ getSystemInfo.name }}</h1>
    </div>
</template>
<style scoped lang="scss">
.systag {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    cursor: pointer;
    flex: none;

    img.logo {
        width: 32px;
        height: 32px;
        border-radius: 50%;
    }

    h1.label {
        margin-left: 12px;
        font-size: 16px;
        font-weight: 400;
        user-select: none;
        font-family: "PingFang-bold"
    }
}

.hide {
    h1.label {
        display: none;
    }
}
</style>