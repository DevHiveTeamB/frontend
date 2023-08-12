<template>
  <!-- 글 작성페이지 -->
  <div>
    <button id="complete" @click=";[checkForm, sendPostRequest]">완료</button>
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
        //this.category == '' ||
        this.price == ''
      ) {
        alert('빈칸없이 작성해주세요')
      }
    },
    closeModal() {
      this.$emit('close')
    },
    sendPostRequest() {
      // body에{
      // 		"picture" : image.jpg
      // 		"data" : {
      // 				"userID" : "Long",
      // 			  "lectureID": "Long",
      // 			  "writer": "Long",
      // 			  "postTitle": "String", OK
      // 			  "postContent": "String",  OL
      // 			  "price": "Integer",
      // 			  "hits": "Integer"
      // 		}
      // } 들어가야 함
      const postData = new postData()

      //이미지들 저장
      for (let i = 0; i < this.selectedImages.length; i++) {
        postData.append('images[]', this.selectedImages[i])
      }

      postData.append('postTitle', this.title)
      postData.append('postContent', this.content)
      postData.append('category', this.category)
      postData.append('price', this.price)
      console.log(postData)

      axios
        .post('v1/post')
        .then((response) => {
          //요청 성공시
          console.log(response.data)

          //요청 성공 글 내용 페이지로 이동
          //this.$router.push('')
        })
        .catch((error) => {
          //요청 실패시
          console.error(error)
        })
    },
    //로그인 상태 확인
    checkLoggedIn() {
      //세션 스토리지에서 userid 가져와서 로그인 상태 확인
      const userid = sessionStorage.getItem('userid')
      //로그인 완료되면 메인페이지로 이동
      if (userid) {
        console.log('User is logged in with userid: ', userid)
        //로그인된 사용자만 이용가능하므로
        // } else {
        //   console.log('User is not logged in.')
        //   alert('로그인 후 이용가능합니다.')
        //   this.$router.go(-1)
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
  },
  created() {
    //페이지 로드 시 로그인 상태 확인
    this.checkLoggedIn()
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
