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
  //책 게시글 관련 페이지
  {
    path: '/booklist',
    component: () => import('../views/BookListPage.vue')
  },
  //마이페이지
  {
    path: '/mypage',
    component: () => import('../views/MyPage.vue')
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
  //마이페이지->프로필 보기
  {
    path: '/profile',
    component: () => import('../views/ProfilePage.vue')
  },
  {
    path: '/announce',
    component: () => import('../views/AnnouncePage.vue')
  },
  //쪽지 관련 페이지
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
    path: '/community/detail',
    component: () => import('../views/CommunityDetailPage.vue')
  },
  {
    path: '/community/write',
    component: () => import('../views/CommunityPostPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
