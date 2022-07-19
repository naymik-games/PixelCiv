function getUnitsByCity(owner, city) {
  var results = []

  for (let i = 0; i < theGame.countries[owner].units.length; i++) {
    const element = theGame.countries[owner].units[i];
    if (element['city'] == city) {
      results.push(element)
    }

  }
  return results
}

function getBaseFood(owner, city) {
  var food = 0
  for (let i = 0; i < theGame.countries[owner].cities[city].tiles.length; i++) {
    //{x: 4, y: 3}
    const tile = theGame.countries[owner].cities[city].tiles[i];

    food += theGame.tileData[tile.y][tile.x].values.Food
    food += getTileImprovemntFood(tile)
    food += getTileBonusFood(tile)
  }
  return food
}
function getTileImprovemntFood(tile) {
  let bonusFood = 0
  if (theGame.tileData[tile.y][tile.x].improvements.length == 0) {
    return bonusFood
  } else {
    for (let i = 0; i < theGame.tileData[tile.y][tile.x].improvements.length; i++) {
      const improvement = theGame.tileData[tile.y][tile.x].improvements[i];
      if (improvement == 0) {
        bonusFood += farmBonusTerrain[theGame.tileData[tile.y][tile.x].terrain.index]
      }
    }

    return bonusFood
  }




}
function getTileBonusFood(tile) {
  let bonusFood = 0
  if (theGame.tileData[tile.y][tile.x].values.Resource == -1) {
    return bonusFood
  } else {
    bonusFood = resources[theGame.tileData[tile.y][tile.x].values.Resource].bonus.f

    return bonusFood
  }
}




function getBaseProduction(owner, city) {
  var production = 0
  for (let i = 0; i < theGame.countries[owner].cities[city].tiles.length; i++) {
    //{x: 4, y: 3}
    const tile = theGame.countries[owner].cities[city].tiles[i];
    production += theGame.tileData[tile.y][tile.x].values.Production
    production += getTileImprovemntProduction(tile)
    production += getTileBonusProduction(tile)

  }
  return production
}
function getTileImprovemntProduction(tile) {
  let bonusProd = 0
  if (theGame.tileData[tile.y][tile.x].improvements.length == 0) {
    return bonusProd
  } else {
    for (let i = 0; i < theGame.tileData[tile.y][tile.x].improvements.length; i++) {
      const improvement = theGame.tileData[tile.y][tile.x].improvements[i];
      if (improvement == 1) {
        bonusProd += mineBonusTerrain[theGame.tileData[tile.y][tile.x].terrain.index]
      }
    }

    return bonusProd
  }

}


function getTileBonusProduction(tile) {
  let bonusProd = 0
  if (theGame.tileData[tile.y][tile.x].values.Resource == -1) {
    return bonusProd
  } else {
    bonusProd = resources[theGame.tileData[tile.y][tile.x].values.Resource].bonus.p

    return bonusProd
  }
}



function getBaseTrade(owner, city) {
  var trade = 0
  for (let i = 0; i < theGame.countries[owner].cities[city].tiles.length; i++) {
    //{x: 4, y: 3}
    const tile = theGame.countries[owner].cities[city].tiles[i];
    trade += theGame.tileData[tile.y][tile.x].values.Trade
    trade += getTileBonusTrade(tile)

  }
  return trade
}
function getTileBonusTrade(tile) {
  let bonusTrade = 0
  if (theGame.tileData[tile.y][tile.x].values.Resource == -1) {
    return bonusTrade
  } else {
    bonusTrade = resources[theGame.tileData[tile.y][tile.x].values.Resource].bonus.t

    return bonusTrade
  }
}
function getRandomCityTile(owner, city) {
  return theGame.countries[owner].cities[city].tiles[2]
}


function getCityTiles(owner, city) {
  var tiles = []
  theGame.tileData.forEach(function (tile) {
    if (tile.owner == owner && tile.city == city)
      tiles.push(tile)
  })
  return tiles
}

