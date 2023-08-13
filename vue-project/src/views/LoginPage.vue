<template>
  <!-- 로그인 안됐을 때 나오는 페이지 -->
  <div>
    <UpperBar />
    <div class="content">
      <div>로고</div>
      <div>간편로그인</div>
      <button @click="kakaoLogin">kakao</button>
    </div>
  </div>
</template>

<script>
import UpperBar from '../components/UpperBar.vue'
export default {
  components: {
    UpperBar
  },
  methods: {
    async kakaoLogin() {
      window.location.href =
        'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1954fa99c4e993dc0ea405323d7f3bad&redirect_uri=https://port-0-springbackend-1b5xkk2fldlaigtw.gksl2.cloudtype.app/api/auth/kakao/callback'

      // 카카오 로그인 성공 후 콜백 URL에서 userId 추출
      // const urlParams = new URLSearchParams(window.location.search)
      // const userId = urlParams.get('userId')

      // if (userId) {
      //   // Vuex 스토어에 로그인 정보 저장
      //   this.login(userId)
      //   this.$router.push('/') // 메인 페이지로 이동
      // }
    }
  }
}
</script>

<style lang="scss" scoped></style>
