import axios from 'axios'

export const state = () => ({
  tasks: []
})

export const mutations = {
  setTasks (state, tasks) {
    state.tasks = tasks
  }
}

export const actions = {
  async fetchTasks ({ commit }) {
    try {
      const list = await axios.get(
        'https://todo-listo-c4f34-default-rtdb.firebaseio.com/tasks.json'
      )
      commit('setTasks', list.data)
    } catch (error) {
      console.error(error)
    }
  }
}
