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
    </b-card>
  </div>
</template>

<script>
// import { db, ref, onValue } from '@/plugins/firebase.js'
import axios from 'axios'

export default {
  name: 'TodoListPage',
  data () {
    return {
      todos: []
    }
  },
  async fetch () {
    const list = await axios.get(
      'https://todo-listo-c4f34-default-rtdb.firebaseio.com/tasks.json'
    )
    this.todos = list.data
  }
}
</script>
