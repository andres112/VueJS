<template>
  <div class="container mt-5">
    <h1>ToDo Listo</h1>
    <form class="mt-3" @submit.prevent="procesarFormulario">
      <form-fields :task="task" />
    </form>
    <task-list class="mt-3"></task-list>
  </div>
</template>

<script>
// @ is an alias to /src
import Input from "@/components/Input.vue";
import TaskList from "@/components/TaskList.vue";

import { mapActions } from "vuex";
import { nanoid } from "nanoid"; // import singleton from nano id package

export default {
  name: "Home",
  components: {
    "form-fields": Input,
    TaskList,
  },
  data() {
    return {
      task: { id: "", name: "", category: [], state: "", number: null }
    };
  },
  methods: {
    ...mapActions(["setTask"]),
    procesarFormulario() {
      if (this.task.name.trim() === "") {
        console.log("name Vacío");
        return;
      }
      // generate nano id for each task limited to 10 characters
      this.task.id = nanoid(10);
      // send data to action in vuex
      this.setTask(this.task);
      // clear task
      this.task = { id: "", name: "", category: [], state: "", number: null };
    },
  },
};
</script>
