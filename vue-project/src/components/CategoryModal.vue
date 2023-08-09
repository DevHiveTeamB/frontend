<template>
  <!-- 글 작성 페이지의 카테고리 선택 모달창 -->
  <div class="modal">
    <div class="modal-content">
      <div class="category">
        <input type="radio" name="category" value="1" @change="radioChange($event)" /> 강의명
        <input type="radio" name="category" value="2" @change="radioChange($event)" /> 전공
        <input type="radio" name="category" value="3" @change="radioChange($event)" /> 교수명
        <input type="radio" name="category" value="4" @change="radioChange($event)" /> 과목코드
      </div>
      <div class="search">
        <input v-model="searchContent" type="text" />
        <button @click="searchBook">검색</button>
      </div>
      <button @click="closeModal">닫기</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      searchContent: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    radioChange(event) {
      var categorySelected = event.target.value
      console.log('categorySelected: ', categorySelected)
    },
    searchBook() {
      const bookInfo = this.searchBook
      // 카테고리 선택에 따라 API 요청
      //일단은 강의명만 되면 다 구현할 예정
      let apiUrl = ''
      axios
        .get(apiUrl + bookInfo)
        .then((response) => {
          console.log('API Response: ', response.data)
        })
        .catch((error) => {
          console.log('API Error: ', error)
        })
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
