

class playGame extends Phaser.Scene {
  constructor() {
    super({
      key: 'playGame'
    });

  }

  preload() {
    this.load.scenePlugin({
      key: 'rexboardplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexboardplugin.min.js',
      sceneKey: 'rexBoard'
    });
    var url;

    url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpinchplugin.min.js';
    this.load.plugin('rexpinchplugin', url, true);

  }
  create() {
    this.day = 1
    this.currentPlayer = 0
    var gridGraphics = this.add.graphics({
      lineStyle: {
        width: 1,
        color: COLOR_DARK,
        alpha: 1
      }
    });

    /* this.map = Generator.generateMap(
      {
        chanceToStartAlive: 0.4,
        deathLimit: 5,
        birthLimit: 4,
        numberOfSteps: 2,
        worldWidth: 20,
        worldHeight: 20,
        numCountries: 5
      }
    );
    console.log(this.map) */
    this.map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 0], [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 3, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 0, 0, 1, 1], [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 3, 1, 1], [1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 0, 1, 1, 1, 1, 1, 1, 1], [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 2, 2, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 1], [1, 1, 2, 3, 1, 1, 1, 0, 2, 1, 1, 1, 1, 1, 1, 1, 3, 0, 2, 1], [1, 1, 1, 1, 1, 1, 1, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]

    var board = this.rexBoard.add.board({
      //grid: getHexagonGrid(this),
      grid: getQuadGrid(this),
      width: 20,
      height: 20
    });
    this.countries = []
    this.tileData = new Array(20).fill(null).map(() => new Array(20).fill(null));

    var rexBoardAdd = this.rexBoard.add;
    //var points = board.getGridPoints(0, 0, true)
    //console.log(points)
    /* board.forEachTileXY(function (tileXY, board) {
      var points = board.getGridPoints(tileXY.x, tileXY.y, true)
      gridGraphics.strokePoints(points, true);
    }, this) */
    var count = 0
    board.forEachTileXY(function (tileXY, board) {

      if (this.map[tileXY.y][tileXY.x] == 1) {
        var color = 0x059938
        var onwer = null
      } else if (this.map[tileXY.y][tileXY.x] == 2) {
        var color = 0x808080
        var onwer = null
      } else if (this.map[tileXY.y][tileXY.x] == 3) {

        var color = colorArray[count]

        this.countries.push(new Country(this.makeCoo(tileXY.y, tileXY.x), color, count))
        var onwer = count
        count++


      } else if (this.map[tileXY.y][tileXY.x] == 0) {
        var color = 0x0000ff
        var onwer = null
      }


      // var chess = rexBoardAdd.shape(board, tileXY.x, tileXY.y, 0, color, 0.7);
      var obj = this.add.image(0, 0, 'tile').setTint(color)
      board.addChess(obj, tileXY.x, tileXY.y, 0, true);
      /*   this.add.text(chess.x, chess.y, tileXY.x + ',' + tileXY.y).
          setOrigin(0.5).
          setTint(0x0); */
      let id = tileXY.x + 20 * tileXY.y;
      // y = index / width;
      // x = index % width;
      this.tileData[tileXY.y][tileXY.x] = new Tiles(this.map[tileXY.y][tileXY.x], id, onwer)

    }, this);

    console.log(this.countries)

    //console.log(darray)
    //console.log(board)


    // var out = board.getNeighborTileXY({ x: 5, y: 7 }, null);
    // console.log(out)
    this.selectedTile = null
    board.
      setInteractive().
      on('tileup', function (pointer, tileXY) {
        // console.log('down ' + tileXY.x + ',' + tileXY.y);
        this.selectedTile = tileXY
        console.log(this.tileData[tileXY.y][tileXY.x])
        if (this.tileData[tileXY.y][tileXY.x].terrain == 0) {
          var type = 'water'
        } else if (this.tileData[tileXY.y][tileXY.x].terrain == 1) {
          var type = 'grass'
        } else if (this.tileData[tileXY.y][tileXY.x].terrain == 2) {
          var type = 'rock'
        } else {
          var type = 'captial'
        }

        if (this.tileData[tileXY.y][tileXY.x].owner != undefined) {
          var owner = civNames[this.tileData[tileXY.y][tileXY.x].owner]
          var country = this.countries[owner]
          // console.log(country.getTile(pickedRow, pickedCol))
        } else {
          var owner = 'n/a'
        }
        var text = 'Owner: ' + owner + ', ' + type + ', ID: ' + this.tileData[tileXY.y][tileXY.x].id;
        this.events.emit('info', text);
        console.log(this.selectedTile)
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

    this.board = board;
    this.print = this.add.text(0, 0, '').setScrollFactor(0);
    this.expandCountries()
    this.graphicsC0 = this.add.graphics({ lineStyle: { width: 6, color: colorArray[0], alpha: .8 } })
    this.drawBordersTest()
    //this.drawBorders()


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

      acceleration: 0.06,
      drag: 0.003,
      maxSpeed: 0.3
    });
    this.zoomTo(0)

  }

  update(time, delta) {
    this.cameraController.update(delta);

    var pointer = this.input.activePointer;
    var out = this.board.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
    this.print.setText(out.x + ',' + out.y);
  }
  endPlayerTurn() {
    this.zoomTo(this.currentPlayer)
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
      this.addImprovement(country.id, country.tiles[0], 7)
      var out = this.board.getNeighborTileXY(country.capital, null);
      for (var i = 0; i < out.length; i++) {

        //this.gameMap[country.capital.row + dirs8[i].r][country.capital.col + dirs8[i].c].image.setAlpha(.7)
        this.tileData[out[i].y][out[i].x].owner = country.id
        country.tiles.push(out[i])


      }



    }.bind(this));
    console.log(this.countries)
  }
  addImprovement(owner, tile, type) {
    this.tileData[tile.y][tile.x].improvements.push(type)
    var imp = { id: type, tile: tile }
    this.countries[owner].improvements.push(imp)
    console.log(this.countries)
  }
  makeCoo(row, col) {
    return { x: col, y: row }
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
  drawBorders() {
    this.graphicsC0.clear()
    for (var c = 0; c < this.countries.length; c++) {

      this.drawBorder(c)
    }
  }
  drawBorder(owner) {
    //this.graphicsC0.clear()
    var cArray = this.countries[owner].tiles;
    for (var c = 0; c < cArray.length; c++) {
      for (var d = 0; d < 4; d++) {
        //get neighbor in direction
        var temp = this.board.getNeighborTileXY(cArray[c], d)

        if (nTile.owner != owner) {
          //console.log('border')
          var corners = this.getCornerPoints(this.gameMap[cArray[c].row][cArray[c].col].image, d)
          var line = new Phaser.Geom.Line(corners.x1, corners.y1, corners.x2, corners.y2)
          this.graphicsC0.lineStyle(6, colorArray[owner], .8)

          this.graphicsC0.strokeLineShape(line)
          //console.log(corners)
        }
        //up, right, down, left
        //if valid and owner of carray is different than neighbor
        //get corner one
        //get corner two
        //make and draw line
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