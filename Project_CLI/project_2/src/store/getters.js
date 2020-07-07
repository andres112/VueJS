import support from '@/assets/scripts/functions.js'

export default {
  getPokemon: state => name => {
    let pokemon = {};
    state.players.forEach(element => {
      if(element.pokemonList.some(x => x.name === name)){
        pokemon = element.pokemonList.find(x => x.name === name);
        pokemon.sprites.front_default = support.checkImage(pokemon.sprites.front_default);
      }
    });    
    return pokemon; 
  }
};
