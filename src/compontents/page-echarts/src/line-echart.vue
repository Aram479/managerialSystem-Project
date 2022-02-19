<template>
  <div id="line-echart">
    <BaseEcharts :options="options"></BaseEcharts>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineComponent, defineProps, withDefaults, computed } from 'vue'
import BaseEcharts from '@/Base-UI/echarts/index'
import { IDataType } from '../types/index'
const props = defineProps<{
  title: string
  xLabels: string[]
  values: any[]
}>()
/* 折线图数据 */
const options = computed(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    legend: {
      data: [props.title]
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLabels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: props.title,
        stack: '总量',
        data: props.values,
        type: 'line',
        emphasis: {
          focus: 'servies'
        },
        areaStyle: {}
      }
    ]
  }
})
</script>

<style scoped></style>
