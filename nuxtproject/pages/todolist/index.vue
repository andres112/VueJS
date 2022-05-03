<template>
  <div class="container-fluid dark-mode full-height">
    <h1>List of ToDo's</h1>
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
        <b-button variant="danger">
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
// import { db, ref, onValue } from '@/plugins/firebase.js'
import { computed, useStore } from '@nuxtjs/composition-api'
export default {
  name: 'TodoListPage',
  setup () {
    const store = useStore()
    const todos = computed(() => {
      return store.state.tasks
    })
    return {
      todos
    }
  },
  fetch ({ store }) {
    return store.dispatch('fetchTasks')
  }
}
</script>
