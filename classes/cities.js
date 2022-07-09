class City {
  constructor(capital, color, cId, id) {
    this.countryID = cId
    this.name = cityNames[cId][id]
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
  getTile(row, col) {
    for (let i = 0; i < this.tiles; i++) {
      const element = this.tiles[i];


    }
  }
  getRandomCityTile() {
    return this.tiles[2]
  }
  getBaseFood() {
    var food = 0
    for (let i = 0; i < this.tiles.length; i++) {
      //{x: 4, y: 3}
      const tile = this.tiles[i];

      food += theGame.tileData[tile.y][tile.x].resources.Food

    }
    return food
  }
  //var imp = { tileID: tileid, id: type, tile: tile, turnAdded: this.day, complete: complete }
  getBonusFood() {
    let bonusFood = 0
    for (let i = 0; i < this.improvements.length; i++) {
      const improvement = this.improvements[i]
      if (improvement.complete) {
        if (improvement.id == 0) {
          bonusFood += improvementInfo[improvement.id].foodBonus
        }
      }
    }
    return bonusFood
  }
  getBaseProduction() {
    var production = 0
    for (let i = 0; i < this.tiles.length; i++) {
      //{x: 4, y: 3}
      const tile = this.tiles[i];
      production += theGame.tileData[tile.y][tile.x].resources.Production
      // production += data[tile.y][tile.x].resources.Oil
      // production += data[tile.y][tile.x].resources.Coal
      //  production += data[tile.y][tile.x].resources.Stone
      //  production += data[tile.y][tile.x].resources.Wood
      //  production += data[tile.y][tile.x].resources.Iron
      //  production += data[tile.y][tile.x].resources.Gold
    }
    return production
  }
  getBaseTrade() {
    var trade = 0
    for (let i = 0; i < this.tiles.length; i++) {
      //{x: 4, y: 3}
      const tile = this.tiles[i];
      trade += theGame.tileData[tile.y][tile.x].resources.Trade
      //  trade += data[tile.y][tile.x].resources.Oil
      //  trade += data[tile.y][tile.x].resources.Coal
      //   trade += data[tile.y][tile.x].resources.Stone
      //  trade += data[tile.y][tile.x].resources.Wood
      //  trade += data[tile.y][tile.x].resources.Iron
      //  trade += data[tile.y][tile.x].resources.Gold
    }
    return trade
  }
}