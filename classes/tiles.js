class Tiles {
  constructor(index, id, owner, ownerCity, biome) {





    this.id = id
    this.cityCenter = false
    //id of countyr
    this.owner = owner
    this.cultureOwner = owner
    //id of city
    this.city = ownerCity
    this.image = null
    this.biome = biome
    this.terrain = index
    this.improvements = []
    this.units = []
    this.isWorked = false
    this.citizen = null
    this.hasFog = true
    this.values = this.makeValues(index.index)
    this.resource = null

  }
  makeValues(terrain) {
    /*  0 deep water
 1 shallow water
 2 sand
 3 flood plain
 4 forest
 5 grassland
 6 plain
 7 hills
 8 mountain
 9 snow 
 farmBonusTerrain = [0,0,0,1,0,1,1,0,0,0]
 mineBonusTerrain = [0,0,0,1,0,1,1,2,2,1]
 */
    let rec = {}
    if (terrain == 0) {
      //deep water 
      rec.Food = 1
      rec.Production = 0
      rec.Trade = 1
      rec.Resource = -1

    } else if (terrain == 1) {
      //shallow water
      rec.Food = 1
      rec.Production = 0
      rec.Trade = 1
      rec.Resource = -1


    } else if (terrain == 2) {
      //sand
      rec.Food = 1
      rec.Production = 0
      rec.Trade = 2
      rec.Resource = -1

    } else if (terrain == 3) {
      //flood plain
      rec.Food = 3
      rec.Production = 0
      rec.Trade = 0
      rec.Resource = -1
    } else if (terrain == 4) {
      //forest
      rec.Food = 1
      rec.Production = 2
      rec.Trade = 0
      rec.Resource = -1

    } else if (terrain == 5) {
      //grassland
      rec.Food = 2
      rec.Production = 1
      rec.Trade = 0
      rec.Resource = -1
    } else if (terrain == 6) {
      //plain
      rec.Food = 1
      rec.Production = 1
      rec.Trade = 0
      rec.Resource = -1
    } else if (terrain == 7) {
      //hill
      rec.Food = 1
      rec.Production = 1
      rec.Trade = 0
      rec.Resource = -1
    } else if (terrain == 8) {
      //mountain
      rec.Food = 0
      rec.Production = 2
      rec.Trade = 0
      rec.Resource = -1
    } else if (terrain == 9) {
      //snow
      rec.Food = 1
      rec.Production = 0
      rec.Trade = 0
      rec.Resource = -1
    }

    return rec
  }
}


/* 
let rec = {}
if (terrain == 0) {
  //deep water 
  rec.Food = 1
  rec.Production = 0
  rec.Trade = 1
  rec.Resource = -1

} else if (terrain == 1) {
  //shallow water
  rec.Food = 1
  rec.Production = 0
  rec.Trade = 1
  if (Phaser.Math.Between(1, 100) > 90) {
    rec.Resource = 13
  } else {
    rec.Resource = -1
  }

} else if (terrain == 2) {
  //sand
  rec.Food = 1
  rec.Production = 0
  rec.Trade = 2
  if (Phaser.Math.Between(1, 100) > 95) {
    rec.Resource = Phaser.Math.Between(0, 12)
  } else {
    rec.Resource = -1
  }
} else if (terrain == 3) {
  //flood plain
  rec.Food = 3
  rec.Production = 0
  rec.Trade = 0
  if (Phaser.Math.Between(1, 100) > 95) {
    rec.Resource = Phaser.Math.Between(0, 12)
  } else {
    rec.Resource = -1
  }
} else if (terrain == 4) {
  //forest
  rec.Food = 1
  rec.Production = 2
  rec.Trade = 0
  if (Phaser.Math.Between(1, 100) > 95) {
    rec.Resource = Phaser.Math.Between(0, 12)
  } else {
    rec.Resource = -1
  }

} else if (terrain == 5) {
  //grassland
  rec.Food = 2
  rec.Production = 1
  rec.Trade = 0
  if (Phaser.Math.Between(1, 100) > 95) {
    rec.Resource = Phaser.Math.Between(0, 12)
  } else {
    rec.Resource = -1
  }
} else if (terrain == 6) {
  //plain
  rec.Food = 1
  rec.Production = 1
  rec.Trade = 0
  if (Phaser.Math.Between(1, 100) > 95) {
    rec.Resource = Phaser.Math.Between(0, 12)
  } else {
    rec.Resource = -1
  }
} else if (terrain == 7) {
  //hill
  rec.Food = 1
  rec.Production = 1
  rec.Trade = 0
  if (Phaser.Math.Between(1, 100) > 95) {
    rec.Resource = Phaser.Math.Between(0, 12)
  } else {
    rec.Resource = -1
  }
} else if (terrain == 8) {
  //mountain
  rec.Food = 0
  rec.Production = 2
  rec.Trade = 0
  if (Phaser.Math.Between(1, 100) > 95) {
    rec.Resource = Phaser.Math.Between(0, 12)
  } else {
    rec.Resource = -1
  }
} else if (terrain == 9) {
  //snow
  rec.Food = 1
  rec.Production = 0
  rec.Trade = 0
  if (Phaser.Math.Between(1, 100) > 95) {
    rec.Resource = Phaser.Math.Between(0, 12)
  } else {
    rec.Resource = -1
  }
}

 */