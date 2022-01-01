//定义：post请求泛型,所有接口都可用
export interface IDataType<T = any> {
  code: number
  data: T
}
