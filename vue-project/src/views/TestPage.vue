<template>
  <button @click="()=>{
    console.log(this.isLoading)
  }">click</button>
    <LoadingSpinner :setloading="true"/>
</template>
<script>
import { mapGetters,mapMutations } from 'vuex';
import LoadingSpinner from '../components/LoadingSpinner.vue'
export default {
  computed: {
    ...mapGetters(['isLoading'])
  },
  methods: {
    ...mapMutations(['setIsLoading']),
  },
  components: {
    LoadingSpinner,
  },
};
</script>
<style>

</style>