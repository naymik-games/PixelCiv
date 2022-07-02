class Tiles {
  constructor(index, id, owner) {





    this.id = id
    this.capital = false

    this.owner = owner
    this.image = null

    this.terrain = index
    this.improvements = []

    this.resources = this.makeResources(index)


  }
  makeResources(terrain) {
    let rec = {}
    if (terrain == 0) {
      //water 
      rec.Food = Phaser.Math.Between(1, 3)
      rec.Production = Phaser.Math.Between(1, 2)
      rec.Trade = Phaser.Math.Between(1, 3)
      rec.Oil = Phaser.Math.Between(0, 3)
      rec.Coal = 0
      rec.Gold = 0
      rec.Wood = 0
      rec.Stone = 0
      rec.Iron = 0
    } else if (terrain == 1) {
      //grass
      rec.Food = Phaser.Math.Between(1, 5)
      rec.Production = Phaser.Math.Between(1, 3)
      rec.Trade = Phaser.Math.Between(1, 4)
      rec.Oil = Phaser.Math.Between(0, 2)
      rec.Coal = Phaser.Math.Between(0, 2)
      rec.Gold = 0
      rec.Wood = Phaser.Math.Between(1, 5)
      rec.Stone = Phaser.Math.Between(0, 2)
      rec.Iron = 0
    } else if (terrain == 2) {
      //rock
      rec.Food = 0
      rec.Production = Phaser.Math.Between(2, 5)
      rec.Trade = Phaser.Math.Between(2, 5)
      rec.Oil = 0
      rec.Coal = Phaser.Math.Between(0, 5)
      rec.Gold = Phaser.Math.Between(0, 5)
      rec.Wood = 0
      rec.Stone = Phaser.Math.Between(2, 5)
      rec.Iron = Phaser.Math.Between(1, 5)
    } else if (terrain == 3) {
      //capital
      rec.Food = Phaser.Math.Between(1, 3)
      rec.Production = Phaser.Math.Between(1, 3)
      rec.Trade = Phaser.Math.Between(1, 3)
      rec.Oil = 0
      rec.Coal = 0
      rec.Gold = 0
      rec.Wood = 0
      rec.Stone = 0
      rec.Iron = 0

    }
    return rec
  }
}