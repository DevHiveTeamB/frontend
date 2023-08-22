<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modalUpperBar">
        <div style="flex-grow: 1"></div>
        <div style="flex-grow: 2">프로필보기</div>
        <img
          class="modalCloseBtn"
          src="../assets/chat/icon_chat_close_white.svg"
          @click="this.$emit('close')"
          style="flex-grow: 1; height: 20px"
        />
      </div>
      <div class="profileContainer">
        <img src="../assets/bookdetail/icon_bookdetail_basic_profile.svg" style="height: 100%" />
        <div class="profileInfo">
          <div style="font-size: large">이름</div>
          <div style="font-size: medium; border-bottom: 1px solid #2e6464">평점</div>
          <div style="font-size: medium; border-bottom: 1px solid #2e6464">자기소개</div>
          <div style="font-size: small">가입날짜</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {}
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
}

.modal-content {
  width: 350px;
  height: 200px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.modalUpperBar {
  height: 30px;
  background-color: #2e6464;
  text-align: center;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: large;
}

.profileContainer {
  position: relative;
  margin: 5%;
  height: 70%;
}

.profileInfo {
  position: absolute;
  top: 5%;
  left: 50%;
  width: 50%;
  line-height: 180%;
}
</style>
