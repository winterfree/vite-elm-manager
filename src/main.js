import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/style/global.scss'
import Particles from 'particles.vue3'
import * as echarts from 'echarts'
import VueECharts from 'vue-echarts'
import plugins from './plugins'

const app = createApp(App)
app.use(router).use(store).use(ElementPlus).use(Particles).use(plugins).component('v-chart', VueECharts).mount('#app')
app.config.globalProperties.$echarts = echarts
