<template>
  <div class="photo">
    <h1 class="text-capitalize">{{ name }}</h1>
    <img :src="image" :alt="$route.params.id" class="imgPokSize" />
    <div class="row justify-content-around">
      <div class="col-sm-3">
        <label for="hp" class="font-weight-bold col-form-label">HP</label>
        <input
          type="text"
          readonly
          id="hp"
          class="form-control-plaintext text-center"
          v-model="stats.hp"
        />
      </div>
      <div class="col-sm-3">
        <label for="attack" class="font-weight-bold col-form-label"
          >Attack</label
        >
        <input
          type="text"
          readonly
          id="attack"
          class="form-control-plaintext text-center"
          v-model="stats.attack"
        />
      </div>
      <div class="col-sm-3">
        <label for="defense" class="font-weight-bold col-form-label"
          >Defense</label
        >
        <input
          type="text"
          readonly
          id="defense"
          class="form-control-plaintext text-center"
          v-model="stats.defense"
        />
      </div>
      <div class="col-sm-3">
        <label for="types" class="font-weight-bold col-form-label">Types</label>
        <ul class="list-group list-group-flush">
          <li
            class="list-group-item text-capitalize"
            v-for="(type, index) in types"
            v-bind:key="index"
          >
            {{ type }}
          </li>
        </ul>
      </div>
    </div>
    <router-link to="/battle" tag="button" class="btn btn-danger"
      >Back</router-link
    >
    <button class="btn btn-success" @click="selectLocal">Select</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import router from "@/router";

export default {
  name: "Photo",
  data() {
    // Prefer to use local data instead states
    return {
      pokemon: {},
      name: "",
      image: "",
      stats: {},
      types: [],
    };
  },
  computed: {
    ...mapGetters(["getPokemon"]),
  },
  methods: {
    ...mapMutations(["selectPokemon"]),
    selectLocal() {
      // function required first to modify with mutations the select state of a pokemon
      this.selectPokemon(this.pokemon)
      // after that push a route
      router.push('/battle');
    },
    loadData() {
      // This function is executed from created() stage in vuejs
      this.pokemon = this.getPokemon(this.$route.params.id);

      let arrayStats = Object.values(this.pokemon.stats);
      arrayStats.forEach((item) => {
        this.stats[item.name] = item.value;
      });

      this.types = Object.values(this.pokemon.types);

      this.name = this.pokemon.name;
      this.image = this.pokemon.photo;
    },
  },
  created() {
    // The data is assigned before DOM is inserted and this funcitonality is just used in this component
    this.loadData();
  },
};
</script>

<style scoped>
.imgPokSize {
  width: 150px;
  height: auto;
}

.btn {
  margin: 20px;
}
</style>
