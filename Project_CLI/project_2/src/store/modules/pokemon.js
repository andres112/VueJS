import support from "@/assets/scripts/functions.js";
import store from "@/store";

const state = { pokemons: [], numberOfPokemons: 5 };
const actions = {
  getPokemons: async function({ commit }) {
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=1000";
    try {
      const data = await fetch(url);
      const raw_data = await data.json();
      commit("fillPokemons", raw_data.results);
    } catch (error) {
      console.error(error);
    }
  },
  getDetails: function({ state, rootState }) {
    store.commit("battle/clearsetPlayerPokemons");
    const battlePokemons = support.getRandomPokemonList(state.pokemons, 10);
    try {
      rootState.battle.players.forEach(async (player, item) => {
        for (let i = 0; i < state.numberOfPokemons; i++) {
          const data = await fetch(battlePokemons.next().value.url);
          const element = await data.json();
          // Extract useful data only and set js object, decrease amount of data to storage
          const pokemon = {
            name: element.name,
            types: element.types.map((x) => x.type.name),
            stats: element.stats.map((x) => ({
              name: x.stat.name,
              value: x.base_stat,
            })),
            photo: element.sprites.front_default,
            owner: item,
            isSelected: false,
          };
          const payload = {
            pokemon: pokemon,
            maxPokes: state.numberOfPokemons,
          };
          store.commit("battle/setPlayerPokemons", payload);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
};
const mutations = {
  fillPokemons: function(state, pokemons) {
    state.pokemons = pokemons;
  },
};

const getters = {
  getNumberOfPokemons(state) {
    return state.numberOfPokemons;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
