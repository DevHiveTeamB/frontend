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
        <img
          :src="this.opponentData.profilePhoto"
          style="width: 40%; height: 40%; border-radius: 50%"
        />
        <div class="profileInfo">
          <div style="font-size: large; font-weight: bolder">
            {{ this.opponentData.username }}
          </div>
          <div style="display: flex; border-bottom: 2px solid #c9caca">
            <div
              :key="index"
              v-for="(value, index) in [1, 2, 3, 4, 5]"
              :class="`${this.opponentData.rating >= value ? 'star' : 'nostar'}`"
            >
              <img style="width: 100%; height: 100%" src="../assets/mypage/icon_mypage_star.svg" />
            </div>
            ({{ this.opponentData.rating }})
          </div>
          <div style="font-size: small; line-height: 130%; border-bottom: 2px solid #c9caca">
            자기소개 응애야니아럼;냐ㅓㅇ럄너;ㅇ랴ㅓㅁ;냐ㅓㅇㄹ;ㅁ냐ㅓㅇ;랴ㅐ머ㅣㄴ뢰ㅏ어;랴ㅐㅓㅐ
          </div>
          <div style="font-size: small">가입날짜</div>
        </div>
        <!-- <img :src="this.opponentData.profilePhoto" style="width: 140px; border-radius: 50%" />
        <div class="profileInfo">
          <div style="font-size: large; font-weight: bolder">
            {{ this.opponentData.username }}
          </div>
          <div style="display: flex; border-bottom: 2px solid #c9caca">
            <div
              :key="index"
              v-for="(value, index) in [1, 2, 3, 4, 5]"
              :class="`${this.opponentData.rating >= value ? 'star' : 'nostar'}`"
            >
              <img style="width: 100%; height: 100%" src="../assets/mypage/icon_mypage_star.svg" />
            </div>
            ({{ this.opponentData.rating }})
          </div>
          <div style="font-size: medium; border-bottom: 2px solid #c9caca">
            이거30글자로 제한줘야되나?개길어서 튀어나오는데 어떡하죵 살려주세요
          </div>
          <div style="font-size: small">가입날짜</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    opponentData: Object
  },
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
  height: auto;
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
  display: flex;
  margin: 0% 5%;
  height: auto;
  align-items: center;
}

.star {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: auto;
}

.nostar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: auto;
  opacity: 0.3;
}

.profileInfo {
  width: 100%;
  margin: 3%;
  line-height: 180%;
}
</style>
