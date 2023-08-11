<template>
  <!-- 검색창(최근 검색 목록) -->
  <!-- 일단 페이지로 구현해둠
팝업으로 바꿔주세용 -->
  <div>
    <div class="serachBar">
      <input v-model="searchText" />
      <button @click="sendGetRequest">검색</button>
    </div>
    <div class="category">
      <input type="radio" name="category" value="professor" @change="radioChange($event)" /> 교수
      <input type="radio" name="category" value="course" @change="radioChange($event)" /> 강의명
      <input type="radio" name="category" value="major" @change="radioChange($event)" /> 전공
    </div>
    <div class="recent"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    radioChange(event) {
      var categorySelected = event.target.value
      console.log('categorySelected: ', categorySelected)
    },
    // 검색버튼 누르면 get 요청
    sendGetRequest() {
      let url = '/lectures/'
      let data = ''
      if (this.categorySelected == '') {
        url = url + 'title/get/' + this.searchText
        console.log(url)

        data = {
          title: this.searchText
        }
      } else if (this.categorySelected == 'professor') {
        url = url + 'professor/get/' + this.searchText
        console.log(url)

        data = {
          professor: this.searchText
        }
      } else if (this.categorySelected == 'course') {
        url = url + 'course/get/' + this.searchText
        console.log(url)

        data = {
          course: this.searchText
        }
      } else if (this.categorySelected == 'major') {
        url = url + 'major/get/' + this.searchText
        console.log(url)

        data = {
          major: this.searchText
        }
      }

      axios
        .get(url, data)
        .then((response) => {
          console.log(response)

          //성공하면 페이지 라우팅 (response 정보와 선택된 카테고리 정보도 전달)
          this.$router.push({
            name: 'BookList',
            props: { posts: response.data.post, categorySelected: this.categorySelected }
          })
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  data() {
    return {
      searchText: '',
      categorySelected: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
