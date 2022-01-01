import { useStore } from '@/store/index'
export function userPermission(pageName: string, handleName: string) {
  const store = useStore()
  //从vuex获取用户的所有权限
  const permissions = store.state.login.permissions
  //获取当前页面权限
  const verifyPermission = `system:${pageName}:${handleName}`
  //根据当前页面权限返回布尔值
  return !!permissions.find((item) => item === verifyPermission)
}
