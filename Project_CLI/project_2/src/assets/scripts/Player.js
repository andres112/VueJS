export default class Player {
  name = "";
  gender = "m";
  color = "black";
  constructor(id, name, gender, color) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.color = color;
    this.pokemonList = new Array();
  }
}
