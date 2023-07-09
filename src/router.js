import { createRouter, createWebHistory } from 'vue-router'
import SearchList from './views/SearchList.vue'
import BookSearch from './views/BookSearch.vue'
import BookInfo from './views/BookInfo.vue'

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
