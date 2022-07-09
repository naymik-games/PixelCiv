class Unit {
  constructor(type, tile, turnAdded, complete, placed, index) {
    this.id = type
    this.day = 1
    this.age = 0
    this.index = index
    this.tile = tile
    this.turnAdded = turnAdded
    this.complete = complete
    this.currentLocation = null
    this.placed = placed
    this.performingAction = false
    this.currentAction = null
    this.dayPlaced = null
    this.tile = null

  }
  placeUnit(day, tile) {
    this.placed = true
    this.dayPlaced = day
    this.currentLocation = tile
  }
  checkWork(day, country, city, data, theCity) {
    console.log('checking')
    if (this.currentAction == 0 || this.currentAction == 1) {
      if (day - this.dayPlaced == unitInfo[this.id].workTime) {
        console.log('land ready')
        // console.log(data[this.tile.y][this.tile.x])
        data[this.tile.y][this.tile.x].owner = country
        data[this.tile.y][this.tile.x].city = city
        theCity.tiles.push(this.tile)
      }
    }

  }


}