<template>
  <UpperBar title="나의 프로필" />
  <div style="display: flex">
    <div style="width: 60%; display: flex; justify-content: center; align-items: center">
      <!-- 사진 둥글게 -->
      <img
        style="width: 150px; height: 150px; border-radius: 50%; padding: 10%"
        :src="this.userInfo.profilePhoto"
      />
    </div>
    <div
      style="
        display: flex;
        flex-direction: column;
        width: 60%;
        margin-left: 5%;
        /* margin-top: 5%; */
        justify-content: center;
      "
    >
      <div class="center" style="margin-right: auto; font-weight: bold">
        {{ this.userInfo.username }} #{{ this.userInfo.userId }}
      </div>
      <div class="grow" style="display: flex; align-items: center; width: 100%">
        <div
          :key="index"
          v-for="(value, index) in [1, 2, 3, 4, 5]"
          :class="`${this.userInfo.ratingState >= value ? 'star' : 'nostar'}`"
        >
          <img style="width: 100%; height: 100%" src="../assets/mypage/icon_mypage_star.svg" />
        </div>
        <div class="center">
          {{ this.userInfo.ratingState == null ? '(0)' : `(${this.userInfo.ratingState})` }}
        </div>
      </div>
    </div>
  </div>
  <div
    style="
      align-self: center;
      width: 90%;
      background-color: #f2f2f2;
      height: 50%;
      position: relative;
      font-size: 16px;
      /* 최소 100px */
      height: 150px;
    "
    :style="`${isUpdating ? 'display: none' : ''}`"
  >
    {{ this.userInfo.introduction }}
    <img
      style="position: absolute; right: 10px; bottom: 10px"
      src="@/assets/mypage/icon_pencle.svg"
      @click="isUpdating = true"
    />
  </div>
  <textarea
    ref="textarea"
    style="
      width: 90%;
      align-self: center;
      font-size: 16px;
      background-color: #f2f2f2;
      height: 150px;
      position: relative;
      display: flex;
      resize: none;
    "
    v-model="this.userInfo.introduction"
    :style="`${isUpdating ? '' : 'display: none'}`"
  />
  <button
    ref="button"
    style="width: 90%; align-self: center"
    @click="updateProfile"
    :style="`${isUpdating ? '' : 'display: none'}`"
  >
    저장하기
  </button>
  <!-- <div>프로필</div> -->
</template>

<script>
import UpperBar from '../components/UpperBar.vue'
import axios from '../main'
import { mapGetters } from 'vuex'

export default {
  components: {
    UpperBar
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  data() {
    return {
      isUpdating: false
    }
  },
  methods: {
    async updateProfile() {
      this.$refs.button.disabled = true
      var res = await axios.put(`/v1/user`, {
        userId: this.userInfo.userId,
        username: this.userInfo.username,
        kakaoId: this.userInfo.kakaoId,
        email: this.userInfo.email,
        phoneNumber: this.userInfo.phoneNumber,
        profilePhoto: this.userInfo.profilePhoto,
        introduction: this.userInfo.introduction,
        membership: this.userInfo.membership,
        certification: this.userInfo.certification,
        ratingState: this.userInfo.ratingState
      })
      //button 활성화
      this.$refs.button.disabled = false
      this.isUpdating = false
      console.log(res.data)
    }
  }
}
</script>

<style lang="scss" scoped></style>
