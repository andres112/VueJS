<template>
  <div class="menu">
    <!-- Here is possible to access to the menu-title in i18n -->
    <Tittle :msg="$t('menu.txt-title')" />
    <transition
      enter-active-class="animate__animated animate__rubberBand animate__faster"
    >
      <img v-if="showImage" alt="working" src="@/assets/pokeball.png" />
    </transition>
    <br />
    <div class="btn-group-vertical">
      <button class="btn btn-primary" :disabled="!isSessionOn" @click="newGame">
        {{ $t("menu.btn-new_battle") }}
      </button>
      <router-link to="/battle">
        <button class="btn btn-primary" :disabled="!isSessionOn">
          {{ $t("menu.btn-continue_battle") }}
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Tittle from "@/components/Tittle.vue";
import { mapMutations, mapGetters, mapActions } from "vuex";
import router from "@/router";

export default {
  name: "Menu",
  data() {
    return {
      aja: false,
      showImage: false,
    };
  },
  components: {
    Tittle,
  },
  computed: {
    ...mapGetters({ isSessionOn: "userStore/isSessionOn" }),
  },
  methods: {
    ...mapMutations({
      setDefaultPlayers: "battle/setDefaultPlayers",
      clearsetPlayerPokemons: "battle/clearsetPlayerPokemons",
    }),
    ...mapActions({ getBattles: "battle/getBattles" }),
    newGame() {
      // first initialize players instances
      this.setDefaultPlayers();
      this.clearsetPlayerPokemons();
      // after that push a route
      router.push({ name: "Home" });
    },
  },
  created() {
    // Then load players from database
    if (this.isSessionOn) {
      this.getBattles();
    }
  },
  mounted() {
    this.showImage = true;
  },
  destroy() {
    this.showImage = false;
  }
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
