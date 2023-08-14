<template>
  <!-- NAVBAR -->
  <div id="navbar">
    <div class="container">
      <div id="home" class="item" @click="this.$router.push('/')">
        <img src="../assets/home/icon_home_disable.svg" />
      </div>
      <div id="community" class="item">
        <img src="../assets/community/icon_commu_disable.svg" />
      </div>
      <div id="chat" class="item">
        <img src="../assets/chat/icon_chat_disable.svg" />
      </div>
      <div id="mypage" class="item" @click="this.$router.push('login')">
        <img src="../assets/mypage/icon_mypage_disable.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    navigateToMypageOrLogin() {
      if (this.isLoggedIn) {
        this.$router.push('/mypage')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 360px;
  height: 60px;
  display: flex;
  align-items: center;
  background: #fff;
  border: 2px solid #316464;
}

.item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
</style>
