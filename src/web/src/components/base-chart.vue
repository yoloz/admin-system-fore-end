<script lang="ts" setup>
import * as ECharts from 'echarts'
import { ref, onMounted, watch, shallowRef } from 'vue'
const chartDom = shallowRef()
const myChart = shallowRef()
const loading = ref<boolean>(false)
type PropsType = {
    options: any
}
const props = withDefaults(defineProps<PropsType>(), {
    options: null
})
const resizeHandler = () => {
    myChart.value.resize()
}
const init = (option: any) => {
    loading.value = true
    if (option && myChart) {
        setTimeout(() => {
            if (!myChart.value) {
                myChart.value = ECharts.init(chartDom.value)
            }
            myChart.value.setOption(props.options, true)
            window.addEventListener('resize', resizeHandler)
            loading.value = false
        }, 500)
    } else {
        loading.value = false
    }
}
onMounted(() => { init(props.options) })

watch(() => props.options, (n) => {
    init(n)
}, {
    deep: true
})
</script>
<template>
    <div v-loading="loading" class='ued-chart' ref="chartDom"></div>
</template>
<style lang="scss" scope>

</style>
