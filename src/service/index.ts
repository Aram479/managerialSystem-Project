import ZPRequest from './requset/index'
import { BASE_URL, TIME_OUT } from './requset/config'
import localCache from '@/utils/cache'
//创建接口实例
const zpRequest = new ZPRequest({
  baseURL: BASE_URL, //默认地址
  timeout: TIME_OUT, //默认请求时间
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})
export default zpRequest
