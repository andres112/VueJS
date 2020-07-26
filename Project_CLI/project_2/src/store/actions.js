import support from "@/assets/scripts/functions.js";
import { db, auth } from "@/firebase";

// import the router to use it here; automatically reads index.js
import router from "@/router";

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
          context.commit("setPlayerPokemons", pokemon);
        }
      });
    } catch (error) {
      console.error(error);
    }
  },

  //####################
  //# Database section #
  //####################
  getBattles: async function({ commit, state }) {
    const battleList = [];
    try {
      // An async call to the database collection players in firebase
      const data = await db
        .collection(state.user.email)
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
        commit("setLoadPlayers", battleList[0]);
        commit("setCurrentBattleId", battleList[0].id);
        commit("setHistory", battleList);
      }
    } catch (error) {
      console.error(error);
    }
  },
  setPlayersDB: async function({ state }) {
    // Update the documents in firestore, just the dynamic data PokemonList
    try {
      const p1 = state.players[0];
      const p2 = state.players[1];
      // update in firebase
      await db
        .collection(state.user.email)
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
  addBattleDB: async function({ commit, state }) {
    try {
      // add an empty doc in firbase
      const res = await db.collection(state.user.email).add({
        timestamp: support.getTimestamp(),
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

  // remove element from battles collection
  removeBattleDB: async function({ commit, state }, idBattle) {
    try {
      await db
        .collection(state.user.email)
        .doc(idBattle)
        .delete();
      commit("updateHistory", idBattle);
    } catch (error) {
      console.error(error);
    }
  },

  //####################
  //# Authentincation  #
  //####################
  // create new user in firebase
  createUser: async function({ commit, dispatch }, user) {
    commit("setError", null); // Clean error
    try {
      const res = await auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      const user_res = { email: res.user.email, uid: res.user.uid };

      // For each new user created, It is created a new collection with email as name
      await db.collection(res.user.email).doc();
      commit("setUser", user_res);
      router.push("/"); // Go to the main route "Menu"
      dispatch("sendEmailVerification");
    } catch (error) {
      commit("setError", error);
    }
  },
  // send email verificaaition for account
  sendEmailVerification: async function() {
    try {
      const user = auth.currentUser;
      await user.sendEmailVerification();
    } catch (error) {
      console.log(error);
    }
  },
  // login with existent user
  loginUser: async function({ commit }, payload) {
    commit("setError", null); // Clean error
    try {
      const res = await auth.signInWithEmailAndPassword(
        payload.email,
        payload.password
      );
      const user_res = {
        email: res.user.email,
        uid: res.user.uid,
      };
      commit("setUser", user_res);
      router.push("/"); // Go to the main route "Menu"
    } catch (error) {
      commit("setError", error);
    }
  },
  // close sesion
  unloginUser: async function({ commit }) {
    try {
      auth.signOut();
      // After close user session all states are cleaned
      commit("setUser", null);
      commit("clearHistory");
      commit("setDefaultPlayers");
      commit("clearCurrentBattleId")
      router.push("/"); // Go to the main route "Menu"
    } catch (error) {
      console.log(error);
    }
  },
  // Detect if user is active when load page
  detectUser: function({ commit }, payload) {
    commit("setUser", payload);
  },
};
