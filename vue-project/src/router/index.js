import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/MainPage.vue')
  },
  {
    path: '/login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/join',
    component: () => import('../views/JoinPage.vue')
  },
  {
    path: '/write',
    component: () => import('../views/PostPage.vue')
  },
  {
    path: '/booklist',
    component: () => import('../views/BookListPage.vue')
  },
  {
    path: '/mypage',
    component: () => import('../views/MyPage.vue')
  },
  {
    path: '/popup',
    component: () => import('../views/SearchPopup.vue')
  },
  {
    path: '/announce',
    component: () => import('../views/AnnouncePage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
