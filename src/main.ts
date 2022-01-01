import { createApp } from 'vue'
/* elementPlus国际化 */
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './assets/css/index.css'
import { setupStore } from './store/index'
/* 全局过滤器 */
import { registerProperties } from './utils/formatTime'

const app = createApp(App)
for (const name in ElIcons) {
  app.component(name, (ElIcons as any)[name])
}
/* 页面每次创建调用setupStore */
setupStore()

app
  .use(store)
  .use(router)
  .use(ElementPlus, { locale: zhCn })
  .use(registerProperties)
  .mount('#app')
