<template>
  <div id="app">
    <div id="content">
      <router-view></router-view>
      <NavBar id="navbar" />
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

#content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

body,
html {
  width: 360px;
  height: 800px;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  position: relative;
  border: 1px solid #000;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

#navbar {
  position: absolute;
  left: 0px;
  bottom: 0px;
}
</style>
