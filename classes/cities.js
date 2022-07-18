class City {
  constructor(capital, color, cId, id, civ) {
    this.countryID = cId
    this.name = civs[civ].cityNames[id]
    this.cityCenter = capital
    this.trade = 10
    this.production = 0
    this.culture = 10
    this.strength = 10
    this.food = 10
    this.foodStorage = 30
    this.color = color
    this.id = id
    this.tiles = [capital]
    this.improvements = []
    this.units = []
    this.maintenance = 0
    this.population = 1
    this.size = 1
    this.currentUnitProduction = null
  }



}