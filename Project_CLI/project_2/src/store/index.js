import Vue from "vue";
import Vuex from "vuex";
import userStore from "./modules/userStore.js";
import battle from "./modules/battle.js";
import pokemon from "./modules/pokemon.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userStore,
    battle,
    pokemon,
  },
});
