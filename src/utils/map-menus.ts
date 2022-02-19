import { IBreadcrumb } from '@/Base-UI/breadcrumb'
import { RouteRecordRaw } from 'vue-router'
//存储第一次访问/main时的路径
export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]): Array<RouteRecordRaw> {
  /* 获取路由类型为2的路由 */
  const routes: Array<RouteRecordRaw> = []
  /* 默认获取所有routes */
  const allRoutes: Array<RouteRecordRaw> = []

  /* 利用以下代码是为解决一个一个导入router/main的ts文件的麻烦 */
  //使用require.context语法获取所有main中的ts文件的相对路径
  const routeFiles = require.context('@/router/main', true, /\.ts/)
  //遍历相对路径
  routeFiles.keys().forEach((key) => {
    //获取所有ts文件导入的内容
    //也可const route = routeFiles(key)  require.context返回的是个函数
    const route = require('@/router/main' + key.replace(/\./, ''))
    //将路由文件内容存入allRoutes
    allRoutes.push(route.default)
  })
  /* 进一步严谨 */
  const _recurseGetRoute = (menus: any[]) => {
    //遍历vuex传入的userMenus
    for (const menu of menus) {
      //如果类型等于2，则将路由对象存入routes
      if (menu.type === 2) {
        //判断接口路径和自己定义的路径是否相等
        const route = allRoutes.find((route) => route.path == menu.url)
        if (route) routes.push(route)
        if (!firstMenu) firstMenu = menu
      } else {
        //否则递归
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}

/* 添加面包屑数据 */
export function pathMapBreadcrumb(userMenus: any[], path: string) {
  const breadcrumb: IBreadcrumb[] = []
  pathMapToMenu(userMenus, path, breadcrumb)
  return breadcrumb
}

/* 根据路由路径激活某个菜单 */
export function pathMapToMenu(
  userMenus: any[],
  path: string,
  breadcrumb?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], path)
      if (findMenu) {
        //如果type=2存在,将面包屑数据存入
        breadcrumb?.push({ name: menu.name })
        breadcrumb?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === path) {
      return menu
    }
  }
}
/* 使用递归遍历所有的权限按钮 */
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      /*如果传入的类型为1或2则继续递归*/
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

//遍历出所有叶子节点
export function getMenuLeafkeys(menuList: any[]) {
  const leftKeys: number[] = []
  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leftKeys
}
