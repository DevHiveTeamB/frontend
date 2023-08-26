<template>
  <UpperBar title="DevHive" rightSource="hamburgerBtn" :clickFunction="toggleDropdown" />

  <div class="profileContainer" style="margin: 5%; width: 90%">
    <img src="../assets/bookdetail/icon_bookdetail_basic_profile.svg" style="height: 100%" />
    <div class="leftItem" style="top: 5%; color: #c9caca; font-size: medium">
      {{ this.communityPostContent.writer.username }}
    </div>
    <div class="leftItem" style="bottom: 5%; color: #c9caca; font-size: smaller">
      {{ getFormattedDate(this.communityPostContent.communityPostDate) }}
    </div>
  </div>

  <div class="contentContainer" style="margin: 0% 5%; margin-bottom: 5%">
    <div class="title">{{ this.communityPostContent.communityPostTitle }}</div>
    <div class="content">{{ this.communityPostContent.communityPostContent }}</div>
    <div style="font-size: smaller">
      <img
        src="../assets/community/icon_community_comment.svg"
        style="width: 10px; margin-right: 1%"
      />
      999+
      <img
        src="../assets/community/icon_community_like.svg"
        style="width: 10px; margin-right: 1%"
      />99+
    </div>
  </div>

  <div class="commentContainer" style="border: 1px solid #2e6464; height: 100%">
    <div style="border: 1px solid #c9caca" :key="index" v-for="(value, index) in comments">
      <div class="profileContainer" style="padding: 3%; padding-bottom: 0">
        <img src="../assets/bookdetail/icon_bookdetail_basic_profile.svg" style="height: 30px" />
        <div class="leftItem comment" style="top: 18%; color: #c9caca; font-size: small">
          이희연
        </div>
        <div class="leftItem comment" style="bottom: 10%; color: #c9caca; font-size: smaller">
          2023.08.24
        </div>
        <div class="rightItem">
          <img src="../assets/community/icon_community_notLike.svg" style="width: 10px" />
          99+
          <img src="../assets/chat/icon_chat_report.svg" style="width: 10px" />
        </div>
      </div>
      <div style="margin-left: 15%; font-size: small; font-weight: bold; margin-bottom: 3%">
        댓글입니다아ㅏ아ㅏ아
      </div>
    </div>
  </div>

  <!-- 토글창 -->
  <!-- 글 소유자이면 수정/삭제/새로고침 아니라면 신고/새로고침 -->
  <!-- <div v-if="isDropdownOpen" class="dropdown-menu">
    <div
      v-for="(value, index) in userId === postData.writer.userId ? item1 : item2"
      :key="index"
      class="dropdown-item"
      @click="navigateToPage(value)"
    >
      {{ value }}
    </div>
  </div> -->
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
    this.comments = null
    axios.get(`/communityposts/get/${this.$route.params.post_id}`).then((res) => {
      this.communityPostContent = res.data
      this.comments = res.data.comments
      console.log(res.data)
    })
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    getFormattedDate(dateString) {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')

      return `${year}-${month}-${day}`
    }
  },
  components: { UpperBar },
  data() {
    return {
      item1: ['수정하기', '삭제하기', '새로고침'],
      item2: ['신고하기', '새로고침'],
      isDropdownOpen: false,
      communityPostContent: {
        communityPostID: 1,
        writer: {
          id: 1,
          username: '',
          loginId: null
        },
        communityPostTitle: '',
        communityPostContent: '',
        communityPostDate: '',
        communityPostsPictures: null,
        communityPostLikesCount: null,
        isCommunityPostLikes: null
      },
      comments: [
        {
          commentsID: 0,
          user: {
            id: 0,
            username: '',
            loginId: ''
          },
          commentContent: '',
          commentDate: ''
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  width: 30%;
  position: absolute;
  top: 60px;
  right: 0px;
  background-color: #d9d9d9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  text-align: center;
}

.dropdown-item {
  padding: 10%;
  cursor: pointer;
  border: 1px solid #fff;
}

.profileContainer {
  position: relative;
  font-size: small;
  font-weight: bold;
}
.leftItem {
  position: absolute;
  left: 17%;
}

.leftItem.comment {
  left: 15%;
}

.title {
  font-size: medium;
  font-weight: bolder;
  margin-bottom: 5%;
}
.content {
  color: #c9caca;
  font-size: small;
  margin-bottom: 5%;
}

.rightItem {
  position: absolute;
  right: 5%;
  top: 18%;
  font-size: smaller;
  color: #c9caca;
}
</style>
