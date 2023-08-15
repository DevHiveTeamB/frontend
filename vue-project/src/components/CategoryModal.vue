<template>
  <!-- 글 작성 페이지의 카테고리 선택 모달창 -->
  <div class="modal">
    <div class="modal-content">
      <div class="category">
        <div v-for="option in categoryOptions" :key="option.value">
          <input
            type="radio"
            :id="option.value"
            name="category"
            :value="option.value"
            v-model="categorySelected"
          />
          <label :for="option.value">{{ option.label }}</label>
        </div>
      </div>
      <div class="search">
        <input v-model="searchText" type="text" />
        <button @click="searchBook">검색</button>
      </div>
      <div class="searchResult">
        <div
          v-for="result in searchResults"
          :key="result.postID"
          @click="selectResult(result)"
          class="result-item"
        >
          <!-- 일단은 제목만  -->
          {{ result.postTitle }}
        </div>
      </div>
      <button @click="closeModal">완료</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      searchText: '', //검색창 입력 내용
      categorySelected: '', //카테고리 선택
      searchResults: [], //결과 데이터 저장 용도,
      selectedResult: null, //결과 중 하나 선택
      categoryOptions: [
        { value: '1', label: '강의명' },
        { value: '2', label: '전공' },
        { value: '3', label: '교수' },
        { value: '4', label: '과목코드' }
      ]
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
      let apiUrl = '/lectures/'

      //카테고리가 선택되지 않았을 때
      if (this.categorySelected == '') {
        alert('카테고리를 선택해주세요')
        return
      }

      //검색어를 입력하지 않았을 때
      if (this.searchText == '') {
        alert('검색어를 입력해주세요')
        return
      }

      // 카테고리 선택에 따라 API 요청
      if (this.searchText) apiUrl = apiUrl + `${this.categorySelected}/get/${this.bookInfo}`

      const data = { [this.categorySelected]: this.searchText }

      console.log(apiUrl, data)

      //get 요청으로 보냄
      axios
        .get(apiUrl, data)
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
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

button {
  margin-top: 10px;
}
</style>
