<template>
  <table class="table table-striped table-hover table-sm">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Category</th>
        <th scope="col">State</th>
        <th scope="col">Number</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tasks" :key="item.id">
        <th scope="row">{{ item.id }}</th>
        <td>{{ item.name }}</td>
        <td>{{ item.category.join(", ") }}</td>
        <td>{{ item.state }}</td>
        <td>{{ item.number }}</td>
        <td>
          <div class="d-grid gap-2">
            <router-link
              class="btn btn-sm btn-outline-success mr-2"
              :to="`/edit/${item.id}`"
            >
              Edit
            </router-link>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="deleteTask(item)"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["tasks"]),
  },
  methods: {
    ...mapActions(["deleteTask"]),
  },
};
</script>
