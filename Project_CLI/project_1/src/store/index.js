import Vue from 'vue'
import Vuex from 'vuex'
import Player from '@/assets/scripts/Player.js'
import support from '@/assets/scripts/functions.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players :[
      new Player("1", "Felipe", "m", '#fa2f19'),
      new Player("2", "Andrea", "f", '#b821eb')
    ],
    pokemons: [],
    numberOfPokemons: 5
  },
  mutations: {
    fillPokemons: function(state, pokemons){      
      state.pokemons = pokemons;
    },
    setPlayerPokemons: function(state, battlePokemon){
      state.players[battlePokemon.pIndex].pokemonList.push(battlePokemon)      
    },
    clearsetPlayerPokemons: function(state){
      state.players.forEach(player => {
        player.pokemonList=[];
      });
    },
    selectPokemon: function(state, identification) {
      console.log(identification)
    }
  },
  actions: {
    getPokemons: async function (context) {
      const url = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';
      try {
        const data = await fetch(url);
        const raw_data = await data.json();
        context.commit("fillPokemons", raw_data.results)               
      } catch (error) {
        console.error(error)
      }
    },
    getDetails: function (context) {
      context.commit("clearsetPlayerPokemons");
      const battlePokemons = support.getRandomPokemonList(context.state.pokemons, 10)
      try {
        context.state.players.forEach(async (player, item) => {
          for(let i=0; i< context.state.numberOfPokemons; i++){          
            const data = await fetch(battlePokemons.next().value.url);
            const details = await data.json();
            details.pIndex = item;
            context.commit("setPlayerPokemons", details)         
          }
        })
        
      } catch (error) {
        console.error(error)
      }
    }
  },
  modules: {
  }
})
