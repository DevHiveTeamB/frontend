<template>
  <!-- 로그인 안됐을 때 나오는 페이지 -->
  <UpperBar title="로그인" rightSource="" />
  <div class="content">
    <img style="width: 80%; margin-top: 30%" src="../assets/main/DevHive_logo.svg" />
    <!-- <div style="border: solid 1px #316464; width: 80%; margin: 10px 0"></div> -->
    <img style="margin: 10px 0; width: 20%" src="../assets/mypage/icon_mypage_login.svg" />
    <button class="LoginButton" @click="kakaoLogin">
      <img
        src="../assets/mypage/icon_login_kakao.svg"
        style="position: absolute; left: 12%; height: 3%"
      />
      카카오 로그인
    </button>
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
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.LoginButton {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 5%;
  font-size: 16px;
  font-weight: bold;
  background-color: #f6c65d;
  border: none;
}
</style>
