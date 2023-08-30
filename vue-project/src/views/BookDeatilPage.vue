<template>
  <UpperBar title="DevHive" rightSource="hamburgerBtn" :clickFunction="toggleDropdown" />
  <div v-if="this.postDeleteLoading" class="modal">
    <LoadingSpinner :setloading="true" />
  </div>
  <!-- 로딩창 -->
  <div v-if="detailLoading" style="height: 83%">
    <LoadingSpinner :setloading="true" />
  </div>
  <!-- 게시글 정보 -->
  <div v-else-if="postData">
    <!-- 글쓴이 정보 -->
    <div class="profileContainer">
      <img
        style="height: 40px; width: 40px; border-radius: 15px"
        :src="`${postData.writer.profilePhoto}`"
      />
      <div class="profileInfo">
        <div class="leftItem name">
          {{ postData.writer.username }}
        </div>
        <div class="rating leftItem" style="display: flex">
          <div
            :key="index"
            v-for="(value, index) in [1, 2, 3, 4, 5]"
            :class="`${postData.writer.ratingState >= value ? 'star' : 'nostar'}`"
          >
            <img style="width: 100%; height: 100%" src="../assets/mypage/icon_mypage_star.svg" />
          </div>
          ({{ postData.writer.ratingState }})
        </div>
        <div class="rightItem date">
          {{ getFormattedDate(postData.postDate) }}
        </div>
        <div class="rightItem hitAndLike">
          <img src="../assets/bookdetail/icon_bookdetail_hits.svg" style="width: 10px" />
          {{ postData.hits }}
          <img src="../assets/bookdetail/icon_bookdetail_likes.svg" style="width: 10px" />
          좋아요
        </div>
      </div>
    </div>
    <!-- 게시글 사진 슬라이더 -->
    <div class="photoContainer">
      <div class="photoSlider">
        <div v-for="(value, index) in postData.postPictures" :key="index" class="photoSlide">
          <img :src="value.picture" alt="PostImage" />
        </div>
      </div>
    </div>
    <!-- 게시글 내용 -->
    <div class="contentContainer">
      <div class="titleContainer">
        <div id="title">{{ postData.postTitle }}</div>
        <img
          @click="changeIsFavorite"
          style="width: 7%"
          v-bind:src="
            isFavorite
              ? require('../assets/bookdetail/icon_bookdetail_isLike.svg')
              : require('../assets/bookdetail/icon_bookdetail_likes.svg')
          "
          alt="LikeImage"
        />
      </div>
      <div id="category" style="margin: 5%; display: flex">
        <div class="categoryItem">
          {{ postData.lecture.lectureName }}
        </div>
        <div class="categoryItem">{{ postData.lecture.professorName }}</div>
        <div class="categoryItem">{{ postData.lecture.major }}</div>
      </div>
      <div id="content">{{ postData.postContent }}</div>
      <div id="price">{{ postData.price }}원</div>
    </div>
    <!-- 거래하기 버튼. 내 글이면 안보임-->
    <div v-if="userId != postData.writer.userId">
      <div class="BookTradeBtn" @click="goMessageroom">
        <div v-if="this.tradeLoading" style="height: 100%; width: 100%">
          <LoadingSpinner
            :setloading="true"
            height="30px"
            width="30px"
            color="#ffffff"
            alpha="0.3"
          />
        </div>
        <div
          v-else
          style="display: flex; justify-content: center; align-items: center; margin: 0 auto"
        >
          <img src="../assets/bookdetail/icon_bookdetail_tradeBtn.svg" />
        </div>
      </div>
    </div>
  </div>

  <!-- 토글창 -->
  <!-- 글 소유자이면 수정/삭제 아니라면 신고하기 -->
  <div v-if="isDropdownOpen" class="dropdown-menu">
    <div
      v-for="(value, index) in userId === postData.writer.userId ? item1 : item2"
      :key="index"
      class="dropdown-item"
      @click="navigateToPage(value)"
    >
      {{ value }}
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
      if (this.userInfo === null) return null
      return this.userInfo.userId
    }
  },
  created() {
    this.sendGetRequest()
  },
  components: {
    UpperBar,
    LoadingSpinner
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    sendGetRequest() {
      this.detailLoading = true
      const url = `/v1/post/${this.postId}`
      axios
        .get(url, {
          params: {
            userId: this.userId
          }
        })
        .then((res) => {
          console.log(url, this.userId)
          console.log(res.data)
          this.postData = res.data
          this.$nextTick(() => {
            this.detailLoading = false
          })
        })
        .catch((err) => {
          console.log(url, this.userId)
          console.log(err)
        })
    },
    //날짜를 년,월,일만 가져오도록 변환
    getFormattedDate(dateString) {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')

      return `${year}-${month}-${day}`
    },
    //찜 기능
    changeIsFavorite() {
      this.isFavorite = !this.isFavorite
      console.log(this.userId, this.postId)
      if (this.isFavorite) {
        axios
          .post('/favorites/post', {
            userID: this.userId,
            postID: this.postId
          })
          .then((res) => {
            console.log(res.data)
            console.log('찜 추가')
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        axios
          .delete('/favorites/delete', {
            userID: this.userId,
            postID: this.postId
          })
          .then((res) => {
            console.log(res.data)
            console.log('찜 삭제')
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    //게시글 수정,삭제하기 기능
    navigateToPage(value) {
      if (value === '수정하기') {
        this.$router.push(`/bookedit/${this.postId}`)
      } else if (value === '삭제하기') {
        const isConfirmed = confirm('게시글을 삭제하시겠습니까?')
        this.postDeleteLoading = true
        if (isConfirmed) {
          axios
            .delete(`v1/post/${this.postId}`)
            .then((res) => {
              console.log(res.data)
              alert('게시글이 삭제되었습니다.')
              this.postDeleteLoading = false
              this.$router.go(-1)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      } else if (value === '신고하기') {
        this.$router.push(`/report/${this.postId}`)
      }
    },
    //거래하기 버튼 눌렀을 때
    goMessageroom() {
      // 로딩중이 아닐때 && 로그인 중일때
      if (!this.tradeLoading && this.userInfo !== null) {
        this.tradeLoading = true
        const url = '/message-rooms/messagerooms/post'
        axios
          .post(url, null, {
            params: {
              postId: this.postId,
              buyerId: this.userId
            }
          })
          .then((res) => {
            //response로 messageroomId가 넘어옴
            console.log(res.data)
            this.messageroomId = res.data
            this.$router.push(`/chat`)
            this.tradeLoading = false
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.userInfo === null) {
        this.$router.push('/login')
      }
    }
  },
  data() {
    return {
      postId: this.$route.params.post_id,
      detailLoading: true,
      tradeLoading: false,
      postDeleteLoading: false,
      postData: null,
      isDropdownOpen: false,
      item1: ['수정하기', '삭제하기'],
      item2: ['신고하기'],
      isFavorite: null,
      messageroomId: null //거래하기 버튼 눌렀을때 반환되는 메시지룸 ID
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
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
  margin: 5%;
  width: 90%;
  position: relative;
  font-size: small;
  font-weight: bold;
}

.leftItem {
  position: absolute;
  left: 15%;
  top: 0;
}

.rating {
  top: 45%;
}

.rightItem {
  position: absolute;
  right: 0;
  top: 0;
}

.hitAndLike {
  top: 45%;
}

.photoContainer {
  margin: 5%;
}

.photoSlider {
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
}

.photoSlide {
  height: 270px;
  flex-shrink: 0;
  scroll-snap-align: start;
  margin-right: 10px;
}

.photoSlide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contentContainer {
  width: 100%;
  position: relative;
}

.titleContainer {
  display: flex;
  justify-content: space-between;
  font-size: large;
  font-weight: bolder;
  margin: 5%;
}

.categoryItem {
  border: 2px solid #316464;
  border-radius: 20px;
  padding: 1% 3%;
  margin-right: 3%;
  font-weight: bold;
  font-size: small;
  color: #316464;
}

#content {
  margin: 5%;
  width: 90%;
  font-size: small;
  color: #727272;
}

#price {
  margin: 5%;
  width: 90%;
  font-weight: bold;
  font-size: large;
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

.BookTradeBtn {
  display: flex;
  align-items: center;
  bottom: 15%;
  right: 5%;
  position: absolute;
  height: 5.5%;
  width: 30%;
  z-index: 1;
  border-radius: 100px;
  background-color: #316464;
}
</style>
