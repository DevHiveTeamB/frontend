<template>
  <UpperBar title="글 수정하기" rightSource="완료" :clickFunction="checkForm" />
  <div v-if="this.postCreateLoading" class="modal">
    <LoadingSpinner :setloading="true"/>
  </div>
  <div
    style="position: relative; height: 80%; padding: 0 10px; display: flex; flex-direction: column"
  >
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
      placeholder="글 내용을 입력해주세요"
    />
  </div>
</template>

<script>
import UpperBar from '../components/UpperBar.vue'
import { mapGetters, mapMutations } from 'vuex'
import axios from '../main.js'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
export default {
  computed: {
    ...mapGetters(['userInfo', 'selectCommnunity'])
  },
  created(){
    this.title = this.selectCommnunity.communityPostTitle
    this.content = this.selectCommnunity.communityPostContent
  },
  components: { UpperBar, LoadingSpinner },
  methods: {
    ...mapMutations(['setSelectCommnunity']),
    checkForm() {
      if (this.Loading) {
        return
      }
      if (this.title == '' || this.content == '') {
        alert('빈칸없이 작성해주세요')
      } else {
        const data = {
          "writerID": this.userInfo.userId,
          "communityPostTitle": this.title,
          "communityPostContent": this.content,
        }
        this.Loading = true
        console.log(data)
        //모든 정보가 입력되었을때만 요청 보냄
        axios.put(`/communityposts/put/${this.selectCommnunity.communityPostID}`, data)
        .then((res) => {
          console.log(res.data)
          this.$router.push(`/community/detail/${this.selectCommnunity.communityPostID}`)
          this.Loading = false
        })
      }
    }
  },
  data() {
    return {
      Loading: false,
      title : '',
      content : ''
      // title: this.selectCommnunity.communityPostTitle,
      // content: this.selectCommnunity.communityPostContent
    }
  }
}
</script>

<style lang="scss" scoped>
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
  z-index: 1;
}
.textInput {
  width: 100%;
  height: 10%;
  padding: 0 10px;
  background-color: rgb(242, 242, 242);
  border: none;
}
.marginTop_Bottom {
  margin: 10px 0;
}
</style>
