<template>
  <div>
    <UpperBar />
    <div class="content">
      <div>로고</div>
      <div class="login">
        <input id="userid" type="text" /> <br />
        <input id="password" type="password" /><br />
        <button>sign in</button>
        <!-- 로그인 상태 유지 추가해주세요-->
        <div>간편로그인</div>
        <button>카카오로그인</button>
      </div>
    </div>
    <NavBar />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import UpperBar from '../components/UpperBar.vue'
export default {
  components: {
    NavBar,
    UpperBar
  }
}
</script>

<style lang="scss" scoped></style>
