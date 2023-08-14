<template>
  <!-- 홈화면 -->
  <!-- HappyBeen -->
  <!-- hello~! -->
  <div>
<<<<<<< HEAD
    <div id="logo">
      <img src="../assets/DevHive_logo.svg"/>
    </div>
    <div id="subbutton" @click="this.$router.push('/write')">
      <img src="../assets/icon_main_posting.svg" @click="this.$router.push('/write')"/>
      <img src="../assets/icon_main_postlist.svg" @click="this.$router.push('/booklist')"/>
    </div>
=======
    <div>MainPage</div>
    <button @click="this.$router.push('/write')">게시글작성</button>
    <button @click="this.$router.push('/booklist')">게시글목록</button>

    <div @click="this.$router.push('popup')">검색창</div>
>>>>>>> develop
  </div>
</template>

<script>
export default {
  methods: {},
  components: {},
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.logo {
  position: relative;
  width: 50%;
}
</style>
