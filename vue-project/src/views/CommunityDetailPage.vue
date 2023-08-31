<template>
  <UpperBar title="DevHive" rightSource="hamburgerBtn" :clickFunction="toggleDropdown" />
  <!-- 로딩창 -->
  <div v-if="this.communitylistLoading" style="height: 100%; width: 100%;">
    <LoadingSpinner :setloading="true" />
  </div>
  <!-- 글 정보 -->
  <div v-else style="width: 100%; padding: 5%;border-bottom: 1px solid #316464;">
  <!-- 글쓴이 프로필 -->
    <div class="" style="display: flex; width: 100%; margin-bottom: 5%;">
      <div style="display: flex; justify-content: center; height: 50px; width: 50px; border-radius: 50%; overflow: hidden; margin-right: 5%;">
        <img :src="this.communityPostContent.writer.profilePhoto" style="height: 100%; width: 100%;" />
      </div>
      <div style="display: flex; flex-direction: column;">
        <div class="" style="top: 5%; color: #c9caca; font-size: medium">{{this.communityPostContent.writer.username}} #{{ this.communityPostContent.writer.id }}</div>
        <div class="" style="margin-top: auto; bottom: 5%; color: #c9caca; font-size: smaller">{{ getFormattedDate(this.communityPostContent.communityPostDate) }}</div>
      </div>
    </div>

    <!-- 글 제목, 내용, 댓글, 좋아요 수 -->
    <div class="contentContainer">
      <div class="title">{{ this.communityPostContent.communityPostTitle }}</div>
      <div class="content">{{ this.communityPostContent.communityPostContent }}</div>
      <div style="font-size: 16px; display: flex; align-items: center;">
        <img
          src="../assets/community/icon_community_comment.svg"
          style="width: 16px; margin-right: 1%"
        />
        {{ this.comments.length>=1000? '999+':this.comments.length }}
        <img
          :src="this.communityPostContent.isCommunityPostLikes? 
            require('../assets/community/icon_community_like.svg') :
            require('../assets/community/icon_community_notLike.svg')"
          style="width: 16px; margin-right: 1%; margin-left: 3%;"
        />{{ this.communityPostContent.communityPostLikesCount>=1000? '999+':this.communityPostContent.communityPostLikesCount }}
      </div>
    </div>
  </div>

  <!-- 댓글 컨테이너 -->
  <div v-if="!this.communitylistLoading" ref="commentContainer" class="commentContainer" style="overflow-y: auto;flex-grow: 1;">
    <div style="border: 1px solid #c9caca" :key="index" v-for="(value,index) in comments">
      <!-- 댓글쓴이 정보 -->
      <div class="profileContainer" style="padding: 3%; padding-bottom: 0">
        <img :src="value.user.profilePhoto" style="height: 30px; width: 30px; border-radius: 50%;" />
        <!-- 유저 이름 -->
        <div class="leftItem comment" style="top: 18%; color: #c9caca; font-size: small">
          {{ value.user.username  }} #{{ value.user.id }}
        </div>
        <!-- 날짜 -->
        <div class="leftItem comment" style="bottom: 10%; color: #c9caca; font-size: smaller">
          {{ getFormattedDate(value.commentDate)  }}
        </div>
        <!-- 좋아요, 신고 -->
        <div class="rightItem">
          <img :src="value.isLikes?
            require('../assets/community/icon_community_like.svg') :
            require('../assets/community/icon_community_notLike.svg')" 
            @click="commentLike(index)"
            style="width: 12px" />
          <div style="width: 10%;">
            {{ value.likes>=100? '99+':value.likes }}
          </div>
          <img src="../assets/chat/icon_chat_report.svg" style="width: 12px;margin-left: auto;" />
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
  <div v-if="isDropdownOpen" class="dropdown-menu">
    <div
      v-for="(value, index) in userId === this.communityPostContent.writer.id ? this.myItem : this.otherItem"
      :key="index"
      class="dropdown-item"
      @click="value.function()"
    >
      {{ value.value }}
    </div>
  </div>
</template>

