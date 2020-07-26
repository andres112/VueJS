import support from "@/assets/scripts/functions.js";

export default {
  getPokemon: (state) => (name) => {
    let pokemon = {};
    state.players.forEach((element) => {
      if (element.pokemonList.some((x) => x.name === name)) {
        pokemon = element.pokemonList.find((x) => x.name === name);
        // if not image in sprites parameter
        pokemon.photo = support.checkImage(pokemon.photo);
      }
    });
    return pokemon;
  },
  isSessionOn(state) {
    if (!state.user) {
      return false;
    } else {
      return true;
    }
  },
};
