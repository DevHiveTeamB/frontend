<template>
  <UpperBar title="쪽지함" rightSource="refreshBtn" :clickFunction="refresh" />
  <div style="overflow-y: auto; height: 80%; width: 100%; display: inline-block;">
      <div
        class="chatRoom"
        :key="index"
        v-for="(value, index) in searchResult"
        @click="() => {}"
      >
        <img class="profile" :src="this.userInfo.profilePhoto" />
        <div class="chatRoominfo">
          <h2
            class="name"
            style="margin: 0; font-size: 18px; white-space: nowrap; color: #c9caca"
          >
            <div>이원찬 #1234</div>
            <div style="margin-left: auto; font-size: 14px;">2000.09.21</div>
          </h2>
          <h3
            class="content"
            style="height: 35%;font-size: 15px; margin-top: 6%;"
          >
            어제는 잘 들어갔어요? ~어제는 잘 들어갔어요? ~어제는 잘 들어갔어요? ~어제는 잘 들어갔어요? ~어제는 잘 들어갔어요? ~어제는 잘 들어갔어요? ~
          </h3>
        </div>
      </div>
    </div>
</template>

<script>
import UpperBar from '../components/UpperBar.vue'
// import axios from '../main.js'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['userInfo']),
    userId() {
      return this.userInfo.userId
    }
  },
  created() {
    
  },
  components: {
    UpperBar,
},
  methods: {
    refresh(){
      this.$router.go(0)
    }
  },
  data() {
    return {
      postId: this.$route.params.post_id,
      searchResult : [1,2,3,4],
      postData: null,
      isDropdownOpen: false,
      item1: ['수정하기', '삭제하기'],
      item2: ['신고하기'],
      isFavorite: null
    }
  }
}
</script>

<style lang="scss" scoped>
.chatRoom {
  display: flex;
  align-items: center;
  height: 120px;
  width: 100%;
  padding: 10px  0;
  border-bottom: solid 2px #316464;
}

.profile {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  /* 비율이 안깨지게 */
  object-fit: contain;
  margin: 0 2%;
}

.chatRoominfo {
  flex-grow: 1;
  padding-right:2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.name{
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
