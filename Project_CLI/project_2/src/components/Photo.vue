<template>
  <div class="photo">
    <h1 class="text-capitalize">{{getPokemon($route.params.id).name}}</h1>
    <img
      :src="getPokemon($route.params.id).sprites.front_default"
      :alt="$route.params.id"
      class="imgPokSize"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "Photo",
  computed: {
    ...mapGetters(["getPokemon"]),
  },
};
</script>

<style scoped>
.imgPokSize {
  width: 10%;
  height: auto;
}
</style>
