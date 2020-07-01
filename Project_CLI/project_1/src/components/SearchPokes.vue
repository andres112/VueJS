<template>
  <div class="search">
    <div class="img_button">
      <img src="@/assets/pokeball.png"  @click="getDetails">
    </div>    
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-sm-6">
          <h4 v-bind:style="[{'color': players[0].colorTeam}]">{{players[0].name}}</h4>
          <table class="table table-sm ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Picture</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pokemon,index) of players[0].pokemonList" v-bind:key="pokemon.name">
                <th scope="row">{{index+1}}</th>
                <td class="text-left">{{pokemon.name}}</td>
                <td>
                  <img :src='checkImage(pokemon.sprites.front_default)' :alt="pokemon.name" class="imgPokSize">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-sm-6">
          <h4 v-bind:style="[{'color': players[1].colorTeam}]" >{{players[1].name}}</h4>
          <table class="table table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Picture</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pokemon,index) in players[1].pokemonList" v-bind:key="pokemon.name">
                <th scope="row">{{index+1}}</th>
                <td class="text-left">{{pokemon.name}}</td>                
                <td>
                  <img :src="checkImage(pokemon.sprites.front_default)" :alt="pokemon.name" class="imgPokSize">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  name: 'SearchPokes',
  computed: {
    ...mapState(['players'])
  },
  methods: {
    ...mapActions(['getPokemons', 'getDetails']),

    checkImage(image){
      return image == null ? "https://www.cybercomplaint.in/assets/img/mailbox/NoImage.png" : image
    }
  },
  mounted() {
    this.$store.dispatch("getPokemons")
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  margin-top: 20px;
}
.img_button img {
	-webkit-transform: rotate(15deg) scale(0.5);
	transform: rotate(15deg) scale(0.5);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
  width: 10%;
  height: auto;
  cursor: pointer;
}
.img_button img:hover {
	-webkit-transform: rotate(0) scale(1);
	transform: rotate(0) scale(1);
}
.img_button img:active {/*on Click*/
    -ms-transform: translateY(10px);
    -webkit-transform: translateY(10px);
    transform: translateY(10px);/*Move down*/
    border-bottom: none;/*disappears*/
}
.imgPokSize{
  height: 75px;
  width: auto;
}
</style>
