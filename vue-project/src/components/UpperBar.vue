<template>
  <!-- 상단바 -->
  <div class="container">
    <div class="imageContainer">
      <img class="imageItem" src="../assets/UpperBar/icon_mypage_back.svg" @click="handleSearch" />
    </div>
    <div style="width: 100%; height: 100%; display: flex">
      <div class="title">{{ title }}</div>
      <div class="imageContainer">
        <img class="imageItem" src="@/assets/main/icon_main_search.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //props 받아오기
  props: {
    title: {
      type: String,
      default: '페이지이름'
    },
    rightSource: {
      type: String,
      default: 'No'
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.imageContainer {
  height: 100%;
  width: 20%;
  padding: 5%;
  //height 와 같은 값
  display: flex;
  justify-content: center;
  align-content: center;
}

.imageItem {
  height: 95%;
  width: 95%;
}
.container {
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  background-color: #316464;
}

.completeContainer {
  color: white;
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  color: white;
  font-size: 25px;
  font-weight: bold;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
