<template>
  <div class="battle container">
    <div class="row justify-content-between">
      <div class="col-sm-5">
        <h3 v-bind:style="[{ color: players[0].color }]">
          {{ players[0].name }} - {{ checkgender(players[0].gender) }}
        </h3>
        <input
          type="text"
          readonly
          class="form-control-plaintext font-weight-bold text-capitalize text-center"
          v-model="battlePokemons.p1.name"
        />
        <table class="table table-sm table-striped table-dark table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Avatar</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="pokemon of players[0].pokemonList"
              v-bind:key="pokemon.name"              
            >
              <td class="text-center align-middle">
                <input
                  type="radio"
                  name="Player1_Pokemon"
                  @click="selectPokemon(pokemon)"
                  :checked="pokemon.isSelected"
                />
              </td>
              <td class="text-center align-middle">{{ pokemon.name }}</td>
              <td @click="pokemonDetails(pokemon.name)">
                <img
                  :src="checkImage(pokemon.sprites.front_default)"
                  :alt="pokemon.name"
                  class="imgPokSize"
                  height="auto"
                  width="75"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-sm-2">
        <div class="img_button">
          <img src="@/assets/pokeball.png" @click="getDetails" />
        </div>
      </div>
      <div class="col-sm-5">
        <h3 v-bind:style="[{ color: players[1].color }]">
          {{ players[1].name }} - {{ checkgender(players[1].gender) }}
        </h3>
        <input
          type="text"
          readonly
          class="form-control-plaintext font-weight-bold text-capitalize text-center"
          v-model="battlePokemons.p2.name"
        />
        <table class="table table-sm table-striped table-dark table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Name</th>
              <th scope="col">Avatar</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="pokemon in players[1].pokemonList"
              v-bind:key="pokemon.name"
            >
              <td class="text-center align-middle">
                <input
                  type="radio"
                  name="Player2_Pokemon"
                  :checked="pokemon.isSelected"
                  @click="selectPokemon(pokemon)"
                />
              </td>
              <td class="text-center align-middle">{{ pokemon.name }}</td>
              <td @click="pokemonDetails(pokemon.name)">
                <img
                  :src="checkImage(pokemon.sprites.front_default)"
                  :alt="pokemon.name"
                  class="imgPokSize"
                  height="auto"
                  width="75"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import support from "@/assets/scripts/functions.js";

export default {
  name: "Battle",
  computed: {
    ...mapState(["players", "battlePokemons"]),
  },
  methods: {
    ...mapMutations(["selectPokemon"]),
    ...mapActions(["getPokemons", "getDetails"]),

    // Parcular functions to this component
    checkImage(image) {
      return support.checkImage(image)
    },
    checkgender(gender) {
      return support.checkgender(gender);
    },
    pokemonDetails(name){
      // push the dynamic route to the router, trigger a route
      this.$router.push({ name: 'Pokemon', params: { id: name } });
    }
  },
  mounted() {
    // this allows to dispatch an action just when DOM is loaded
    this.$store.dispatch("getPokemons");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin-top: 20px;
}
.img_button img {
  -webkit-transform: rotate(30deg) scale(0.5);
  transform: rotate(30deg) scale(0.5);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
  width: 80%;
  height: auto;
  cursor: pointer;
}
.img_button img:hover {
  -webkit-transform: rotate(0) scale(0.7);
  transform: rotate(0) scale(0.7);
}
.img_button img:active {
  /*on Click*/
  -ms-transform: translateY(10px);
  -webkit-transform: translateY(10px);
  transform: translateY(10px); /*Move down*/
  border-bottom: none; /*disappears*/
}
.imgPokSize {
  padding-top: 100%;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
.table td {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
