import { createRouter, createWebHistory } from 'vue-router'
import SearchList from './page/SearchList.vue'
import BookSearch from './page/BookSearch.vue'
import BookInfo from './page/BookInfo.vue'

const routes = [
  {
    path: '/SearchList',
    component: SearchList
  },
  {
    path: '/BookSearch',
    component: BookSearch
  },
  {
    path: '/BookInfo',
    component: BookInfo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
