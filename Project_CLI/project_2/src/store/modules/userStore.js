import { db, auth, firebase } from "@/firebase";
import store from "@/store";
// import the router to use it here; automatically reads index.js
import router from "@/router";

const state = {
  user: null,
  error: null,
};

const actions = {
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
      commit("setError", error.message);
    }
  },
  // send email verificaaition for account
  sendEmailVerification: async function() {
    try {
      const user = auth.currentUser;
      await user.sendEmailVerification();
    } catch (error) {
      console.log(error.message);
    }
  },
  // login with existent user
  loginUser: async function({ commit }, payload) {
    commit("setError", null); // Clean error
    try {
      // Apply this persitence to mantain the session status only for window opened
      await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      const res = await auth.signInWithEmailAndPassword(
        payload.email,
        payload.password
      );
      const user_res = {
        email: res.user.email,
        uid: res.user.uid,
      };
      if (res.user.emailVerified)  commit("setUser", user_res);
      router.push("/"); // Go to the main route "Menu"
    } catch (error) {
      commit("setError", error.message);
    }
  },
  // close sesion
  unloginUser: async function({ commit }) {
    try {
      auth.signOut();
      // After close user session all states are cleaned
      commit("setUser", null);
      store.commit("battle/clearHistory");
      store.commit("battle/setDefaultPlayers");
      store.commit("battle/clearCurrentBattleId");
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

const mutations = {
  //####################
  //# user mng section #
  //####################
  setUser: function(state, payload) {
    state.user = payload;
  },
  setError: function(state, payload) {
    state.error = payload;
  },
};

const getters = {
  isSessionOn(state) {
    if (!state.user) {
      return false;
    } else {
      return true;
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
