import { Module } from 'vuex' //导入 vuex 模块
import { ILoginState } from './types' //导入login模块类型
import { IRootState } from '../types' //导入根store类型
import {
  actLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import { IAccount } from '@/service/login/type'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'
import localCache from '@/utils/cache'
import router from '@/router'
//定义Module<S,R>泛型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    //存储localstorage的token
    changeToken(state, token: string) {
      state.token = token
    },
    //存储localstorage的userInfo
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    //存储localstorage的userMenus
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      //获取utils下的map-menus过滤好的子路由
      const routes = mapMenusToRoutes(userMenus)
      //将子路由添加到main路由
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      //获取用户所有权限
      const permissions = mapMenusToPermissions(userMenus)
      //存储到vuex中
      state.permissions = permissions
    }
  },
  actions: {
    /* 每次刷新页面保持state某些数据有值，不会被清空 */
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
    //获取账号和密码值
    async actLoginAction({ commit }, payload: IAccount) {
      /* 用户登录成功信息 */
      const loginResult = await actLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)
      /* 用户请求信息 */
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      /* 请求用户菜单 */
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      /* 登录成功后跳转首页 */
      router.push('/main')
    }

    //获取手机号和验证码值
    /* phoneLoginAction({ commit }, payload: any) {
      console.log('执行phoneactAction', payload)
    } */
  },
  modules: {}
}

export default loginModule
