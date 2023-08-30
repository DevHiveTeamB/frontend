<template>
  <UpperBar title="쪽지함" rightSource="refreshBtn" :clickFunction="refresh" />
  <!-- 로딩창 -->
  <div v-if="this.chatLoading" style="height: 80%; width: 100%">
    <LoadingSpinner :setloading="true" />
  </div>
  <!-- 쪽지함들 -->
  <div v-else style="overflow-y: auto; height: 80%; width: 100%; display: inline-block">
    <div
      class="chatRoom"
      :key="index"
      v-for="(value, index) in messageRooms"
      @click="moveToChatRoom(value.roomID, value.opponent.id)"
    >
      <img class="profile" :src="value.opponent.profilePhoto" />
      <div class="chatRoominfo">
        <h2
          class="name"
          style="margin: 0; font-size: 15px; white-space: nowrap; color: #c9caca; margin-bottom: 2%"
        >
          <!-- 상대방 정보 -->
          <div>{{ value.opponent.username }}</div>
          <div style="margin-left: auto; margin-right: 3%;-">
            {{ formatLastMessageDate(value.lastMessageDate) }}
          </div>
        </h2>
        <h3
          class="content"
          :style="{
            fontSize: 15 + 'px',
            marginTop: 1 + '%',
            color: value.lastMessageData === '' ? '#c9caca' : ''
          }"
        >
          {{ value.lastMessageData === '' ? '대화를 시작하세요!' : value.lastMessageData }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import UpperBar from '../components/UpperBar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
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
    UpperBar,
    LoadingSpinner
  },
  methods: {
    refresh() {
      this.$router.go(0)
    },
    getMessageRooms() {
      this.chatLoading = true
      const url = `/message-rooms/messagerooms/user/get/${this.userId}`
      axios
        .get(url)
        .then((res) => {
          console.log(res.data)
          this.messageRooms = res.data
          this.$nextTick(() => {
            this.chatLoading = false
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    formatLastMessageDate(date) {
      if (!date) return '...'
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
      return formattedDate
    },
    moveToChatRoom(roomID, opponentId) {
      this.$router.push(`/chat/${roomID}/${opponentId}`)
    }
  },
  data() {
    return {
      searchResult: [1, 2, 3, 4],
      chatLoading: true,
      messageRooms: [
        {
          opponent: {
            id: 0,
            username: '',
            profilePhoto: '',
            rating: 0
          },
          roomID: 0,
          lastMessageData: '',
          lastMessageDate: '',
          postid: 0
        }
      ]
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
