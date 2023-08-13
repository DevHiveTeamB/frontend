<template>
  <!-- 홈화면 -->
  <div>
    <div>로고</div>
    <div @click="this.$router.push('popup')">검색창</div>
    <button @click="this.$router.push('/write')">게시글작성</button>
    <button @click="this.$router.push('/mybooklist')">게시글목록</button>
    <button @click="this.$router.push('/announce')">공지사항</button>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['isLoggedIn'])
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')
    //userId 값이 존재하면
    //userId로부터
    if (userId) {
      console.log(userId)
      axios
        .get(`v1/user/${userId}`, {
          params: {
            userId: userId
          }
        })
        .then((response) => {
          //요청 성공시
          console.log(response.data)
          //로그인 상태로 저장
          this.handleLogin()
        })
        .catch((error) => {
          //요청 실패시
          console.error(error)
        })
    }
  },
  methods: {
    ...mapMutations(['login', 'logout']),
    handleLogin() {
      this.login() // 뮤테이션을 호출하여 로그인 상태 변경
    },
    handleLogout() {
      this.logout() // 뮤테이션을 호출하여 로그아웃 상태 변경
    }
  },
  components: {},
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
