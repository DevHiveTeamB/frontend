<template>
  <UpperBar title="쪽지함" rightSource="refreshBtn" :clickFunction="refresh" />
  <div style="overflow-y: auto; height: 80%; width: 100%; display: inline-block">
    <div
      class="chatRoom"
      :key="index"
      v-for="(value, index) in getData.messageRoom"
      @click="moveToChatRoom(value.roomID)"
    >
      <img class="profile" :src="this.userInfo.profilePhoto" />
      <div class="chatRoominfo">
        <h2
          class="name"
          style="margin: 0; font-size: 15px; white-space: nowrap; color: #c9caca; margin-bottom: 2%"
        >
          <!-- API 수정되면 수정할 부분(상대방 정보가져오기) -->
          <div>이원찬</div>
          <div style="margin-left: auto; margin-right: 3%;-">
            {{ formatLastMessageDate(value.lastMessageDate) }}
          </div>
        </h2>
        <h3 class="content" style="font-size: 15px; margin-top: 1%">
          {{ value.lastMessageData }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import UpperBar from '../components/UpperBar.vue'
import axios from '../main.js'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['userInfo']),
    userId() {
      return this.userInfo.userId
    }
  },
  created() {
    this.getMessageRooms()
  },
  components: {
    UpperBar
  },
  methods: {
    refresh() {
      this.$router.go(0)
    },
    //유저 메시지룸 조회 API
    // 오류 왜뜨지..?
    getMessageRooms() {
      const url = `/message-rooms/messagerooms/user/get/${this.userId}`
      axios
        .get(url)
        .then((res) => {
          console.log(res.data)
          this.getData = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    formatLastMessageDate(date) {
      if (!date) return 'null'
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
      return formattedDate
    },
    moveToChatRoom(roomID) {
      this.$router.push(`/chat/${roomID}`)
    }
  },
  data() {
    return {
      searchResult: [1, 2, 3, 4],
      getData: {
        messageRoom: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chatRoom {
  display: flex;
  align-items: center;
  height: 100px;
  width: 100%;
  padding: 10px 0;
  border-bottom: solid 2px #316464;
}

.profile {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  /* 비율이 안깨지게 */
  //object-fit: contain;
  margin: 0 3%;
}

.chatRoominfo {
  flex-grow: 1;
  padding-right: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.name {
  display: flex;
}

.content {
  margin: 0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
