
export default class Player {    
    name = "";
    gender = "m";
    colorTeam = "black";
    constructor(id, name, gender, color){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.colorTeam = color;
        this.pokemonList = new Array()
    }
}
