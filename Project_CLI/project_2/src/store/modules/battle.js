import support from "@/assets/scripts/functions.js";
import Player from "@/assets/scripts/Player.js";
import { db } from "@/firebase";
import store from "@/store";

const state = {
  players: [],
  currentBattleId: null,
  history: [],
};
const actions = {
  //####################
  //# Database section #
  //####################
  getBattles: async function({ commit, state, rootState }) {
    const battleList = [];
    try {
      // An async call to the database collection players in firebase
      const data = await db
        .collection(rootState.userStore.user.email)
        .orderBy("timestamp", "desc")
        .limit(10)
        .get();
      data.forEach((item) => {
        let battle = item.data();
        battle.id = item.id;
        battleList.push(battle);
      });
      // commit the data from database to mutation
      if (battleList.length > 0) {
        commit("setHistory", battleList);
        // if already exist a battle id this is mantained for current battle and assigned to index
        let index = state.currentBattleId
          ? state.history.findIndex((x) => x.id === state.currentBattleId)
          : battleList.some((x) => x.isCurrent)
          ? state.history.findIndex((x) => x.isCurrent)
          : 0;
        commit("setLoadPlayers", battleList[index]);
        commit("setCurrentBattleId", battleList[index].id);
      }
    } catch (error) {
      console.error(error);
    }
  },
  setPlayersDB: async function({ state, rootState }) {
    // Update the documents in firestore, just the dynamic data PokemonList
    try {
      const p1 = state.players[0];
      const p2 = state.players[1];
      // update in firebase
      await db
        .collection(rootState.userStore.user.email)
        .doc(state.currentBattleId)
        .update({
          "player_1.pokemonList": p1.pokemonList,
          "player_2.pokemonList": p2.pokemonList,
        });
    } catch (error) {
      console.error(error);
    }
  },
  // add elements to battles collection
  addBattleDB: async function({ commit, state, rootState }) {
    try {
      // add an empty doc in firbase
      const res = await db.collection(rootState.userStore.user.email).add({
        timestamp: support.getTimestamp(),
        isCurrent: true,
        player_1: {
          id: "1",
          name: state.players[0].name,
          gender: state.players[0].gender,
          color: state.players[0].color,
          pokemonList: [],
        },
        player_2: {
          id: "2",
          name: state.players[1].name,
          gender: state.players[1].gender,
          color: state.players[1].color,
          pokemonList: [],
        },
      });
      // after create the new doc in firebase, set the state for battle id with new one
      commit("setCurrentBattleId", res.id);
    } catch (error) {
      console.error(error);
    }
  },

  updateCurrentBattle: function({ state, rootState }, battleId) {
    try {
      // update in firebase: clean first all docs isCurrent Battle in firebase
      state.history.forEach(async (battle) => {
        let current = false;
        if (battle.id === battleId) {
          current = true;
        }
        await db
          .collection(rootState.userStore.user.email)
          .doc(battle.id)
          .update({
            isCurrent: current,
          });
      });
    } catch (error) {
      console.error(error);
    }
  },

  // remove element from battles collection
  removeBattleDB: async function({ commit, rootState }, idBattle) {
    try {
      await db
        .collection(rootState.userStore.user.email)
        .doc(idBattle)
        .delete();
      commit("updateHistory", idBattle);
    } catch (error) {
      console.error(error);
    }
  },
};
const mutations = {
  setDefaultPlayers: function(state) {
    // Initialize player information
    state.players = [
      new Player("1", "Player 1", "n", "#C0382B"),
      new Player("2", "Player 2", "n", "#3398DB"),
    ];
  },
  // Set players retrieved form DB
  setLoadPlayers: function(state, payload) {
    state.players[0] = payload.player_1;
    state.players[1] = payload.player_2;
  },
  //set current battle id
  setCurrentBattleId: function(state, id) {
    state.currentBattleId = id;
  },
  //clear current battle id
  clearCurrentBattleId: function(state, id) {
    state.currentBattleId = null;
  },
  setPlayerPokemons: function(state, battlePokemon) {
    // This validation avoid get more pokemons than allowed
    if (
      state.players[battlePokemon.pokemon.owner].pokemonList.length <
      battlePokemon.maxPokes
    ) {
      state.players[battlePokemon.pokemon.owner].pokemonList.push(
        battlePokemon.pokemon
      );
    }
  },
  clearsetPlayerPokemons: function(state) {
    state.players.forEach((player) => {
      player.pokemonList = [];
    });
  },
  selectPokemon: function(state, identification) {
    // Set the is selected as true only for selected pokemon
    state.players[identification.owner].pokemonList.forEach((pokemon) => {
      pokemon.isSelected = false;
      if (pokemon.name === identification.name) {
        pokemon.isSelected = true;
      }
    });
    // every time than a pokemon is selected the database is updated
    store.dispatch("battle/setPlayersDB");
  },

  //####################
  //# History section #
  //####################
  setHistory: function(state, payload) {
    state.history = payload;
  },
  updateHistory: function(state, idBattle) {
    state.history = state.history.filter((x) => x.id != idBattle);
  },
  // Clear the history state
  clearHistory: function(state) {
    state.history = [];
  },
};
const getters = {
  checkBattle: (state) => (battleId) => {
    return state.currentBattleId === battleId;
  },
  getHistory(state) {
    return state.history;
  },
  getPokemon: (state) => (name) => {
    let pokemon = {};
    state.players.forEach((element) => {
      if (element.pokemonList.some((x) => x.name === name)) {
        pokemon = element.pokemonList.find((x) => x.name === name);
        // if not image in sprites parameter
        pokemon.photo = support.checkImage(pokemon.photo);
      }
    });
    return pokemon;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
