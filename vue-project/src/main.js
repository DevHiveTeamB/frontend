import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import IconBase from '@/components/IconBase.vue'

const app = createApp(App)
app.component('icon-base', IconBase)
app.use(router)
app.use(store) // Vuex store를 사용함
app.mount('#app')
