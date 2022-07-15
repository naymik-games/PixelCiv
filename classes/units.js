class Unit {
  constructor(type, tile, turnAdded, complete, placed, index, owner, city) {
    this.id = type
    this.owner = owner
    this.city = city
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
    this.isMoving = false
    this.path = null
    this.dayPlaced = null
    this.tile = null

  }




}