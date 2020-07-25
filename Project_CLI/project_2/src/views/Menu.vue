<template>
  <div class="menu">
    <Head msg="Pokemon Battle" />
    <img alt="working" src="@/assets/pokeball.png" />
    <br />
    <div class="btn-group-vertical">
      <button class="btn btn-primary" :disabled="!isSessionOn" @click="newGame">
        New Battle
      </button>
      <router-link to="/battle">
        <button class="btn btn-primary" :disabled="!isSessionOn">
          Continue Battle
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import { mapMutations, mapGetters, mapActions } from "vuex";
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
    ...mapActions(["getBattles"]),
    newGame() {
      // first initialize players instances
      this.setDefaultPlayers();
      this.clearsetPlayerPokemons();
      // after that push a route
      router.push({ name: "Home" });
    },
  },
  created() {
    // first initialize players instances
    // this.$store.commit("setDefaultPlayers");
    // Then load players from database
    if (this.isSessionOn) {
      this.getBattles();
    }
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
