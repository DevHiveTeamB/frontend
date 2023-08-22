<template>
  <!-- 쪽지함 상세페이지(쪽지 나누기) -->
  <UpperBar title="쪽지 나누기" rightSource="refreshBtn" :clickFunction="refreshPage" />
  <div class="profileContainer">
    <ProfileModal v-if="modalOpen" @close="modalOpen = false" />
    <div class="profile" @click="modalOpen = true">
      <img src="../assets/bookdetail/icon_bookdetail_basic_profile.svg" style="height: 100%" />
      <div class="leftItem" style="top: 5%">이름</div>
      <div class="leftItem rating" style="bottom: 5%">평점</div>
    </div>
    <img src="..\assets\chat\icon_chat_report.svg" class="report" />
  </div>

  <div class="contentContainer">
    <div class="date">날짜</div>
    <div class="bookInfoContainer">
      <div class="photo">사진</div>
      <div class="title">제목</div>
      <div class="price">가격</div>
      <div class="content">내용</div>
    </div>
  </div>
  <div class="inputContainer">
    <img src="..\assets\chat\icon_chat_plus.svg" class="inputImg" />
    <input type="text" class="inputbox" />
    <img src="../assets/chat/icon_chat_disable.svg" class="inputImg" />
  </div>
</template>

<script>
import UpperBar from '../components/UpperBar.vue'
import ProfileModal from '../components/ProfileModal.vue'
export default {
  components: {
    UpperBar,
    ProfileModal
  },
  methods: {
    //페이지 새로고침
    refreshPage() {
      this.$router.go(0)
    }
  },
  data() {
    return {
      modalOpen: false
    }
  }
}
</script>

<style lang="scss" scoped>
.profileContainer {
  margin: 3%;
  width: 80%;
  position: relative;
  font-size: small;
  font-weight: bold;
}
.leftItem {
  position: absolute;
  left: 18%;
}

.report {
  position: absolute;
  width: 10%;
  right: -15%;
  top: 15%;
}

.contentContainer {
  border: 1px solid #316464;
  height: 66%;
}

.inputContainer {
  height: 6%;
  display: flex;
  justify-content: center;
}

.inputbox {
  border: 1.5px solid #316464;
  width: 80%;
  border-radius: 10px;
  margin: 1% 0%;
}
.inputImg {
  width: 10%;
  padding: 1%;
  margin: 1%;
}

.date {
  width: 50%;
  margin: 3% 25%;
  padding: 0.5%;
  background-color: #d9d9d9;
  border-radius: 999px;
  color: #fff;
  font-weight: bold;
  font-size: medium;
  text-align: center;
}

.bookInfoContainer {
  height: 30%;
  border: 1.5px solid #316464;
  margin: 0% 5%;
  border-radius: 10px;
  padding: 3%;
  position: relative;
}

.photo,
.title,
.price,
.content {
  position: absolute;
}

.photo {
  border: solid 1px #316464;
  width: 60px;
  height: 60px;
}

.title {
  left: 26%;
  top: 10%;
  font-weight: bolder;
  font-size: large;
  margin-top: 1%;
}

.price {
  left: 26%;
  font-weight: bolder;
  font-size: small;
  margin-top: 11%;
}

.content {
  width: 94%;
  top: 50%;
  font-weight: bold;
  font-size: small;
  border-top: 1.5px solid #316464;
}
</style>
