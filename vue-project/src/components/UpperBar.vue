<template>
  <div class="container">
    <button id="backBtn" @click="goBack">뒤</button>
    <div id="title">페이지이름</div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 360px;
  height: 50px;
  display: flex;
  align-items: center;
}
#title {
  // 페이지이름 가운데 와야대는데..
}
</style>
