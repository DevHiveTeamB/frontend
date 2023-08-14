<template>
  <!-- 홈화면 -->
  <!-- HappyBeen -->
  <div>
    <div id="logo">
      <img src="../assets/DevHive_logo.svg"/>
    </div>
    <div id="subbutton" @click="this.$router.push('/write')">
      <img src="../assets/icon_main_posting.svg" @click="this.$router.push('/write')"/>
      <img src="../assets/icon_main_postlist.svg" @click="this.$router.push('/booklist')"/>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
  components: {}
}
</script>

<style lang="scss" scoped>
.logo {
  position: relative;
  width: 50%;
}
</style>
