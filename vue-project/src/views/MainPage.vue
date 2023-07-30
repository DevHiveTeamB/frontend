<template>
  <div>
    <div>MainPage</div>
    <NavBar @openMypage="openMypage" />
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
  methods: {
    openMypage() {
      this.$router.push('/login')
    }
  },
  components: {
    NavBar
  }
}
</script>

<style lang="scss" scoped></style>
