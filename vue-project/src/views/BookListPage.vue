<template>
  <!-- 책 검색 창 -->
  <div>
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
      <div v-for="post in posts" :key="post.postID">
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
export default {
  props: ['posts', 'categorySelected'],
  created() {
    if (!this.posts || this.posts.length == 0) {
      //post 데이터가 없을 경우
    }
  },
  methods: {
    radioChange(event) {
      var categorySelected = event.target.value
      console.log('categorySelected: ', categorySelected)
    },
    filterChange(event) {
      var filterSelected = event.target.value
      console.log('filterSelected: ', filterSelected)
    }
  }
}
</script>

<style lang="scss" scoped></style>
