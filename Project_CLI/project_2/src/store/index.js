import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [],
    pokemons: [],
    numberOfPokemons: 5,
    history: [],
    remotePlayers: [],

    user: null,
    error: null,
    isSession: false,
  },
  getters,
  mutations,
  actions,
  modules: {},
});
