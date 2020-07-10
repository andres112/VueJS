<template>    
  <div class="headPoke">    
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Head',
  // This props is comming since parent component not in states
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  font-family: Chalkduster, fantasy;
}
</style>
