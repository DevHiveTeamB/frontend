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
    //데이터
    return {
      isLoggedIn: false,
      isPopup: true,
      userInfo: {
        userId: 0,
        username: 'string',
        kakaoId: 0,
        email: 'string',
        phoneNumber: 'string',
        profilePhoto: 'string',
        introduction: 'string',
        membership: 0,
        certification: 0,
        ratingState: 0
      }
    }
  },
  getters: {
    //computed와 비슷함
    isLoggedIn(state) {
      return state.isLoggedIn
    },
    userInfo(state) {
      return state.userInfo
    },
    isPopup(state) {
      return state.isPopup
    }
  },
  mutations: {
    //데이터 변경은 mutations를 통해서만 가능함
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setIsPopup(state, isPopup) {
      state.isPopup = isPopup
      console.log('setIsPopup', isPopup)
    }
  },
  plugins: [vuexPersist.plugin]
})
export default store

// Vue 앱을 생성하고 Vuex 스토어를 등록
const app = createApp(App)
app.use(store)
app.mount('#app')
