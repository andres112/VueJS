<template>
  <div align-h="center">
    <b-input v-model="search"></b-input>
    <div class="mt-3">
      <b-pagination
        v-model="currentPage"
        :total-rows="totalItems"
        :per-page="perPage"
        align="center"
        aria-controls="my-table"
      ></b-pagination>
      <b-table
        id="my-table"
        :items="pokemons"
        :per-page="perPage"
        :current-page="currentPage"
        small
      ></b-table>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Pokepedia",
  data() {
    return {
      search: null,
      currentPage: 1,
      perPage: 10,
    };
  },
  computed: {
    ...mapState({
      pokemons: (state) => state.pokemon.pokemons,
    }),
    totalItems() {
      console.log(Object.keys(this.pokemons).length);
      return Object.keys(this.pokemons).length;
    },
  },
  methods: {
      ...mapActions({
          getPokemons: "pokemon/getPokemons"
      })
  },
  created() {
      this.getPokemons()
  },
};
</script>
