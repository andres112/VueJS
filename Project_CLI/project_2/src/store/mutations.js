import Player from "@/assets/scripts/Player.js";

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

    // Initialize the pokemons used in battle
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

    // Set the is selected as true only for selected pokemon
    state.players[identification.pIndex].pokemonList.forEach((pokemon) => {
      pokemon.isSelected = false;
      if (pokemon.name === identification.name) {
        pokemon.isSelected = true;
      }
    });
  },
  setDefaultPlayers: function(state) {
    state.players = [
      new Player("0", "Player 1", "n", "#C0382B"),
      new Player("2", "Player 2", "n", "#3398DB"),
    ];
  },
  setLoadPlayers: function(state, payload) {
    // receive the payload from database in payload
    state.players.forEach((player) => {
      if (player.id === payload.id) {
        for (const [key, value] of Object.entries(payload)) {
          player[key] = value
        }
      }
    });
  },
};
