<template>
  <!-- 검색창(최근 검색 목록) -->
  <!-- 일단 페이지로 구현해둠
팝업으로 바꿔주세용 -->
  <div>
    <div class="serachBar">
      <input v-model="searchText" />
      <button>검색</button>
    </div>
    <div class="category">
      <input type="radio" name="category" value="1" @change="radioChange($event)" /> 1
      <input type="radio" name="category" value="2" @change="radioChange($event)" /> 2
      <input type="radio" name="category" value="3" @change="radioChange($event)" /> 3
    </div>
    <div class="recent"></div>
  </div>
</template>

<script>
export default {
  methods: {
    radioChange(event) {
      var categorySelected = event.target.value
      console.log('categorySelected: ', categorySelected)
    }
  },
  data() {
    return {
      searchText: '',
      recentSearches: []
    }
  }
}
</script>

<style lang="scss" scoped></style>
