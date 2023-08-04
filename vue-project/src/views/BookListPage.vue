<template>
  <div>
    <div>
      <input type="radio" name="category" value="1" @change="radioChange($event)" /> 1
      <input type="radio" name="category" value="2" @change="radioChange($event)" /> 2
      <input type="radio" name="category" value="3" @change="radioChange($event)" /> 3
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    radioChange(event) {
      var selected = event.target.value
      console.log('selected: ', selected)
    }
  }
}
</script>

<style lang="scss" scoped></style>
