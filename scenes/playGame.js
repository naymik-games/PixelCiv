

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




    //create new game
    if (gameLoad == 'new') {
      this.theGame = new GAME(gameWidth, gameHeight, 5)
      this.tileData = new Array(this.theGame.height).fill(null).map(() => new Array(this.theGame.width).fill(null));
    } else {
      this.theGame = gameData.game
      this.tileData = gameData.tiles
    }

    console.log(this.theGame)
    //this.day = 1
    this.currentPlayer = 0
    this.countries = []





    //create new map
    if (gameLoad == 'new') {
      this.map = new Map(this.theGame.width, this.theGame.height, 34147)
    }


    //create new board
    this.board = this.rexBoard.add.board({
      //grid: getHexagonGrid(this),
      grid: getQuadGrid(this),
      width: this.theGame.width,
      height: this.theGame.height,
      dir: 4
    });
    //add tile images to board and make tile data
    this.board.forEachTileXY(function (tileXY, board) {
      var onwer = null
      if (gameLoad == 'new') {
        var obj = this.add.image(0, 0, 'tiles', this.map.mapArray[tileXY.y][tileXY.x].index).setOrigin(.5, .75)
        board.addChess(obj, tileXY.x, tileXY.y, 0, true);

        let id = tileXY.x + 20 * tileXY.y;
        // y = index / width;
        // x = index % width;
        this.tileData[tileXY.y][tileXY.x] = new Tiles(this.map.mapArray[tileXY.y][tileXY.x], id, onwer, onwer, this.map.mapArray[tileXY.y][tileXY.x].biome)
      } else {

        var obj = this.add.image(0, 0, 'tiles', this.tileData[tileXY.y][tileXY.x].terrain.index).setOrigin(.5, .75)
        board.addChess(obj, tileXY.x, tileXY.y, 0, true);
      }


    }, this);


    console.log(this.tileData)


    if (gameLoad == 'new') {
      //get starting locations and create countries
      var startingPoints = this.getStartLcation(this.theGame.players)
      for (let i = 0; i < startingPoints.length; i++) {
        var obj = this.add.image(0, 0, 'cities', 0).setOrigin(.5, .75)
        this.board.addChess(obj, startingPoints[i].x, startingPoints[i].y, 1, true);
        this.countries.push(new Country(startingPoints[i], colorArray[i], i))
        this.countries[i].cities.push(new City(startingPoints[i], colorArray[i], i, 0))
        this.tileData[startingPoints[i].y][startingPoints[i].x].owner = i
      }
      // console.log(this.countries)
      //initial border expansion
      this.expandCountries()
    } else {
      this.countries = gameData.countries
      for (let i = 0; i < this.theGame.players; i++) {
        var obj = this.add.image(0, 0, 'cities', 0).setOrigin(.5, .75)
        this.board.addChess(obj, this.countries[i].capital.x, this.countries[i].capital.y, 1, true);
      }
    }




    //set up graphics
    this.graphicsP0 = this.add.graphics({ lineStyle: { width: 6, color: colorArray[0], alpha: .8 } });
    this.graphicsP1 = this.add.graphics({ lineStyle: { width: 6, color: colorArray[1], alpha: .8 } });
    this.graphicsP2 = this.add.graphics({ lineStyle: { width: 6, color: colorArray[2], alpha: .8 } });
    this.graphicsP3 = this.add.graphics({ lineStyle: { width: 6, color: colorArray[3], alpha: .8 } });
    this.graphicsP4 = this.add.graphics({ lineStyle: { width: 6, color: colorArray[4], alpha: .8 } });
    this.graphicsP5 = this.add.graphics({ lineStyle: { width: 6, color: colorArray[5], alpha: .8 } });

    this.highlight = this.add.graphics({ lineStyle: { width: 4, color: 0xFFFF00, alpha: 1 } });
    //draw boorders around each country
    this.drawBorders()

    this.UI = this.scene.get('UI');



    //set up inputs

    this.selectedTile = null
    this.board.
      setInteractive().
      on('tileup', function (pointer, tileXY) {
        // console.log('down ' + tileXY.x + ',' + tileXY.y);
        this.selectedTile = tileXY
        //console.log(this.tileData[tileXY.y][tileXY.x])
        // console.log(this.tileData[tileXY.y][tileXY.x].id)
        var y = Math.floor(this.tileData[tileXY.y][tileXY.x].id / 20);
        var x = this.tileData[tileXY.y][tileXY.x].id % 20;
        //console.log('x: ' + x + ', y: ' + y)
        var type = this.tileData[tileXY.y][tileXY.x].biome
        console.log(JSON.stringify(this.tileData[this.selectedTile.y][this.selectedTile.x]))
        if (this.tileData[tileXY.y][tileXY.x].owner != undefined) {
          var owner = civNames[this.tileData[tileXY.y][tileXY.x].owner]
          var country = this.countries[owner]
          var city = cityNames[this.tileData[tileXY.y][tileXY.x].owner][this.tileData[tileXY.y][tileXY.x].city]
          // console.log(country.getTile(pickedRow, pickedCol))
          this.UI.setStatusLabels(this.selectedTile)
          this.UI.updatePop(this.selectedTile)
        } else {
          var owner = 'n/a'
          var city = 'n/a'
          this.UI.setStatusLabels(null)
          this.UI.updatePop(null)
        }
        if (this.tileData[tileXY.y][tileXY.x].owner == 0) {
          this.UI.build.setAlpha(1)
        } else {
          this.UI.build.setAlpha(0)
        }
        var text = owner + ', ' + city + ', ' + type + ', ID: ' + this.tileData[tileXY.y][tileXY.x].id;
        this.events.emit('info', text);
        this.highlightTile(tileXY)

      }, this).
      on('tiledown', function (pointer, tileXY) {
        // console.log('up ' + tileXY.x + ',' + tileXY.y);
      }).
      on('tilemove', function (pointer, tileXY) {
        // console.log('move ' + tileXY.x + ',' + tileXY.y);
      }).
      on('gameobjectdown', function (pointer, gameObject) {
        // gameObject.setFillStyle(Random(0, 0xffffff), 0.7);

      }).
      on('tile1tap', function (tap, tileXY) {
        //  console.log('1 tap ' + tileXY.x + ',' + tileXY.y);
      }).
      on('tile2tap', function (tap, tileXY) {
        //  console.log('2 tap ' + tileXY.x + ',' + tileXY.y);
      }).
      on('tilepressstart', function (press, tileXY) {
        // console.log('press start ' + tileXY.x + ',' + tileXY.y);
      }).
      on('tilepressend', function (press, tileXY) {
        console.log('press end ' + tileXY.x + ',' + tileXY.y);
      }).
      on('tileswipe', function (swipe, tileXY) {
        // console.log(`swipe-${swipe.direction} ` + tileXY.x + ',' + tileXY.y);
      });




    this.board.setInteractive(true)
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

      acceleration: 0.2,
      drag: 0.003,
      maxSpeed: 0.4
    });


    //zoom to player
    this.zoomTo(0)
    //update UI
    this.UI.setStatusLabels(this.selectedTile)
    this.UI.updatePop(this.selectedTile)

    //var points = this.board.getGridPoints(5, 5)
    //console.log(points)
    //console.log(this.board)

    // initial save
    this.saveGame()

  }

  update(time, delta) {
    this.cameraController.update(delta);

    //var pointer = this.input.activePointer;
    // var out = this.board.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
    //this.print.setText(out.x + ',' + out.y);
  }
  getStartLcation(num) {
    let results = []
    for (let i = 0; i < num; i++) {
      var done = false
      while (!done) {
        var x = Phaser.Math.Between(3, this.theGame.width - 3)
        var y = Phaser.Math.Between(3, this.theGame.height - 3)
        if (this.map.mapArray[y][x].value > 0.45 && this.map.mapArray[y][x].value < 0.68 && this.isNew(x, y, results) && this.dGreaterThan(20, x, y, results)) {
          done = true
          results.push({ x: x, y: y })
          if (results.length > 1) {
            console.log()
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
        if (this.board.getDistance({ x: x, y: y }, results[i]) < amount) {
          return false
        }

      }
      return true
    }
  }

  endPlayerTurn() {
    this.zoomTo(this.currentPlayer)
  }
  endRound() {
    console.log('end round')
    //Check for improvements that are ready to build--right now just for player, todo: for computer players as well
    this.doBuild(0)
    //in ////////
    //get terrain stat + improvement  bonus
    for (let c = 0; c < this.countries.length; c++) {
      const country = this.countries[c];
      for (let i = 0; i < this.countries[c].cities.length; i++) {
        const city = country.cities[i];
        var newFood = city.getBaseFood(this.tileData)
        newFood += city.getBonusFood()
        var newProduction = city.getBaseProduction(this.tileData)
        var newTrade = city.getBaseTrade(this.tileData)
        //add to country's running total
        city.food += newFood
        city.production += newProduction
        city.trade += newTrade
        //out -- resource use
        //2 units of food per citizen
        var foodOut = city.population * 2
        city.food -= foodOut
        //maint
        var minuGold = 0
        //every tile cost gold to maintain
        // minuGold += this.countries[0].tiles.length * 1
        //plus improvment maintenance
        minuGold += city.maintenance
        city.trade -= minuGold
        if (city.food - foodOut > city.foodStorage * city.size) {
          city.population++
          city.food -= city.foodStorage * city.size
          if (city.population % 6 == 0) {
            city.size++
          }

        }
      }
    }


    // this.expandBorder(0)

    this.UI.setStatusLabels(this.selectedTile)
    this.UI.updatePop(this.selectedTile)
  }
  zoomTo(owner) {
    var worldXY = this.board.tileXYToWorldXY(this.countries[owner].capital.x, this.countries[owner].capital.y)
    this.cameras.main.pan(worldXY.x, worldXY.y, 2000, 'Power2');
    this.cameras.main.zoomTo(3, 3000);
  }
  expandCountries() {

    this.countries.forEach(function (country) {
      //var chess = this.board.tileXYZToChess(country.capital.x, country.capital.y, 0);
      // console.log(chess)
      //  this.addImprovement(country.id, country.tiles[0], 7, true)
      //mark captial
      this.tileData[country.capital.y][country.capital.x].cityCenter = true
      this.tileData[country.capital.y][country.capital.x].city = 0
      var out = this.board.getNeighborTileXY(country.capital, null);
      for (var i = 0; i < out.length; i++) {

        //this.gameMap[country.capital.row + dirs8[i].r][country.capital.col + dirs8[i].c].image.setAlpha(.7)
        if (this.board.contains(out[i].x, out[i].y)) {
          this.tileData[out[i].y][out[i].x].owner = country.id
          this.tileData[out[i].y][out[i].x].city = 0
          country.cities[0].tiles.push(out[i])
        }



      }



    }.bind(this));
    console.log(this.countries[0])
  }
  //myArray.filter(x => x.id === '45');
  addImprovement(owner, city, tile, type, complete) {
    this.tileData[tile.y][tile.x].improvements.push(type)
    var tileid = tile.x + 20 * tile.y;
    var imp = { tileID: tileid, id: type, tile: tile, turnAdded: this.theGame.day, complete: complete }
    this.countries[owner].cities[city].improvements.push(imp)
    //cost

    this.countries[owner].trade -= improvementInfo[type].costGold
    this.countries[owner].production -= improvementInfo[type].costProduction
    this.UI.setStatusLabels()
    //console.log(this.countries)
  }
  doBuild(owner) {
    for (let c = 0; c < this.countries[owner].cities.length; c++) {
      for (let i = 0; i < this.countries[owner].cities[c].improvements.length; i++) {
        //{x: 4, y: 3}
        //var imp = { tileID: tileid, id: type, tile: tile, turnAdded: this.day, complete: complete }
        const improvement = this.countries[owner].cities[c].improvements[i];
        if (!improvement.complete) {
          if (this.theGame.day - improvement.turnAdded == improvementInfo[improvement.id].days) {
            improvement.complete = true
            // maintenance
            this.countries[owner].cities[i].maintenance += improvementInfo[improvement.id].maintenance
            //add improvement bonus to to tile stats (thus every turn) added to tile stat
            //console.log(this.tileData[improvement.tile.y][improvement.tile.x])
            //  this.tileData[improvement.tile.y][improvement.tile.x].resources.Food += improvementInfo[improvement.id].foodBonus
            // this.tileData[improvement.tile.y][improvement.tile.x].resources.Production += improvementInfo[improvement.id].productionBonus
            // this.tileData[improvement.tile.y][improvement.tile.x].resources.Trade += improvementInfo[improvement.id].tradeBonus
            //add additional one-time bonuses added to country stat
            // this.countries[owner].strength += improvementInfo[improvement.id].strengthBonus
            // this.countries[owner].happiness += improvementInfo[improvement.id].cultureBonus
            console.log(improvementInfo[improvement.id].name + ' built' + improvementInfo[improvement.id].foodBonus)
          }
        }


      }

    }

  }
  makeCoo(row, col) {
    return { x: col, y: row }
  }
  expandBorder(player) {
    var hArray = this.countries[player].tiles;
    var newTiles = [];
    //console.log(this.players[player].tiles)
    for (var h = 0; h < hArray.length; h++) {
      for (var dir = 0; dir < 4; dir++) {
        //var neighbor = this.getNeighborHex(hex, dir);
        var neighbor = this.board.getNeighborTileXY(hArray[h], dir);
        // var neighbor = this.getHexObjectByHex(nei);
        if (neighbor != null && this.tileData[neighbor.y][neighbor.x].owner == null) {
          this.tileData[neighbor.y][neighbor.x].owner = player
          newTiles.push(neighbor);
          // this.setOwner(neighbor, player);

        }
      }

    }
    this.countries[player].tiles.push(...newTiles);
    //console.log(newTiles);

    this.drawBorder(player)
  }
  drawBordersTest() {
    for (var c = 0; c < this.countries.length; c++) {
      this.drawBorderTest(c)
    }
  }
  drawBorderTest(owner) {
    this.graphicsC0.lineStyle(6, colorArray[owner], .8)
    var cArray = this.countries[owner].tiles;
    for (var c = 1; c < cArray.length; c++) {
      var points = this.board.getGridPoints(cArray[c].x, cArray[c].y)
      this.graphicsC0.strokePoints(points, true);
    }
    // var points = this.board.getGridPoints(this.countries[owner].capital.x, this.countries[owner].capital.y)
    // this.graphicsC0.strokePoints(points, true);
  }
  highlightTile(tile) {
    this.highlight.clear()
    var points = this.board.getGridPoints(tile.x, tile.y)
    this.highlight.strokePoints(points, true)
  }
  drawBorders() {
    // this.graphicsC0.clear()
    for (var c = 0; c < this.countries.length; c++) {

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
    }
    var cArray = this.countries[owner].cities[0].tiles;
    for (var c = 0; c < cArray.length; c++) {
      for (var d = 0; d < 4; d++) {
        //get neighbor in direction
        var temp = this.board.getNeighborTileXY(cArray[c], d)

        if (temp != null) {
          var nTile = this.tileData[temp.y][temp.x]
          if (nTile.owner != owner) {
            //console.log('border')
            // var corners = this.getCornerPoints(this.gameMap[cArray[c].row][cArray[c].col].image, d)
            var points = this.board.getGridPoints(cArray[c].x, cArray[c].y)
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

            graph.strokeLineShape(line)
            //console.log(corners)
          }
        }

      }
    }

  }
  getCornerPoints(tile, dir) {
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
  }

  saveGame() {
    gameData.game = this.theGame
    gameData.tiles = this.tileData
    gameData.countries = this.countries
    localStorage.setItem('PCSave', JSON.stringify(gameData));
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