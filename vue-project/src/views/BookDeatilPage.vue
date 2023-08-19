<template>
  <UpperBar title="DevHive" rightSource="hamburgerBtn" :clickFunction="toggleDropdown" />
  <div v-if="postData">
    <div class="profileContainer">
      <img src="../assets/bookdetail/icon_bookdetail_basic_profile.svg" />
      <div class="profileInfo">
        <div class="leftItem name">
          {{ postData.writer.username }}
        </div>
        <div class="leftItem rating">평점</div>
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
    <div class="photoContainer">
      <div class="photoSlider">
        <div v-for="(value, index) in postData.postPictures" :key="index" class="photoSlide">
          <img :src="value.picture" alt="PostImage" />
        </div>
      </div>
    </div>
    <div class="contentContainer">
      <div class="titleContainer">
        <div id="title">{{ postData.postTitle }}</div>
        <div id="isLike">{{ postData.isLike }}</div>
      </div>
      <div id="content">{{ postData.postContent }}</div>
      <div id="price">{{ postData.price }}원</div>
    </div>
  </div>
  <button>거래하기</button>

  <!-- 토글창 -->
  <!-- 글 소유자이면 수정/삭제 아니라면 신고하기 -->
  <div v-if="isDropdownOpen" class="dropdown-menu">
    <div v-for="(value, index) in item1" :key="index" class="dropdown-item">{{ value }}</div>
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
    this.sendGetRequest()
  },
  components: {
    UpperBar
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    sendGetRequest() {
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
        })
        .catch((err) => {
          console.log(url, this.userId)
          console.log(err)
        })
    },
    getFormattedDate(dateString) {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')

      return `${year}-${month}-${day}`
    }
  },
  data() {
    return {
      postId: this.$route.params.post_id,
      postData: null,
      isDropdownOpen: false,
      item1: ['수정하기', '삭제하기'],
      item2: ['신고하기']
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  width: 30%;
  position: absolute;
  top: 10%;
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
</style>
