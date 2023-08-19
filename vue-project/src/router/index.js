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
    path: '/profile',
    component: () => import('../views/ProfilePage.vue')
  },
  {
    path: '/announce',
    component: () => import('../views/AnnouncePage.vue')
  },
  {
    path: '/mybooklist',
    component: () => import('../views/MyBookListPage.vue')
  },
  {
    path: '/bookdeatil',
    //path: '/:post_id', //동적으로 매핑
    component: () => import('../views/BookDeatilPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
