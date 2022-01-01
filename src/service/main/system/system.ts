import zpRequest from '@/service/index'
import { IDataType } from '@/service/types'
/* 请求页面数据 */
export function getPageListData(url: string, queryInfo: any) {
  return zpRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
/* 请求删除数据 */
export function deletePageData(url: string) {
  return zpRequest.delete<IDataType>({
    url: url
  })
}
/* 新建用户数据 */
export function createPageData(url: string, newData: any) {
  return zpRequest.post<IDataType>({
    url: url,
    data: newData
  })
}
/* 更新用户数据 */
export function editPageData(url: string, editData: any) {
  return zpRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
