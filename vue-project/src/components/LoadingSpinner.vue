<template>
  <div v-if="!this.isLoading" class="loading-spinner">
    <div class="spinner"></div>
  </div>
</template>
<script>
import { mapGetters,mapMutations } from 'vuex';
export default {
computed: {
  ...mapGetters(['isLoading'])
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