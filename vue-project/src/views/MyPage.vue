<template>
  <!-- 로그인됐을때 나오는 페이지 -->
  <div></div>
</template>

<script>
export default {
  created() {
    this.checkLoggedIn()
  },
  methods: {
    checkLoggedIn() {
      //세션 스토리지에서 userid 가져와서 로그인 상태 확인
      const userid = sessionStorage.getItem('userid')
      if (userid) {
        console.log('User is logged in with userid: ', userid)
      } else {
        this.$router.push('/login')
        console.log('User is not logged in.')
      }
    }
  },
  data() {
    return {
      userid: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
