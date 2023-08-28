<template>
  <!-- 글 작성 페이지의 카테고리 선택 모달창 -->
  <div class="modal">
    <div class="modal-content">
      <!-- x 버튼 -->
      <div style="display: flex; justify-content: flex-end; margin-bottom: 5%">
        <img
          src="../assets/categoryModal/icon_categoryModal_close.svg"
          style="width: 8%"
          @click="closeModal"
        />
      </div>
      <!-- 카테고리 선택리스트 -->
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
          @click="()=>{this.selectedCategory = value.value
          selectIndex = index
          }"
        >
          {{ value.label }}
        </button>
      </div>
      <!-- 검색어 입력창 -->
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
      <!-- 검색 결과 -->
      <div v-if="this.searchLoading" style="margin: 10% 0;">
        <LoadingSpinner :setloading="true"/>
      </div>
      <div v-if="searchResults.length > 0" class="result-container">
        <div
          v-for="(result,index)  in searchResults"
          :key="index"
          @click="selectResult(result)"
          class="result-item"
        >
          <!-- 강의이름  -->
          <h3 style="margin: 0; margin-bottom: 1%;">{{ result.lectureName }}</h3>
          <!-- 전공 : 교수이름 -->
          <div>{{ result.major }} : {{ result.professorName }}</div>
        </div>
      </div>
      <!-- 아무 것도 없다는 창 -->
      <div v-else style="display: flex; justify-content: center; margin: 10%;">검색결과가 없습니다.</div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from './LoadingSpinner.vue'
import axios from '../main.js'
export default {
  components: {
    LoadingSpinner
  },
  created() {
    this.searchResults = []
    this.selectedCategory = 'lectureName'
  },
  data() {
    return {
      searchLoading: false,
      searchText: '', //검색창 입력 내용
      searchResults: [{
        "lectureName": "객체지향프로그래밍",
        "professorName": "김태형",
        "major": "컴퓨터공학과",
        "lectureId": 1
      }], //결과 데이터 저장 용도,
      selectedResult: null, //결과 중 하나 선택
      selectIndex : 0,
      categoryOptions: [
        { value: 'lectureName', label: '강의', group: 'category', apiUrl:'/lectures/searchByLectureName' },
        { value: 'major', label: '전공', group: 'category', apiUrl:'/lectures/searchByMajor' },
        { value: 'professor', label: '교수이름', group: 'category' ,apiUrl:'lectures/searchByProfessor'},
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

      this.searchLoading = true

      const obj = this.categoryOptions[this.selectIndex]
      // 카테고리 선택에 따라 API 요청
      const apiUrl = 
        `${obj.apiUrl}?${obj.value}=${this.searchText}`

      console.log(apiUrl)

      //get 요청으로 보냄
      axios
        .get(apiUrl)
        .then((response) => {
          console.log(response.data)
          // searchResults 배열에 response 받은 값들 저장
          this.searchResults = response.data
          this.$nextTick(() => {
            this.searchLoading = false
          })
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
  margin-bottom: 20%;
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
  width: 0px;
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

.result-container{
  max-height: 400px;
  overflow-y: auto;
}

.result-item{
  display: flex;
  flex-direction: column;
  border : 1px solid #316464;
  margin: 10px 0;
}
</style>
