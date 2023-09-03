<template>
  <UpperBar title="글 작성하기" rightSource="완료" :clickFunction="checkForm" />
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
import { mapGetters } from 'vuex'
import axios from '../main.js'
export default {
  computed: {
    ...mapGetters(['userInfo'])
  },
  components: { UpperBar },
  methods: {
    checkForm() {
      if (this.title == '' || this.content == '') {
        alert('빈칸없이 작성해주세요')
      } else {
        const data = {
          writerID: this.userInfo.userId,
          communityPostTitle: this.title,
          communityPostContent: this.content
        }
        console.log(data)
        //모든 정보가 입력되었을때만 요청 보냄
        axios.post('/communityposts/post', data).then((res) => {
          console.log(res.data)
          this.$router.push(`/community/detail/${res.data.CommunityPostID}`)
        })
      }
    }
  },
  data() {
    return {
      title: '',
      content: ''
    }
  }
}
</script>

<style lang="scss" scoped>
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
