<template>
  <!-- 글 작성페이지 -->
  <div>
    <button id="complete" @click="checkForm">완료</button>
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
      <CategoryModal v-if="modalOpen" @close="modalOpen = false" />
      <input v-model="price" type="number" placeholder="가격을 입력해주세요" /><br />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CategoryModal from '../components/CategoryModal.vue'
import { mapState } from 'vuex'
export default {
  created() {
    this.redirectToLogin()
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  methods: {
    async redirectToLogin() {
      //로그인한 사용자만 이용가능하도록
      if (!this.isLoggedIn) {
        alert('로그인 후 이용 가능합니다.')
        this.$router.push('/login')
      } else {
        // 로그인된 상태면 userId를 가져옴
      }
    },
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
      } else {
        //모든 정보가 입력되었을때만 요청 보냄
        this.sendPostRequest()
      }
    },
    closeModal() {
      this.$emit('close')
    },
    sendPostRequest() {
      const formData = new FormData()

      //이미지 파일들 추가
      for (let i = 0; i < this.selectedImages.length; i++) {
        formData.append('picture', this.selectedImages[i])
      }

      //'data' 객체 추가
      const data = {
        userId: 'Long',
        lecutreId: 'Long',
        postTitle: this.title,
        postContnet: this.content,
        price: this.price
      }

      formData.append('data', JSON.stringify(data))

      axios
        .post('v1/post', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          console.log(response.data)
          //완료되면 내가 작성한 글 내용보는걸로 넘어갈까..?
        })
        .catch((error) => {
          console.error(error)
        })
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
      modalOpen: false,
      userId: null
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
