import axios from 'axios'

export const state = () => ({
  tasks: []
})

export const mutations = {
  setTasks (state, tasks) {
    state.tasks = tasks
  },
  deleteTask (state, id) {
    state.tasks = state.tasks.filter(task => task.id !== id)
  }
}

export const actions = {
  async fetchTasks ({ commit }) {
    try {
      const list = await axios.get(
        'https://todo-listo-c4f34-default-rtdb.firebaseio.com/tasks.json'
      )
      console.log(list.data)
      commit('setTasks', Object.values(list.data))
    } catch (error) {
      console.error(error)
    }
  },
  async addTask ({ commit, state }, task) {
    try {
      await axios.put(
        `https://todo-listo-c4f34-default-rtdb.firebaseio.com/tasks/${task.id}.json`,
        task
      )
      commit('setTasks', [...state.tasks].concat(task))
    } catch (error) {
      console.error(error)
    }
  },
  async deleteTask ({ commit }, id) {
    try {
      await axios.delete(
        `https://todo-listo-c4f34-default-rtdb.firebaseio.com/tasks/${id}.json`
      )
      commit('deleteTask', id)
    } catch (error) {
      console.error(error)
    }
  }
}
