class Tiles {
  constructor(index, id, owner) {





    this.id = id
    this.capital = null

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
      rec.Fish = Phaser.Math.Between(1, 5)
      rec.Oil = Phaser.Math.Between(0, 3)
      rec.Coal = 0
      rec.Farm = 0
      rec.Wood = 0
      rec.Stone = 0
      rec.Iron = 0
    } else if (terrain == 1) {
      //grass
      rec.Fish = 0
      rec.Oil = Phaser.Math.Between(0, 2)
      rec.Coal = Phaser.Math.Between(0, 2)
      rec.Farm = Phaser.Math.Between(1, 5)
      rec.Wood = Phaser.Math.Between(1, 5)
      rec.Stone = Phaser.Math.Between(0, 2)
      rec.Iron = 0
    } else if (terrain == 2) {
      //rock
      rec.Fish = 0
      rec.Oil = 0
      rec.Coal = Phaser.Math.Between(1, 5)
      rec.Farm = 0
      rec.Wood = 0
      rec.Stone = Phaser.Math.Between(1, 5)
      rec.Iron = Phaser.Math.Between(1, 5)
    } else if (terrain == 3) {
      //capital
      rec.Fish = 0
      rec.Oil = 0
      rec.Coal = 0
      rec.Farm = 0
      rec.Wood = 0
      rec.Stone = 0
      rec.Iron = 0

    }
    return rec
  }
}