<template>
  <!-- NAVBAR -->
  <div id="navbar">
    <div class="container">
      <div id="home" class="item" :class="{ active: isActive('home') }" @click="goHome">
        <img
          :src="
            isActive('home')
              ? require('../assets/home/icon_home_enable.svg')
              : require('../assets/home/icon_home_disable.svg')
          "
        />
      </div>
      <div
        id="community"
        class="item"
        :class="{ active: isActive('community') }"
        @click="goComunity"
      >
        <img
          :src="
            isActive('community')
              ? require('../assets/community/icon_commu_enable.svg')
              : require('../assets/community/icon_commu_disable.svg')
          "
        />
      </div>
      <div id="chat" class="item" :class="{ active: isActive('chat') }" @click="goChat">
        <img
          :src="
            isActive('chat')
              ? require('../assets/chat/icon_chat_enable.svg')
              : require('../assets/chat/icon_chat_disable.svg')
          "
        />
      </div>
      <div
        id="mypage"
        class="item"
        :class="{ active: isActive('mypage') }"
        @click="navigateToMypageOrLogin"
      >
        <img
          :src="
            isActive('mypage')
              ? require('../assets/mypage/icon_mypage_enable.svg')
              : require('../assets/mypage/icon_mypage_disable.svg')
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLoggedIn', 'isPopup', 'activeNavItem'])
  },
  methods: {
    ...mapMutations(['setIsPopup', 'setActiveNavItem']),
    isActive(item) {
      return this.activeNavItem === item
    },
    goHome() {
      this.setActiveNavItem('home')
      this.$router.push('/')
      this.setIsPopup(true)
    },
    goComunity() {
      this.setActiveNavItem('community')
      this.$router.push('/community')
    },
    navigateToMypageOrLogin() {
      this.setActiveNavItem('mypage')
      if (this.isLoggedIn) {
        this.$router.push('/mypage')
      } else {
        this.$router.push('/login')
      }
    },
    goChat() {
      this.setActiveNavItem('chat')
      if(this.isLoggedIn){
        this.$router.push('/chat')
      }
      else{
        this.$router.push('/login')
      }
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
