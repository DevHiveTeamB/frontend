<template>
    <div class="navBox">
        <img src="../image/홈_비활.png" class="noActHome"/>
        <img src="../image/커뮤니티_비활성.png" class="noActCommunity"/>
        <img src="../image/쪽지함_비활.png" class="noActTalk"/>
        <img src="../image/마이페이지_비활.png" class="noActMypage"/>
    </div>
</template>

<script>
export default {
    name : 'NavBar',
    methods: {
        transHomeStatus(){
            this.stat_home = true;
        }
    },
    data() {
        return {
            stat_home: false,
            stat_commu: false,
            stat_talk: false,
            stat_mypage: false,
        }
    }
};
</script>

<style>
.navBox {
    background: #fff;
    border: 1px solid #316464;
    position: absolute;
    width: 360px;
    height: 60px;
}
.noActHome {
    position: absolute;
    width: 32px;
    height: 30px;
    top: 15px;
    left: 39px;
}
.noActCommunity {
    position: absolute;
    width: 33.185px;
    height: 30px;
    top: 15px;
    left: 123px;
}
.noActTalk {
    position: absolute;
    width: 34px;
    height: 30px;
    top: 15px;
    left: 209px;
}
.noActMypage {
    position: absolute;
    width: 31px;
    height: 30px;
    top: 15px;
    left: 293px;
}
</style>