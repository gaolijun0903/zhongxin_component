<template>
  <div class="result-wrapper">
   <p v-text="msg"></p>
  </div>
</template>

<script>
export default {
  name: 'result',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
