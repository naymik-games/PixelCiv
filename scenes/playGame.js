

class playGame extends Phaser.Scene {
  constructor() {
    super({
      key: 'playGame'
    });

  }

  preload() {
    this.load.scenePlugin({
      key: 'rexboardplugin',
      url: 'plugins/rexboard.min.js',
      sceneKey: 'rexBoard'
    });
    var url;

    url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpinchplugin.min.js';
    //'plugins/rexpinch.min.js'
    this.load.plugin('rexpinchplugin', url, true);

  }
  create() {

    this.showFog = true
    this.nationStarted = false
    this.messages = []
    this.citizenContainer = this.add.container()
    //create new game
    if (gameLoad == 'new') {
      theGame = new GAME(gameWidth, gameHeight, gamePlayers, gameSeed, playerCiv)
      civIndex.splice(playerCiv, 1)
      shuffleArray(civIndex)
      // console.log(civIndex)
      // tileData = new Array(theGame.height).fill(null).map(() => new Array(theGame.width).fill(null));
    } else {
      theGame = gameData
      console.log(theGame)
    }

    //console.log(theGame)
    //this.day = 1
    this.currentPlayer = 0

    this.currentCity = 0




    //create new map
    if (gameLoad == 'new') {
      this.map = new Map(theGame.width, theGame.height, theGame.gameSeed)
    }


    //create new board
    gameBoard = this.rexBoard.add.board({
      //grid: getHexagonGrid(this),
      grid: getQuadGrid(this),
      width: theGame.width,
      height: theGame.height,
      dir: 4
    });
    this.pathFinder = this.rexBoard.add.pathFinder({
      occupiedTest: false,
      blockerTest: false,

      // ** cost **
      cost: 1,   // constant cost

      //costCallback: 
      // costCallbackScope: undefined,
      // cacheCost: true,

      pathMode: 10,  // A*
      // weight: 10,   // weight for A* searching mode
      // shuffleNeighbors: false,
    });

    //add tile images to board and make tile data
    gameBoard.forEachTileXY(function (tileXY, board) {
      var onwer = -1
      if (gameLoad == 'new') {
        var worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y)
        var obj = this.add.image(worldXY.x, worldXY.y, 'tiles', this.map.mapArray[tileXY.y][tileXY.x].index).setOrigin(.5, .75)
        //obj.chessType = 'terrain'
        //board.addChess(obj, tileXY.x, tileXY.y, 0, true);

        let id = tileXY.x + 20 * tileXY.y;
        // y = index / width;
        // x = index % width;
        theGame.tileData[tileXY.y][tileXY.x] = new Tiles(this.map.mapArray[tileXY.y][tileXY.x], id, onwer, onwer, this.map.mapArray[tileXY.y][tileXY.x].biome)
        if (theGame.tileData[tileXY.y][tileXY.x].values.Resource > -1) {
          // console.log(resources[theGame.tileData[tileXY.y][tileXY.x].values.Resource].name)
          var obj1 = this.add.image(0, 0, 'resources', theGame.tileData[tileXY.y][tileXY.x].values.Resource).setOrigin(.5, .75).setDepth(0).setAlpha(.9)
          board.addChess(obj1, tileXY.x, tileXY.y, RESOURCE, true)
        }
        /*   */
        if (this.showFog) {
          var obj1 = this.add.image(0, 0, 'fog').setOrigin(.5, .75).setDepth(10).setAlpha(.9)
          board.addChess(obj1, tileXY.x, tileXY.y, 10, true);
        }

      } else {
        var worldXY = board.tileXYToWorldXY(tileXY.x, tileXY.y)
        var obj = this.add.image(worldXY.x, worldXY.y, 'tiles', theGame.tileData[tileXY.y][tileXY.x].terrain.index).setOrigin(.5, .75)

        //board.addChess(obj, tileXY.x, tileXY.y, 0, true);
        // obj.chessType = 'terrain'
        if (theGame.tileData[tileXY.y][tileXY.x].cityCenter) {
          var obj = this.add.image(0, 0, 'cities', 0).setOrigin(.5, .75)
          gameBoard.addChess(obj, tileXY.x, tileXY.y, CITY, true);
        }
        if (theGame.tileData[tileXY.y][tileXY.x].values.Resource > -1) {
          var obj = this.add.image(0, 0, 'resources', theGame.tileData[tileXY.y][tileXY.x].values.Resource).setOrigin(.5, .75)
          gameBoard.addChess(obj, tileXY.x, tileXY.y, RESOURCE, true);
        }
        if (theGame.tileData[tileXY.y][tileXY.x].improvements.length > 0) {
          var obj = this.add.image(0, 0, 'tile_improvements', theGame.tileData[tileXY.y][tileXY.x].improvements[0]).setOrigin(.5, .75)
          gameBoard.addChess(obj, tileXY.x, tileXY.y, IMPROVEMENT, true);
        }
        if (theGame.tileData[tileXY.y][tileXY.x].hasFog) {
          var obj1 = this.add.image(0, 0, 'fog').setOrigin(.5, .75).setDepth(10).setAlpha(.9)
          board.addChess(obj1, tileXY.x, tileXY.y, 10, true);
        }
      }


    }, this);


    // console.log(theGame.tileData)


    if (gameLoad == 'new') {
      //get starting locations and create countries
      var startingPoints = this.getStartLcation(theGame.players)
      for (let i = 0; i < startingPoints.length; i++) {
        removeFog(startingPoints[i])

        if (i == 0) {
          //if player civ, add two units
          theGame.countries.push(new Country(null, colorArray[i], i, playerCiv))
          //unit one
          var uni = new Unit(1, startingPoints[i], theGame.day, true, false, theGame.unitIndex, i, 0)
          theGame.countries[i].units.push(uni)
          theGame.countries[i].units[0].currentLocation = startingPoints[i]
          theGame.tileData[startingPoints[i].y][startingPoints[i].x].units.push(theGame.countries[i].units[0].index)
          this.placeUnit(theGame.countries[i].units[0])
          theGame.unitIndex++
          //unit 2
          var neighborTileXY = gameBoard.getNeighborTileXY(startingPoints[i], 0)
          var uni = new Unit(0, neighborTileXY, theGame.day, true, false, theGame.unitIndex, i, 0)
          theGame.countries[i].units.push(uni)
          theGame.countries[i].units[1].currentLocation = neighborTileXY
          theGame.tileData[neighborTileXY.y][neighborTileXY.x].units.push(theGame.countries[i].units[1].index)
          this.placeUnit(theGame.countries[i].units[1])
        } else {
          //if AI civ, place city
          var aiCiv = civIndex.pop()
          theGame.countries.push(new Country(startingPoints[i], colorArray[i], i, aiCiv))
          var obj = this.add.image(0, 0, 'cities', 0).setOrigin(.5, .75)
          gameBoard.addChess(obj, startingPoints[i].x, startingPoints[i].y, CITY, true);
          theGame.countries[i].cities.push(new City(startingPoints[i], colorArray[i], i, 0, aiCiv))
          theGame.tileData[startingPoints[i].y][startingPoints[i].x].owner = i
          theGame.tileData[startingPoints[i].y][startingPoints[i].x].cultureOwner = i
          this.expandCountry(i)
        }


        this.removeFogLayerTwo(startingPoints[i])
        this.zoomToStart(startingPoints[i])
      }
      // console.log(theGame.countries)
      //initial border expansion
      // this.expandCountries()

    } else {
      //theGame.countries = gameData.countries
      for (let i = 0; i < theGame.countries.length; i++) {
        for (let u = 0; u < theGame.countries[i].units.length; u++) {
          const unit = theGame.countries[i].units[u]
          if (unit.complete) {
            console.log(unit)
            this.placeUnit(unit)
          }

        }

      }
      //loop through citites -> units and place chess for unit
    }




