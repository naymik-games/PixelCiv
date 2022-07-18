class Country {
  constructor(capital, color, id, civ) {
    this.capital = capital
    this.trade = 10
    this.production = 0
    this.culture = 10
    this.strength = 10
    this.food = 10
    this.treasuryPercent = 20
    this.sciencePercent = 40
    this.entertainmentPercent = 40
    this.treasuryBox = 0
    this.scienceBox = 0
    this.entertainmentBox = 0
    this.currentResearch = null
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