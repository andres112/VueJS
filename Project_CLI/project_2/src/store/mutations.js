export default {
  fillPokemons: function(state, pokemons) {
    state.pokemons = pokemons;
  },
  setPlayerPokemons: function(state, battlePokemon) {
    // This validation avoid get more pokemons than allowed
    if (
      state.players[battlePokemon.pIndex].pokemonList.length <
      state.numberOfPokemons
    ) {
      state.players[battlePokemon.pIndex].pokemonList.push(battlePokemon);
    }
  },
  clearsetPlayerPokemons: function(state) {
    state.players.forEach((player) => {
      player.pokemonList = [];
    });

    Object.keys(state.battlePokemons).forEach((key) => {
      state.battlePokemons[key] = {};
    });
  },
  selectPokemon: function(state, identification) {
    if (identification.pIndex === 0) {
      state.battlePokemons.p1 = identification;
    } else {
      state.battlePokemons.p2 = identification;
    }
  },
};
