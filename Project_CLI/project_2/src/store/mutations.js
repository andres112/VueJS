import Player from "@/assets/scripts/Player.js";

export default {
  fillPokemons: function(state, pokemons) {
    state.pokemons = pokemons;
  },
  setPlayerPokemons: function(state, battlePokemon) {
    // This validation avoid get more pokemons than allowed
    if (
      state.players[battlePokemon.owner].pokemonList.length <
      state.numberOfPokemons
    ) {
      state.players[battlePokemon.owner].pokemonList.push(battlePokemon);
    }
  },
  clearsetPlayerPokemons: function(state) {
    state.players.forEach((player) => {
      player.pokemonList = [];
    });
  },  
  selectPokemon: function(state, identification) {
    // Set the is selected as true only for selected pokemon
    state.players[identification.owner].pokemonList.forEach((pokemon) => {
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
  // Set players retrieved form DB
  setLoadPlayers: function(state, payload) {
    state.players[0] = payload.player_1;
    state.players[1] = payload.player_2;    
  },
  //set current battle id
  setCurrentBattleId: function (state, id) {
    state.currentBattleId = id;
  },
  //clear current battle id
  clearCurrentBattleId: function (state, id) {
    state.currentBattleId = null;
  },
  
  //####################
  //# History section #
  //####################
  setHistory: function(state, payload) {
    state.history = payload;
  },
  updateHistory: function(state, idBattle) {
    state.history = state.history.filter((x) => x.id != idBattle);
  },
  // Clear the history state
  clearHistory: function(state) {
    state.history = [];
  },

  //####################
  //# user mng section #
  //####################
  setUser: function(state, payload) {
    state.user = payload;
  },
  setError: function(state, payload) {
    state.error = payload;
  },
};
