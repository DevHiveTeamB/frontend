<template>
  <RouterView style="width: 360px; height: 800px" />
</template>

<script>
import Navbar from './components/NavBar.vue'
export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped></style>
