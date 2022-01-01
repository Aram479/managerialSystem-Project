import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { ZPRequestInterceptors, ZPRequestConfig } from './types'
import { showLoading, hideLoading } from './loading' //封装loading组件

const DEAFULT_LOADING = true //设置常量默认值

class ZPRequest {
  //存储接口数据
  instance: AxiosInstance
  //存储hooks
  interceptors?: ZPRequestInterceptors
  isLoading: boolean
  //constructor获取传递来的接口参数
  constructor(config: ZPRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    //如果config.isLoading没有传值，则默认值为true
    this.isLoading = config.isLoading ?? DEAFULT_LOADING

    /* 实例拦截：拦截实例请求 */
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    /* 全局拦截：拦截所有请求 */
    this.instance.interceptors.request.use(
      (config) => {
        //若isLoading为true则显示loading组件
        if (this.isLoading === true) {
          showLoading()
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        //当响应成功时停止loading组件
        hideLoading()
        //拦截错误信息
        if (data.returnCode === '-1001') {
          console.log('请求失败,错误信息')
        } else {
          return data
        }
      },
      (err) => {
        //拦截错误类型，输出对应错误信息
        if (err.response.status === 404) {
          console.log('404,请求错误')
        }
        return err
      }
    )
  }

  /* 单独请求拦截：拦截调用时请求 */
  //设置instance的request请求方法，传入config参数
  request<T = any>(config: ZPRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //若config.isLoading为false，则表示不启用loading组件
      if (config.isLoading === false) {
        this.isLoading = config.isLoading
      }
      //如果config参数有请求拦截器
      if (config.interceptors?.requestInterceptor) {
        //则config等于请求成功处理后的数据
        config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          //如果config参数有响应拦截器
          if (config.interceptors?.responseInterceptor) {
            //则响应数据等于响应成功处理后的数据
            res = config.interceptors.responseInterceptor(res)
          }
          this.isLoading = DEAFULT_LOADING //响应成功结束后改回默认值
          resolve(res)
          hideLoading()
        })
        .catch((err) => {
          this.isLoading = DEAFULT_LOADING //响应失败结束后改回默认值
          reject(err)
          return err
        })
    })
  }
  get<T = any>(config: ZPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: ZPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: ZPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: ZPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default ZPRequest
