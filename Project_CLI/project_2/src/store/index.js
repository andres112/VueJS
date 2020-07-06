import Vue from 'vue'
import Vuex from 'vuex'
import Player from '@/assets/scripts/Player.js'
import actions from './actions.js'
import mutations from './mutations.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players :[
      new Player("1", "Felipe", "m", '#C0382B'),
      new Player("2", "Andrea", "f", '#3398DB')
    ],
    pokemons: [],
    numberOfPokemons: 5,
    battlePokemons: {
      p1:{},
      p2:{}
    }
  },
  mutations,
  actions,
  modules: {
  }
})
