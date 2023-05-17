function getPosition(row, column) {
  let posX = gameOptions.offsetX + gameOptions.tileSize * column + gameOptions.tileSize / 2;
  let posY = gameOptions.offsetY + gameOptions.tileSize * row + gameOptions.tileSize / 2
  return { x: posX, y: posY }
}

function isConnectedOwner(row, column) {
  var neighbors = this.getValid8Neighbors(row, column)
  // console.log(neighbors)
  for (let i = 0; i < neighbors.length; i++) {
    const neighbor = neighbors[i];
    /*  console.log(this.groundLayerData[neighbor.row][neighbor.column]) */
    if (groundLayerData[neighbor.row][neighbor.column].explored && groundLayerData[neighbor.row][neighbor.column].owner == gameData.currentPlayer) {
      return true
    }
  }
  return false
}
function isConnected(row, column) {
  var neighbors = this.getValid8Neighbors(row, column)
  for (let i = 0; i < neighbors.length; i++) {
    const neighbor = neighbors[i];
    if (groundLayerData[neighbor.row][neighbor.column].explored) {
      return true
    }
  }
  return false
}
function getRandomUnexploredNeighbors(row, column) {
  var tiles = getUnexploredNeighbors(row, column)
  if (tiles) {
    return tiles[Phaser.Math.Between(0, tiles.length - 1)]
  }
}
function getUnexploredNeighbors(row, column) {
  var temp = []
  for (let i = 0; i < neighbor8Coords.length; i++) {
    const nTile = neighbor8Coords[i];
    if (validPick(row + nTile[0], column + nTile[1]) && !groundLayerData[row + nTile[0]][column + nTile[1]].explored) {
      temp.push({ row: row + nTile[0], column: column + nTile[1] })
    }
  }
  return temp
}
function getRandomNeighbor(row, column) {
  var neighbors = this.getValid4Neighbors(row, column)
  return neighbors[Phaser.Math.Between(0, neighbors.length - 1)]
}
function getValid4Neighbors(row, column) {
  var temp = []
  for (let i = 0; i < neighbor4Coords.length; i++) {
    const nTile = neighbor4Coords[i];
    if (this.validPick(row + nTile[0], column + nTile[1])) {
      temp.push({ row: row + nTile[0], column: column + nTile[1] })
    }
  }
  return temp
}
function getValid8Neighbors(row, column) {
  var temp = []
  for (let i = 0; i < neighbor8Coords.length; i++) {
    const nTile = neighbor8Coords[i];
    if (validPick(row + nTile[0], column + nTile[1])) {
      temp.push({ row: row + nTile[0], column: column + nTile[1] })
    }
  }
  return temp
}


function getRandomGrassTiles(owner) {
  var tiles = getGrassTiles(owner)
  if (tiles) {
    return tiles[Phaser.Math.Between(0, tiles.length - 1)]
  }
}
function getGrassTiles(owner) {
  var temp = []
  for (let i = 0; i < gameOptions.rows; i++) {
    for (let j = 0; j < gameOptions.columns; j++) {
      if (improvementLayerData[i][j] == null && groundLayerData[i][j].owner == owner && groundLayerData[i][j].frame == GRASS) {
        temp.push({ row: i, column: j })
      }
    }
  }
  return temp
}
function checkRestrictions(index) {
  if (actionData[index].requires != null) {
    return true
  } else {
    return true
  }
}
function checkRequirements(index) {
  //true means ok to build
  if (actionData[index].requires != null) {
    var requires = actionData[index].requires
    for (let i = 0; i < requires.length; i++) {
      const requirement = requires[i];
      if (playerArray[gameData.currentPlayer].techs.indexOf(requirement) == -1) {
        return false  //if the player techs don't include requirement, return false
      }
    }
    return true
  } else {
    return true
  }


}
function checkCost(index) {
  if (index == 'BUILD') {
    return true
  }
  if (index == 'NO') {
    return false
  }
  var cost = actionData[index].cost
  if (playerArray[gameData.currentPlayer].resources[0] < Math.abs(cost[0])) {
    return false
  }
  if (playerArray[gameData.currentPlayer].resources[1] < Math.abs(cost[1])) {
    return false
  }
  if (playerArray[gameData.currentPlayer].resources[2] < Math.abs(cost[2])) {
    return false
  }
  if (playerArray[gameData.currentPlayer].resources[3] < Math.abs(cost[3])) {
    return false
  }
  if (playerArray[gameData.currentPlayer].resources[4] < Math.abs(cost[4])) {
    return false
  }
  if (playerArray[gameData.currentPlayer].resources[5] < Math.abs(cost[5])) {
    return false
  }
  return true
}

