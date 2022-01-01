import zpRequest from '../index'
import { IAccount, ILoginRequest } from './type'
import { IDataType } from '../types'
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}
export function actLoginRequest(account: IAccount) {
  return zpRequest.post<IDataType<ILoginRequest>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

/* 用户请求信息 */
export function requestUserInfoById(id: number) {
  return zpRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    isLoading: false
  })
}

/* 请求用户菜单 */
export function requestUserMenusByRoleId(id: number) {
  return zpRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    isLoading: false
  })
}
