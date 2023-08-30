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
      isLoading: false,
      userInfo: {
        userId: 0,
        username: 'string',
        kakaoId: 0,
        email: 'string',
        phoneNumber: 'string',
        profilePhoto: 'string',
        introduction: 'string',
        ratingState: 0
      },
      selectCommnunity: null,
      activeNavItem: 'home' //Navbar 초기값
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
    },
    isLoading(state) {
      return state.isLoading
    },
    activeNavItem(state) {
      return state.activeNavItem
    },
    selectCommnunity(state) {
      return state.selectCommnunity
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
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    setActiveNavItem(state, item) {
      state.activeNavItem = item
    },
    setSelectCommnunity(state, community) {
      state.selectCommnunity = community
    }
  },
  plugins: [vuexPersist.plugin]
})
export default store

// Vue 앱을 생성하고 Vuex 스토어를 등록
const app = createApp(App)
app.use(store)
app.mount('#app')
