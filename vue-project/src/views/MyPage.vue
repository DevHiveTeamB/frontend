<template>
  <UpperBar title="마이페이지" />
  <div style="width: 100%; height: 90%; padding: 0 10%">
    <div class="profile" style="display: flex">
      <div style="width: 30%; display: flex; justify-content: center; align-items: center">
        <!-- 사진 둥글게 -->
        <img
          style="width: 100%; border-radius: 50%; padding: 10%"
          :src="this.userInfo.profilePhoto"
        />
      </div>
      <div
        style="
          display: flex;
          flex-direction: column;
          width: 60%;
          margin-left: 5%;
          justify-content: space-around;
        "
      >
        <div class="center" style="margin-right: auto; font-weight: bold">
          {{ this.userInfo.username }} #{{ this.userInfo.userId }}
        </div>
        <div
          class="grow"
          style="display: flex; align-items: center; width: 100%; justify-content: space-around"
        >
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
        <button
          class="grow"
          style="
            width: 50%;
            background-color: #d9d9d9;
            border: none;
            border-radius: 5px;
            font-weight: bold;
          "
        >
          프로필보기
        </button>
      </div>
    </div>
    <div class="profile" style="display: flex; flex-direction: column">
      <div style="display: flex; margin-bottom: 2%">
        <div class="center" style="width: 10%; margin-right: 2%">
          <img style="width: 100%" src="../assets/main/icon_main_postlist.svg" />
        </div>
        <h2 class="profileTitle center">게시글보기</h2>
      </div>
      <div class="profileItem">내가 찜한 게시글</div>
      <div class="profileItem">최근 판매 목록</div>
      <div class="profileItem">최근 구매 목록</div>
      <div class="profileItem">커뮤니티 나의글</div>
    </div>
    <div class="profile" style="display: flex; flex-direction: column">
      <div style="display: flex; margin-bottom: 2%">
        <div class="center" style="width: 10%; margin-right: 2%">
          <img style="width: 100%" src="../assets/main/icon_main_popup.svg" />
        </div>
        <h2 class="profileTitle">기타</h2>
      </div>
      <div class="profileItem">나의 신고 내역</div>
      <div class="profileItem">개발자소개</div>
      <div class="profileItem">회원탈퇴</div>
    </div>
  </div>
</template>

<script>
import UpperBar from '../components/UpperBar.vue'
import { mapGetters } from 'vuex'
export default {
  components: { UpperBar },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {},
  created() {
    console.log(this.userInfo)
  },
  data() {
    return {
      userId: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  width: 100%;
  padding: 10% 0;
  border-bottom: solid 1px #316464;
}

.profileItem {
  margin: 1% 0;
  margin-left: 12%;
}

.profileTitle {
  margin: 0;
  display: flex;
  justify-content: center;
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

.grow {
  flex-grow: 1;
  // margin: 2% 0;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
