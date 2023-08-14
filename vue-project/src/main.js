import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import IconBase from '@/components/IconBase.vue'

createApp(App).component('icon-base', IconBase)
createApp(App).use(router).use(router).mount('#app')
