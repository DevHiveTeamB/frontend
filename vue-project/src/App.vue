<template>
  <div id="app">
    <div id="content">
      <router-view>
        <!-- 컴포넌트 보이는 곳 -->
        <MainPage />
      </router-view>
      <!-- NavBar는 모든 페이지에 고정 -->
      <NavBar />
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import MainPage from './views/MainPage.vue'
export default {
  name: 'App',
  components: {
    NavBar,
    MainPage
  }
}
</script>

<style>
body,
html {
  width: 360px;
  height: 800px;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
