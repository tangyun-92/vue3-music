import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'normalize.css/normalize.css'
import '@/styles/reset.css'

const app = createApp(App)

app.use(store).use(router).use(Antd).mount('#app')
