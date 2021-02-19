<template>
  <div>
    <form class="mt-3">
      <input
        type="text"
        placeholder="Nombre Tarea"
        class="form-control"
        v-model="tarea.nombre"
      />
      <!-- checkbox -->
      <div class="my-2">
        <div class="form-check form-check-inline">
          <input
            type="checkbox"
            class="form-check-input"
            id="check-1"
            v-model="tarea.categoria"
            value="Javascript"
          />
          <label for="check-1" class="form-check-label">Javascript</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            type="checkbox"
            class="form-check-input"
            id="check-2"
            v-model="tarea.categoria"
            value="Desarrollo"
          />
          <label for="check-2" class="form-check-label">Desarrollo web</label>
        </div>
      </div>
    </form>
    <div>
      <p>{{ tarea }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tarea: { nombre: "", categoria:[] },
    };
  },
};
</script>
