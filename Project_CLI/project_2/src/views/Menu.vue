<template>
  <div class="menu">
    <Head msg="Pokemon Battle" />
    <img alt="working" src="@/assets/pokeball.png" />
    <br />
    <div class="btn-group-vertical">
      <button class="btn btn-primary" :disabled="!isSessionOn" @click="newGame">
        New Battle
      </button>
      <button class="btn btn-primary" :disabled="!isSessionOn" @click="loadGame">
        Continue Battle
      </button>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import { mapMutations, mapGetters } from "vuex";
import router from "@/router";

export default {
  name: "Menu",
  components: {
    Head,
  },
  computed: {
    ...mapGetters(["isSessionOn"]),
  },
  methods: {
    ...mapMutations(["setDefaultPlayers", "clearsetPlayerPokemons"]),
    newGame() {
      // first initialize players instances
      this.setDefaultPlayers();
      this.clearsetPlayerPokemons();
      // after that push a route
      router.push({ name: "Home" });
    },
    loadGame() {
      // This is another version how to call a mutation and a route
      this.$store.commit("setRemoteToLocalPlayers");
      this.$router.push({ name: "Battle" });
    },
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
