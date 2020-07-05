export default {
  getRandomPokemonList(pokemons, q) {
    let pokemonList = [];
    let temporal = [...pokemons] // copy pokemons list
    for (let i = 0; i < q; i++) {
      let item = Math.floor(Math.random() * temporal.length);
      pokemonList.push(temporal[item]); 
      temporal.splice(item, 1);     
    }
    return pokemonList[Symbol.iterator]();
  },
  checkgender(gender) {
    return gender === "m" ? "👦" : gender === "f" ? "👧" : "😄";
  },
};
