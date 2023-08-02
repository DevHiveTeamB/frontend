<template>
  <!-- NAVBAR -->
  <div id="navbar">
    <div class="container">
      <div id="home">
        <img src="../assets/icon_home_disable.svg" />
      </div>
      <div id="community">
        <img src="../assets/icon_commu_disable.svg" />
      </div>
      <div id="chat">
        <img src="../assets/icon_chat_disable.svg" />
      </div>
      <div id="mypage" @click="this.$router.push('login')">
        <img src="../assets/icon_mypage_disable.svg" />
      </div>
    </div>
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
  background: #fff;
  border: 2px solid #316464;
}
</style>
