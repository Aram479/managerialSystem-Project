/* 存储密码 */
class LocalCache {
  //设置数据
  setCache(key: string, value: any) {
    //将数据转为json字符串
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  //获取数据
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    //将数据转为json对象
    if (value) {
      return JSON.parse(value)
    }
  }
  //删除数据
  delCache(key: string) {
    window.localStorage.removeItem(key)
  }
  //清空所有数据
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
