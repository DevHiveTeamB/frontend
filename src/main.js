import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/js/dist/util'
// import 'bootstrap/js/dist/dropdown'
import router from './router'
import store from './store.js'

createApp(App).use(router).mount('#app')
