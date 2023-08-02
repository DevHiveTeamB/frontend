<template>
  <!-- 로그인 안됐을 때 나오는 페이지 -->
  <div>
    <UpperBar />
    <div class="content">
      <div>로고</div>
      <div class="login">
        <input id="userid" type="text" /> <br />
        <input id="password" type="password" /><br />
        <button>sign in</button>
        <!-- 피그마에 없는데 내가 회원가입 버튼 만들었음  -->
        <button id="join" @click="this.$router.push('/join')">회원가입</button>
        <!-- 로그인 상태 유지 추가해주세요-->
        <div>간편로그인</div>
        <button @click="kakaoLogin">카카오로그인</button>
      </div>
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
    kakaoLogin() {
      window.open(
        'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1954fa99c4e993dc0ea405323d7f3bad&redirect_uri=http://localhost:8080/auth/kakao/callback'
      )
    }
  },
  data() {
    return {
      userid: null,
      password: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
