<template>
  <div class="container mt-5">
    <h1>ToDo Listo</h1>
    <form class="mt-3" @submit.prevent="procesarFormulario">
      <form-fields :task="task" />
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import Input from "@/components/Input.vue";
import { mapActions } from "vuex";

import { nanoid } from "nanoid"; // import singleton from nano id package

export default {
  name: "Home",
  components: {
    "form-fields": Input,
  },
  data() {
    return {
      task: { id: "", name: "", category: [], state: "", number: null },
    };
  },
  methods: {
    ...mapActions(["setTask"]),
    procesarFormulario() {
      if (this.task.name.trim() === "") {
        console.log("name Vacío");
        return;
      }
      // generate nano id for each task
      this.task.id = nanoid();
      // send data to action in vuex
      this.setTask(this.task);
      this.task = { name: "", category: [], state: "", number: null };
    },
  },
};
</script>
