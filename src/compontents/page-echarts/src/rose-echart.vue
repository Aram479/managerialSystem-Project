<template>
  <div id="rose-echart">
    <BaseEcharts :options="options"></BaseEcharts>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, reactive, ref, defineProps } from 'vue'
import BaseEcharts from '@/Base-UI/echarts/index'
import { IDataType } from '../types/index'
const props = defineProps<{
  roseData: IDataType[]
}>()
/* 玫瑰图数据 */
const options = computed(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '类别数据',
        type: 'pie',
        radius: [10, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData,
        label: {
          show: true
        }
      }
    ]
  }
})
</script>

<style scoped></style>
