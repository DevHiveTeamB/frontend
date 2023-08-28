<template>
  <UpperBar title="DevHive" rightSource="hamburgerBtn" :clickFunction="toggleDropdown" />
  <!-- 로딩창 -->
  <div v-if="this.communitylistLoading" style="height: 100%; width: 100%;">
    <LoadingSpinner :setloading="true" />
  </div>
  <!-- 글 정보 -->
  <div v-else style="width: 100%; padding: 5%;border-bottom: 1px solid #316464;">
  <!-- 글쓴이 프로필 -->
    <div class="profileContainer" style="width: 100%; margin-bottom: 5%;">
      <img src="../assets/bookdetail/icon_bookdetail_basic_profile.svg" style="height: 100%" />
      <div class="leftItem" style="top: 5%; color: #c9caca; font-size: medium">{{this.communityPostContent.writer.username}}</div>
      <div class="leftItem" style="bottom: 5%; color: #c9caca; font-size: smaller">{{ getFormattedDate(this.communityPostContent.communityPostDate) }}</div>
    </div>

    <!-- 글 제목, 내용, 댓글, 좋아요 수 -->
    <div class="contentContainer">
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
  </div>

  <!-- 댓글 컨테이너 -->
  <div v-if="!this.communitylistLoading" ref="commentContainer" class="commentContainer" style="overflow-y: auto;flex-grow: 1;">
    <div style="border: 1px solid #c9caca" :key="index" v-for="(value,index) in comments">
      <!-- 댓글쓴이 정보 -->
      <div class="profileContainer" style="padding: 3%; padding-bottom: 0">
        <img src="../assets/bookdetail/icon_bookdetail_basic_profile.svg" style="height: 30px" />
        <!-- 유저 이름 -->
        <div class="leftItem comment" style="top: 18%; color: #c9caca; font-size: small">
          {{ value.user.username  }}
        </div>
        <!-- 날짜 -->
        <div class="leftItem comment" style="bottom: 10%; color: #c9caca; font-size: smaller">
          {{ getFormattedDate(value.commentDate)  }}
        </div>
        <!-- 좋아요, 신고 -->
        <div class="rightItem">
          <img src="../assets/community/icon_community_notLike.svg" style="width: 10px" />
          99+
          <img src="../assets/chat/icon_chat_report.svg" style="width: 10px" />
        </div>
      </div>
      <!-- 댓글 내용 -->
      <div style="margin-left: 15%; font-size: small; font-weight: bold; margin-bottom: 3%">
        {{ value.commentContent }}
      </div>
    </div>
  </div>
  <!-- 댓글 작성창 -->
  <div class="inputContainer" @click="isLogin">
    <input v-model="commentInput" type="text" class="inputbox" />
    <div v-if="this.commentLoading" style="width: 10%; margin: 1%;">
      <LoadingSpinner :setloading="true" height="30px" width="30px"/>
    </div>
    <img v-else src="../assets/chat/icon_chat_disable.svg" class="inputImg" @click="createComment"/>
  </div>
  <!-- 밑 네브바를 채워줄 빈공간 -->
  <div style="margin-top: auto; flex-basis: 10%; flex-shrink: 0;" />
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
import LoadingSpinner from '../components/LoadingSpinner.vue'
import axios from '../main.js'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['userInfo','isLoggedIn']),
    userId() {
      return this.userInfo.userId
    },
  },
  created() {
    this.reload()
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    reload(callback){
      this.comments = [];
      this.communitylistLoading = true
      axios.get(`/communityposts/get/${this.$route.params.post_id}`).then((res) => {
        this.communityPostContent = res.data
        this.comments = res.data.comments
        this.communitylistLoading = false
        //callback 이 함수라면 함수 실행
        if(callback){
          callback()
        }
      })
    },
    createComment(){
      if(!this.isLoggedIn)
        this.$router.push('/login')
      else{
        //빈칸이면 쓰라고 알려주기
        if(this.commentInput == ""){
          alert("빈칸으로 작성할수 없습니다.")
          return
        }
        this.commentLoading = true
        const text = this.commentInput
        this.commentInput = ""
        axios.post(`/comments/post/{CommentsID}`,{
          "userID": this.userId,
          "communityPostID": this.$route.params.post_id,
          "commentContent": text
      }).then((res) => {
          console.log(res)
          this.reload(()=>{
            //댓글들 가져오면 맨 아래로 스크롤
            this.$nextTick(() => {
              this.$refs.commentContainer.scrollTop = this.$refs.commentContainer.scrollHeight
              this.commentLoading = false
            })
          })
        })
      }
    },
    getFormattedDate(dateString) {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')

      return `${year}-${month}-${day}`
    }
  },
  components: { UpperBar,LoadingSpinner },
  data() {
    return {
      item1: ['수정하기', '삭제하기', '새로고침'],
      item2: ['신고하기', '새로고침'],
      communitylistLoading : true,
      commentLoading : false,
      commentInput : "",
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
      ],
    }
  },
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
.inputContainer {
  border-top: 1px solid #316464;
  height: 5%;
  display: flex;
  justify-content: center;
}
.inputbox {
  border: 1.5px solid #316464;
  flex-grow: 1;
  border-radius: 10px;
  margin: 1% 0%;
  margin-left: 1%;
  padding: 0 5%;
}

.inputImg {
  width: 10%;
  padding: 1%;
  margin: 1%;
}
</style>
