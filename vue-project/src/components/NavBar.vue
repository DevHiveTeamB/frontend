<template>
  <!-- NAVBAR -->
  <div class="container">
    <button id="home">홈</button>
    <button id="community">커뮤</button>
    <button id="chat">채팅</button>
    <button id="mypage" @click="this.$router.push('login')">마이</button>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      // isHomeClicked: false,
      // isCommunityClicked: false,
      // isChatClicked: false,
      // isMypageClicked: false
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.container {
  width: 360px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
