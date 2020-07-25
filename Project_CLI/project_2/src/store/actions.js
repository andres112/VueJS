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
          const details = await data.json();
          // pIndex identfies the player who belongs this pokemon
          details.pIndex = item;
          // isSelected identifies if the pokemon is going to be used to the battle
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
        commit("setLoadPlayers", battleList[battleList.length-1]);
        commit("setHistory", battleList);
      }
    } catch (error) {
      console.error(error);
    }
  },
  setPlayersDB: async function({ state }) {
    // Update the documents in firestore
    try {
      const p1 = state.players[0];
      const p2 = state.players[1];
      await db
        .collection(state.user.email)
        .doc(state.currentBattleId)
        .update({
          player_1: {
            name: p1.name,
            gender: p1.gender,
            color: p1.color,
            pokemonList: p1.pokemonList,
            id: p1.id,
          },
          player_2: {
            name: p2.name,
            gender: p2.gender,
            color: p2.color,
            pokemonList: p2.pokemonList,
            id: p2.id,
          },
        });
    } catch (error) {
      console.error(error);
    }
  },
  // add elements to battles collection
  addBattleDB: async function({ state }) {
    try {
      await db.collection(state.user.email).add({
        timestamp: support.getTimestamp(),
        player_1: {
          id:"1",
          name: state.players[0].name,
          gender: state.players[0].gender,
          color: state.players[0].color,
          pokemonList: [],
        },
        player_2: {
          id:"2",
          name: state.players[1].name,
          gender: state.players[1].gender,
          color: state.players[1].color,
          pokemonList: [],
        },
      });
    } catch (error) {
      console.error(error);
    }
  },

  // remove element from battles collection
  removeBattleDB: async function({ commit, dispatch }, idBattle) {
    try {
      await db
        .collection(state.user.email)
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
      await db.collection(res.user.email).add({
        timestamp: support.getTimestamp(),
        first: true,
        player_1: {
          name: "",
          gender: "n",
          color: "#C0382B",
          pokemonList: [],
          id: "1",
        },
        player_2: {
          name: "",
          gender: "n",
          color: "#3398DB",
          pokemonList: [],
          id: "2",
        },
      });
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
      commit("clearHistory");
      commit("setDefaultPlayers");
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
