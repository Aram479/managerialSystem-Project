<template>
  <div id="pie-echart">
    <BaseEcharts :options="options"></BaseEcharts>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineComponent, defineProps, withDefaults, computed } from 'vue'
import BaseEcharts from '@/Base-UI/echarts/index'
import { IDataType } from '../types/index'
const props = defineProps<{
  pieData: IDataType[]
}>()
/* 饼图数据 */
const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'left'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped></style>
