<template>
  <!-- 홈화면 -->
  <div>
    <div>로고</div>
    <div @click="this.$router.push('popup')">검색창</div>
    <button @click="this.$router.push('/write')">게시글작성</button>
    <button @click="this.$router.push('/booklist')">게시글목록</button>
    <button @click="this.$router.push('/announce')">공지사항</button>
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

<style lang="scss" scoped></style>
