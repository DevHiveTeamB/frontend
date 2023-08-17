<template>
  <!-- view display none으로 조건부 렌더링 -->
  <div style="display: flex; flex-direction: column; width: 100%; height: 100%">
    <div id="TopBar">
      <div style="margin-left: auto" class="imageContainer">
        <img
          class="imageItem"
          src="../assets/main/icon_main_popup.svg"
          @click="this.$router.push('/announce')"
        />
      </div>
    </div>
    <div id="view">
      <div id="logo">
        <img style="width: 100%; height: 100%" src="../assets/main/DevHive_logo.svg" />
      </div>
      <div id="searchBar" @click="this.$router.push('/booklist')">
        <!-- 줄바꿈 -->
        <div class="tItem" style="width: 20%; flex-direction: column">
          <div class="tItem">Dev</div>
          <div class="tItem">Hive</div>
        </div>
        <div class="tItem" style="font-size: large; width: 80%">
          <div class="tItem">검색어를 입력하세요</div>
        </div>
      </div>
      <div id="subbutton">
        <img
          class="subButtonItem"
          src="../assets/main/icon_main_posting.svg"
          @click="this.$router.push('/write')"
        />
        <img
          class="subButtonItem"
          src="../assets/main/icon_main_postlist.svg"
          @click="this.$router.push('/booklist')"
        />
        <img
          class="subButtonItem"
          src="../assets/main/icon_main_anounce.svg"
          @click="this.$router.push('/announce')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../main.js'
import { mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userInfo', 'isLoggedIn', 'isPopup'])
  },
  created() {
    console.log('create')
    console.log(this.userInfo)
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')
    //userId 값이 존재하면
    //userId로부터
    if (userId) {
      console.log(userId)
      axios
        .get(`/v1/user/${userId}`)
        .then((response) => {
          //요청 성공시
          console.log(response.data)
          alert(response.data.username + '님 환영합니다')
          this.setUserInfo(response.data)
          console.log(this.userInfo)

          //로그인 상태로 저장
          this.handleLogin()
        })
        .catch((error) => {
          //요청 실패시
          console.error(error)
        })
    }
  },
  methods: {
    ...mapMutations(['login', 'logout', 'setUserInfo', 'setIsPopup']),
    handleLogin() {
      this.login() // 뮤테이션을 호출하여 로그인 상태 변경
    },
    handleLogout() {
      this.logout() // 뮤테이션을 호출하여 로그아웃 상태 변경
    },
    //검색바 터치시 검색 팝업 띄우기
    select(value) {
      this.selectCategory = value
    },
    searching() {
      //검색어가 변경되면
      alert(this.selectCategory + '\n' + this.searchData)
    },
    selectSearchList(value) {
      this.searchData = value
    }
  },
  components: {},
  watch: {
    searchData() {
      //검색어가 변경되면
      console.log(this.searchData)
    }
  },
  data() {
    return {
      searchData: '',
      selectCategory: '교수',
      selectList: ['교수', '강의명', '전공'],
      searchList: [0, 1, 2, 3, 4, 5]
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: 20%;
}

.subButtonItem {
  width: 20%;
}

#TopBar {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-content: center;

  //flex center 에서 혼자 맨 위에
  // margin-bottom: auto;
}

#view {
  width: 100%;
  height: 60%;
  padding: 0 10%;
  margin-top: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
}

.tItem {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  //font color
  color: #316464;
}

#subbutton {
  padding: 0 5%;
  display: flex;
  justify-content: space-between;
}

#searchBar {
  //테두리 둥글게
  border-radius: 30px;
  padding: 0 5%;
  display: flex;
  align-content: center;
  height: 12%;
  border: 5px solid #316464;
}

#PopBar {
  display: flex;
  height: 10%;
  width: 100%;
}
.imageContainer {
  height: 100%;
  width: 20%;
  padding: 5% 5%;
  //height 와 같은 값
}

.imageItem {
  height: 95%;
  width: 95%;
}

#Popup {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
}
//bottom, left, right border

.categoryContainer {
  width: 100%;
  padding: 0 5%;
  display: flex;
  justify-content: space-between;
  margin: 4% 0;
}
.categoryItem {
  width: 28%;
  border-radius: 20px;
  font-style: bold;
  background-color: white;
}

.searchList {
  display: flex;
  width: 100%;
  padding: 0 5%;
  border: solid 2px #316464;
  border-radius: 20px;
  margin: 4% 0;
  font-style: bold;
  background-color: white;
}
</style>
