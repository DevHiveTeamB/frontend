<template>
  <!-- 검색창(최근 검색 목록) -->
  <!-- 일단 페이지로 구현해둠
팝업으로 바꿔주세용 -->
  <div>
    <div class="serachBar">
      <input v-model="searchText" />
      <button @click="sendPostRequest">검색</button>
    </div>
    <div class="category">
      <input type="radio" name="category" value="course" @change="radioChange($event)" /> 강의명
      <input type="radio" name="category" value="major" @change="radioChange($event)" /> 전공
      <input type="radio" name="category" value="professor" @change="radioChange($event)" /> 교수
    </div>
    <div class="recent"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    //카테고리 선택
    radioChange(event) {
      this.categorySelected = event.target.value
      console.log('categorySelected: ', this.categorySelected)
    },
    //책 검색 했을때
    sendPostRequest() {
      const url = '/v1/post'
      const data = { [this.categorySelected]: this.searchText }
      console.log(url, data)

      axios
        .post(url, null, { params: data })
        .then((response) => {
          console.log(response)

          //성공하면 페이지 라우팅 (response 정보와 선택된 카테고리 정보와 검색값도 전달)
          this.$router.push({
            name: 'BookList',
            props: {
              posts: response.data.post,
              categorySelected: this.categorySelected,
              searchText: this.searchText
            }
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