    //set up graphics
    this.graphicsP0 = this.add.graphics({ lineStyle: { width: 6, color: colorArray[0], alpha: .8 }, fillStyle: { color: colorArray[0] } });
    this.graphicsP1 = this.add.graphics({ lineStyle: { width: 6, color: colorArray[1], alpha: .8 }, fillStyle: { color: colorArray[1] } });
    this.graphicsP2 = this.add.graphics({ lineStyle: { width: 6, color: colorArray[2], alpha: .8 }, fillStyle: { color: colorArray[2] } });
    this.graphicsP3 = this.add.graphics({ lineStyle: { width: 6, color: colorArray[3], alpha: .8 }, fillStyle: { color: colorArray[3] } });
    this.graphicsP4 = this.add.graphics({ lineStyle: { width: 6, color: colorArray[4], alpha: .8 }, fillStyle: { color: colorArray[4] } });
    this.graphicsP5 = this.add.graphics({ lineStyle: { width: 6, color: colorArray[5], alpha: .8 }, fillStyle: { color: colorArray[5] } });
    this.graphicsP6 = this.add.graphics({ lineStyle: { width: 6, color: colorArray[5], alpha: .8 }, fillStyle: { color: colorArray[6] } });
    this.graphicsP7 = this.add.graphics({ lineStyle: { width: 6, color: colorArray[5], alpha: .8 }, fillStyle: { color: colorArray[7] } });
    this.graphicsP8 = this.add.graphics({ lineStyle: { width: 6, color: colorArray[5], alpha: .8 }, fillStyle: { color: colorArray[8] } });

    this.highlight = this.add.graphics({ lineStyle: { width: 2, color: 0xFFFF00, alpha: .8 } });
    //draw boorders around each country
    this.drawBorders()

    this.UI = this.scene.get('UI');
    this.Messages = this.scene.get('showMessages');


    //set up inputs
    this.selectedOwner = null
    this.selectedCity = null
    this.selectedTile = null
    this.selectedUnit = null
    this.selectedUnitChess = null
    this.moveUnit = false
    this.citizenSelect = false
    this.citizenChessSelected = null
    this.citizenSelected = null
    gameBoard.setInteractive({ useTouchZone: false })
    /* gameBoard.on('gameobjectdown', function (press, gameObject) {
      if (gameObject.name == 'citizen') {
        this.citizenSelect = true
        gameObject.setAlpha(.5)
        console.log(gameObject.name)
      }

    }) */
    gameBoard.on('tileup', function (pointer, tileXY) {
      if (pointer.upTime - pointer.downTime > 800) {
        this.longPress(tileXY)
        return
      }
    }, this)
    gameBoard.on('tiledown', function (pointer, tileXY) {
      if (this.citizenSelect) {
        console.log('tile city ' + theGame.tileData[tileXY.y][tileXY.x].city)
        console.log('cit city ' + this.citizenSelected.city)
        if (theGame.tileData[tileXY.y][tileXY.x].city == this.citizenSelected.city && !gameBoard.contains(tileXY.x, tileXY.y, 9) && !theGame.tileData[tileXY.y][tileXY.x].cityCenter) {
          console.log('new cit location')
          console.log('x: ' + tileXY.x + ', y: ' + tileXY.y)
          gameBoard.moveChess(this.citizenChessSelected, tileXY.x, tileXY.y, 9, true);
          //remove from tile
          theGame.tileData[this.citizenSelected.tile.y][this.citizenSelected.tile.x].isWorked = false
          theGame.tileData[this.citizenSelected.tile.y][this.citizenSelected.tile.x].citizen = null
          //add to tile
          theGame.tileData[tileXY.y][tileXY.x].isWorked = true
          theGame.tileData[tileXY.y][tileXY.x].citizen = this.citizenSelected.index
          this.citizenSelected.tile = { x: tileXY.x, y: tileXY.y }
          this.citizenSelect = false
          this.citizenChessSelected = null
          this.citizenSelected = null
        }

        return
      }
      /* if (pointer.upTime - pointer.downTime > 800) {
        this.longPress(tileXY)
        return
      } */

      console.log('x: ' + tileXY.x + ', y: ' + tileXY.y)

      console.log(theGame.tileData[tileXY.y][tileXY.x])
      if (this.moveUnit) {

        this.selectedUnitChess.pathFinder = this.rexBoard.add.pathFinder(this.selectedUnitChess, {
          cacheCost: false,
          costCallback: function (curTile, preTile, pathFinder) {
            var board = pathFinder.board;
            if (theGame.tileData[curTile.y][curTile.x].terrain.index == 1) {
              return pathFinder.BLOCKER;
            }
            var cost = 1;

            return cost;
          }
        });
        // this.pathFinder.setChess(this.selectedUnitChess);
        // var tileXYArrayTest = this.pathFinder.findArea(4);
        // console.log(tileXYArrayTest)
        var tileXYArray = this.selectedUnitChess.pathFinder.findPath(tileXY)
        //console.log(tileXYArray)
        var unit = getUnitByIndex(theGame.currentPlayer, this.selectedUnit)
        unit.path = tileXYArray
        unit.isMoving = true
        //console.log(unit)


        // this.moveToTile(tileXY)
        //console.log(this.selectedUnitChess.rexChess.tileXYZ)

        //this.selectedUnit.currentLocation = tileXY
        this.scene.stop('unitUI')
        this.selectedUnit = null
        this.selectedTile = null
        //this.selectedUnitChess.setAlpha(1)
        this.selectedUnitChess = null
        this.moveUnit = false
        this.highlight.clear();
        return
      }
      if (this.selectedUnit != null) {
        this.scene.stop('unitUI')
        this.selectedUnit = null
        this.selectedUnitChess.setAlpha(1)
        this.selectedUnitChess = null
      }

      //if enemy territory, do nothing
      if (theGame.tileData[tileXY.y][tileXY.x].owner > 0) {
        return
      }
      this.highlightTile(tileXY)
      //if human city center, show stats and build options
      if (theGame.tileData[tileXY.y][tileXY.x].owner == 0 && theGame.tileData[tileXY.y][tileXY.x].cityCenter) {
        this.selectedTile = tileXY
        this.currentCity = theGame.tileData[tileXY.y][tileXY.x].city
        console.log('city center' + JSON.stringify(theGame.countries[0].cities[this.currentCity].cityCenter))
        // console.log(theGame.countries[0].cities[theGame.tileData[tileXY.y][tileXY.x].city])
        this.UI.buildUnit.setAlpha(1)
        this.UI.build.setAlpha(1)
        this.UI.cityButton.setAlpha(1)
        this.UI.citizenButton.setAlpha(1)
        // this.makeCitizenLayer(tileXY)

        this.UI.setStatusLabels(this.selectedTile, 'city')
        this.UI.updatePop(this.selectedTile, 'city')
        this.UI.cityStatsVisibility('on')

        // this.citizenContainer.setAlpha(1)
      } else if (theGame.tileData[tileXY.y][tileXY.x].owner == 0 && this.UI.citizensVisible) {
        console.log('citizens visible')
        var chess = gameBoard.tileXYZToChess(tileXY.x, tileXY.y, 9);
        //console.log(chess)
        if (chess != undefined) {
          console.log('found citizen')
          this.citizenSelect = true
          this.citizenChessSelected = chess
          this.citizenSelected = getCitizenByID(chess.city, chess.index)
          console.log(this.citizenChessSelected)
          console.log(this.citizenSelected)
          chess.setAlpha(.5)
        }
      } else {
        //if owner territory or open, look for units

        if (this.nationStarted) {
          console.log('city center' + JSON.stringify(theGame.countries[0].cities[this.currentCity].cityCenter))
        }

        var chess = gameBoard.tileXYToChessArray(tileXY.x, tileXY.y)
        // console.log(chess)
        if (chess.length > 0) {

          //var units = getUnitsDetailsOnTile(tileXY)
          var units = getUnitsOnTile(tileXY)
          if (units.length > 0) {
            this.selectedTile = tileXY
            console.log(units.length + ' units found ')
            console.log(units)
            this.scene.launch('unitUI', { units: units, tile: tileXY, chess: chess })
            this.UI.build.setAlpha(0)
            this.UI.buildUnit.setAlpha(0)
            this.UI.cityButton.setAlpha(0)
            this.UI.citizenButton.setAlpha(0)


          }

        }


        this.UI.setStatusLabels(null, null, null)
        this.UI.updatePop(null, null, null)
        this.UI.cityStatsVisibility('off')
      }


    }, this)





