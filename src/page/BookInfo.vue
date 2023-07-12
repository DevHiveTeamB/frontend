<template>
  <div id="container">
    <div id="upperBar">
      <button id="backBtn">뒤</button>
      <div id="pageName">페이지 이름</div>
      <div class="dropdown">
        <a
          class="btn btn-secondary dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
        </a>

        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">수정하기</a></li>
          <li><a class="dropdown-item" href="#">삭제하기</a></li>
          <li><a class="dropdown-item" href="#">신고하기</a></li>
        </ul>
      </div>
    </div>
    <div class="profileContainer">
      <div class="profile">사진</div>
      <div class="name">이름</div>
      <div class="grade">평점</div>
      <div class="date">날짜</div>
      <div class="views">조회수</div>
      <div class="likes">좋아요</div>
    </div>
    <div class="photo"></div>
    <div class="infoContainer">
      <div class="title">파이썬으로 만드는 인공지능</div>
      <button class="like" @click="liked">❤️</button>
      <div class="category">카테고리</div>
      <div class="content">
        ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ
        <div class="price">가격</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openModal: false,
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
  top: 5px;
  left: 10px;
  width: 40px;
  height: 40px;
}
#pageName {
  position: absolute;
  width: 250px;
  height: 40px;
  top: 5px;
  left: 60px;
  text-align: center;
  line-height: 40px;
}
.dropdown {
  position: absolute;
  width: 40px;
  height: 40px;
  right: 10px;
  top: 5px;
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
  border: 1px solid #000;
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
  width: 30px;
  height: 15px;
  right: 40px;
  font-size: 3px;
  bottom: 5px;
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
  border: 1px solid #000;
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
