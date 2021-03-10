import { createStore } from "vuex";

export default createStore({
  state: {
    tasks: [],
    task: { id: "", name: "", category: [], state: "", number: null },
  },
  mutations: {
    addTask(state, payload) {
      state.tasks.push(payload);
    },
  },
  actions: {
    setTask({ commit }, newTask) {
      commit("addTask", newTask);
    },
  },
  modules: {},
});
