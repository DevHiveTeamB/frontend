<template>
  <!-- view display none으로 조건부 렌더링 -->
  <div style="display: flex; flex-direction: column; width: 100%; height: 100%">
    <div id="TopBar" :style="!isPopup ? 'display : none' : ''">
      <img
        style="padding: 20px; margin-left: auto"
        src="../assets/main/icon_main_popup.svg"
        @click="this.$router.push('/announce')"
      />
    </div>
    <div id="view" :style="!isPopup ? 'display : none' : ''">
      <div id="logo">
        <img style="width: 100%; height: 100%" src="../assets/main/DevHive_logo.svg" />
      </div>
      <div id="searchBar" @click="handleSearch">
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
    <div id="PopBar" :style="isPopup ? 'display : none' : ''">
      <img style="padding: 20px" src="../assets/main/icon_main_back.svg" @click="handleSearch" />
      <div
        style="
          width: 100%;
          display: flex;
          border-bottom: 3px solid #316464;
          border-left: 3px solid #316464;
        "
      >
        <input
          v-model="searchData"
          placeholder="검색어를 입력하세요"
          style="
            width: 100%;
            border: none;
            outline: none;
            font-size: 20px;
            padding-left: 5%;
            color: #316464;
          "
        />
        <img style="padding: 20px" src="../assets/main/icon_main_search.svg" @click="searching" />
      </div>
    </div>
    <div id="Popup" :style="isPopup ? 'display : none' : ''">
      <div class="categoryContainer">
        <button
          :style="selectCategory == value ? ' background-color: #316464' : ''"
          class="categoryItem"
          :key="index"
          v-for="(value, index) in selectList"
          @click="select(value)"
        >
          {{ value }}
        </button>
      </div>
      <div style="border: 1px solid #316464; width: 100%"></div>
      <div style="width: 100%; display: flex; flex-direction: column; padding: 0 5%">
        <!-- 배열 갯수만큼 출력 -->
        <div class="searchList" :key="index" v-for="(value, index) in searchList">
          <div
            style="background-color: white; border: none; padding: 0 5px"
            @click="
              () => {
                // value delete in searchList
                searchList.splice(index, 1)
              }
            "
          >
            x
          </div>
          <div
            style="display: flex; flex-grow: 1; justify-content: center"
            @click="selectSearchList(value)"
          >
            {{ value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['isLoggedIn'])
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')
    //userId 값이 존재하면
    //userId로부터
    if (userId) {
      console.log(userId)
      axios
        .get(`v1/user/${userId}`, {
          params: {
            userId: userId
          }
        })
        .then((response) => {
          //요청 성공시
          console.log(response.data)
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
    ...mapMutations(['login', 'logout']),
    handleLogin() {
      this.login() // 뮤테이션을 호출하여 로그인 상태 변경
    },
    handleLogout() {
      this.logout() // 뮤테이션을 호출하여 로그아웃 상태 변경
    },
    //검색바 터치시 검색 팝업 띄우기
    handleSearch() {
      this.isPopup = !this.isPopup
    },
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
      isPopup: true,
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
  margin-bottom: auto;
}

#view {
  width: 100%;
  height: 60%;
  padding: 0 10%;
  margin-bottom: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