function checkWork(unit) {
  console.log('checking')
  if (unit.currentAction == 0 || unit.currentAction == 1) {
    if (theGame.day - unit.dayPlaced == unitInfo[unit.id].workTime) {
      console.log('land ready')
      if (unit.currentAction == 0) {
        unit.currentAction = null
        unit.performingAction = false
        return 'farm'
      } else if (unit.currentAction == 1) {
        unit.currentAction = null
        unit.performingAction = false
        return 'mine'
      }



      // console.log(data[this.tile.y][this.tile.x])
      ////data[this.tile.y][this.tile.x].owner = country
      //data[this.tile.y][this.tile.x].city = city
      //theCity.tiles.push(this.tile)
    }
  }
  return null
}

function getUnitsDetailsOnTile(tileXY) {
  var chess = gameBoard.tileXYToChessArray(tileXY.x, tileXY.y)
  var results = []
  for (let i = 0; i < chess.length; i++) {
    const thing = chess[i];
    if (thing.chessType == 'unit')
      results.push({ unitIndex: thing.index, owner: thing.owner, city: thing.city })
  }
  return results
}

function getUnitsOnTile(tileXY) {
  var chess = gameBoard.tileXYToChessArray(tileXY.x, tileXY.y)
  var results = []
  for (let i = 0; i < chess.length; i++) {
    const thing = chess[i];
    if (thing.chessType == 'unit')
      results.push(getUnitByIndex(thing.owner, thing.index))
  }
  return results
}


function getUnitByIndex(owner, index) {
  //myArray.filter(x => x.id === '45');
  let impr = theGame.countries[owner].units.filter(x => x.index === index);
  return impr[0]
}



function setUnitCurrentLocationByIndex(owner, unitIndex, tileXY) {
  var unit = this.getUnitByIndex(owner, unitIndex)
  unit.currentLocation = tileXY
}

function settleNewCity(owner, tile, unit, chess, cityID) {
  console.log('settle' + tile.x)
  theGame.countries[owner].cities.push(new City(tile, theGame.countries[owner].color, theGame.countries[owner].id, cityID, theGame.countries[owner].civ))
  console.log(theGame.countries[owner].cities)
  // chess.setAlpha(0)
}
function settleFirstCity(owner, tile, unit, chess, cityID) {
  console.log('settle' + tile.x)
  theGame.countries[owner].cities.push(new City(tile, theGame.countries[owner].color, theGame.countries[owner].id, cityID, theGame.countries[owner].civ))
  console.log(theGame.countries[owner].cities)
  // chess.setAlpha(0)
}



function getChessForUnitIndexAtTile(index, tile) {
  var chess = gameBoard.tileXYToChessArray(tile.x, tile.y)
  for (let i = 0; i < chess.length; i++) {
    const element = chess[i];
    if (element.index == index) {
      return element
    }
  }
}



function addTile(x, y, owner, city) {
  theGame.tileData[y][x].owner = owner
  theGame.tileData[y][x].city = city
  theGame.countries[owner].cities[city].tiles.push({ x: x, y: y })
}



function removeFog(tile) {
  var chess = gameBoard.tileXYZToChess(tile.x, tile.y, 10);
  gameBoard.removeChess(chess, null, null, null, true)
  theGame.tileData[tile.y][tile.x].hasFog = false
}



/****************************************************************************
 ...
****************************************************************************/
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**************************************************************************
...
**************************************************************************/
function to_title_case(str) {
  return str.replace(/\w\S*/g,
    function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}



function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
function placeResources() {
  for (let i = 0; i < resourcePicker.length; i++) {
    var done = false
    var rec = resourcePicker.pop()
    while (!done) {
      var x = Phaser.Math.Between(2, theGame.width - 2)
      var y = Phaser.Math.Between(2, theGame.height - 2)
      if (rec == 2) {
        if (theGame.tileData[y][x].terrain.index == 1 && theGame.tileData[y][x].resource == null) {
          done = true
          theGame.tileData[y][x].resource = rec

        }
      } else if (rec == 13) {
        if (theGame.tileData[y][x].terrain.index == 7 && theGame.tileData[y][x].terrain.index == 8 && theGame.tileData[y][x].resource == null) {
          done = true
          theGame.tileData[y][x].resource = rec

        }
      } else {
        if (theGame.tileData[y][x].terrain.index != 1 && theGame.tileData[y][x].terrain.index != 0 && theGame.tileData[y][x].resource == null) {
          done = true
          theGame.tileData[y][x].resource = rec

        }
      }

    }
  }
}
 /*
theGame.tileData[tileXY.y][tileXY.x].terrain.index
0 deep water
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