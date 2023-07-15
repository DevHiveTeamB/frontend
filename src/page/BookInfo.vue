<template>
  <div id="container">
    <div id="upperBar">
      <button id="backBtn"></button>
      <div id="pageName">DevHive</div>
      <select class="dropdown" name="menu">
        <option hidden="" disabled="disable" selected="selected" value=""></option>
        <option value="write">수정하기</option>
        <option value="delete">삭제하기</option>
        <option value="report">신고하기</option>
      </select>
    </div>
    <div class="profileContainer">
      <img class="profile" src="../image/프로필사진.png" />
      <div class="name">이름</div>
      <div class="grade">평점</div>
      <div class="date">날짜</div>
      <div class="views">
        <img src="../image/조회수_아이콘.png" />
        99
      </div>
      <div class="likes">
        <img src="../image/찜 버튼.png" />
        99
      </div>
    </div>
    <img src="..\image\책사진.jpeg" class="photo" />
    <div class="infoContainer">
      <div class="title">파이썬으로 만드는 인공지능</div>
      <button class="like" @click="liked"></button>
      <div class="category">카테고리</div>
      <div class="content">
        ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ
        <div class="price">가격</div>
      </div>
    </div>
    <reportModal />
  </div>
</template>

<script>
import reportModal from '../components/reportModal.vue'
export default {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    liked() {
      if (this.isShow == false) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      console.log(this.isShow)
    }
  },
  components: {
    reportModal
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
#container {
  margin: 0 auto;
  padding: 0;
  height: 800px;
  width: 370px;
  position: relative;
}
#upperBar {
  width: 360px;
  height: 50px;
  background-color: #316464;
  position: absolute;
}
#backBtn {
  position: absolute;
  top: 8px;
  left: 10px;
  width: 40px;
  height: 40px;
  border: none;
  background: url('../image/뒤로가기.png') no-repeat;
}
#pageName {
  position: absolute;
  width: 270px;
  height: 50px;
  left: 40px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  color: #fff;
  font-weight: 700;
}

.dropdown {
  position: absolute;
  width: 40px;
  height: 40px;
  right: 10px;
  top: 8px;
  background: url('../image/menuBtn.png') no-repeat;
  border: none;
}
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
}
select:focus {
  border: none;
  box-shadow: none;
  outline: none;
}

.profileContainer {
  width: 360px;
  height: 50px;
  position: absolute;
  top: 60px;
}

.profileContainer .profile {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 10px;
  top: 5px;
}
.profileContainer .name {
  position: absolute;
  top: 5px;
  width: 200px;
  height: 20px;
  left: 60px;
}
.profileContainer .grade {
  position: absolute;
  width: 200px;
  height: 20px;
  left: 60px;
  top: 25px;
}
.profileContainer .date {
  position: absolute;
  width: 40px;
  height: 15px;
  right: 10px;
  font-size: 5px;
  text-align: right;
}

.profileContainer .views {
  position: absolute;
  right: 40px;
  font-size: 3px;
  bottom: 5px;
}
.profileContainer img {
  width: 15px;
  height: 15px;
}

.profileContainer .likes {
  position: absolute;
  width: 30px;
  height: 15px;
  right: 10px;
  font-size: 3px;
  bottom: 5px;
}

.photo {
  width: 340px;
  height: 270px;
  // border: 1px solid #000;
  position: absolute;
  top: 120px;
  left: 10px;
}

.infoContainer {
  width: 340px;
  position: absolute;
  top: 400px;
  left: 10px;
}

.infoContainer .title {
  position: absolute;
  left: 0px;
  width: fit-content;
  height: 25px;
}

.infoContainer .like {
  position: absolute;
  width: 25px;
  height: 25px;
  right: 0px;
  border: none;
  background: url('../image/찜 버튼.png');
}
.infoContainer .category {
  position: absolute;
  height: 20px;
  top: 30px;
  width: fit-content;
  border: 1px solid #316464;
  border-radius: 9999px;
  left: 5px;
}

.infoContainer .content {
  top: 60px;
  display: inline-block;
  position: absolute;
  width: 340px;
  white-space: normal;
  line-height: 1.2;
  word-wrap: break-word;
}

.infoContainer .price {
  position: absolute;
  bottom: -30px;
  width: fit-content;
  height: 20px;
}
</style>
