//AI EXPLORE ////////////////////////////////
function exploreAI(scene, owner) {
  if (Phaser.Math.Between(1, 10) <= gameOptions.aiExploreProbability) {
    //console.log('AI Explore ' + owner)
    var ne = getRandomBorderTile(owner)
    var tile = getRandomUnexploredNeighbors(ne.row, ne.column)
    if (tile) {
      if (checkCost('EXPLORE')) {
        scene.selectedTile = tile
        scene.selectedAction = 'EXPLORE'
        scene.build()
        // scene.exploreTile(tile.row, tile.column, owner)
      }

    }

  }

}
function getRandomBorderTile(owner) {
  var tiles = getBorderTiles(owner)
  if (tiles) {
    return tiles[Phaser.Math.Between(0, tiles.length - 1)]
  }
}
function getBorderTiles(owner) {
  var temp = []
  for (let i = 0; i < gameOptions.rows; i++) {
    for (let j = 0; j < gameOptions.columns; j++) {
      if (groundLayerData[i][j] != null) {
        if (groundLayerData[i][j].owner == owner && groundLayerData[i][j].border) {
          temp.push({ row: i, column: j })
        }
      }
    }
  }
  return temp
}
function getBorderTiles(owner) {
  var temp = []
  for (let i = 0; i < gameOptions.rows; i++) {
    for (let j = 0; j < gameOptions.columns; j++) {
      if (groundLayerData[i][j] != null) {
        if (groundLayerData[i][j].owner == owner && groundLayerData[i][j].border) {
          temp.push({ row: i, column: j })
        }
      }
    }
  }
  return temp
}



///////////////
//AI BUILD IMPROVEMENT ////////////////////////////////
function buildImprovementAI(scene, owner) {
  var tile = getRandomUnimprovedTiles(owner)
  //groundLayerData[tile.row][tile.column].frame
  //groundStaticData[tile.frame].type
  // console.log(groundStaticData[groundLayerData[tile.row][tile.column].frame].type)
  //console.log(menus[groundStaticData[groundLayerData[tile.row][tile.column].frame].type])
  var options = menus[groundStaticData[groundLayerData[tile.row][tile.column].frame].type]
  ///////////////////////////////////////////////////// THIS WORKS BUT NEEDS TO CHOOSE AN OPTION, NOT DO ALL ON A TILE ALSO NEED TO CHECK COST
  /*  for (let i = 0; i < options.length; i++) {
     const option = options[i];
     console.log(option.name)
     console.log(actionData[option.index])
     if (checkCost(option.index)) {
       console.log('AI can build')
       scene.selectedTile = tile
       scene.selectedAction = option.index
       scene.build()
 
     } else {
       console.log('AI cant afford')
     }
 
   } */
  //go through options randomly check the cost, if can build, build. if not, pick another randomly and try again
  var done = 0
  var amount = options.length * 2
  while (done == 0 && amount > 0) {
    var opt = options[Phaser.Math.Between(0, options.length - 1)]
    if (checkCost(opt.index) && checkRequirements(item.menuItem) && checkRestrictions(item.menuItem)) {
      console.log('AI can build ' + opt.name)
      scene.selectedTile = tile
      scene.selectedAction = opt.index
      scene.build()
      done = 1

    }
    amount--
  }








}
function getRandomUnimprovedTiles(owner) {
  var tiles = getUnimprovedTiles(owner)
  if (tiles) {
    return tiles[Phaser.Math.Between(0, tiles.length - 1)]
  }
}
function getUnimprovedTiles(owner) {
  var temp = []
  for (let i = 0; i < gameOptions.rows; i++) {
    for (let j = 0; j < gameOptions.columns; j++) {
      if (improvementLayerData[i][j] == null) {
        if (groundLayerData[i][j].owner == owner) {
          temp.push({ row: i, column: j })
        }
      }
    }
  }
  return temp
}
///////////////

//AI PICK FRUIT//////////////////////////////
function pickAI(scene, owner, type) {
  var tile = getRandomUnimprovedTilesType(owner, type)


  if (tile) {

    if (checkCost('PICKFRUIT')) {
      console.log('AI can build ' + 'CHOP')
      scene.selectedTile = tile
      scene.selectedAction = 'PICKFRUIT'
      scene.build()
    }
  }
}
//////////
//AI chop ////////////////////////////////
function chopAI(scene, owner, type) {
  var tile = getRandomUnimprovedTilesType(owner, type)


  if (tile) {

    if (checkCost('CHOP')) {
      console.log('AI can build ' + 'CHOP')
      scene.selectedTile = tile
      scene.selectedAction = 'CHOP'
      scene.build()
    }
  }
}
function getRandomUnimprovedTilesType(owner, type) {
  var tiles = getUnimprovedTilesType(owner, type)
  if (tiles) {
    return tiles[Phaser.Math.Between(0, tiles.length - 1)]
  }
}
function getUnimprovedTilesType(owner, type) {
  var temp = []
  for (let i = 0; i < gameOptions.rows; i++) {
    for (let j = 0; j < gameOptions.columns; j++) {
      if (improvementLayerData[i][j] == null) {
        if (groundLayerData[i][j].owner == owner && groundLayerData[i][j].frame == type) {
          temp.push({ row: i, column: j })
        }
      }
    }
  }
  return temp
}
///////////////