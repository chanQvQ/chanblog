import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import { NoticeBar } from 'vant';
import 'vant/lib/index.css';
const pinia =createPinia()
const app =createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(pinia)
app.use(router)
app.use(ElementPlus,{locale})
app.use(NoticeBar)


app.mount('#app')

