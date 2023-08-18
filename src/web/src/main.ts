import { createApp } from 'vue'
// pinia状态管理
import { createPinia } from 'pinia'
// UED组件库
import uedComponents from '@ued/components'
// ElementPlus UI框架
import ElementPlus from 'element-plus'
import ElementPlusZhCn from 'element-plus/es/locale/lang/zh-cn'

// 入口
import App from './App.vue'
// 路由信息
import router from './router'
// ElementPlus样式
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
// 平台样式
import './styles/index.scss'
import { globalComponent } from './components'
// 动画css库
import 'animate.css'

const app = createApp(App)
    .use(router)
    .use(ElementPlus, { locale: ElementPlusZhCn })
    .use(createPinia()).use(uedComponents)
// uedComponents暂时没有用到

app.config.warnHandler = () => null

globalComponent(app)

app.mount('#app')