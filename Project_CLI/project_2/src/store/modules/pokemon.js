import support from "@/assets/scripts/functions.js";
import store from "@/store";

const state = {
  pokemons: [],
  numberOfPokemons: 5,
  load: false /* state for monitoring spinner*/,
};
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
  getDetails: function({ commit, state, rootState }) {
    store.commit("battle/clearsetPlayerPokemons");
    let counter = 0;
    const battlePokemons = support.getRandomPokemonList(
      state.pokemons,
      state.numberOfPokemons * 2
    );
    try {
      rootState.battle.players.forEach(async (player, item) => {
        for (let i = 0; i < state.numberOfPokemons; i++) {
          // when action getDetails start the spinner is initialized
          commit("loadPokemons", true);
          const data = await fetch(battlePokemons.next().value.url);
          const element = await data.json();
          counter++;
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
          if (counter == state.numberOfPokemons * 2) {
            setTimeout(() => {
              commit("loadPokemons", false);
            }, 500);
          }
        }
      });
      // when action getDetails finish stop the spinner
    } catch (error) {
      console.error(error);
    }
  },
};
const mutations = {
  fillPokemons: function(state, pokemons) {
    state.pokemons = pokemons;
  },
  // Spinner loader
  loadPokemons(state, payload) {
    state.load = payload;
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
