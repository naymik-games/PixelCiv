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

    food += theGame.tileData[tile.y][tile.x].resources.Food

  }
  return food
}
function getBonusFood(owner, city) {
  let bonusFood = 0
  for (let i = 0; i < theGame.countries[owner].cities[city].improvements.length; i++) {
    const improvement = theGame.countries[owner].cities[city].improvements[i]
    if (improvement.complete) {
      if (improvement.id == 0) {
        bonusFood += improvementInfo[improvement.id].foodBonus
      }
    }
  }
  return bonusFood
}

function getBaseProduction(owner, city) {
  var production = 0
  for (let i = 0; i < theGame.countries[owner].cities[city].tiles.length; i++) {
    //{x: 4, y: 3}
    const tile = theGame.countries[owner].cities[city].tiles[i];
    production += theGame.tileData[tile.y][tile.x].resources.Production
    // production += data[tile.y][tile.x].resources.Oil
    // production += data[tile.y][tile.x].resources.Coal
    //  production += data[tile.y][tile.x].resources.Stone
    //  production += data[tile.y][tile.x].resources.Wood
    //  production += data[tile.y][tile.x].resources.Iron
    //  production += data[tile.y][tile.x].resources.Gold
  }
  return production
}
function getBaseTrade(owner, city) {
  var trade = 0
  for (let i = 0; i < theGame.countries[owner].cities[city].tiles.length; i++) {
    //{x: 4, y: 3}
    const tile = theGame.countries[owner].cities[city].tiles[i];
    trade += theGame.tileData[tile.y][tile.x].resources.Trade
    //  trade += data[tile.y][tile.x].resources.Oil
    //  trade += data[tile.y][tile.x].resources.Coal
    //   trade += data[tile.y][tile.x].resources.Stone
    //  trade += data[tile.y][tile.x].resources.Wood
    //  trade += data[tile.y][tile.x].resources.Iron
    //  trade += data[tile.y][tile.x].resources.Gold
  }
  return trade
}

function getRandomCityTile(owner, city) {
  return theGame.countries[owner].cities[city].tiles[2]
}




function checkWork(unit) {
  console.log('checking')
  if (unit.currentAction == 0 || unit.currentAction == 1) {
    if (theGame.day - unit.dayPlaced == unitInfo[unit.id].workTime) {
      console.log('land ready')
      if (unit.currentAction == 0) {
        return 'farm'
      } else if (unit.currentAction == 1) {
        return 'mine'
      }
      unit.currentAction = null
      unit.performingAction = false


      // console.log(data[this.tile.y][this.tile.x])
      ////data[this.tile.y][this.tile.x].owner = country
      //data[this.tile.y][this.tile.x].city = city
      //theCity.tiles.push(this.tile)
    }
  }
  return null
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
  theGame.countries[owner].cities.push(new City(tile, theGame.countries[owner].color, theGame.countries[owner].id, cityID))
  console.log(this.cities)
  // chess.setAlpha(0)
}




function addTile(x, y, owner, city) {
  theGame.tileData[y][x].owner = owner
  theGame.tileData[y][x].city = city
  theGame.countries[owner].cities[city].tiles.push({ x: x, y: y })
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