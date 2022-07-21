class City {
  constructor(capital, color, cId, id, civ) {
    this.countryID = cId
    this.name = civs[civ].cityNames[id]
    this.cityCenter = capital
    this.trade = 0
    this.production = 0
    this.culture = 5
    this.strength = 0
    this.food = 0 //temp set back to zero
    this.foodStorage = 30
    this.color = color
    this.id = id
    this.tiles = [capital]
    this.tilesCulture = []
    this.citizens = []
    this.improvements = []
    this.units = []
    this.maintenance = 0
    this.population = 1
    this.size = 1
    this.currentUnitProduction = null
    this.currentImprovementProduction = null
    this.citizenIndexCount = 0
  }



}

class Citizen {
  constructor(owner, city, tile, index) {
    this.index = index
    this.owner = owner
    this.city = city
    this.tile = tile
    this.state = 1
    this.isSpecialist = false

  }

}