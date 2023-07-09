<template>
  <div id="container">
    <div id="searchContainer">
      <button id="btn" @click="this.$router.push('/')">버튼</button>
      <input type="search" id="search" />
      <img id="icon" src="../icon.png" @click="this.$router.push('/BookSearch')" />
    </div>
    <div class="select">
      <input type="radio" id="select1" name="category" /><label for="select1">교수</label>
      <input type="radio" id="select2" name="category" /><label for="select2">강의명</label>
      <input type="radio" id="select3" name="category" /><label for="select3">전공</label>
    </div>
    <div id="recentSearchContainer">
      <button class="recentSearch" v-for="n in 6" :key="n">{{ n }}</button>
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
}
#searchContainer {
  position: relative;
}
#btn {
  width: 50px;
  height: 50px;
  background-color: #ffffff;
  border: 0;
  margin: 0;
  position: relative;
}
#search {
  width: 320px;
  height: 50px;
  border: 2px solid #316464;
  box-shadow: none;
  margin: 0;
  position: absolute;
  padding-right: 50px;
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
  padding: 10px 0px;
  border-bottom: 1px solid #000000;
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
  margin: 10px 10px;
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

.recentSearch {
  width: 100px;
  height: 20px;
  border-radius: 9999px;
  margin: 10px 10px;
  border: 1px solid #316464;
  color: #316464;
  background-color: #ffffff;
}

#recentSearchContainer {
  margin: 10px 0px;
}
</style>
