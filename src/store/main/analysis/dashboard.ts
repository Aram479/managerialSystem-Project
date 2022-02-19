import { Module } from 'vuex' //导入 vuex 模块
import { IDashboardState } from './types' //导入login模块类型
import { IRootState } from '../../types' //导入根store类型
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'
const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [], //商品个数
      categoryGoodsSale: [], //商品销量
      categoryGoodsFavor: [], //商品收藏
      addressGoodsSale: [] //不同城市的销量
    }
  },
  getters: {},
  mutations: {
    //存储商品个数数据
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list.data
    },
    //存储商品个数数据
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list.data
    },
    //存储商品个数数据
    changecategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list.data
    },
    //存储商品个数数据
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list.data
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      /* 获取商品数量 */
      const categoryCountResult = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryCountResult)
      /* 获取商品销量 */
      const categorySaleResult = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categorySaleResult)
      /* 获取上品收藏 */
      const categoryFavorResult = await getCategoryGoodsFavor()
      commit('changecategoryGoodsFavor', categoryFavorResult)
      /* 获取其他城市销量 */
      const addressSSaleResult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressSSaleResult)
    }
  }
}
export default dashboardModule
