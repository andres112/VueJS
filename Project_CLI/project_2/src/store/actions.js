import support from "@/assets/scripts/functions.js";
import { db } from "@/firebase";

export default {
  //####################
  //#    Api section   #
  //####################
  getPokemons: async function(context) {
    const url = "https://pokeapi.co/api/v2/pokemon/?limit=1000";
    try {
      const data = await fetch(url);
      const raw_data = await data.json();
      context.commit("fillPokemons", raw_data.results);
    } catch (error) {
      console.error(error);
    }
  },
  getDetails: function(context) {
    context.commit("clearsetPlayerPokemons");
    const battlePokemons = support.getRandomPokemonList(
      context.state.pokemons,
      10
    );
    try {
      context.state.players.forEach(async (player, item) => {
        for (let i = 0; i < context.state.numberOfPokemons; i++) {
          const data = await fetch(battlePokemons.next().value.url);
          const details = await data.json();
          // pIndex identfies the player who belongs this pokemn
          details.pIndex = item;
          // isSelected identfies if the pokemon is going to be used to the battle
          details.isSelected = false;
          context.commit("setPlayerPokemons", details);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },

  //####################
  //# Database section #
  //####################
  getPlayers: async function({ commit }) {
    const remotePlayers = [];
    try {
      // An async call to the database collection players in firebase
      const data = await db.collection("players").get();
      data.forEach((x) => {
        let remoteplayer = x.data();
        remoteplayer.remoteId = x.id;
        remotePlayers.push(remoteplayer);
      });
      // commit the data from database to mutation
      commit("setLoadPlayers", remotePlayers);
    } catch (error) {
      console.error(error);
    }
  },
  setPlayersDB: function({ state }) {
    // Update the documents in firestore
    try {
      state.players.forEach(async (player) => {
        await db
          .collection("players")
          .doc(player.remoteId)
          .update({
            name: player.name,
            gender: player.gender,
            color: player.color,
            pokemonList: player.pokemonList,
          });
      });
    } catch (error) {
      console.error(error);
    }
  },
  // add elements to battles collection
  addBattleDB: async function({ state }) {
    try {
      await db.collection("battles").add({
        timestamp: support.getTimestamp(),
        player_1: {
          name: state.players[0].name,
          gender: state.players[0].gender,
          color: state.players[0].color,
        },
        player_2: {
          name: state.players[1].name,
          gender: state.players[1].gender,
          color: state.players[1].color,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
  // get all elements of battles collection
  getHistory: async function({ commit }) {
    const battleList = [];
    try {
      const data = await db
        .collection("battles")
        .orderBy("timestamp", "desc")
        .limit(10)
        .get();
      data.forEach((item) => {
        let battle = item.data();
        battle.id = item.id;
        battleList.push(battle);
      });
      commit("setHistory", battleList);
    } catch (error) {
      console.error(error);
    }
  },
  // remove element from battles collection
  removeBattleDB: async function({ commit, dispatch }, idBattle) {
    try {
      await db
        .collection("battles")
        .doc(idBattle)
        .delete();
      // To refresh the list we can get history from databse but is not recommendable
      // dispatch('getHistory');
      // is better with a mutation in state
      commit("updateHistory", idBattle);
    } catch (error) {
      console.error(error);
    }
  },
};
