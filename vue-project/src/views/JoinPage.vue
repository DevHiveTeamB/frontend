<template>
  <!-- 회원가입 -->
  <div>
    <div>상단바자리</div>
    <div id="joinform">
      <input v-model="name" placeholder="이름" />
      <input v-model="id" placeholder="아이디" />
      <button>중복확인</button>
      <input v-model="password" placeholder="비밀번호" />
      <input v-model="email" placeholder="이메일" />
      <button @click="checkForm">완료</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    checkForm() {
      if (this.name == '' || this.id == '' || this.password == '' || this.email == '') {
        alert('빈칸없이 작성해주세요')
      }
    }
  },
  data() {
    return {
      name: '',
      id: '',
      password: '',
      email: ''
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  display: block;
}
</style>
