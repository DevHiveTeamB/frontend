<template>
  <!-- 글 작성 페이지의 카테고리 선택 모달창 -->
  <div class="modal">
    <div class="modal-content">
      <div style="display: flex; justify-content: flex-end; margin-bottom: 5%">
        <img
          src="../assets/categoryModal/icon_categoryModal_close.svg"
          style="width: 8%"
          @click="closeModal"
        />
      </div>
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
      <div style="display: flex; border: 2px solid #316464; justify-content: flex-end">
        <input
          class="searchInput"
          v-model="searchText"
          type="text"
          placeholder="검색어를 입력해주세요."
        />
        <img
          src="../assets/main/icon_main_search.svg"
          style="width: 10%; padding: 1%"
          @click="searchBook"
        />
      </div>
      <div class="searchResult">
        <div
          v-for="result in searchResults"
          :key="result.postID"
          @click="selectResult(result)"
          class="result-item"
        >
          <!-- 일단은 제목만  -->
          {{ result.post.postTitle }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../main.js'
const newLocal = 'title'
export default {
  data() {
    return {
      searchText: '', //검색창 입력 내용
      searchResults: [], //결과 데이터 저장 용도,
      selectedResult: null, //결과 중 하나 선택
      categoryOptions: [
        { value: newLocal, label: '제목', group: 'category' },
        { value: 'course', label: '강의', group: 'category' },
        { value: 'professor', label: '교수이름', group: 'category' },
        { value: 'major', label: '전공', group: 'category' }
      ],
      selectedCategory: 'title'
    }
  },

  methods: {
    closeModal() {
      //백엔드 연결 후 넣을것

      // //검색결과 중 하나를 선택하지 않았을때
      // if (this.selectedResult == null) {
      //   alert('검색결과 중 하나를 선택해주세요')
      //   return
      // }

      this.$emit('close')
      //PostPage에 표시해야 되므로 값을 부모로 전달해줌
      this.$emit('result-selected', this.selectedResult)
    },

    //검색 버튼 눌렀을때
    searchBook() {
      //검색어를 입력하지 않았을 때
      if (this.searchText == '') {
        alert('검색어를 입력해주세요')
        return
      }

      // 카테고리 선택에 따라 API 요청
      const apiUrl = `/lectures/${this.selectedCategory}/get/${this.searchText}`
      let data = {}

      if (this.selectedCategory == 'title') {
        data = { postTitle: this.searchText }
      } else if (this.selectedCategory == 'professor') {
        data = { professorName: this.searchText }
      } else if (this.selectedCategory == 'lectureName') {
        data = { lectureName: this.searchText }
      } else {
        data = { major: this.searchText }
      }

      console.log(apiUrl, data)

      //get 요청으로 보냄
      axios
        .get(apiUrl, { parmas: data })
        .then((response) => {
          console.log(response.data)
          //searchResults 배열에 response 받은 값들 저장
          this.searchResults = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    //검색 결과 중에 하나 선택
    selectResult(result) {
      this.selectedResult = result
      console.log(this.selectedResult)
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 360px;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.categoryContainer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top: solid 2px #316464;
  /* // margin: 4% 0; */
}

.categoryItem {
  flex-grow: 1;
  font-style: bold;
  border: none;
  border-right: 2px solid #316464;
  background-color: white;
  padding: 2%;
  font-weight: bold;
}

.categoryItem:nth-child(1) {
  border-left: 2px solid #316464;
}

.searchInput {
  outline: none;
  border: none;
  width: 100%;
  font-weight: bold;
  font-size: medium;
}
</style>
