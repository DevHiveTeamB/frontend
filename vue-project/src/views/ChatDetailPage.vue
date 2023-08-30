<template>
  <!-- 쪽지함 상세페이지(쪽지 나누기) -->
  <UpperBar title="쪽지 나누기" rightSource="refreshBtn" :clickFunction="refreshPage" />
  <!-- 로딩창 -->
  <div v-if="this.chatLoading" style="height: 80%; width: 100%">
    <LoadingSpinner :setloading="true" />
  </div>
  <!-- 게시글 정보 + 쪽지들 -->
  <div v-else style="width: 100%; flex-grow: 1; display: flex; flex-direction: column">
    <!-- 프로필 클릭시 모달 -->
    <ProfileModal
      v-if="modalOpen"
      @close="modalOpen = false"
      style="z-index: 1"
      :opponentData="this.opponentData"
    />
    <!-- 상대방 프로필 -->
    <div class="profile" @click="modalOpen = true">
      <div class="profileContainer">
        <img :src="this.roomInfo.opponent.profilePhoto" style="width: 40px" />
        <div class="leftItem" style="top: 5%">{{ this.roomInfo.opponent.username }}</div>
        <div class="rating leftItem" style="display: flex; bottom: 5%">
          <div
            :key="index"
            v-for="(value, index) in [1, 2, 3, 4, 5]"
            :class="`${this.roomInfo.opponent.rating >= value ? 'star' : 'nostar'}`"
          >
            <img style="width: 100%; height: 100%" src="../assets/mypage/icon_mypage_star.svg" />
          </div>
          ({{ this.roomInfo.opponent.rating }})
        </div>
      </div>
    </div>

    <!-- 게시글정보 + 대화내용 -->
    <div class="contentContainer">
      <!-- 게시글 정보 -->
      <div class="bookInfoContainer">
        <div style="font-weight: bolder; font-size: larger; margin-left: 5%; margin-bottom: 2%">
          {{ this.roomInfo.post.postname }}
        </div>
        <div style="font-weight: bold; font-size: small; margin-left: 5%">
          {{ this.roomInfo.post.price }}원
        </div>
      </div>

      <div class="chatContainer">
        <div class="messageContainer" :key="index" v-for="(value, index) in this.messages">
          <!-- 보낸,받은 쪽지 + 날짜 -->
          <div class="" style="display: flex">
            <div :style="{ color: value.state == '받은' ? '#57888F' : '#B5D9C5' }">
              <div style="font-weight: bolder">
                {{ value.state == '받은' ? '받은 쪽지' : '보낸 쪽지' }}
              </div>
            </div>
            <div style="margin-left: auto; color: #c9caca; font-weight: bolder">
              {{ getFormattedDate(value.privateMessageDate) }}
            </div>
          </div>
          <div style="margin-top: 2%; font-size: small">{{ value.privateMessageContent }}</div>
        </div>
      </div>
    </div>
  </div>
  <!-- 밑공간 채우기용 -->
  <div style="height: 10%"></div>

  <!-- 쪽지보내기 버튼 -->
  <div class="sendMessageBtn" @click="sendMessage()">
    <img src="../assets/chat/icon_chat.svg" />
  </div>
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
      const url = `/message-rooms/messages/${this.roomId}/${this.opponentId}`
      console.log(url)
      axios
        .get(url)
        .then((res) => {
          console.log(res.data)
          this.roomInfo = res.data
          this.messages = this.roomInfo.privateMessageDTOS
          this.opponentData = this.roomInfo.opponent
          this.$nextTick(() => {
            this.chatLoading = false
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //날짜를 년,월,일만 가져오도록 변환
    getFormattedDate(dateString) {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')

      return `${year}-${month}-${day} ${hours}:${minutes}`
    },
    sendMessage() {
      this.$router.push({
        path: `/chat/${this.roomId}`,
        query: {
          opponentId: this.opponentId
        }
      })
    }
  },
  data() {
    return {
      modalOpen: false,
      chatLoading: true,
      roomId: this.$route.params.room_id,
      opponentId: this.$route.params.opponent_id,
      opponentData: {},
      roomInfo: {
        opponent: {
          id: 0,
          username: '',
          profilePhoto: '',
          introduction: '',
          rating: 0,
          joinDate: ''
        },
        post: {
          postid: 0,
          postname: '',
          price: 0,
          postUsername: ''
        },
        messages: [
          {
            messageID: 0,
            messageWriterId: 0,
            // '받은' || '보낸'
            state: '',
            privateMessageContent: '',
            privateMessageDate: ''
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
//스크롤 표시 없앰(스크롤은 가능)
.chatContainer {
  margin: 0% 5%;
  padding-bottom: 3%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100px;
}

.chatContainer::-webkit-scrollbar {
  display: none;
}

.chatContainer {
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
}

.messageContainer {
  padding: 5% 0;
  border-bottom: #c9caca solid 2px;
}

.star {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: auto;
}

.nostar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: auto;
  opacity: 0.3;
}

.sendMessageBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 13%;
  right: 5%;
  position: absolute;
  height: 50px;
  width: 50px;
  z-index: 1;
  border-radius: 50%;
  background-color: #316464;
}
</style>
