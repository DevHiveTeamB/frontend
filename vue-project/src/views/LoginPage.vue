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
import axios from 'axios'
import UpperBar from '../components/UpperBar.vue'
export default {
  components: {
    UpperBar
  },
  methods: {
    //url 쿼리스트링으로부터 유저정보 뽑아오기
    async getUserInfo(userid) {
      try {
        const response = await axios.get(`v1/user/${userid}`)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching user info: ', error)
      }
    },
    //카카오로그인 버튼
    kakaoLogin() {
      window.location.href =
        'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=1954fa99c4e993dc0ea405323d7f3bad&redirect_uri=https://port-0-springbackend-1b5xkk2fldlaigtw.gksl2.cloudtype.app/api/auth/kakao/callback'

      //카카오 로그인 성공 후 콜백 URL에서 userid 추출
      const urlParams = new URLSearchParams(window.location.search)
      const userid = urlParams.get('userid')

      if (userid) {
        //세션 스토리지에 userid 저장
        sessionStorage.setItem('userid', userid)
        this.getUserInfo(userid)
      }
    },
    //로그인 상태 확인
    checkLoggedIn() {
      //세션 스토리지에서 userid 가져와서 로그인 상태 확인
      const userid = sessionStorage.getItem('userid')
      //로그인 완료되면 메인페이지로 이동
      if (userid) {
        console.log('User is logged in with userid: ', userid)
        this.$router.push('/')
      } else {
        console.log('User is not logged in.')
      }
    }
  },
  created() {
    //페이지 로드 시 로그인 상태 확인
    this.checkLoggedIn()
  },

  data() {
    return {
      userid: null
    }
  }
}
</script>

<style lang="scss" scoped></style>
