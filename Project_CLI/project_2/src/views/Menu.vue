<template>
  <div class="menu">
    <Head msg="Pokemon Battle" />
    <img alt="working" src="@/assets/pokeball.png" />
    <br />
    <div class="btn-group-vertical">
      <button class="btn btn-primary" @click="newGame">New Battle</button>
      <router-link tag="button" class="btn btn-primary" to="/battle">Continue Battle</router-link>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";

export default {
  name: "Menu",
  components: {
    Head,
  },
  methods: {
    newGame() {
      // first initialize players instances
      this.$store.commit("setDefaultPlayers");
      this.$store.commit("clearsetPlayerPokemons");
      // after that push a route
      this.$router.push({ name: "Home" });
    }
  },
  created() {
    // first initialize players instances
    this.$store.commit("setDefaultPlayers");
    // Then load players in database
    this.$store.dispatch("getPlayers");
  },
};
</script>

<style scoped>
img {
  margin: 20px;
  margin-bottom: 50px;
}
.btn-group-vertical > button {
  margin-bottom: 10px;
}
</style>
