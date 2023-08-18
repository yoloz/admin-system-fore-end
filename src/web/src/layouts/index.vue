<script lang="ts">

import { storeToRefs } from 'pinia'

import { useSystemStore } from '@/stores/systemStore'

import Double from './double/double-index.vue'
import Classic from './classic/classic-index.vue'

export default {
    components: { Double, Classic },
    setup() {
        const systemStore = useSystemStore()
        const { getLayout } = storeToRefs(systemStore)
        return {
            getLayout
        }
    }
}
</script>

<template>
    <component :is="getLayout.layoutMode"></component>
</template>