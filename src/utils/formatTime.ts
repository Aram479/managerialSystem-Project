import { App } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
/* 添加全局过滤器 */
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    /* 过滤utc时间格式 */
    formatTime(utcString: string, format: string = DATE_TIME_FORMAT) {
      return dayjs.utc(utcString).utcOffset(8).format(format)
    }
  }
}
