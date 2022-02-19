import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStoreType } from './types' //导入根接口
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'
import { getPageListData } from '@/service/main/system/system'
const store = createStore<IRootState>({
  state() {
    return {
      name: '',
      age: 0,
      //全部部门
      entireDepartment: [],
      //全部角色
      entireRole: [],
      //全部菜单
      entireMenu: []
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
    },
    //存储全部菜单
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      //请求所有部门数据
      const { list: departmentList } = (
        await getPageListData('/department/list', {
          offset: 0,
          size: 1000
        })
      ).data
      //请求所有角色数据
      const { list: roleList } = (
        await getPageListData('/role/list', {
          offset: 0,
          size: 1000
        })
      ).data
      // 请求所有菜单数据
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      //调用相关mutations
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

/* 自己封装的useStore */
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export function setupStore() {
  //调用login的loadLocalLogin方法
  store.dispatch('login/loadLocalLogin')
}
export default store
