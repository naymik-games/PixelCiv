class Unit {
  constructor(type, tile, turnAdded, complete, placed, owner, city) {
    theGame.countries[owner].unitIndex++
    this.id = type
    this.owner = owner
    this.city = city
    this.day = 1
    this.age = 0
    this.index = theGame.countries[owner].unitIndex
    this.tile = tile
    this.turnAdded = turnAdded
    this.complete = complete
    this.currentLocation = null
    this.placed = placed
    this.performingAction = false
    this.currentAction = null
    this.isMoving = false
    this.isAutoWork = false
    this.path = null
    this.dayPlaced = null
    this.tile = null

  }




}