    /*  gameBoard.on('gameobjectdown', function (pointer, gameObject) {
       console.log(gameObject)
     }) */


    gameBoard.setInteractive(true)
    this.selectMode = 'click'
    var dragScale = this.plugins.get('rexpinchplugin').add(this);
    this.cameras.main.zoom = 2
    var camera = this.cameras.main;
    dragScale
      .on('drag1', function (dragScale) {
        if (this.selectMode == 'drag') {
          var drag1Vector = dragScale.drag1Vector;
          camera.scrollX -= drag1Vector.x / camera.zoom;
          camera.scrollY -= drag1Vector.y / camera.zoom;
        }
      }, this)
      .on('pinch', function (dragScale) {
        if (this.selectMode == 'drag') {
          var scaleFactor = dragScale.scaleFactor;
          camera.zoom *= scaleFactor;
        }
      }, this)



    var cursors = this.input.keyboard.createCursorKeys();
    this.cameraController = new Phaser.Cameras.Controls.SmoothedKeyControl({
      camera: this.cameras.main,

      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),

      acceleration: 0.7,
      drag: 0.003,
      maxSpeed: 1
    });


    //zoom to player
    //this.zoomTo(0)

    //this.zoomToCity()
    //update UI
    //this.UI.setStatusLabels(this.selectedTile)
    //this.UI.updatePop(this.selectedTile)

    //var points = gameBoard.getGridPoints(5, 5)
    //console.log(points)
    //console.log(gameBoard)

    // initial save
    this.saveGame()



  }

  update(time, delta) {
    this.cameraController.update(delta);

    //var pointer = this.input.activePointer;
    // var out = gameBoard.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
    //this.print.setText(out.x + ',' + out.y);
  }
  setUpAutoPath(center) {

    this.selectedUnitChess.pathFinder = this.rexBoard.add.pathFinder(this.selectedUnitChess, {
      cacheCost: false,
      costCallback: function (curTile, preTile, pathFinder) {
        var board = pathFinder.board;
        if (theGame.tileData[curTile.y][curTile.x].terrain.index == 1) {
          return pathFinder.BLOCKER;
        }
        var cost = 1;

        return cost;
      }
    });

    var radius = 15.5
    var out = getTileRingOutline(center, radius)
    var rand = Phaser.Math.Between(0, out.length - 1)
    var dest = out[rand]
    var tileXYArray = this.selectedUnitChess.pathFinder.findPath(dest)
    console.log(tileXYArray)
    var unit = getUnitByIndex(theGame.currentPlayer, this.selectedUnit)
    unit.path = tileXYArray
    unit.isMoving = true
    console.log(unit)
    this.selectedUnit = null
    this.selectedTile = null
    this.selectedUnitChess.setAlpha(1)
    this.selectedUnitChess = null

  }
  makeCitizenLayer(tileXY) {

    var owner = theGame.tileData[tileXY.y][tileXY.x].owner
    var city = theGame.tileData[tileXY.y][tileXY.x].city
    for (let i = 0; i < theGame.countries[owner].cities[city].citizens.length; i++) {
      const citizen = theGame.countries[owner].cities[city].citizens[i];
      var worldXY = gameBoard.tileXYToWorldXY(citizen.tile.x, citizen.tile.y)
      console.log(citizen.tile)
      var citizenIcon = this.add.image(worldXY.x, worldXY.y, 'citizens', citizen.state).setScale(.5).setAlpha(0).setDepth(11).setInteractive();
      citizenIcon.name = 'citizen'
      citizenIcon.city = city
      citizenIcon.index = citizen.index
      // this.citizenContainer.add(citizenIcon)
      gameBoard.addChess(citizenIcon, citizen.tile.x, citizen.tile.y, 9, true);
    }
  }
  showCitizens() {
    var out = gameBoard.tileZToChessArray(9);
    for (let i = 0; i < out.length; i++) {
      const element = out[i];
      element.setAlpha(1)
    }
  }
  hideCitizens() {
    var out = gameBoard.tileZToChessArray(9);
    for (let i = 0; i < out.length; i++) {
      const element = out[i];
      element.setAlpha(0)
    }
    this.citizenSelect = false
    this.citizenChessSelected = null
    this.citizenSelected = null
  }
  addToCitizenLayer(tileXY) {
    var owner = theGame.tileData[tileXY.y][tileXY.x].owner
    var city = theGame.tileData[tileXY.y][tileXY.x].city
    var citLength = theGame.countries[owner].cities[city].citizens.length
    const citizen = theGame.countries[owner].cities[city].citizens[citLength - 1];
    var worldXY = gameBoard.tileXYToWorldXY(citizen.tile.x, citizen.tile.y)
    console.log(citizen.tile)
    var citizenIcon = this.add.image(worldXY.x, worldXY.y, 'citizens', citizen.state).setScale(.5).setAlpha(1).setDepth(11);
    citizenIcon.name = 'citizen'
    citizenIcon.city = city
    citizenIcon.index = citizen.index
    // this.citizenContainer.add(citizenIcon)
    gameBoard.addChess(citizenIcon, citizen.tile.x, citizen.tile.y, 9, true);

  }
  clearSelected() {
    this.highlight.clear()
    this.selectedUnit = null
    this.selectedTile = null
    this.selectedTile = null
    //this.selectedUnitChess.setAlpha(1)
    this.selectedUnitChess = null
  }
  moveToTile(unit, tileXY) {
    //grab image
    var unitChess = getChessForUnitIndexAtTile(unit.index, unit.currentLocation)
    //remember start position
    var oldTile = unit.currentLocation
    //get existing chess number at destination and make z index
    var chess = gameBoard.tileXYToChessArray(tileXY.x, tileXY.y)
    // var z = chess.length + 1
    var z = 3 + theGame.tileData[tileXY.y][tileXY.x].units.length
    //move the chess
    gameBoard.moveChess(unitChess, tileXY.x, tileXY.y, z, true);
    //remove fog
    if (theGame.tileData[tileXY.y][tileXY.x].hasFog) {
      if (unitChess.unitType == 1 || unitChess.unitType == 3) {
        removeFog(tileXY)
        var neighborTileXY = gameBoard.getNeighborTileXY(tileXY, [0, 1, 2, 3, 4, 5, 6, 7]);
        console.log(neighborTileXY)
        this.removeFogLayerTwo(tileXY)
        /* for (let i = 0; i < neighborTileXY.length; i++) {
          const element = neighborTileXY[i];
          removeFog(element)
        } */
      } else {
        /* var chess = gameBoard.tileXYZToChess(tileXY.x, tileXY.y, 10);
        gameBoard.removeChess(chess, null, null, null, true)
        theGame.tileData[tileXY.y][tileXY.x].hasFog = false */
        removeFog(tileXY)
        this.removeFogLayer(tileXY)
      }

    }
    //remove unit from tile data
    const searchIndex = theGame.tileData[oldTile.y][oldTile.x].units.findIndex((car) => car.index == unit.index);
    theGame.tileData[oldTile.y][oldTile.x].units.splice(searchIndex, 1)
    //add unit to destination tile
    theGame.tileData[tileXY.y][tileXY.x].units.push(unit.index)
    //update unit location
    unit.currentLocation = tileXY

  }

  longPress(tileXY) {
    if (theGame.tileData[tileXY.y][tileXY.x].hasFog) {
      var text = '????'
    } else {
      if (theGame.tileData[tileXY.y][tileXY.x].owner == -1) {
        var countryCity = ''
      } else {
        var countryCity = civs[theGame.playerCiv].name + ',' + civs[theGame.playerCiv].cityNames[theGame.tileData[tileXY.y][tileXY.x].city] + ', '
      }
      var tileRec = theGame.tileData[tileXY.y][tileXY.x].values.Food + '/' + theGame.tileData[tileXY.y][tileXY.x].values.Production + '/' + theGame.tileData[tileXY.y][tileXY.x].values.Trade
      if (theGame.tileData[tileXY.y][tileXY.x].values.Resource == -1) {
        var specialRec = 'None'
      } else {
        var specialRec = resources[theGame.tileData[tileXY.y][tileXY.x].values.Resource].name
      }
      var text = countryCity + theGame.tileData[tileXY.y][tileXY.x].biome + ' ' + tileRec + ' R: ' + specialRec;
    }

    this.events.emit('info', text);
  }
  removeUnitChess(chess) {
    var unit = getUnitByIndex(chess.owner, chess.index)
    var ind = theGame.tileData[unit.currentLocation.y][unit.currentLocation.x].units.indexOf(chess.index)
    theGame.tileData[unit.currentLocation.y][unit.currentLocation.x].units.splice(ind, 1);
    theGame.countries[chess.owner].units.splice(chess.index, 1);
    gameBoard.removeChess(chess, null, null, null, true);
  }
  addCity(tile, ID) {
    //add graphic
    var obj = this.add.image(0, 0, 'cities', 0).setOrigin(.5, .75)
    gameBoard.addChess(obj, tile.x, tile.y, CITY, true);
    //set tile details
    theGame.tileData[tile.y][tile.x].owner = theGame.currentPlayer
    theGame.tileData[tile.y][tile.x].cultureOwner = theGame.currentPlayer
    theGame.tileData[tile.y][tile.x].city = ID
    theGame.tileData[tile.y][tile.x].cityCenter = true
    //work center tile
    theGame.tileData[tile.y][tile.x].isWorked = true
    this.expandCity(theGame.currentPlayer, ID, theGame.countries[this.currentPlayer].cities[ID].size)
    this.Messages.newMessage(theGame.countries[this.currentPlayer].cities[ID].name + ' founded!')
    //add citizen and assign to a tile
    var nTile = gameBoard.getNeighborTileXY(tile, 3)
    theGame.countries[this.currentPlayer].cities[ID].citizens.push(new Citizen(theGame.currentPlayer, ID, nTile, 0))
    theGame.countries[this.currentPlayer].cities[ID].citizenIndexCount++
    theGame.tileData[nTile.y][nTile.x].isWorked = true
    theGame.tileData[nTile.y][nTile.x].citizen = 0
    if (!this.nationStarted) {
      this.nationStarted = true
      this.makeCitizenLayer(tile)
    }
    //console.log(theGame.countries[0].cities[0])
    // console.log(theGame.countries[0].cities[1])
    this.drawBorder(0)
  }


  getStartLcation(num) {
    let results = []
    for (let i = 0; i < num; i++) {
      var done = false
      while (!done) {
        var x = Phaser.Math.Between(3, theGame.width - 3)
        var y = Phaser.Math.Between(3, theGame.height - 3)
        if (this.map.mapArray[y][x].value > 0.45 && this.map.mapArray[y][x].value < 0.68 && this.isNew(x, y, results) && this.dGreaterThan(20, x, y, results)) {
          done = true
          results.push({ x: x, y: y })
          if (results.length > 1) {
            //console.log()
          }
        }
      }
    }
    return results
  }
  isNew(x, y, results) {
    if (results.length == 0) {
      return true
    } else {
      for (let i = 0; i < results.length; i++) {
        if (results[i].x == x && results[i].y == y) {
          return false
        }
      }
      return true
    }
  }
  dGreaterThan(amount, x, y, results) {
    if (results.length == 0) {
      return true
    } else {
      for (let i = 0; i < results.length; i++) {
        if (gameBoard.getDistance({ x: x, y: y }, results[i]) < amount) {
          return false
        }

      }
      return true
    }
  }

  placeUnit(unit) {
    //0 city 1 resourse 2 improvement
    var depth = theGame.tileData[unit.currentLocation.y][unit.currentLocation.x].improvements.length + theGame.tileData[unit.currentLocation.y][unit.currentLocation.x].units.length + 1
    var obj = this.add.image(0, 0, 'units', unit.id).setOrigin(.5, .75).setDepth(depth)
    obj.index = unit.index
    obj.unitType = unit.id
    obj.tile = unit.currentLocation
    obj.chessType = 'unit'
    obj.owner = unit.owner
    obj.city = unit.city
    var chess = gameBoard.tileXYToChessArray(unit.currentLocation.x, unit.currentLocation.y)
    var z = UNIT + theGame.tileData[unit.currentLocation.y][unit.currentLocation.x].units.length
    gameBoard.addChess(obj, unit.currentLocation.x, unit.currentLocation.y, z, true);
  }
  endPlayerTurn() {
    this.zoomTo(this.currentPlayer)
  }
  endRound() {
    console.log('end round')
    //Check for improvements that are ready to build--right now just for player, todo: for computer players as well

    if (!this.nationStarted) {
      for (let i = 0; i < theGame.countries[0].units.length; i++) {
        const unit = theGame.countries[0].units[i];
        if (unit.isMoving) {
          console.log('movement' + unitInfo[unit.id].m)
          if (unitInfo[unit.id].m > 1 && unit.path.length >= unitInfo[unit.id].m) {
            var temp = unit.path.splice(0, unitInfo[unit.id].m)
            var destination = temp[1]
          } else {
            var destination = unit.path.shift()
          }

          this.moveToTile(unit, destination)
          console.log(unit.path.length)
          if (unit.path.length == 0) {
            unit.path = null
            unit.isMoving = false

          }

        }
      }

      return
    }
    //  this.doBuildUnit(0)
    //in ////////
    //get terrain stat + improvement  bonus
    for (let c = 0; c < theGame.countries.length; c++) {
      const country = theGame.countries[c];
      for (let i = 0; i < theGame.countries[c].cities.length; i++) {
        this.doBuild(i)
        this.doBuildUnit(i)
        const city = country.cities[i];
        var newFood = getBaseFood(c, i)
        var newProduction = getBaseProduction(c, i)
        var newTrade = getBaseTrade(c, i)
        //add to country's running total
        //console.log(newFood)
        //food newFood - citizen food = city.food(storage)
        newFood -= city.population * 2
        city.food += newFood

        city.production += newProduction

        city.trade += newTrade
        //out -- resource use
        //2 units of food per citizen


        //maint
        var minusGold = 0
        //every tile cost gold to maintain
        // minuGold += theGame.countries[0].tiles.length * 1
        //plus improvment maintenance
        minusGold += city.maintenance
        newTrade -= minusGold
        city.trade += newTrade






        if (city.food > city.foodStorage * city.size) {
          city.population++
          country.population += city.population
          if (c == 0) {
            this.Messages.newMessage('New citizen added to ' + city.name)
            //add citizen and assign to a tile
            //var nTile = gameBoard.getNeighborTileXY(theGame.countries[c].cities[i].cityCenter, 1)
            var nTile = getUnworkedTile(c, i)
            var length = city.citizenIndexCount
            theGame.countries[c].cities[i].citizens.push(new Citizen(c, i, nTile, length))
            city.citizenIndexCount++
            theGame.tileData[nTile.y][nTile.x].isWorked = true
            theGame.tileData[nTile.y][nTile.x].citizen = theGame.countries[c].cities[i].citizens.index
            this.addToCitizenLayer(nTile)
          }

          city.food -= city.foodStorage * city.size
          if (city.population % 6 == 0) {
            city.size++
            console.log('new size: ' + city.size)
            this.expandCity(c, city.id)
            if (c == 0) {
              this.Messages.newMessage(city.name + ' increased size')

            }

          }

        }
        //update civ stats
        country.food += newFood

        country.production += newProduction
        country.trade += newTrade

        /*        this.treasuryPercent = 20
               this.sciencePercent = 40
               this.entertainmentPercent = 40
               this.treasuryBox = 0
               this.scienceBox = 0
               this.entertainmentBox = 0 */





        //check units
        for (let u = 0; u < country.units.length; u++) {
          const unit = country.units[u];
          if (unit.id == 0 && unit.isAutoWork) {
            console.log(unit)
            //is not moving, check for improvment
            //if none, build something
            //if idle, and nothing to build, move to next tile
            //find tile with citizen, if not, find open tile
            //when done moving, build something
          }
          if (unit.id == 0 && unit.performingAction) {
            var done = checkWork(unit)
            if (done == 'farm') {
              console.log(unit.currentLocation)
              var unitChess = getChessForUnitIndexAtTile(unit.index, unit.currentLocation)
              unitChess.setAlpha(1)
              var obj = this.add.image(0, 0, 'tile_improvements', 0).setOrigin(.5, .75)
              gameBoard.addChess(obj, unit.currentLocation.x, unit.currentLocation.y, 2, true);
              theGame.tileData[unit.currentLocation.y][unit.currentLocation.x].improvements.push(0)

              var buildMessage = theGame.countries[unit.owner].cities[unit.city].name + ' built FARM'
              this.Messages.newMessage(buildMessage)

              if (theGame.tileData[unit.currentLocation.y][unit.currentLocation.x].owner == -1) {

                addTile(unit.currentLocation.x, unit.currentLocation.y, unit.owner, unit.city)
              }

            } else if (done == 'mine') {
              var unitChess = getChessForUnitIndexAtTile(unit.index, unit.currentLocation)
              unitChess.setAlpha(1)
              var obj = this.add.image(0, 0, 'tile_improvements', 1).setOrigin(.5, .75)
              gameBoard.addChess(obj, unit.currentLocation.x, unit.currentLocation.y, 2, true);
              theGame.tileData[unit.currentLocation.y][unit.currentLocation.x].improvements.push(1)
              var buildMessage = theGame.countries[unit.owner].cities[unit.city].name + ' built MINE'
              this.Messages.newMessage(buildMessage)
              if (theGame.tileData[unit.currentLocation.y][unit.currentLocation.x].owner == -1) {
                addTile(unit.currentLocation.x, unit.currentLocation.y, unit.owner, unit.city)
              }
            }

            this.drawBorders()
          }
          if (unit.isMoving) {
            console.log('movement' + unitInfo[unit.id].m)
            if (unitInfo[unit.id].m > 1 && unit.path.length >= unitInfo[unit.id].m) {
              var temp = unit.path.splice(0, unitInfo[unit.id].m)
              var destination = temp[1]
            } else {
              var destination = unit.path.shift()
            }
            if (theGame.tileData[destination.y][destination.x].owner > 0) {
              var civ = theGame.countries[theGame.tileData[destination.y][destination.x].owner].civ

              this.Messages.newMessage(unitInfo[unit.id].name + ' made contact with ' + civs[civ].name)
            }
            this.moveToTile(unit, destination)
            console.log(unit.path.length)
            if (unit.path.length == 0) {
              var unitChess = getChessForUnitIndexAtTile(unit.index, unit.currentLocation)
              unitChess.setAlpha(1)
              unit.path = null
              unit.isMoving = false
              if (unit.currentAction == 6) {
                this.Messages.newMessage(unitInfo[unit.id].name + ' finished scouting')

                // this.setUpAutoPath(unit.currentLocation)
              }

            }

          }

        }

        //   setCulture(city.countryID, city.id, city.cityCenter, 1)
        //   this.drawBordersCulture()
      }

      //country stuff
      var treasBudget = Math.ceil(country.trade * (country.tresuryPercent / 100))
      country.treasuryBox += treasBudget
      var sciBudget = Math.ceil(country.trade * (country.sciencePercent / 100))
      country.scienceBox = sciBudget
      var entBudget = Math.ceil(country.trade * (country.entertainmentPercent / 100))
      country.entertainmentBox = entBudget
      //check tech research
      if (country.currentResearch != null) {
        if (country.scienceBox >= techTree[country.currentResearch].baseCost) {
          country.techs.push(country.currentResearch)

          var buildMessage = civs[country.civ].name + ' discovered ' + techTree[country.currentResearch].name
          this.Messages.newMessage(buildMessage)

          country.scienceBox -= techTree[country.currentResearch].baseCost
          country.currentResearch = null
        }


      }
    }


    // this.expandBorder(0)
    this.saveGame()
    // this.drawCultureBorder(0)
    // this.UI.setStatusLabels(null)
    //  this.UI.updatePop(null)
  }
  zoomTo(owner) {
    var worldXY = gameBoard.tileXYToWorldXY(theGame.countries[owner].capital.x, theGame.countries[owner].capital.y)
    this.cameras.main.pan(worldXY.x, worldXY.y, 2000, 'Power2');
    this.cameras.main.zoomTo(3, 4000);
  }
  zoomToStart(start) {
    var worldXY = gameBoard.tileXYToWorldXY(start.x, start.y)
    this.cameras.main.pan(worldXY.x, worldXY.y, 2000, 'Power2');
    this.cameras.main.zoomTo(3, 4000);
  }
  zoomToHumanCity(num) {
    this.selectedTile = theGame.countries[0].cities[num].cityCenter
    this.highlightTile(this.selectedTile)
    this.UI.buildUnit.setAlpha(1)
    this.UI.build.setAlpha(1)
    this.UI.setStatusLabels(this.selectedTile, 'city')
    this.UI.updatePop(this.selectedTile, 'city')
    this.UI.cityStatsVisibility('on')
    var worldXY = gameBoard.tileXYToWorldXY(theGame.countries[0].cities[num].cityCenter.x, theGame.countries[0].cities[num].cityCenter.y)
    this.cameras.main.pan(worldXY.x, worldXY.y, 2000, 'Power2');
    this.cameras.main.zoomTo(3, 4000);
  }
  zoomToCity() {
    this.currentCity++
    if (this.currentCity == theGame.countries[0].cities.length) {
      this.currentCity = 0
    }
    this.zoomToHumanCity(this.currentCity)

  }
  expandCountries() {

    theGame.countries.forEach(function (country) {
      //var chess = gameBoard.tileXYZToChess(country.capital.x, country.capital.y, 0);
      // console.log(chess)
      //  this.addImprovement(country.id, country.tiles[0], 7, true)
      //mark captial
      theGame.tileData[country.capital.y][country.capital.x].cityCenter = true
      theGame.tileData[country.capital.y][country.capital.x].city = 0
      var out = gameBoard.getNeighborTileXY(country.capital, null);
      for (var i = 0; i < out.length; i++) {

        //this.gameMap[country.capital.row + dirs8[i].r][country.capital.col + dirs8[i].c].image.setAlpha(.7)
        if (gameBoard.contains(out[i].x, out[i].y)) {
          var chess = gameBoard.tileXYZToChess(out[i].x, out[i].y, 10);
          gameBoard.removeChess(chess, null, null, null, true)
          theGame.tileData[out[i].y][out[i].x].hasFog = false
          theGame.tileData[out[i].y][out[i].x].owner = country.id
          theGame.tileData[out[i].y][out[i].x].city = 0
          country.cities[0].tiles.push(out[i])
        }



      }



    }.bind(this));
    // console.log(theGame.countries[0])
  }
  expandCountry(owner) {
    var country = theGame.countries[owner]
    theGame.tileData[country.capital.y][country.capital.x].cityCenter = true
    theGame.tileData[country.capital.y][country.capital.x].city = 0
    var out = gameBoard.getNeighborTileXY(country.capital, null);
    for (var i = 0; i < out.length; i++) {

      //this.gameMap[country.capital.row + dirs8[i].r][country.capital.col + dirs8[i].c].image.setAlpha(.7)
      if (gameBoard.contains(out[i].x, out[i].y)) {
        var chess = gameBoard.tileXYZToChess(out[i].x, out[i].y, 10);
        gameBoard.removeChess(chess, null, null, null, true)
        theGame.tileData[out[i].y][out[i].x].hasFog = false
        theGame.tileData[out[i].y][out[i].x].owner = country.id
        theGame.tileData[out[i].y][out[i].x].cultureOwner = country.id
        theGame.tileData[out[i].y][out[i].x].city = 0
        country.cities[0].tiles.push(out[i])
      }



    }
  }
  expandCity(owner, city) {
    //var out = gameBoard.filledRingToTileXYArray(theGame.countries[owner].cities[city].cityCenter, radius, true)
    //var out = gameBoard.ringToTileXYArray(theGame.countries[owner].cities[city].cityCenter, radius)
    var radius = theGame.countries[owner].cities[city].size + .5
    console.log(theGame.countries[owner].cities[city].cityCenter)
    var out = getTileRing(theGame.countries[owner].cities[city].cityCenter, radius)
    for (var i = 0; i < out.length; i++) {

      //this.gameMap[country.capital.row + dirs8[i].r][country.capital.col + dirs8[i].c].image.setAlpha(.7)
      if (theGame.tileData[out[i].y][out[i].x].owner == -1) {
        theGame.tileData[out[i].y][out[i].x].owner = theGame.countries[owner].id
        theGame.tileData[out[i].y][out[i].x].cultureOwner = theGame.countries[owner].id
        theGame.tileData[out[i].y][out[i].x].city = city
        theGame.countries[owner].cities[city].tiles.push(out[i])
        removeFog(out[i])
        this.removeFogLayer(out[i])
      }



    }
    this.drawBorders()
  }

  //myArray.filter(x => x.id === '45');
  addImprovement(owner, city, type, complete) {
    console.log(`own ${owner},city ${city},type ${type}, complte ${complete}`)
    var imp = { id: type, turnAdded: theGame.day, complete: complete }
    theGame.countries[owner].cities[city].improvements.push(imp)
    //cost


    //this.UI.setStatusLabels(this.selectedTile)
    console.log(theGame.countries[owner].cities[city].improvements)
  }

  readyUnit(id, index, city) {
    this.selectedUnit = { type: id, index: index, city: city }
  }
  doBuild(owner) {
    for (let c = 0; c < theGame.countries[owner].cities.length; c++) {
      for (let i = 0; i < theGame.countries[owner].cities[c].improvements.length; i++) {
        //{x: 4, y: 3}
        //var imp = { tileID: tileid, id: type, tile: tile, turnAdded: this.day, complete: complete }
        const improvement = theGame.countries[owner].cities[c].improvements[i];
        if (!improvement.complete) {
          if (theGame.countries[owner].cities[c].production >= improvementInfo[improvement.id].cost) {
            theGame.countries[owner].cities[c].production -= improvementInfo[improvement.id].cost
            theGame.countries[owner].production -= improvementInfo[improvement.id].cost
            improvement.complete = true
            var buildMessage = theGame.countries[owner].cities[c].name + ' built ' + improvementInfo[improvement.id].name
            this.Messages.newMessage(buildMessage)
            // maintenance
            theGame.countries[owner].cities[c].maintenance += improvementInfo[improvement.id].maintenance
            theGame.countries[owner].cities[c].currentImprovementProduction = null
            console.log(improvementInfo[improvement.id].name + ' built')
          }
        }


      }

    }

  }
  doBuildUnit(owner) {

    for (let i = 0; i < theGame.countries[owner].units.length; i++) {
      const unit = theGame.countries[owner].units[i];
      if (!unit.complete) {
        console.log(theGame.countries[owner].cities[unit.city].production)
        console.log(unitInfo[unit.id].costProduction)
        if (theGame.countries[owner].cities[unit.city].production >= unitInfo[unit.id].costProduction) {
          unit.complete = true
          console.log(unitInfo[unit.id].name + '(' + unit.id + ')' + ' built index: ' + unit.index)
          var buildMessage = theGame.countries[owner].cities[unit.city].name + ' built ' + unitInfo[unit.id].name
          this.Messages.newMessage(buildMessage)
          theGame.countries[owner].cities[unit.city].currentUnitProduction = null
          theGame.countries[owner].cities[unit.city].production -= unitInfo[unit.id].costProduction
          theGame.countries[owner].production -= unitInfo[unit.id].costProduction
          var tile = getRandomCityTile(unit.owner, unit.city)
          unit.currentLocation = tile

          theGame.tileData[tile.y][tile.x].units.push(unit.index)
          this.placeUnit(unit)
        }
      }
    }

  }

  makeCoo(row, col) {
    return { x: col, y: row }
  }
  removeFogLayerTwo(center) {
    var out = gameBoard.getNeighborTileXY(center, null);
    for (let i = 0; i < out.length; i++) {
      const element = out[i];
      removeFog(element)
      this.removeFogLayer(element)
    }
  }
  removeFogLayer(center) {
    var out = gameBoard.getNeighborTileXY(center, null);
    for (let i = 0; i < out.length; i++) {
      const element = out[i];
      removeFog(element)

    }
    // var out = board.getNeighborTileXY(srcTileXY, null, out);

  }
  getTwoLayerTiles(center, owner) {
    var out = gameBoard.getNeighborTileXY(center, null);
    var results = []
    for (let i = 0; i < out.length; i++) {
      var tempTile = theGame.tileData[out[i].y][out[i].x]
      tempTile.cultureOwner = owner
      const element = gameBoard.getNeighborTileXY(center, null);
      for (let j = 0; j < element.length; j++) {
        const element2 = element[j];
        var tempTile2 = theGame.tileData[element2.y][element2.x]
        tempTile2.cultureOwner = owner

      }
      results.push(...element)
      //this.removeFogLayer(element)
    }
    results.push(...out)
    console.log(results)
    return results
  }

  expandBorder(player) {
    var hArray = theGame.countries[player].tiles;
    var newTiles = [];
    //console.log(this.players[player].tiles)
    for (var h = 0; h < hArray.length; h++) {
      for (var dir = 0; dir < 4; dir++) {
        //var neighbor = this.getNeighborHex(hex, dir);
        var neighbor = gameBoard.getNeighborTileXY(hArray[h], dir);
        // var neighbor = this.getHexObjectByHex(nei);
        if (neighbor != null && tileData[neighbor.y][neighbor.x].owner == null) {
          tileData[neighbor.y][neighbor.x].owner = player
          newTiles.push(neighbor);
          // this.setOwner(neighbor, player);

        }
      }

    }
    theGame.countries[player].tiles.push(...newTiles);
    //console.log(newTiles);

    this.drawBorder(player)
  }

  highlightTile(tile) {
    this.highlight.clear()
    var points = gameBoard.getGridPoints(tile.x, tile.y)
    this.highlight.strokePoints(points, true)
  }
  drawBorders() {
    // this.graphicsC0.clear()
    for (var c = 0; c < theGame.countries.length; c++) {

      this.drawBorder(c)
    }
  }
  drawBorder(owner) {
    var graph
    if (owner == 0) {
      this.graphicsP0.clear();
      graph = this.graphicsP0
    } else if (owner == 1) {
      this.graphicsP1.clear();
      graph = this.graphicsP1
    } else if (owner == 2) {
      this.graphicsP2.clear();
      graph = this.graphicsP2
    } else if (owner == 3) {
      this.graphicsP3.clear();
      graph = this.graphicsP3
    } else if (owner == 4) {
      this.graphicsP4.clear();
      graph = this.graphicsP4
    } else if (owner == 5) {
      this.graphicsP5.clear();
      graph = this.graphicsP5
    } else if (owner == 6) {
      this.graphicsP6.clear();
      graph = this.graphicsP5
    } else if (owner == 7) {
      this.graphicsP7.clear();
      graph = this.graphicsP5
    } else if (owner == 8) {
      this.graphicsP8.clear();
      graph = this.graphicsP5
    }
    var cArray = []
    for (var i = 0; i < theGame.countries[owner].cities.length; i++) {
      cArray.push(...theGame.countries[owner].cities[i].tiles);
    }
    //console.log(cArray.length)

    //for (var i = 0; i < theGame.countries[owner].cities.length; i++) {
    // var cArray = theGame.countries[owner].cities[i].tiles; 
    // console.log(theGame.countries[owner].cities.length)
    for (var c = 0; c < cArray.length; c++) {
      for (var d = 0; d < 4; d++) {
        //get neighbor in direction
        var temp = gameBoard.getNeighborTileXY(cArray[c], d)

        if (temp != null) {
          var nTile = theGame.tileData[temp.y][temp.x]
          if (nTile.owner != owner) {
            //console.log('border')
            // var corners = this.getCornerPoints(this.gameMap[cArray[c].row][cArray[c].col].image, d)
            var points = gameBoard.getGridPoints(cArray[c].x, cArray[c].y)
            //var line = new Phaser.Geom.Line(corners.x1, corners.y1, corners.x2, corners.y2)
            if (d == 2) {
              var line = new Phaser.Geom.Line(points[2].x, points[2].y, points[3].x, points[3].y)
            } else if (d == 1) {
              var line = new Phaser.Geom.Line(points[1].x, points[1].y, points[2].x, points[2].y)
            } else if (d == 0) {
              var line = new Phaser.Geom.Line(points[0].x, points[0].y, points[1].x, points[1].y)
            } else if (d == 3) {
              var line = new Phaser.Geom.Line(points[3].x, points[3].y, points[0].x, points[0].y)
            }
            //    this.graphicsC0.lineStyle(6, colorArray[owner], .8)
            var points = line.getPoints(8);

            for (var i = 0; i < points.length; i++) {
              var p = points[i];

              graph.fillRect(p.x - 2, p.y - 2, 4, 4);
            }
            // graph.strokeLineShape(line)
            // console.log('drawn')
          }
        }

      }
    }
    //}
  }
  drawBordersCulture() {
    // this.graphicsC0.clear()
    for (var c = 0; c < theGame.countries.length; c++) {

      this.drawBorderCulture(c)
    }
  }
  drawBorderCulture(owner) {
    var graph
    if (owner == 0) {
      this.graphicsP0.clear();
      graph = this.graphicsP0
    } else if (owner == 1) {
      this.graphicsP1.clear();
      graph = this.graphicsP1
    } else if (owner == 2) {
      this.graphicsP2.clear();
      graph = this.graphicsP2
    } else if (owner == 3) {
      this.graphicsP3.clear();
      graph = this.graphicsP3
    } else if (owner == 4) {
      this.graphicsP4.clear();
      graph = this.graphicsP4
    } else if (owner == 5) {
      this.graphicsP5.clear();
      graph = this.graphicsP5
    } else if (owner == 6) {
      this.graphicsP6.clear();
      graph = this.graphicsP5
    } else if (owner == 7) {
      this.graphicsP7.clear();
      graph = this.graphicsP5
    } else if (owner == 8) {
      this.graphicsP8.clear();
      graph = this.graphicsP5
    }
    var cArray = []
    for (var i = 0; i < theGame.countries[owner].cities.length; i++) {
      cArray.push(...theGame.countries[owner].cities[i].tilesCulture);
    }
    //console.log(cArray.length)

    //for (var i = 0; i < theGame.countries[owner].cities.length; i++) {
    // var cArray = theGame.countries[owner].cities[i].tiles; 
    // console.log(theGame.countries[owner].cities.length)
    for (var c = 0; c < cArray.length; c++) {
      for (var d = 0; d < 4; d++) {
        //get neighbor in direction
        var temp = gameBoard.getNeighborTileXY(cArray[c], d)

        if (temp != null) {
          var nTile = theGame.tileData[temp.y][temp.x]
          if (nTile.cultureOwner != owner) {
            //console.log('border')
            // var corners = this.getCornerPoints(this.gameMap[cArray[c].row][cArray[c].col].image, d)
            var points = gameBoard.getGridPoints(cArray[c].x, cArray[c].y)
            //var line = new Phaser.Geom.Line(corners.x1, corners.y1, corners.x2, corners.y2)
            if (d == 2) {
              var line = new Phaser.Geom.Line(points[2].x, points[2].y, points[3].x, points[3].y)
            } else if (d == 1) {
              var line = new Phaser.Geom.Line(points[1].x, points[1].y, points[2].x, points[2].y)
            } else if (d == 0) {
              var line = new Phaser.Geom.Line(points[0].x, points[0].y, points[1].x, points[1].y)
            } else if (d == 3) {
              var line = new Phaser.Geom.Line(points[3].x, points[3].y, points[0].x, points[0].y)
            }
            //    this.graphicsC0.lineStyle(6, colorArray[owner], .8)
            var points = line.getPoints(8);

            for (var i = 0; i < points.length; i++) {
              var p = points[i];

              graph.fillRect(p.x - 2, p.y - 2, 4, 4);
            }
            // graph.strokeLineShape(line)
            // console.log('drawn')
          }
        }

      }
    }
    //}
  }


  /* getCornerPoints(tile, dir) {
    //var tile = this.gameArray[coo.row][coo.col].image
    if (dir == 0) {
      var p1x = tile.x - this.tilesize / 2
      var p1y = tile.y - this.tilesize / 2
      var p2x = tile.x + this.tilesize / 2
      var p2y = tile.y - this.tilesize / 2
      return { x1: p1x, y1: p1y, x2: p2x, y2: p2y }
    } else if (dir == 1) {
      var p1x = tile.x + this.tilesize / 2
      var p1y = tile.y - this.tilesize / 2
      var p2x = tile.x + this.tilesize / 2
      var p2y = tile.y + this.tilesize / 2
      return { x1: p1x, y1: p1y, x2: p2x, y2: p2y }
    } else if (dir == 2) {
      var p1x = tile.x - this.tilesize / 2
      var p1y = tile.y + this.tilesize / 2
      var p2x = tile.x + this.tilesize / 2
      var p2y = tile.y + this.tilesize / 2
      return { x1: p1x, y1: p1y, x2: p2x, y2: p2y }
    } else if (dir == 3) {
      var p1x = tile.x - this.tilesize / 2
      var p1y = tile.y - this.tilesize / 2
      var p2x = tile.x - this.tilesize / 2
      var p2y = tile.y + this.tilesize / 2
      return { x1: p1x, y1: p1y, x2: p2x, y2: p2y }
    }
  } */

  saveGame() {
    if (!this.nationStarted) { return }
    console.log('save game')
    // gameData = theGame
    localStorage.removeItem('PCSave');
    localStorage.setItem('PCSave', JSON.stringify(theGame));
  }

}


var getQuadGrid = function (scene) {
  var grid = scene.rexBoard.add.quadGrid({
    x: 50,
    y: 50,
    cellWidth: 100,
    cellHeight: 50,
    type: 1
  });

  return grid;
};

var getHexagonGrid = function (scene) {
  var staggeraxis = 'x';
  var staggerindex = 'odd';
  var grid = scene.rexBoard.add.hexagonGrid({
    x: 50,
    y: 50,
    size: 50,
    staggeraxis: staggeraxis,
    staggerindex: staggerindex
  });

  return grid;
};