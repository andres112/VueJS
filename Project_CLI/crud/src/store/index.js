import { createStore } from "vuex";

export default createStore({
  state: {
    tasks: [],
    task: { id: "", name: "", category: [], state: "", number: null },
  },
  mutations: {
    setTask(state, payload) {
      state.tasks.push(payload);
    },
  },
  actions: {
    setTask({ commit }, newTask) {
      console.log('jajajaja');
      commit("setTask", newTask);
    },
  },
  modules: {},
});