<script>
import UpperBar from '../components/UpperBar.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import axios from '../main.js'
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['userInfo','isLoggedIn','selectCommnunity']),
    userId() {
      if(!this.isLoggedIn) return null
      return this.userInfo.userId
    },
  },
  created() {
    this.reload()
  },
  methods: {
    ...mapMutations(['setSelectCommnunity']),
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    navigateToPage(value){
      console.log(value)
    },
    reload(callback){
      this.comments = [];
      this.communitylistLoading = true
      const url = this.isLoggedIn ? 
        `/communityposts/get/${this.$route.params.post_id}?userId=${this.userId}` : 
        `/communityposts/get/${this.$route.params.post_id}`
      axios.get(url).then((res) => {
        console.log(url)
        console.log(res.data)
        this.communityPostContent = res.data
        this.setSelectCommnunity(res.data)
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
        axios.post(`/comments/post`,{
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
    commentLike(index){
      if(this.isWaiting) return
      if(!this.isLoggedIn){
        this.$router.push('/login')
        return
      }
      this.isWaiting = true
      const comment = this.comments[index]
      if(comment.isLikes){
        axios.delete(`/CommentsLikesList/delete?userID=${this.userId}&&commentId=${comment.commentsID}`).then((res) => {
          console.log(res.data)
          this.isWaiting = false
        })
      }
      else{
        axios.post(`/CommentsLikesList/post?userID=${this.userId}&&commentId=${comment.commentsID}`).then((res) => {
          console.log(res.data)
          this.isWaiting = false
        })
      }
      comment.isLikes = !comment.isLikes
      comment.likes += comment.isLikes? 1:-1
      this.isWaiting = false
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
    const item = {
      'modifie':{
        'value' : '수정하기',
        'function' : ()=>{
          this.$router.push(`/community/edit/${this.$route.params.post_id}`)
          console.log('수정하기')
        },
      },
      'delete':{
        'value' : '삭제하기',
        'function' : ()=>{
          console.log('삭제하기')
        },
      },
      'report':{
        'value' : '신고하기',
        'function' : ()=>{
          if(!this.isLoggedIn){
            this.$router.push('/login')
            return
          }
          console.log('신고하기')
        },
      },
      'refresh':{
        'value' : '새로고침',
        'function' : ()=>{
          console.log('새로고침')
          this.reload()
        },
      },
      'like':{
        'value' : '좋아요',
        'function' : ()=>{
          if(this.isWaiting) return
          if(!this.isLoggedIn){
            this.$router.push('/login')
            return
          }
          this.isWaiting = true
          if(this.communityPostContent.isCommunityPostLikes){
            this.communityPostContent.isCommunityPostLikes = false
            this.communityPostContent.communityPostLikesCount -= 1
            axios.delete(`/CommunityPostLikesList/delete?userID=${this.userId}&&postID=${this.communityPostContent.communityPostID}`).then((res) => {
              console.log(res.data)
              this.isWaiting = false
            })
          }
          else{
            this.communityPostContent.isCommunityPostLikes = true
            this.communityPostContent.communityPostLikesCount += 1
            axios.post(`/CommunityPostLikesList/post?userID=${this.userId}&&postID=${this.communityPostContent.communityPostID}`).then((res) => {
              console.log(res.data)
              this.isWaiting = false
            })
          }
        },
      },
    }
    return {
      myItem :[item.modifie,item.delete,item.refresh],
      otherItem : [item.report,item.like,item.refresh],
      communitylistLoading : true,
      commentLoading : false,
      isWaiting : false,
      commentInput : "",
      isDropdownOpen: false,
      communityPostContent: {
        "communityPostID": 0,
        "writer": {
          "id": 0,
          "username": "",
          "profilePhoto":"",
          "loginId": null
        },
        "communityPostTitle": "",
        "communityPostContent": "",
        "communityPostDate": "",
        "communityPostLikesCount": 0,
        "isCommunityPostLikes": false,
      },
      comments: [
        {
          commentContent: '',
          commentDate: '',
          commentsID: 0,
          isLike: false,
          likes:0,
          user: {
            id: 0,
            username: '',
            profilePhoto: '',
            loginId: ''
          },
        }
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
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
.contentContainer{
  width: 100%;
}

.content {
  color: #c9caca;
  font-size: small;
  margin-bottom: 5%;
  //줄바꿈 가능
  width: 100%;
  word-wrap: break-word;
}

.rightItem {
  position: absolute;
  right: 5%;
  top: 18%;
  font-size: 12px;
  color: #c9caca;
  display: flex;
  width: 12%;
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
