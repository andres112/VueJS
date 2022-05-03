<template>
  <div class="container-fluid dark-mode full-height">
    <h1>List of ToDo's</h1>
    <b-card bg-variant="transparent">
      <label for="input-task">Task:</label>
      <b-input id="input-task" v-model="task" placeholder="Enter your task" />
      <b-card-footer class="px-0">
        <b-button variant="success" @click.prevent="addTask()">
          Add
        </b-button>
      </b-card-footer>
    </b-card>
    <b-card
      v-for="todo in todos"
      :key="todo.id"
      bg-variant="transparent"
      class="my-1"
    >
      <b-card-body>
        {{ todo }}
      </b-card-body>
      <b-card-footer>
        <b-button variant="danger" @click.prevent="deleteTask(todo.id)">
          Delete
        </b-button>
        <b-button variant="primary">
          Update
        </b-button>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import { computed, ref, useStore } from '@nuxtjs/composition-api'
export default {
  name: 'TodoListPage',
  setup () {
    const store = useStore()
    const task = ref('')

    const todos = computed(() => {
      return store.state.tasks
    })

    const addTask = () => {
      store.dispatch('addTask', { id: Date.now(), name: task.value })
      task.value = ''
    }

    const deleteTask = (id) => {
      store.dispatch('deleteTask', id)
    }
    return {
      todos,
      task,
      addTask,
      deleteTask
    }
  },
  fetch ({ store }) {
    return store.dispatch('fetchTasks')
  }
}
</script>
