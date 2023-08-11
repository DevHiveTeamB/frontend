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
    {{ categorySelected }}
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
