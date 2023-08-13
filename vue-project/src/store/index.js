import { createApp } from 'vue'
import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist'
import App from '../App.vue'

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: localStorage
})

const store = createStore({
  state() {
    return {
      isLoggedIn: false
      // 다른 상태 변수들도 여기에 추가 가능
    }
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
    }
  },
  plugins: [vuexPersist.plugin]
})
export default store

// Vue 앱을 생성하고 Vuex 스토어를 등록
const app = createApp(App)
app.use(store)
app.mount('#app')
