import * as echarts from 'echarts'
// 注册中国地图
import chinaJson from '../data/china.json'
echarts.registerMap('china', chinaJson)
/* 封装echarts hooks */
export default function (el: HTMLElement) {
  //初始化echarts
  const echartsInstance = echarts.init(el)
  const setOptions = (options: echarts.EChartsOption) => {
    echartsInstance.setOption(options)
  }
  //自定义大小
  const updateSize = () => {
    echartsInstance.resize()
  }

  //图表大小随着浏览器变化而变化
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })
  return {
    echartsInstance,
    setOptions,
    updateSize
  }
}
