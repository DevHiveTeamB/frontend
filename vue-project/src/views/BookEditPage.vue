<template>
  <!-- 글 작성페이지 -->
  <UpperBar title="게시글 작성" rightSource="완료" :clickFunction="checkForm" />
  <div
    style="position: relative; height: 80%; padding: 0 10px; display: flex; flex-direction: column"
  >
    <div class="fileContainer marginTop_Bottom">
      <label for="file"
        ><div class="plusFile">
          <img class="plus" src="../assets/post/icon_plus.svg" />
          <div :style="`${selectedImages.length > 5 ? 'color:red' : ''}`" class="font">
            사진을 추가하세요<br />({{ selectedImages.length }} / 5)
          </div>
        </div>
      </label>
      <input
        ref="images"
        id="file"
        multiple
        type="file"
        @change="handleFileChange"
        style="display: none"
      />
      <div :key="index" v-for="(image, index) in selectedImages" style="position: relative">
        <img :src="image.picture" alt="선택된 사진" class="thumbnail" />
        <button
          class="imageDeleteButton"
          @click="selectedImages = selectedImages.filter((item) => item !== image)"
        >
          x
        </button>
      </div>
    </div>
    <input
      class="textInput marginTop_Bottom"
      v-model="title"
      type="text"
      placeholder="제목을 입력해주세요"
    />
    <textarea
      style="height: 30%; padding: 5%; resize: none"
      class="textInput marginTop_Bottom"
      v-model="content"
      placeholder="책 소개를 입력해주세요"
    />
    <div class="category" @click="modalOpen = true">카테고리</div>
    <CategoryModal
      v-if="modalOpen"
      @close="modalOpen = false"
      @result-selected="handleResultSelected"
    />
    <!-- 선택된 카테고리 표시해줌 -->
    <div v-if="selectedResult">{{ selectedResult.postTitle }}</div>
    <input
      class="textInput marginTop_Bottom"
      v-model="price"
      type="number"
      placeholder="가격을 입력해주세요"
    />
  </div>
</template>

<script>
import axios from '../main.js'
import CategoryModal from '../components/CategoryModal.vue'
import UpperBar from '@/components/UpperBar.vue'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isLoggedIn', 'userInfo'])
  },
  created() {
    this.postId = this.$route.params.post_id //postId 초기화
    this.sendGetRequest() //초기화된 postId로 데이터 다시 받아오기
  },
  methods: {
    handleFileChange(event) {
      this.selectedImages = Array.from(event.target.files)
      this.selectedImages = this.selectedImages.map((file) => {
        return URL.createObjectURL(file)
      })
      console.log(this.selectedImages)
    },
    checkForm() {
      if (
        this.title == '' ||
        this.selectedImages.length == 0 ||
        this.selectedImages.length > 5 ||
        this.content == '' ||
        // this.category == '' ||
        this.price == ''
      ) {
        alert('빈칸없이 작성해주세요')
      } else {
        //모든 정보가 입력되었을때만 요청 보냄
        this.sendPutRequest()
      }
    },
    //페이지에 뿌릴 데이터 받아오기(created()에서 사용함)
    sendGetRequest() {
      const url = `/v1/post/${this.postId}`
      axios
        .get(url, {
          params: {
            userId: this.userId
          }
        })
        .then((res) => {
          this.postData = res.data
          this.selectedImages = this.postData.postPictures
          console.log(this.selectedImages)
          this.title = this.postData.postTitle
          this.content = this.postData.postContent
          //   카테고리도 추가해야댐
          this.price = this.postData.price
        })
        .catch((err) => {
          console.log(url, this.userId)
          console.log(err)
        })
    },
    sendPutRequest() {
      //'data' 객체 추가
      const data = {
        postId: this.postId,
        lectureId: '1',
        postTitle: this.title,
        postContent: this.content,
        price: this.price
      }

      axios
        .put('v1/post', data)
        .then((response) => {
          console.log(response.data)
          alert('게시글이 수정되었습니다')
          this.$router.go(-1)
        })
        .catch((error) => {
          console.error(error)
          console.log(data)
        })
    },
    handleResultSelected(result) {
      this.selectedResult = result
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
      userId: null,
      selectedResult: null
    }
  },
  components: {
    CategoryModal,
    UpperBar
  }
}
</script>

<style scoped>
.marginTop_Bottom {
  margin: 10px 0;
}
.fileContainer {
  margin-bottom: 0;
  display: flex;
  width: 100%;
  align-items: center;
  /* 가로 스크롤 가능 */
  overflow-x: auto;
}

.plusFile {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100px;
  height: 100px;
  /* 점선 */
  border: 2px dashed #316464;
  border-radius: 20px;
  margin: 5px;
}

.plus {
  height: 30px;
  width: 100%;
}

.font {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: end;
  font-size: 12px;
  /* 가운데정렬; */
  text-align: center;
}
.thumbnail {
  width: 100px;
  height: 100px;
  /* 비율이 안깨지게 */
  object-fit: contain;
  border-radius: 20px;
  padding: 5px;
}

.imageDeleteButton {
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 50%;
  border: none;
}

.textInput {
  width: 100%;
  height: 10%;
  padding: 0 10px;
  background-color: rgb(242, 242, 242);
  border: none;
}

.category {
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 2px solid #316464;
}
</style>
