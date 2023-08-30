<template>
  <UpperBar title="커뮤니티" rightSource="No" />
  <div style="width: 100%; height: 80%; position: relative;">
    <!-- 검색창 -->
    <div style="height: 8%; width: 100%; border: 1px solid #316464; display: flex; padding: 2%;">
      <input
      class="searchInput"
        v-model="searchText"
        ref="searchInput"
        placeholder="검색어를 입력하세요"
      />
      <div style="display: flex; justify-content: center; align-content: center; padding: 1%;">
        <img class="imageItem" src="../assets/main/icon_main_search.svg" @click="searchTest" />
      </div>
    </div>
    <!-- 글쓰기 버튼 -->
    <div class="communityCreateBtn" @click="communityCreate">
      <div style="display: flex; justify-content:center; align-items: center; margin-left: 5%;">
        <img src="../assets/community/icon_add_community.svg" />
      </div>
      <div style="display: flex; justify-content:center; align-items: center; margin: 0 auto;">
        <img src="../assets/community/icon_write.svg" />
      </div>
    </div>
    <!-- 커뮤니티 리스트 -->
    <div v-if="this.communitylistLoading" style="height: 100%; width: 100%;">
        <LoadingSpinner :setloading="true"/>
    </div>
    <div v-else style="overflow-y: auto; height: 92%; width: 100%">
      <div class="community"  :key="index" v-for="(value,index) in communityList" @click="clickCommunityPost(value.communityPostID)">
        <!-- 날짜 -->
        <div style="position: absolute; right: 2%; top: 10%; font-size: 14px; color: #c9caca">{{ getFormattedDate(value.communityPostDate) }}</div>
        <!-- 댓글, 좋아요 -->
        <div style="height: 12%; display: flex; position: absolute; right: 5%; bottom: 10%; color: #c9caca;">
          <div style="display: flex; justify-content:center; align-items: center; margin-right: 5%;">
            <img style="height: 100%;"  src="../assets/community/icon_community_comment.svg"/>
          </div>
          <div style="font-size: 10px; margin-right: 10%;  display: flex; justify-content: center; align-items: center;" >99+</div>
          <div style="display: flex; justify-content:center; align-items: center; margin-right: 5%;">
            <img style="height: 100%;" src="../assets/bookdetail/icon_bookdetail_likes.svg"/>
          </div>
          <div style="font-size: 10px; display: flex; justify-content: center; align-items: center;" >{{ value.communityPostLikesCount }}</div>
        </div>
        <!-- 내용 -->
        <div class="postContent">
          <h2
            class="contentItem"
            style="font-size: 18px;"
          >
            {{ value.communityPostTitle }}
          </h2>
          <div
            class="contentItem"
            style="height: auto; margin-top: 2%; font-size: 12px; color: #c9caca"
          >
            {{ value.communityPostContent }}
          </div>
          <div style="font-size: 12px; color: #c9caca; margin-top: 4%;" class="contentItem">{{ value.writer.username }} #{{ value.writer.id }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpperBar from '../components/UpperBar.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
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
    this.communitylistLoading = true
    axios.get('/communityposts').then((res) => {
      console.log(res.data)
      this.communityList = res.data
      this.$nextTick(() => {
        this.communitylistLoading = false
      })
    })
  },
  components: {
    UpperBar,
    LoadingSpinner
  },
  methods: {
    favorite(){
      this.isFavorite = !this.isFavorite
    },
    getFormattedDate(dateString) {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')

      return `${year}-${month}-${day}`
    },
    communityCreate(){
      if(this.userInfo == null)
        this.$router.push('/login')
      else
        this.$router.push('/community/post')
    },
    clickCommunityPost(postId){
      this.$router.push(`/community/detail/${postId}`)
    },
  },
  data() {
    return {
      searchText : "",
      communitylistLoading : true,
      communityList: [
        {
          "communityPostID": 1,
          "writer": {
            "id": 0,
            "username": "",
            "loginId": null
          },
          "communityPostTitle": "",
          "communityPostContent": "",
          "communityPostDate": "",
          "communityPostLikesCount": null,
          "commentIDs": null
        }
      ],
    }
  }
}
</script>
<style lang="scss" scoped>
.searchInput{
  border: none;
  outline: none;
  color: #316464;
  font-size: 20px;
  flex-grow: 1;
}

.communityCreateBtn{
  display: flex;
  align-items: center;
  bottom: 3%;
  right: 5%;
  position: absolute;
  height: 6.5%;
  width: 30%;
  z-index: 1;
  border-radius: 100px;
  background-color: #316464;
}
.community{
  display: flex;
  position:relative;
  flex-direction: column;
  justify-content:center;
  border: 1px solid #316464;
  height: 120px;
  width: 100%;
  margin: 5px 0;
  padding: 5% 5%;
}

.contentItem{
  margin: 0;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
