class City {
  constructor(capital, color, cId, id, civ) {
    this.countryID = cId
    this.name = cityNames[civ][id]
    this.cityCenter = capital
    this.trade = 10
    this.production = 10
    this.happiness = 10
    this.strength = 10
    this.food = 10
    this.foodStorage = 30
    this.color = color
    this.id = id
    this.tiles = [capital]
    this.improvements = []
    this.units = []
    this.maintenance = 5
    this.population = 1
    this.size = 1
  }



}