class Tiles {
  constructor(index, id, owner, ownerCity, biome) {





    this.id = id
    this.cityCenter = false
    //id of countyr
    this.owner = owner
    //id of city
    this.city = ownerCity
    this.image = null
    this.biome = biome
    this.terrain = index
    this.improvements = []
    this.units = []

    this.resources = this.makeResources(index.index)


  }
  makeResources(terrain) {
    /*  0 deep water
 1 shallow water
 2 sand
 3 flood plain
 4 forest
 5 grassland
 6 plain
 7 hills
 8 mountain
 9 snow */
    let rec = {}
    if (terrain == 0) {
      //deep water 
      rec.Food = 1
      rec.Production = 0
      rec.Trade = 0
      rec.Oil = 0
      rec.Coal = 0
      rec.Gold = 0
      rec.Wood = 0
      rec.Stone = 0
      rec.Iron = 0
    } else if (terrain == 1) {
      //shallow water
      rec.Food = 1
      rec.Production = 0
      rec.Trade = 1
      rec.Oil = Phaser.Math.Between(0, 2)
      rec.Coal = Phaser.Math.Between(0, 2)
      rec.Gold = 0
      rec.Wood = Phaser.Math.Between(1, 3)
      rec.Stone = Phaser.Math.Between(0, 2)
      rec.Iron = 0
    } else if (terrain == 2) {
      //sand
      rec.Food = 1
      rec.Production = 0
      rec.Trade = 2
      rec.Oil = 0
      rec.Coal = Phaser.Math.Between(0, 5)
      rec.Gold = Phaser.Math.Between(0, 5)
      rec.Wood = 0
      rec.Stone = Phaser.Math.Between(2, 5)
      rec.Iron = Phaser.Math.Between(1, 5)
    } else if (terrain == 3) {
      //flood plain
      rec.Food = 2
      rec.Production = 0
      rec.Trade = 0
      rec.Oil = 0
      rec.Coal = 0
      rec.Gold = 0
      rec.Wood = 0
      rec.Stone = 0
      rec.Iron = 0

    } else if (terrain == 4) {
      //forest
      rec.Food = 1
      rec.Production = 2
      rec.Trade = 0
      rec.Oil = 0
      rec.Coal = 0
      rec.Gold = 0
      rec.Wood = Phaser.Math.Between(2, 5)
      rec.Stone = 0
      rec.Iron = 0

    } else if (terrain == 5) {
      //grassland
      rec.Food = 1
      rec.Production = 1
      rec.Trade = 0
      rec.Oil = 0
      rec.Coal = 0
      rec.Gold = 0
      rec.Wood = 0
      rec.Stone = 0
      rec.Iron = 0

    } else if (terrain == 6) {
      //plain
      rec.Food = 1
      rec.Production = 1
      rec.Trade = 0
      rec.Oil = 0
      rec.Coal = 0
      rec.Gold = 0
      rec.Wood = 0
      rec.Stone = 0
      rec.Iron = 0

    } else if (terrain == 7) {
      //hill
      rec.Food = 1
      rec.Production = 1
      rec.Trade = 0
      rec.Oil = 0
      rec.Coal = 0
      rec.Gold = 0
      rec.Wood = 0
      rec.Stone = 0
      rec.Iron = 0

    } else if (terrain == 8) {
      //mountain
      rec.Food = 0
      rec.Production = Phaser.Math.Between(1, 2)
      rec.Trade = 0
      rec.Oil = 0
      rec.Coal = 0
      rec.Gold = 0
      rec.Wood = 0
      rec.Stone = 0
      rec.Iron = 0

    } else if (terrain == 9) {
      //snow
      rec.Food = 0
      rec.Production = 1
      rec.Trade = 0
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