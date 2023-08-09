<template>
  <!-- 홈화면 -->
  <div>
    <div>MainPage</div>
    <button @click="this.$router.push('/write')">게시글작성</button>
    <button @click="this.$router.push('/booklist')">게시글목록</button>
  </div>
</template>

<script>
export default {
  methods: {},
  components: {}
}
</script>

<style lang="scss" scoped></style>
