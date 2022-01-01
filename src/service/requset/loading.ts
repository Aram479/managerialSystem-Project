import { ElLoading } from 'element-plus'
let loadingCount = 0
let loading: any

const startLoading = () => {
  loading = ElLoading.service({
    lock: true, // 是否锁屏
    text: '加载中……', // 加载动画的文字
    spinner: 'el-icon-loading', // 引入的loading图标
    target: '.el-main', // 需要遮罩的区域
    background: 'rgba(0, 0, 0, 0)', // 遮罩背景颜色
    customClass: 'mask' // 遮罩层新增类名
  })
}

const endLoading = () => {
  loading.close()
}

export const showLoading = () => {
  if (loadingCount === 0) {
    startLoading()
  }
  loadingCount += 1
}

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount -= 1
  if (loadingCount === 0) {
    endLoading()
  }
}
