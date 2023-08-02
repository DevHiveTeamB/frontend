import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import LoginPage from '../views/LoginPage.vue'
import JoinPage from '../views/JoinPage.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router