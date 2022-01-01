import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStoreType } from './types' //导入根接口
import login from './login/login'
import system from './main/system/system'
import { getPageListData } from '@/service/main/system/system'
const store = createStore<IRootState>({
  state() {
    return {
      name: '',
      age: 0,
      //全部部门
      entireDepartment: [],
      //全部角色
      entireRole: []
    }
  },
  mutations: {
    //存储全部部门
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    //存储全部角色
    changeEntireRole(state, list) {
      state.entireRole = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      //请求所欲部门数据
      const { list: departmentList } = (
        await getPageListData('/department/list', {
          offset: 0,
          size: 1000
        })
      ).data
      //请求所有角色数据
      const { list: role } = (
        await getPageListData('/role/list', {
          offset: 0,
          size: 1000
        })
      ).data
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', role)
    }
  },
  modules: {
    login,
    system
  }
})

/* 自己封装的useStore */
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export function setupStore() {
  //调用login的loadLocalLogin方法
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}
export default store
