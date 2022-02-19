<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <ZpCard title="分类商品数量(饼图)">
          <PieEchart :pieData="categoryGoodsCount"></PieEchart>
        </ZpCard>
      </el-col>
      <el-col :span="10">
        <ZpCard title="不同城市商品销量">
          <MapEchart :mapData="addressGoodsSale"></MapEchart>
        </ZpCard>
      </el-col>
      <el-col :span="7">
        <ZpCard title="分类商品数量(玫瑰图)">
          <RoseEchart :roseData="categoryGoodsCount"></RoseEchart>
        </ZpCard>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <ZpCard title="分类商品销量">
          <LineEchart v-bind="categoryGoodsSale"></LineEchart>
        </ZpCard>
      </el-col>
      <el-col :span="12">
        <ZpCard title="分类商品的收藏">
          <BarEchart v-bind="categoryGoodsSale"></BarEchart>
        </ZpCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from '@/store/index'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/compontents/page-echarts/index'
import ZpCard from '@/Base-UI/card/index'
export default defineComponent({
  name: 'dashboard',
  setup() {
    const store = useStore()
    const echartsRef = ref<HTMLElement>()
    store.dispatch('dashboard/getDashboardDataAction')

    /* 图表接口数据 */
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    /* 折线图数据 */
    const categoryGoodsSale = computed(() => {
      const title = '分类销量统计'
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return {
        title,
        xLabels,
        values
      }
    })
    /* 地图数据 */
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    return {
      echartsRef,
      categoryGoodsCount,
      categoryGoodsSale,
      addressGoodsSale
    }
  },
  components: {
    ZpCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  }
})
</script>

<style scoped>
.dashboard {
  background-color: #f0f2f5;
}
.content-row {
  margin-top: 20px;
}
</style>
