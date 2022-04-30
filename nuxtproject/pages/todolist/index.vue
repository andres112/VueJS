<template>
  <div class="container-fluid dark-mode full-height">
    <h1>List of ToDo's</h1>
    {{ todos }}
  </div>
</template>

<script>
import { db, ref, onValue } from '@/plugins/firebase.js'

export default {
  name: 'TodoListPage',
  data () {
    return {
      todos: []
    }
  },
  fetch () {
    const dbRef = ref(db, 'tasks')
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      this.todos = data
    })
  }
}
</script>
