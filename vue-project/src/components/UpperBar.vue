<template>
  <!-- 상단바 -->
  <div class="container">
    <div class="imageContainer">
      <img class="imageItem" src="../assets/UpperBar/icon_mypage_back.svg" @click="goBack" />
    </div>
    <div class="title">{{ title }}</div>
    <div class="imageContainer">
      <div
        @click="clickFunction"
        class="complete"
        :style="`${rightSource === '완료' ? '' : 'display:none'}`"
      >
        완료
      </div>
      <div>
        <img
          src="../assets/UpperBar/icon_UpperBar_Hamburger.svg"
          @click="clickFunction"
          class="complete hamburgerBtn"
          :style="`${rightSource === 'hamburgerBtn' ? '' : 'display:none'}`"
        />
      </div>
      <div>
        <img
          src="../assets/UpperBar/icon_chat_refresh.svg"
          @click="clickFunction"
          class="complete refreshBtn"
          :style="`${rightSource === 'refreshBtn' ? '' : 'display:none'}`"
        />
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
    },
    clickFunction: {
      type: Function,
      default: null
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
  width: 25%;
  padding: 5%;
  //height 와 같은 값
  display: flex;
  justify-content: center;
  align-items: center;
}

.imageItem {
  height: 80%;
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

.complete {
  color: white;
  font-weight: bold;
  background-color: #316464;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
