<template>
  <div class="menu">
    <Head msg="Pokemon Battle"/>
    <img alt="working" src="@/assets/pokeball.png"/>
    <br>
    <div class="btn-group-vertical">
        <button class="btn btn-primary" @click="newGame">New Battle</button>
        <button class="btn btn-primary" @click="loadGame">Continue Battle</button>  
    </div>
  </div>
</template>

<script>
import Head from '@/components/Head.vue'

export default {
  name: 'Menu',
  components:{
    Head
  },
  methods: {
    newGame() {
      // clear states
      this.$store.commit("setDefaultPlayers");
      this.$store.commit("clearsetPlayerPokemons");
      // after that push a route
      this.$router.push({ name: "Home" });
    },
    async loadGame(){
      await this.$store.dispatch('getPlayers')
      // after that push a route
      await this.$router.push({ name: "Battle" });
    }
  }
}
</script>

<style scoped>
img{
  margin: 20px;
  margin-bottom: 50px;
}
.btn-group-vertical > button{
    margin-bottom:10px;
}
</style>
