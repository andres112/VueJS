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
      new Player(
        "1",
        "Player 1",
        "n",
        "#C0382B",
        state.players[0] ? state.players[0].remoteId : ""
      ),
      new Player(
        "2",
        "Player 2",
        "n",
        "#3398DB",
        state.players[1] ? state.players[1].remoteId : ""
      ),
    ];
  },

  // Mutations that use database queries
  setRemoteToLocalPlayers: function (state) {
    state.players = state.remotePlayers;
  },
  setLoadPlayers: function(state, payload) {
    // receive the payload from database in payload
    state.remotePlayers = payload;
    state.players[0].remoteId = payload.some((x) => x.id == 1)
      ? payload.find((x) => x.id == 1).remoteId
      : "";
    state.players[1].remoteId = payload.some((x) => x.id == 2)
      ? payload.find((x) => x.id == 2).remoteId
      : "";
  },
  // mutations for history list state modifications
  setHistory: function(state, payload) {
    state.history = payload;
  },
  updateHistory: function(state, idBattle) {
    state.history = state.history.filter((x) => x.id != idBattle);
  },

  // Mutations for User register and login
  setUser: function(state, payload){
    state.user = payload;
  },
  setError: function (state, payload) {
    state.error = payload;
  }
};
