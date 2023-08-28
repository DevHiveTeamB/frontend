<template>
  <div v-if="!setloading ? this.isLoading : setloading" class="loading-spinner">
    <div class="spinner" :style="spinnerStyle"></div>
  </div>
</template>
<script>
import { mapGetters,mapMutations } from 'vuex';
export default {
  props :{
    setloading:{
      type : Boolean,
      default : false
    },
    height : {
      type : String,
      default : '40px'
    },
    width :{
      type : String,
      default : '40px'
    },
    color :{
      type : String,
      default : '#316464'
    },
    alpha :{
      type : String,
      default : '0.1'
    }
  },
computed: {
  ...mapGetters(['isLoading']),
  spinnerStyle(){
    return {
      height : this.height,
      width : this.width,
      border : `4px solid rgba(0, 0, 0, ${this.alpha})`,
      borderLeft : `4px solid ${this.color}`,
    }
  }
},
data() {
  return {
  };
},
methods: {
  ...mapMutations(['setIsLoading']),
}
};
</script>
<style>
.loading-spinner {
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #316464;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
}
</style>