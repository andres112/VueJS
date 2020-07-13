export default class Player {
  name = "";
  gender = "m";
  color = "black";
  remoteId = "";
  constructor(id, name, gender, color, remoteId) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.color = color;
    this.remoteId = remoteId;
    this.pokemonList = new Array();
  }
}
