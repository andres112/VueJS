export default{
    getRandomPokemonList(pokemons, q){
        let pokemonList = [];
        for(let i=0; i< q; i++)
            pokemonList.push(pokemons[Math.floor(Math.random() * pokemons.length)]);
        return pokemonList[Symbol.iterator]();;
    }
}