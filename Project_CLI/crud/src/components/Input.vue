<template>
  <div>
    <input
      type="text"
      placeholder="Task Name"
      class="form-control"
      v-model.trim="task.name"
    />
    <!-- checkbox -->
    <div class="my-2">
      <div class="form-check form-check-inline">
        <input
          type="checkbox"
          class="form-check-input"
          id="check-1"
          v-model="task.category"
          value="js"
        />
        <label for="check-1" class="form-check-label">Javascript</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          type="checkbox"
          class="form-check-input"
          id="check-2"
          v-model="task.category"
          value="dev"
        />
        <label for="check-2" class="form-check-label">Web Dev</label>
      </div>
    </div>
    <!-- radio -->
    <div class="my-2">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          id="inlineRadio1"
          value="urgent"
          v-model="task.state"
        />
        <label class="form-check-label" for="inlineRadio1">
          Urgent
        </label>
      </div>

      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          id="inlineRadio2"
          value="relax"
          v-model="task.state"
        />
        <label class="form-check-label" for="inlineRadio2">
          Relax
        </label>
      </div>
    </div>
    <div class="my-2">
      <input
        type="number"
        class="form-control"
        placeholder="Number"
        v-model.number="task.number"
      />
    </div>
    <button class="btn btn-block btn-dark" type="submit" :disabled="blocking">
      Process
    </button>
    <div>
      <p>{{ task }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Input",
  data() {
    return {};
  },
  props: {
    task: Object,
  },
  computed: {
    blocking() {
      return this.task.name.trim() === "" ? true : false;
    },
  },
};
</script>
