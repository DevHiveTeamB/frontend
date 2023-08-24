<template>
  <!-- NAVBAR -->
  <div id="navbar">
    <div class="container">
      <div id="home" class="item" @click="goHome">
        <img src="../assets/home/icon_home_disable.svg" />
      </div>
      <div id="community" class="item" @click="goComunity">
        <img src="../assets/community/icon_commu_disable.svg" />
      </div>
      <div id="chat" class="item" @click="goChat">
        <img src="../assets/chat/icon_chat_disable.svg" />
      </div>
      <div id="mypage" class="item" @click="navigateToMypageOrLogin">
        <img src="../assets/mypage/icon_mypage_disable.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLoggedIn', 'isPopup'])
  },
  methods: {
    ...mapMutations(['setIsPopup']),
    goHome() {
      this.$router.push('/')
      this.setIsPopup(true)
    },
    goComunity() {
      this.$router.push('/community')
    },
    navigateToMypageOrLogin() {
      if (this.isLoggedIn) {
        this.$router.push('/mypage')
      } else {
        this.$router.push('/login')
      }
    },
    goChat() {
      this.$router.push('/chat')
    }
  },
  created() {
    console.log(this.isLoggedIn)
  }
}
</script>

<style lang="scss" scoped>
#navbar {
  width: 100%;
  height: 10%;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: #fff;
  // border up down
  border-top: 1px solid #316464;
}

.item {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
</style>
