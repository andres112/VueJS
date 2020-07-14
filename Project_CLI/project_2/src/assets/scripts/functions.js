import firebase from 'firebase/app' // Import firebase 

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
  checkImage(image) {
    return image == null
      ? "https://www.cybercomplaint.in/assets/img/mailbox/NoImage.png"
      : image;
  },
  checkgender(gender) {
    return gender === "m" ? "👦" : gender === "f" ? "👧" : "😄";
  },
  getTimestamp(){
    return firebase.firestore.Timestamp.fromDate(new Date());
  },
  convertTime(timestamp){
    return timestamp.toLocaleString();
  }
};
