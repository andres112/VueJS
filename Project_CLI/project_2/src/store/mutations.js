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
  },
  // Clear the history state
  clearHistory: function(state) {
    state.history = [];
  },
  selectPokemon: function(state, identification) {
    // Set the is selected as true only for selected pokemon
    state.players[identification.pIndex].pokemonList.forEach((pokemon) => {
      pokemon.isSelected = false;
      if (pokemon.name === identification.name) {
        pokemon.isSelected = true;
      }
    });
    // every time than a pokemon is selected the database is updated
    this.dispatch("setPlayersDB");
  },
  setDefaultPlayers: function(state) {
    // Initialize player information
    state.players = [
      new Player("1", "Player 1", "n", "#C0382B"),
      new Player("2", "Player 2", "n", "#3398DB"),
    ];
  },
  setLoadPlayers: function(state, payload) {
    state.players[0] = payload.player_1;
    state.players[1] = payload.player_2;
    state.currentBattleId = payload.id;
  },
  // mutations for history list state modifications
  setHistory: function(state, payload) {
    state.history = payload;
  },
  updateHistory: function(state, idBattle) {
    state.history = state.history.filter((x) => x.id != idBattle);
  },

  // Mutations for User register and login
  setUser: function(state, payload) {
    state.user = payload;
  },
  setError: function(state, payload) {
    state.error = payload;
  },
};
