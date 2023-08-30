<template>
  <UpperBar title="쪽지 보내기" />
  <!-- 상대방 프로필 -->
  <div class="profile" style="border-bottom: 2px solid #c9caca">
    <div class="profileContainer">
      <img :src="this.opponentData.profilePhoto" style="width: 40px" />
      <div class="leftItem" style="top: 5%">{{ this.opponentData.username }}</div>
      <div class="rating leftItem" style="display: flex; bottom: 5%">
        <div
          :key="index"
          v-for="(value, index) in [1, 2, 3, 4, 5]"
          :class="`${this.opponentData.ratingState >= value ? 'star' : 'nostar'}`"
        >
          <img style="width: 100%; height: 100%" src="../assets/mypage/icon_mypage_star.svg" />
        </div>
        ({{ this.opponentData.ratingState }})
      </div>
    </div>
  </div>
  <!-- 쪽지 작성 -->
  <div class="inputContainer">
    <input placeholder="내용을 입력하세요" type="text" v-model="message" />
  </div>

  <!-- 전송하기 버튼 -->
  <div class="sendMessageBtn" @click="sendMessage()">
    <img src="../assets/chat/icon_chat_send.svg" />
  </div>
</template>

<script>
import UpperBar from '../components/UpperBar.vue'
import axios from '../main.js'
import { mapState } from 'vuex'

export default {
  mounted() {
    const opponentId = this.$route.query.opponentId
    this.getOpponentInfo(opponentId)
  },
  computed: {
    ...mapState(['userInfo']),
    userId() {
      return this.userInfo.userId
    }
  },
  components: { UpperBar },
  data() {
    return {
      opponentData: {},
      message: ''
    }
  },
  methods: {
    getOpponentInfo(opponentId) {
      const url = '/v1/user/' + opponentId
      console.log(url)
      axios
        .get(url)
        .then((res) => {
          this.opponentData = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 전송하기 누름
    sendMessage() {
      const url = '/privatemessages/post'
      axios
        .post(url, null, {
          params: {
            messageRoomId: this.$route.params.room_id,
            messageWriterId: this.userInfo.userId,
            content: this.message
          }
        })
        .then((res) => {
          console.log(res)
          this.$router.go(-1)
        })
        .catch((err) => {
          console.log(err)
        })
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

input {
  margin: 3%;
  outline: none;
  border: none;
  font-weight: bolder;
  font-size: larger;
  color: #c9caca;
}
input::placeholder {
  color: #c9caca;
}

.sendMessageBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 13%;
  right: 5%;
  position: absolute;
  height: 5.5%;
  width: 30%;
  z-index: 1;
  border-radius: 100px;
  background-color: #316464;
}
</style>
