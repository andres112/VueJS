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
    deleteTask(state, payload) {
      state.tasks = state.tasks.filter((x) => x.id != payload.id);
    },
    setTask(state, id) {
      state.task = state.tasks.find((x) => x.id == id);
    },
  },
  actions: {
    setTasks({ commit }, newTask) {
      commit("addTask", newTask);
    },
    deleteTask({ commit }, task) {
      commit("deleteTask", task);
    },
    setTask({ commit }, id) {
      commit("setTask", id);
    },
  },
  modules: {},
});
