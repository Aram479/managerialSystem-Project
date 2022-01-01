import type { AxiosRequestConfig, AxiosResponse } from 'axios'
interface ZPRequestInterceptors<T = AxiosResponse> {
  //请求拦截
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  //请求错误
  requestInterceptorCatch?: (error: any) => any
  //响应拦截
  responseInterceptor?: (res: T) => T
  //响应错误
  responseInterceptorCatch?: (error: any) => any
}
//继承AxiosRequestConfig并设置interceptors成员，其值为ZPRequestInterceptors定义的成员，意味着interceptors是一个对象
interface ZPRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZPRequestInterceptors<T>
  isLoading?: boolean
}
export { ZPRequestInterceptors, ZPRequestConfig }
