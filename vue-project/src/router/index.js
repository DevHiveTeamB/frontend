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
    path: '/bookdetail/:post_id',
    component: () => import('../views/BookDeatilPage.vue')
  },
  {
    path: '/bookedit/:post_id',
    component: () => import('../views/BookEditPage.vue')
  },
  {
    path: '/chatdetail',
    component: () => import('../views/ChatDetailPage.vue')
  },
  //쪽지함 페이지
  {
    path: '/chat',
    component: () => import('../views/ChatPage.vue')
  },
  //community 페이지
  {
    path: '/community',
    component: () => import('../views/CommunityPage.vue')
  },
  {
    path: '/community/post',
    component: () => import('../views/CommunityPostPage.vue')
  },
  {
    path: '/community/detail/:post_id',
    component: () => import('../views/CommunityDetailPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
