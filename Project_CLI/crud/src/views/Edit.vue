<template>
  <div class="container mt-5">
    <h1>ToDo Listo</h1>
    <form class="mt-3" @submit.prevent="procesarFormulario">
      <form-fields :task="task" />
    </form>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["task"]),
  },
  components: {
    "form-fields": Input,
  },
  methods: {
    ...mapActions(["setTask"]),
  },
  created() {
    this.setTask(this.$route.params.id);
  },
};
</script>

<style></style>
