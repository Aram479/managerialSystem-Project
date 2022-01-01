import _ from 'lodash'
import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemState } from './types'
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    /* 根据传入的pageName返回不同的list */
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    /* 根据传入的pageName返回不同的total */
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    //存储用户列表
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    //存储用户个数
    changeUsersCount(state, pageCount: number) {
      state.usersCount = pageCount
    },
    //存储角色列表
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    //存储角色个数
    changeRoleCount(state, pageCount: number) {
      state.roleCount = pageCount
    },
    //存储商品列表
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    //存储商品个数
    changeGoodsCount(state, pageCount: number) {
      state.goodsCount = pageCount
    },
    //存储菜单列表
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    //存储菜单个数
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  actions: {
    //获取数据接口
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      /* 根据传来的路径，获取对应路径 */
      const pageUrl = `/${pageName}/list`

      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      const { list, totalCount } = pageResult.data
      //根据pageName调用不同存储方法  capitalize 首字母大写
      commit(`change${_.capitalize(pageName)}List`, list)
      commit(`change${_.capitalize(pageName)}Count`, totalCount)
    },
    /* 删除页面数据 */
    async deletePageDataAction({ dispatch }, payload: any) {
      //获取当前页面名字，和要删除行的id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      //用户id小于10不能删除
      await deletePageData(pageUrl)
      //删除后重新获取新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    //请求新建数据接口
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)

      //重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    //请求编辑数据接口
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      //重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}
export default systemModule
