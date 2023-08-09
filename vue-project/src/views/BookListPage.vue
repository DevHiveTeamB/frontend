<template>
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
    <div></div>
  </div>
</template>

<script>
export default {
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
