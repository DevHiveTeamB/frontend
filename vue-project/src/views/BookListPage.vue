<template>
  <!-- 책 검색 창 -->
  <UpperBar title="책 검색 창" />
  <div style="height: 80%">
    <div class="categoryContainer">
      <button
        :style="
          this.selectedCategory == value.value
            ? ' background-color: #316464; color=#000000; color: white;'
            : ''
        "
        class="categoryItem"
        :key="index"
        v-for="(value, index) in categoryOptions"
        @click="this.selectedCategory = value.value"
      >
        {{ value.label }}
      </button>
    </div>
    <div style="border: 1px solid #316464; width: 100%"></div>
    <div style="display: flex; border-bottom: #316464 solid 2px; height: 10%">
      <input
        v-model="searchText"
        ref="searchInput"
        placeholder="검색어를 입력하세요"
        style="
          padding-left: 5%;
          border: none;
          outline: none;
          color: #316464;
          font-size: 20px;
          flex-grow: 1;
        "
      />
      <div style="display: flex; justify-content: center; align-content: center; padding: 5%">
        <img class="imageItem" src="../assets/main/icon_main_search.svg" @click="searchTest" />
      </div>
    </div>
    <div
      style="width: 100%; height: 3%; display: flex; flex-direction: column; padding: 0 5%"
      :style="`${!isPopup ? 'display:none' : ''}`"
    >
      <!-- 배열 갯수만큼 출력 -->
      <div class="searchList" :key="index" v-for="(value, index) in searchList">
        <div
          style="background-color: white; border: none; padding: 0 5px"
          @click="searchList.splice(index, 1)"
        >
          x
        </div>
        <div
          style="display: flex; flex-grow: 1; justify-content: center; align-content: center"
          @click="searchText = value"
        >
          {{ value }}
        </div>
      </div>
      <div @click="isPopup = false" class="searchList openClose">닫기</div>
    </div>
    <div
      style="height: 3%"
      class="openClose"
      :style="`${isPopup ? 'display:none' : ''}`"
      @click="isPopup = true"
    >
      최근 검색기록 보기
    </div>
    <div style="border: 1px solid #316464; width: 100%"></div>
    <!-- searchResult 만큼 출력 -->
    <div style="overflow-y: auto; height: 83%">
      <div class="postItem" :key="index" v-for="(value, index) in searchResult">
        <img class="thumbnail" :src="value.picture" />
        <div>
          <div>postId : {{ value.postID }}</div>
          <div>postTitle : {{ value.postTitle }}</div>
          <div>postContent : {{ value.postContent }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../main.js'
import UpperBar from '../components/UpperBar.vue'
export default {
  //백엔드 연결후에 넣어야함
  // created() {
  //   if (!this.posts || this.posts.length == 0) {
  //     //post 데이터가 없을 경우
  //     alert('검색에 맞는 결과가 없음')
  //   }
  // },
  components: {
    // UpperBar
    UpperBar
  },
  created() {
    console.log('create')
    this.sendPostRequest()
  },
  methods: {
    //책 검색 했을때
    searchTest() {
      this.sendPostRequest()
    },
    sendPostRequest() {
      const url = '/v1/post'
      const data = { [this.selectedCategory]: this.searchText }
      console.log(url, data)
      this.searchResult = []
      axios
        .get(url, { params: data })
        .then((response) => {
          console.log(response)
          console.log(response.data)
          //게시물 목록 검색결과로 바꿈
          this.searchResult = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  data() {
    return {
      isPopup: false,
      selectedFilter: null,
      selectedCategory: 'postTitle',
      searchText: '',
      searchList: [1, 2, 3, 4, 5],
      searchResult: [], //검색 결과를 저장
      categoryOptions: [
        { value: 'postTitle', label: '제목', group: 'category' },
        { value: 'lectureName', label: '강의', group: 'category' },
        { value: 'professor', label: '교수이름', group: 'category' },
        { value: 'major', label: '전공', group: 'category' }
      ],
      filterOptions: [
        { value: 'like', label: '찜', group: 'filter' },
        { value: 'views', label: '조회수', group: 'filter' }
      ]
    }
  },
  computed: {
    sortedPosts() {
      //찜 순서대로 정렬
      if (this.selectedFilter === 'like') {
        return this.searchResult.slice().sort((a, b) => b.isFavorite - a.isFavorite)
        //조회수 순서대로 정렬
      } else if (this.selectedFilter === 'views') {
        // hits 기준으로 정렬
        return this.searchResult.slice().sort((a, b) => b.hits - a.hits)
      } else {
        return this.searchResult
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.categoryContainer {
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  // margin: 4% 0;
}

.openClose {
  display: flex;
  justify-content: center;
  align-content: center;
}

.categoryItem {
  flex-grow: 1;
  font-style: bold;
  border: none;
  border-right: 1px solid #316464;
  border-left: 1px solid #316464;
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

.postItem {
  display: flex;
  align-items: center;
  height: 120px;
  margin: 10px 0;
  border-bottom: solid 2px #316464;
  border-top: solid 2px #316464;
}

.thumbnail {
  width: 100px;
  height: 100px;
  /* 비율이 안깨지게 */
  object-fit: contain;
  border-radius: 20px;
  padding: 5px;
  border: 1px solid #316464;
  margin-left: 2%;
}
</style>
