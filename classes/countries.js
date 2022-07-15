class Country {
  constructor(capital, color, id, civ) {
    this.capital = capital
    this.trade = 10
    this.production = 0
    this.happiness = 10
    this.strength = 10
    this.food = 10
    this.techAge = 0
    this.civ = civ
    this.color = color
    this.id = id
    this.cities = []
    this.units = []
    this.population = 1

    this.techs = this.setStartingTech()
  }

  setStartingTech() {
    var tempTech = []

    for (let i = 0; i < civs[this.civ].abilities.length; i++) {
      const element = civs[this.civ].abilities[i];
      tempTech.push(abilities[element].freeTech)

    }

    return tempTech
  }






}