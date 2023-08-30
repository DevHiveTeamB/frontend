<template>
  <!-- 쪽지함 상세페이지(쪽지 나누기) -->
  <UpperBar title="쪽지 나누기" rightSource="refreshBtn" :clickFunction="refreshPage" />
  <!-- 로딩창 -->
  <div v-if="this.chatLoading" style="height: 100%; width: 100%;">
    <LoadingSpinner :setloading="true" />
  </div>
  <!-- 게시글 정보 + 쪽지들 -->
  <div v-else style="width: 100%; flex-grow: 1; display: flex; flex-direction: column;">
    <!-- 프로필 클릭시 모달 -->
    <ProfileModal v-if="modalOpen" @close="modalOpen = false" style="z-index: 1" />
    <!-- 상대방 프로필 -->
    <div class="profile" @click="modalOpen = true">
      <div class="profileContainer">
        <img src="../assets/bookdetail/icon_bookdetail_basic_profile.svg" style="height: 100%" />
        <div class="leftItem" style="top: 5%">이름</div>
        <div class="leftItem rating" style="bottom: 5%">평점</div>
      </div>
    </div>

    <!-- 게시글정보 + 대화내용 -->
    <div class="contentContainer">
      <!-- 게시글 정보 -->
      <div class="bookInfoContainer">
        <div style="font-weight: bolder; font-size: larger; margin-left: 5%; margin-bottom: 2%">
          {{ this.roomInfo.post.postname }}
        </div>
        <div style="font-weight: bold; font-size: small; margin-left: 5%">{{ this.roomInfo.post.price }}원</div>
      </div>

      <div class="chatContainer">
        <div class="messageContainer" :key="index" v-for="(value,index) in this.messages">
          <!-- 보낸,받은 쪽지 + 날짜 -->
          <div class="" style="display: flex;">
            <div :style="{color: true ? '#312345' : '#B5D9C5'}">받은 쪽지</div>
            <div style="margin-left: auto;">23/09/01 09:21</div>
          </div>
          <!-- 쪽지 내용 -->
          <div>이것은 줄바꿈은 위한 예시 대화 내용 입니다.</div>
        </div>
      </div>
    </div>
  </div>
  <!-- 밑공간 채우기용 -->
  <div style="height: 10%;"></div>
</template>

<script>
import UpperBar from '../components/UpperBar.vue'
import ProfileModal from '../components/ProfileModal.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import axios from '../main.js'
export default {
  components: {
    UpperBar,
    ProfileModal,
    LoadingSpinner
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
      this.chatLoading = true
      const url = `/message-rooms/messages/${this.roomId}/{postId}/${this.opponentId}`
      axios
        .get(url)
        .then((res) => {
          console.log(res.data)
          this.roomInfo = res.data
          this.messages = this.roomInfo.privateMessageDTOS
          this.messages = [1,2,3,4,5,6,7,8,9,1,1,1,1,11,1]
          this.$nextTick(() => {
            this.chatLoading = false
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  data() {
    return {
      modalOpen: false,
      chatLoading: true,
      roomId: this.$route.params.room_id,
      opponentId: this.$route.params.opponent_id,
      roomInfo : {
        "opponent": {
          "id": 0,
          "username": "",
          "profilePhoto": "",
          "rating": 0
        },
        "post": {
          "postid": 0,
          "postname": "",
          "price": 0,
          "postUsername": ""
        },
      messages : [
        {
          "messageID": 0,
          "messageWriterId": 0,
          // '받은' || '보낸'
          "state": "", 
          "privateMessageContent": ""
        }
      ]
      }
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
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.bookInfoContainer {
  border: 1.5px solid #316464;
  margin: 5%;
  border-radius: 10px;
  padding: 3%;
  line-height: 25px;
}

.chatContainer {
  margin: 0% 5%;
  padding-bottom: 3%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100px;
}

.messageContainer{
  padding: 5% 0;
  border-bottom: #316464 solid 1px;
}

</style>
