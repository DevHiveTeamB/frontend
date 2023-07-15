<template>
  <div id="container">
    <div id="searchContainer">
      <button id="btn"></button>
      <input type="search" id="search" />
      <img id="icon" src="../image/돋보기.png" @click="this.$router.push('/BookSearch')" />
    </div>
    <div class="select">
      <input type="radio" id="select1" name="category" /><label for="select1">교수</label>
      <input type="radio" id="select2" name="category" /><label for="select2">강의명</label>
      <input type="radio" id="select3" name="category" /><label for="select3">전공</label>
    </div>
    <div class="filterContainer">
      <input type="radio" id="filter1" name="filter" /><label for="filter1">찜</label>
      <input type="radio" id="filter2" name="filter" /><label for="filter2">조회수</label>
    </div>
    <div class="bookContainer">
      <div class="photo">사진</div>

      <div class="title">파이썬으로 만드는 인공지능</div>
      <div class="content">이것은 예시 글 내용<br />이것은 예시 글 내용</div>
      <div class="price">202020202원</div>
    </div>
  </div>
  <div></div>
</template>

<script>
export default {
  data() {
    return {}
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
#searchContainer {
  position: relative;
}
#btn {
  width: 40px;
  height: 40px;
  top: 5px;
  left: 10px;
  position: absolute;
  background: url('../image/뒤로가기2.png') no-repeat;
  background-size: contain;
  border: none;
}
#search {
  width: 310px;
  height: 50px;
  border: 2px solid #316464;
  box-shadow: none;
  position: absolute;
  right: 0px;
}
#search:focus {
  outline: none;
}

#icon {
  position: absolute;
  width: 35px;
  height: 35px;
  right: 10px;
  top: 8px;
}

.select {
  position: absolute;
  top: 50px;
  width: 100%;
  border-bottom: 2px solid #316464;
}
.select input[type='radio'] {
  display: none;
}

.select input[type='radio'] + label {
  display: inline-block;
  cursor: pointer;
  height: 20px;
  width: 100px;
  border: 1px solid #316464;
  border-radius: 9999px;
  text-align: center;
  font-weight: 800;
  margin: 10px;
  font-size: 14px;
}
.select input[type='radio'] + label {
  background-color: #fff;
  color: #316464;
}
.select input[type='radio']:checked + label {
  background-color: #316464;
  color: #fff;
}

.filterContainer {
  border-bottom: 1px solid #000000;
  position: absolute;
  width: 100%;
  top: 90px;
}
.filterContainer input[type='radio'] {
  display: none;
}

.filterContainer input[type='radio'] + label {
  display: inline-block;
  cursor: pointer;
  height: 20px;
  width: 80px;
  border: 1px solid #316464;
  border-radius: 9999px;
  text-align: center;
  font-weight: 800;
  margin: 10px 5px;
  font-size: 14px;
}
.filterContainer input[type='radio'] + label {
  background-color: #fff;
  color: #316464;
}
.filterContainer input[type='radio']:checked + label {
  background-color: #316464;
  color: #fff;
}
.bookContainer {
  position: absolute;
  width: 370px;
  height: 108px;
  border: 2px solid #316464;
  top: 130px;
}

.bookContainer .photo {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 1px solid #000000;
  left: 10px;
  top: 10px;
}
.bookContainer .title {
  position: absolute;
  width: 250px;
  height: 20px;
  left: 100px;
  top: 10px;
}
.bookContainer .content {
  position: absolute;
  width: 250px;
  height: 40px;
  left: 100px;
  top: 30px;
  font-size: 12px;
}

.bookContainer .price {
  position: absolute;
  width: 250px;
  height: 20px;
  left: 100px;
  top: 70px;
}
</style>
