<template>
  <div
    id="base-eacharts"
    ref="echartsRef"
    :style="{ width: '100%', height: '360px' }"
  ></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import { onMounted, ref, withDefaults, defineProps, watchEffect } from 'vue'
import useEchart from '@/Base-UI/echarts/hooks/useEcharts'
/* 定义props */
const props = defineProps<{
  options: EChartsOption
}>()

const echartsRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions } = useEchart(echartsRef.value!)
  /* 当props.options值改变刷新数据 */
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped>
#base-eacharts {
  width: 100%;
  height: 100%;
}
</style>
