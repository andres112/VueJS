import support from '@/assets/scripts/functions.js'

export default{
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
          for(let i=0; i < context.state.numberOfPokemons; i++){          
            const data = await fetch(battlePokemons.next().value.url);
            const details = await data.json();
            details.pIndex = item;
            details.isSelected = false;
            context.commit("setPlayerPokemons", details)         
          }
        })
        
      } catch (error) {
        console.error(error)
      }
    }
  }