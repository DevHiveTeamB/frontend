import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import LoginPage from '../views/LoginPage.vue'
import JoinPage from '../views/JoinPage.vue'
import PostPage from '../views/PostPage.vue'
import BookListPage from '../views/BookListPage.vue'

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/join',
    component: JoinPage
  },
  {
    path: '/write',
    component: PostPage
  },
  {
    path: '/booklist',
    component: BookListPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
