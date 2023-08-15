import { createApp } from 'vue'
//axios import
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import IconBase from '@/components/IconBase.vue'

const app = createApp(App)
app.component('icon-base', IconBase)
app.use(router)
app.use(store) // Vuex store를 사용함
app.mount('#app')

export default axios.create({
  baseURL: 'https://port-0-springbackend-1b5xkk2fldlaigtw.gksl2.cloudtype.app/api'
})
