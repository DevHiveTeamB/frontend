<template>
  <!-- 책 검색 창 -->
  <div>
    <div class="searchBar">
      <input v-model="searchText" />
      <button @click="sendPostRequest">검색</button>
    </div>
    <div class="category">
      <div v-for="option in categoryOptions" :key="option.value">
        <input
          type="radio"
          :id="option.value"
          name="category"
          :value="option.value"
          v-model="selectedCategory"
        />
        <label :for="option.value">{{ option.label }}</label>
      </div>
    </div>
    <div class="filter">
      <div v-for="option in filterOptions" :key="option.value">
        <input
          type="radio"
          :id="option.value"
          name="filter"
          :value="option.value"
          v-model="selectedFilter"
        />
        <label :for="option.value">{{ option.label }}</label>
      </div>
    </div>

    <!-- 검색 결과 나열 -->
    <div class="searchResult">
      <div v-for="post in searchResult" :key="post.postID">
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
  //백엔드 연결후에 넣어야함
  // created() {
  //   if (!this.posts || this.posts.length == 0) {
  //     //post 데이터가 없을 경우
  //     alert('검색에 맞는 결과가 없음')
  //   }
  // },
  methods: {
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
      selectedFilter: null,
      selectedCategory: null,
      searchText: '',
      searchResult: [], //검색 결과를 저장
      categoryOptions: [
        { value: '1', label: '강의명', group: 'category' },
        { value: '2', label: '전공', group: 'category' },
        { value: '3', label: '교수', group: 'category' },
        { value: '4', label: '과목코드', group: 'category' }
      ],
      filterOptions: [
        { value: 'like', label: '찜', group: 'filter' },
        { value: 'views', label: '조회수', group: 'filter' }
      ]
    }
  },
  computed: {
    sortedPosts() {
      //찜 순서대로 정렬
      if (this.selectedFilter === 'like') {
        return this.searchResult.slice().sort((a, b) => b.isFavorite - a.isFavorite)
        //조회수 순서대로 정렬
      } else if (this.selectedFilter === 'views') {
        // hits 기준으로 정렬
        return this.searchResult.slice().sort((a, b) => b.hits - a.hits)
      } else {
        return this.searchResult
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
