<template>
  <!-- 홈화면 -->
  <!-- HappyBeen -->
  <!-- hello~! -->
  <div>
    <div>MainPage</div>
    <button @click="this.$router.push('/write')">게시글작성</button>
    <button @click="this.$router.push('/booklist')">게시글목록</button>
    <div>
      <input id="searchBar" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
  components: {}
}
</script>

<style lang="scss" scoped></style>
