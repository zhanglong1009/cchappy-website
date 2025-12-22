import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './i18n'

const app = createApp(App)

// 使用 i18n 插件
app.use(i18n as any)

app.mount('#app')