function populationCalc() {
  console.log('Pop current player' + gameData.currentPlayer)
  var houses = countType(HOUSE)
  var bighouses = countType(BIGHOUSE)
  playerArray[gameData.currentPlayer].resources[0] += gameOptions.autopay + (houses * gameOptions.baseUnit) + ((bighouses * gameOptions.baseUnit) * 2)
}
function foodCalc() {
  var farms = countType(FARM)
  var pastures = countType(PASTURE)
  playerArray[gameData.currentPlayer].resources[1] += gameOptions.autopay + (pastures * gameOptions.baseUnit) + ((farms * gameOptions.baseUnit) * 2)
}
function lumberCalc() {
  var mills = countType(LUMBER)
  var camps = countType(LUMBERCAMP)
  playerArray[gameData.currentPlayer].resources[2] += (mills * gameOptions.baseUnit) * (2 + camps)
}
function oreCalc() {
  var mines = countType(MINE)
  playerArray[gameData.currentPlayer].resources[3] += (mines * gameOptions.baseUnit) * 2
}
function stoneCalc() {
  var quarries = countType(QUARRY)
  playerArray[gameData.currentPlayer].resources[4] += quarries * gameOptions.baseUnit
}
function goldCalc() {
  var gmines = countType(GOLDMINE)
  playerArray[gameData.currentPlayer].resources[5] += gmines * gameOptions.baseUnit
}
function checkResearch() {

  //console.log(playerArray[gameData.currentPlayer].currentTech)
  if (playerArray[gameData.currentPlayer].currentTech != null) {
    // console.log('date added' + playerArray[gameData.currentPlayer].currentTech.dayAdded + ' time required' + tech[playerArray[gameData.currentPlayer].currentTech.techIndex].days)

    if (playerArray[gameData.currentPlayer].currentTech.pointsProgress >= tech[playerArray[gameData.currentPlayer].currentTech.techIndex].points) {
      console.log('Done researching')
      // playerArray[gameData.currentPlayer].techs.push(playerArray[gameData.currentPlayer].currentTech.techIndex)
      // playerArray[gameData.currentPlayer].currentTech = null
      return true
      //
    } else {
      return false
    }
  } else {
    return false
  }
}
function techDaysTillComplete() {
  if (playerArray[gameData.currentPlayer].currentTech != null) {
    // console.log('date added' + playerArray[gameData.currentPlayer].currentTech.dayAdded + ' time required' + tech[playerArray[gameData.currentPlayer].currentTech.techIndex].days)
    var left = tech[playerArray[gameData.currentPlayer].currentTech.techIndex].points - playerArray[gameData.currentPlayer].currentTech.pointsProgress
    var days = Math.ceil(left / playerArray[gameData.currentPlayer].resources[0])
    // return (playerArray[gameData.currentPlayer].currentTech.dayAdded + tech[playerArray[gameData.currentPlayer].currentTech.techIndex].days) - gameData.day
    return days

  } else {
    return 0
  }
}
function highlightAllBorders() {
  for (let i = 0; i < playerArray.length; i++) {
    border(i)
  }
}
function border(owner) {

  for (let i = 0; i < gameOptions.rows; i++) {
    for (let j = 0; j < gameOptions.columns; j++) {
      if (groundLayerData[i][j] != null) {
        if (groundLayerData[i][j].owner == owner) {
          var num = getBorderNumber(i, j, owner)
          if (num < 15) {
            groundLayerData[i][j].border = true
          } else {
            groundLayerData[i][j].border = false
          }

          borderArray[i][j].setFrame(num).setTint(staticPlayerData[playerArray[owner].id].color)
        }
      }


    }
  }

}
function getBorderNumber(row, column, owner) {
  var total = 0
  //left
  if (validPick(row, column - 1)) {
    if (groundLayerData[row][column - 1].owner == owner) {
      total += 2
    }
  }
  //top
  if (validPick(row - 1, column)) {
    if (groundLayerData[row - 1][column].owner == owner) {
      total += 1
    }
  }
  //right
  if (validPick(row, column + 1)) {
    if (groundLayerData[row][column + 1].owner == owner) {
      total += 4
    }
  }
  //bottom
  if (validPick(row + 1, column,)) {
    if (groundLayerData[row + 1][column].owner == owner) {
      total += 8
    }
  }
  return total
}
function countType(tile) {
  var count = 0
  for (let i = 0; i < gameOptions.rows; i++) {
    for (let j = 0; j < gameOptions.columns; j++) {
      if (improvementLayerData[i][j] != null) {
        if (improvementLayerData[i][j].id == tile && improvementLayerData[i][j].owner == gameData.currentPlayer) {
          count++
        }
      }


    }
  }
  return count
}
function countImprovements(owner) {
  var count = 0
  for (let i = 0; i < gameOptions.rows; i++) {
    for (let j = 0; j < gameOptions.columns; j++) {
      if (improvementLayerData[i][j] != null) {
        if (improvementLayerData[i][j].owner == owner) {
          count++
        }
      }


    }
  }
  return count
}
function ownerTileCount(owner) {
  var count = 0
  for (let i = 0; i < gameOptions.rows; i++) {
    for (let j = 0; j < gameOptions.columns; j++) {

      if (groundLayerData[i][j].owner == owner) {
        count++
      }
    }
  }
  return count
}
function validPick(row, column) {
  return row >= 0 && row < gameOptions.rows && column >= 0 && column < gameOptions.columns && map[row] != undefined && map[row][column] != undefined
}
function isSameTile(tile1, tile2) {
  return tile1.row == tile2.row && tile1.column == tile2.column
}
function areNext(tile1, tile2) {
  return (Math.abs(tile1.column - tile2.column) == 1 && tile1.row - tile2.row == 0) || (Math.abs(tile1.row - tile2.row) == 1 && tile1.column - tile2.column == 0);
}
function pathCost(path) {
  temp = 0
  for (let i = 0; i < path.length; i++) {
    const point = path[i];
    temp += getCost(point.y, point.x)
  }
  return temp
}
function getCost(row, column) {
  var index = map[row][column]
  return groundStaticData[index].cost
}
function weighted_random(items, weights) {
  let randomArray = [];
  items.forEach((item, index) => {
    var clone = Array(weights[index]).fill(item);
    randomArray.push(...clone);
  });

  return randomArray[~~(Math.random() * randomArray.length)]
}

function deductCost(type) {
  playerArray[gameData.currentPlayer].resources[0] += actionData[type].cost[0]
  playerArray[gameData.currentPlayer].resources[1] += actionData[type].cost[1]
  playerArray[gameData.currentPlayer].resources[2] += actionData[type].cost[2]
  playerArray[gameData.currentPlayer].resources[3] += actionData[type].cost[3]
  playerArray[gameData.currentPlayer].resources[4] += actionData[type].cost[4]
  playerArray[gameData.currentPlayer].resources[5] += actionData[type].cost[5]

}
function addGain(type) {

  playerArray[gameData.currentPlayer].resources[0] += actionData[type].gain[0]
  playerArray[gameData.currentPlayer].resources[1] += actionData[type].gain[1]
  playerArray[gameData.currentPlayer].resources[2] += actionData[type].gain[2]
  playerArray[gameData.currentPlayer].resources[3] += actionData[type].gain[3]
  playerArray[gameData.currentPlayer].resources[4] += actionData[type].gain[4]
  playerArray[gameData.currentPlayer].resources[5] += actionData[type].gain[5]
}