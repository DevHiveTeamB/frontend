<template>
  <!-- 쪽지함 상세페이지(쪽지 나누기) -->
  <UpperBar title="쪽지 나누기" rightSource="refreshBtn" :clickFunction="refreshPage" />
  <ProfileModal v-if="modalOpen" @close="modalOpen = false" style="z-index: 1" />
  <div class="profile" @click="modalOpen = true">
    <div class="profileContainer">
      <img src="../assets/bookdetail/icon_bookdetail_basic_profile.svg" style="height: 100%" />
      <div class="leftItem" style="top: 5%">이름</div>
      <div class="leftItem rating" style="bottom: 5%">평점</div>
    </div>
    <img src="..\assets\chat\icon_chat_report.svg" class="report" />
  </div>

  <div class="contentContainer">
    <div class="date">날짜</div>
    <div class="bookInfoContainer">
      <div style="font-weight: bolder; font-size: larger; margin-left: 5%; margin-bottom: 2%">
        제목
      </div>
      <div style="font-weight: bold; font-size: small; margin-left: 5%">가격</div>
    </div>

    <div class="chatContainer">
      <div class="myBubble">책 거래 할게요</div>
      <div class="yourBubble">어떤 책이요?</div>
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
import axios from '../main.js'
export default {
  components: {
    UpperBar,
    ProfileModal
  },
  created() {
    this.getMessageRoomInfo()
  },
  methods: {
    //페이지 새로고침
    refreshPage() {
      this.$router.go(0)
    },
    //대화 내용 가져오기
    getMessageRoomInfo() {
      console.log(this.roomId)
      const url = `/message-rooms/messages/${this.roomId}`
      axios
        .get(url)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  data() {
    return {
      modalOpen: false,
      roomId: this.$route.params.room_id
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
  right: 6%;
  top: 11.5%;
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
  border: 1.5px solid #316464;
  margin: 0% 5%;
  border-radius: 10px;
  padding: 3%;
  line-height: 25px;
}

.chatContainer {
  margin: 0% 5%;
  padding: 3% 0%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.myBubble {
  background-color: #58888e;
  width: fit-content;
  height: auto;
  color: #fff;
  padding: 3%;
  border-radius: 10px;
  font-weight: bold;
  align-self: flex-end; /* 오른쪽에 배치 */
  margin-bottom: 10px; /* 말풍선 사이의 간격 설정 */
}

.yourBubble {
  background-color: #74b495;
  width: fit-content;
  height: auto;
  color: #fff;
  padding: 3%;
  border-radius: 10px;
  font-weight: bold;
  align-self: flex-start; /* 왼쪽에 배치 */
  margin-bottom: 10px; /* 말풍선 사이의 간격 설정 */
}
</style>
