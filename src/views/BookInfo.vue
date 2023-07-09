<template>
  <div id="container">
    <div id="upperBar">
      <button id="backBtn">뒤</button>
      <div id="pageName">페이지 이름</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
#container {
  margin: 0 auto;
  padding: 0;
  height: 800px;
  width: 370px;
}
#upperBar {
  width: 360px;
  height: 50px;
  background-color: #316464;
  position: absolute;
}
</style>
