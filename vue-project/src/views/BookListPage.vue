<template>
  <!-- 책 검색 창 -->
  <div>
    <div class="serachBar">
      <input v-model="searchText" />
      <button @click="sendPostRequest">검색</button>
    </div>
    <div class="category">
      <input type="radio" name="category" value="1" @change="radioChange($event)" /> 1
      <input type="radio" name="category" value="2" @change="radioChange($event)" /> 2
      <input type="radio" name="category" value="3" @change="radioChange($event)" /> 3
    </div>
    <div class="filter">
      <input type="radio" name="filter" value="like" @change="filterChange($event)" />찜
      <input type="radio" name="filter" value="views" @change="filterChange($event)" />조회수
    </div>
    <!-- 카테고리 값 제대로 넘어오는지 확인하려고 -->
    {{ categorySelected }}{{ searchText }}
    <div class="serachResult">
      <div v-for="post in serachResult" :key="post.postID">
        <!-- 사진, 제목, 글 내용, 가격, 조회수, 찜 표시-->
        <p>{{ post.picture }}</p>
        <h2>{{ post.postTitle }}</h2>
        <p>{{ post.postcontent }}</p>
        <p>{{ post.price }}</p>
        <p>{{ post.hits }}</p>
        <p>{{ post.isFavorite }}</p>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['posts', 'categorySelected'],
  created() {
    if (!this.posts || this.posts.length == 0) {
      //post 데이터가 없을 경우
      alert('검색에 맞는 결과가 없음')
    }
  },
  methods: {
    //카테고리 선택
    radioChange(event) {
      var categorySelected = event.target.value
      console.log('categorySelected: ', categorySelected)
    },
    //필터 선택(찜, 조회수)
    filterChange(event) {
      var filterSelected = event.target.value
      console.log('filterSelected: ', filterSelected)
    },
    //책 검색 했을때
    sendPostRequest() {
      const url = '/v1/post'
      const data = { [this.categorySelected]: this.searchText }
      console.log(url, data)

      axios
        .post(url, null, { params: data })
        .then((response) => {
          console.log(response.data)
          //게시물 목록 검색결과로 바꿈
          this.searchResult = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  data() {
    return {
      filterSelected: null,
      searchText: '',
      searchResult: [] //검색 결과를 저장
    }
  },
  computed: {
    sortedPosts() {
      //찜 순서대로 정렬
      if (this.filterSelected === 'like') {
        return this.posts.slice().sort((a, b) => b.isFavorite - a.isFavorite)
        //조회수 순서대로 정렬
      } else if (this.filterSelected === 'views') {
        // hits 기준으로 정렬
        return this.posts.slice().sort((a, b) => b.hits - a.hits)
      } else {
        return this.posts
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
