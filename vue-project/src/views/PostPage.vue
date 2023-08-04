<template>
  <div>
    <button id="complete" checkForm>완료</button>
    <div class="content">
      <!-- 사진 선택하고 화면에 나옴
      슬라이드로 넘기는거 구현해주세요
      최대 5장 선택가능하도록 해뒀음 -->
      <div id="fileContainer">
        <input type="file" @change="handleFileChange" />
        <br />
        <img
          v-if="selectedImage"
          :src="selectedImage"
          alt="선택된 사진"
          style="max-width: 400px; max-height: 400px"
        />
      </div>
      <div v-if="selectedImages.length > 0">
        <img
          v-for="(image, index) in selectedImages"
          :key="index"
          :src="image"
          alt="선택된 사진"
          class="thumbnail"
        />
      </div>
      <input v-model="title" type="text" placeholder="제목을 입력해주세요" /><br />
      <input v-model="content" type="text" placeholder="책 소개를 입력해주세요" /><br />
      <div @click="modalOpen = true">카테고리입력</div>
      <CategoryModal v-if="modalOpen" />
      <input v-model="price" type="number" placeholder="가격을 입력해주세요" /><br />
    </div>
  </div>
</template>

<script>
import CategoryModal from '../components/CategoryModal.vue'
export default {
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file && this.selectedImages.length < 5) {
        this.selectedImages.push(URL.createObjectURL(file))
      }
    },
    checkForm() {
      if (
        this.title == '' ||
        this.selectedImage == '' ||
        this.content == '' ||
        this.category == '' ||
        this.price == ''
      ) {
        alert('빈칸없이 작성해주세요')
      }
    }
  },
  data() {
    return {
      selectedImage: null,
      selectedImages: [],
      title: '',
      content: '',
      category: '',
      price: '',
      modalOpen: false
    }
  },
  components: {
    CategoryModal
  }
}
</script>

<style scoped>
.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
}
</style>
