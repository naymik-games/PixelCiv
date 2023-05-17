let game;
let gameOptions
let gameOptionsDefault = {
  tileSize: 96,
  scale: 4,
  fallSpeed: 100,
  offsetX: 50,
  offsetY: 125,
  rows: 25,//6 max
  columns: 25, //7 max
  lineWidth: 10,
  numberOfPlayers: 3,
  baseUnit: 2, //amount something basic is worth ie mine producing one baseUnit per turn, or 2 units of ore
  autopay: 1, //used for difficulty level number of pop, food, lumber produced each turn 
  initialTileRange: 2,//used for difficulty level starting explored tiles 1 = 5 | tiles 2 = 13 | tiles 3 = 27 tiles
  aiExploreProbability: 8,//used for difficulty level 10 means will do it, 1 means very unlikely
  bonusProbability: 7, //used for difficulty. higher number for more chance of bonus
  difficulty: 1 //0 easy, 1 normal, 2 hard

}
//starting values based on difficulty
let autopayValues = [3, 2, 1]
let initialTileRangeValues = [3, 2, 1]
let aiExploreProbabilityValues = [4, 7, 9]
let bonusProbabilityValues = [9, 7, 5]
let startingValues = [[100, 300, 150, 50, 25, 5], [75, 250, 25, 0, 0, 0], [50, 200, 0, 0, 0, 0]]

let unexploredDepth = 4
let exploredDepth = 0
let resourceDepth = 1
let improvementDepth = 2
let unitDepth = 5
let cursorDepth = 7
let borderDepth = 6

let map
let playerMap
let playerArray = []
let humanPlayer = 1

var easystar
var finalPath


window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1640
    },
    pixelArt: true,
    scene: [preloadGame, startGame, playGame, UI, pauseGame, techScreen]
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
}
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////
class playGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }
  preload() {
    this.load.tilemapTiledJSON('test2', 'assets/sprites/test2.json');

    this.load.json('level1', 'assets/sprites/test2.json');

  }
  create() {
    var graphics = this.add.graphics();
    this.start = true
    this.cameras.main.setBackgroundColor(0x000000);
    this.cameras.main.setZoom(1);
    this.startMove = false
    this.continueMove = false

    this.setupAnimaiton()

    gameOptions.tileSize = gameOptions.scale * 16
    gameOptions.offsetX = (game.config.width - gameOptions.columns * gameOptions.tileSize) / 2
    gameOptions.offsetY = (game.config.height / 2) - (gameOptions.rows * gameOptions.tileSize) / 2


    if (newGame) {
      //NEW GAME////////////////////////////////////////
      let data = this.cache.json.get('level1');
      //  console.log(data.layers[1].data)
      this.width = data.width;
      this.height = data.height;
      console.log(data.layers[0].objects)
      var playerObjects = data.layers[0].objects
      //create index arrays from json one for terrain (map, one for starting units, unitMap)
      map = []
      for (let y = 0; y < this.height; y++) {
        let mapRow = data.layers[1].data.splice(0, this.width);
        map.push(mapRow);

      }

      for (let i = 0; i < gameOptions.rows; i++) {

        groundLayerImage[i] = []
        groundLayerData[i] = []
        improvementayerImage[i] = []
        improvementLayerData[i] = []
        unitLayerImage[i] = []
        unitLayerData[i] = []
        borderArray[i] = []

        for (let j = 0; j < gameOptions.columns; j++) {
          let posX = gameOptions.offsetX + gameOptions.tileSize * j + gameOptions.tileSize / 2;
          let posY = gameOptions.offsetY + gameOptions.tileSize * i + gameOptions.tileSize / 2

          var groundIndex = map[i][j]
          //  var ground = { frame: groundIndex, owner: null, improved: false, explored: false }
          groundLayerData[i][j] = new Ground(groundIndex)
          var back = this.add.sprite(posX, posY, 'tiles', 11).setDepth(unexploredDepth)
          back.displayWidth = gameOptions.tileSize// - 5
          back.displayHeight = gameOptions.tileSize// - 5
          groundLayerImage[i][j] = back

          improvementayerImage[i][j] = null
          improvementLayerData[i][j] = null
          unitLayerImage[i][j] = null
          unitLayerData[i][j] = null
          borderArray[i][j] = this.add.sprite(posX, posY, 'borders', 15).setDepth(borderDepth).setScale(gameOptions.scale)

        }
      }
      ////////////////
      for (let i = 0; i < gameOptions.numberOfPlayers; i++) {
        const playerObj = playerObjects[i];
        playerArray[i].center = { row: playerObj.y, column: playerObj.x }
        // playerArray[i].techData = new Tech('HORSEBACKRIDING', 1, true)
        /*   
        just for testing
        playerArray[i].techs.push('HORSEBACKRIDING')
          playerArray[i].techs.push('THEOLOGY')
          playerArray[i].techs.push('EDUCATION')
          playerArray[i].techs.push('FEUDALISM')
          playerArray[i].techs.push('CONSTRUCTION')
          playerArray[i].techs.push('MONARCHY')
          playerArray[i].techs.push('ASTRONOMY')
          playerArray[i].techs.push('PHYSICS')
          playerArray[i].techs.push('MATHMATICS')
          playerArray[i].techs.push('ENGINEERING')
          playerArray[i].techs.push('PRINTINGPRESS')
          playerArray[i].techs.push('CURRENCY')
          playerArray[i].techs.push('INVENTION')
          playerArray[i].techs.push('DEMOCROCY')
          playerArray[i].techs.push('GRAVITY')
          playerArray[i].techs.push('MAGNATISM')
          playerArray[i].techs.push('MONARCHY')
          playerArray[i].techs.push('BANKING')
          playerArray[i].techs.push('CHEMISTRY')
          playerArray[i].techs.push('NAVIGATION')
          playerArray[i].techs.push('GUNPOWDER') */
        var pos = getPosition(playerObj.y, playerObj.x)
        improvementLayerData[playerObj.y][playerObj.x] = new Improvement(playerArray[i].frame, playerArray[i].playerIndex, 1, true, true)
        // improvementLayerData[playerObj.y][playerObj.x].complete = true
        // improvementLayerData[playerObj.y][playerObj.x].isHome = true
        groundLayerData[playerObj.y][playerObj.x].improved = true
        groundLayerData[playerObj.y][playerObj.x].owner = playerArray[i].playerIndex
        var fire = this.add.sprite(pos.x, pos.y, 'tiles', playerArray[i].frame).setDepth(improvementDepth)
        fire.displayWidth = gameOptions.tileSize// - 5
        fire.displayHeight = gameOptions.tileSize// - 5
        improvementayerImage[playerObj.y][playerObj.x] = fire
        fire.play('fire_anim')
        var tiles = this.moveRange(playerObj.y, playerObj.x, gameOptions.initialTileRange)
        // console.log(tiles)
        for (let m = 0; m < tiles.length; m++) {
          const tile = tiles[m];
          this.exploreTile(tile.row, tile.column, playerArray[i].playerIndex)
        }
      }
      //END NEW GAME//////////////////////////
    } else {
      // LOAD GAME////////////////////////
      /*    groundLayerImage[i] = []
           groundLayerData[i] = []
           improvementayerImage[i] = []
           improvementLayerData[i] = []
           unitLayerImage[i] = []
           unitLayerData[i] = []
           borderArray[i] = [] */
      groundLayerData = JSON.parse(localStorage.getItem('PixelCivGroundData'));
      improvementLayerData = JSON.parse(localStorage.getItem('PixelCivImprovementData'));
      unitLayerData = JSON.parse(localStorage.getItem('PixelCivUnitData'));
      for (let i = 0; i < gameOptions.rows; i++) {
        borderArray[i] = []
        groundLayerImage[i] = []
        improvementayerImage[i] = []
        unitLayerImage[i] = []
        for (let j = 0; j < gameOptions.columns; j++) {
          let posX = gameOptions.offsetX + gameOptions.tileSize * j + gameOptions.tileSize / 2;
          let posY = gameOptions.offsetY + gameOptions.tileSize * i + gameOptions.tileSize / 2
          //make ground images
          if (groundLayerData[i][j].explored) {
            var ground = this.add.sprite(posX, posY, 'tiles', groundLayerData[i][j].frame).setDepth(exploredDepth)
          } else {
            var ground = this.add.sprite(posX, posY, 'tiles', 11).setDepth(unexploredDepth)
          }
          ground.displayWidth = gameOptions.tileSize// - 5
          ground.displayHeight = gameOptions.tileSize// - 5
          groundLayerImage[i][j] = ground
          //make improvement image
          if (improvementLayerData[i][j] != null) {
            var imp = this.add.sprite(posX, posY, 'tiles', improvementLayerData[i][j].id).setDepth(improvementDepth)
            imp.displayWidth = gameOptions.tileSize// - 5
            imp.displayHeight = gameOptions.tileSize// - 5
            improvementayerImage[i][j] = imp
          } else {
            improvementayerImage[i][j] = null
          }
          //make unit images
          if (unitLayerData[i][j] != null) {
            var frame = unitLayerData[i][j].owner
            var imp = this.add.sprite(posX, posY, 'units', unitTypes[unitLayerData[i][j].id].frames[frame]).setDepth(unitDepth)
            imp.displayWidth = gameOptions.tileSize// - 5
            imp.displayHeight = gameOptions.tileSize// - 5
            unitLayerImage[i][j] = imp
          } else {
            unitLayerImage[i][j] = null
          }
          borderArray[i][j] = this.add.sprite(posX, posY, 'borders', 15).setDepth(borderDepth).setScale(gameOptions.scale)
        }
      }
      // END LOAD GAME////////////////////////
    }


    this.lineArray = []
    this.rectArray = []
    //graphics.lineBetween(bounds., y1, x2, y2);
    this.drag = false
    this.input.on("pointerdown", this.clickStart, this);
    this.input.on("pointermove", this.clickMove, this);
    this.input.on("pointerup", this.clickEnd, this);



    easystar = new EasyStar.js();
    easystar.setGrid(map);

    easystar.setAcceptableTiles([GRASS, FOREST, ORCHARD, HILL, DUNE, GOLD, PALMTREE, CATTLE, MUSHROOM, CAMP, FORT, CASTLE, HORSES, GAME, SILVER, COPPER, GRAPES, WOOL, SPICES, FLAX])


    this.cursor = this.add.image(0, 0, 'cursors', 0).setScale(gameOptions.scale).setDepth(cursorDepth)


    this.selectedTile = null
    this.selectedAction = null
    this.selectedUnit = null
    this.scene.launch('UI');
    console.log(playerArray)
    highlightAllBorders()
    this.start = false
    this.events.emit('showControls')
    /*  this.timer = this.time.addEvent({
       delay: 5000,                // ms
       //callback: callback,
       //args: [],
       //callbackScope: thisArg,
       repeat: -1
     }); */


  }
  update() {
    // console.log(Math.floor(this.timer.getElapsed()))
    /* if (Math.floor(this.timer.getElapsed()) === 2500) {
      console.log('halfway')
    } */
  }
  build() {
    if (this.selectedAction != null) {
      if (this.selectedAction == 'EXPLORE') {
        this.explore(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'CHOP') {
        this.chop(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'HARVESTLUMBER') {
        this.choppalm(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'GATHER') {
        this.gather(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'DRAIN') {
        this.drain(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'PICKFRUIT') {
        this.pick(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'PASTURE') {
        this.pasture(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'MINE') {
        this.mine(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'LUMBERMILL') {
        this.lumbermill(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'FARM') {
        this.farm(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'FISHINGHUT') {
        this.fishing(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'QUARRY') {
        this.quarry(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'SANDQUARRY') {
        this.sandquarry(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'CLEAR') {
        this.clear(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'HOUSE') {
        this.house(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'TOWER') {
        this.tower(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'GOLDMINE') {
        this.goldmine(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'LUMBERCAMP') {
        this.lumbercamp(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'COLLECTHORSES') {
        this.collecthorses(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'COLLECTGAME') {
        this.collectgame(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'COLLECTSILVER') {
        this.collectsilver(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'COLLECTCOPPER') {
        this.collectcopper(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'COLLECTGRAPES') {
        this.collectgrapes(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'COLLECTWOOL') {
        this.collectwool(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'COLLECTSPICES') {
        this.collectspices(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'COLLECTFLAX') {
        this.collectflax(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'UPGRADEHOUSE') {
        this.upgradehouse(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'UPGRADECAMP') {
        this.upgradecamp(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'SPEARMAN') {
        this.spearman(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'SWORDSMAN') {
        this.swordsman(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'ARCHER') {
        this.archer(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'KNIGHT') {
        this.knight(this.selectedTile.row, this.selectedTile.column)
      } else if (this.selectedAction == 'LEADER') {
        this.leader(this.selectedTile.row, this.selectedTile.column)
      }
      if (godMode == 0) {
        deductCost(this.selectedAction)
      }

      addGain(this.selectedAction)

      this.events.emit('updateResources')

      this.events.emit('updateGround', groundLayerData[this.selectedTile.row][this.selectedTile.column]);
      this.events.emit('hideBuild');
      this.selectedTile = null
      this.selectedAction = null
      this.cursor.setPosition(-100, -100)
    }
  }
  explore(row, column) {
    console.log('Explore tile ' + row + ', ' + column)
    this.explode(row, column)
    this.exploreTile(row, column, gameData.currentPlayer)
    border(gameData.currentPlayer)
  }
  chop(row, column) {
    this.explode(row, column)
    this.addTile(row, column, gameData.currentPlayer, GRASS)
  }
  choppalm(row, column) {
    this.explode(row, column)
    this.addTile(row, column, gameData.currentPlayer, DUNE)
  }
  pick(row, column) {
    this.explode(row, column)
    this.addTile(row, column, gameData.currentPlayer, FOREST)
  }
  gather(row, column) {
    this.explode(row, column)
    this.addTile(row, column, gameData.currentPlayer, GRASS)
  }
  drain(row, column) {
    this.explode(row, column)
    this.addTile(row, column, gameData.currentPlayer, GRASS)
  }
  pasture(row, column) {
    this.explode(row, column)
    this.addImprovement(row, column, gameData.currentPlayer, PASTURE)
  }
  mine(row, column) {
    this.explode(row, column)
    this.addImprovement(row, column, gameData.currentPlayer, MINE)
  }
  fishing(row, column) {
    this.explode(row, column)
    this.addImprovement(row, column, gameData.currentPlayer, FISHINGHUT)
  }
  goldmine(row, column) {
    this.explode(row, column)
    this.addImprovement(row, column, gameData.currentPlayer, GOLDMINE)
  }
  lumbermill(row, column) {
    this.explode(row, column)
    this.addImprovement(row, column, gameData.currentPlayer, LUMBER)
  }
  lumbercamp(row, column) {
    this.explode(row, column)
    this.addImprovement(row, column, gameData.currentPlayer, LUMBERCAMP)
  }
  farm(row, column) {
    this.explode(row, column)
    this.addImprovement(row, column, gameData.currentPlayer, FARM)
  }
  quarry(row, column) {
    this.explode(row, column)
    this.addImprovement(row, column, gameData.currentPlayer, QUARRY)
  }
  sandquarry(row, column) {
    this.explode(row, column)
    this.addImprovement(row, column, gameData.currentPlayer, SANDQUARRY)
  }
  house(row, column) {
    this.explode(row, column)
    this.addImprovement(row, column, gameData.currentPlayer, HOUSE)
  }
  tower(row, column) {
    this.explode(row, column)
    this.addImprovement(row, column, gameData.currentPlayer, TOWER)
  }
  upgradehouse(row, column) {
    this.explode(row, column)
    this.addImprovement(row, column, gameData.currentPlayer, BIGHOUSE)
  }
  upgradecamp(row, column) {
    this.explode(row, column)
    this.addImprovement(row, column, gameData.currentPlayer, FORT)
  }
  clear(row, column) {
    this.explode(row, column)
    this.removeImprovement(row, column)
  }
  //luxuries[0, 0, 0, 0, 0, 0, 0, 0]//HORSES,GAME, SILVER, COPPER, GRAPES, WOOL, SPICES, FLAX
  collecthorses(row, column) {
    playerArray[gameData.currentPlayer].luxuries[0] += 1 + countType(MARKET)
    this.explode(row, column)
    this.addTile(row, column, gameData.currentPlayer, GRASS)
  }
  collectgame(row, column) {
    playerArray[gameData.currentPlayer].luxuries[1] += 1 + countType(MARKET)
    this.explode(row, column)
    this.addTile(row, column, gameData.currentPlayer, GRASS)
  }
  collectsilver(row, column) {
    playerArray[gameData.currentPlayer].luxuries[2] += 1 + countType(MARKET)
    this.explode(row, column)
    this.addTile(row, column, gameData.currentPlayer, GRASS)
  }
  collectcopper(row, column) {
    playerArray[gameData.currentPlayer].luxuries[3] += 1 + countType(MARKET)
    this.explode(row, column)
    this.addTile(row, column, gameData.currentPlayer, GRASS)
  }
  collectgrapes(row, column) {
    playerArray[gameData.currentPlayer].luxuries[4] += 1 + countType(MARKET)
    this.explode(row, column)
    this.addTile(row, column, gameData.currentPlayer, GRASS)
  }
  collectwool(row, column) {
    playerArray[gameData.currentPlayer].luxuries[5] += 1 + countType(MARKET)
    this.explode(row, column)
    this.addTile(row, column, gameData.currentPlayer, GRASS)
  }
  collectspices(row, column) {
    playerArray[gameData.currentPlayer].luxuries[6] += 1 + countType(MARKET)
    this.explode(row, column)
    this.addTile(row, column, gameData.currentPlayer, GRASS)
  }
  collectflax(row, column) {
    playerArray[gameData.currentPlayer].luxuries[7] += 1 + countType(MARKET)
    this.explode(row, column)
    this.addTile(row, column, gameData.currentPlayer, GRASS)
  }
  spearman(row, column) {
    this.explode(row, column)
    this.addUnit(row, column, gameData.currentPlayer, 'SPEARMAN')
  }
  swordsman(row, column) {
    this.explode(row, column)
    this.addUnit(row, column, gameData.currentPlayer, 'SWORDSMAN')
  }
  archer(row, column) {
    this.explode(row, column)
    this.addUnit(row, column, gameData.currentPlayer, 'ARCHER')
  }
  knight(row, column) {
    this.explode(row, column)
    this.addUnit(row, column, gameData.currentPlayer, 'KNIGHT')
  }
  leader(row, column) {
    this.explode(row, column)
    this.addUnit(row, column, gameData.currentPlayer, 'LEADER')
  }
  clickStart(pointer) {
    this.events.emit('showControls')
    if (!this.startMove) { return }
    let row = Math.floor((pointer.worldY - gameOptions.offsetY) / gameOptions.tileSize);
    let col = Math.floor((pointer.worldX - gameOptions.offsetX) / gameOptions.tileSize);
    //console.log(this.selectedTile)
    //console.log(row + ', ' + col)
    if (isSameTile(this.selectedTile, { row: row, column: col })) {
      console.log('yes, same tile')
      this.maxPath = 4
      this.continueMove = true
      this.previousTile = { row: row, column: col }
      finalPath = []
      this.currentPathCost = 0
      this.currentPathLength = 0
      this.finalTile = null
    } else {
      console.log('no, different tile')
    }
  }
  clickMove(pointer) {
    if (this.startMove) {
      if (this.continueMove) {
        let row = Math.floor((pointer.worldY - gameOptions.offsetY) / gameOptions.tileSize);
        let col = Math.floor((pointer.worldX - gameOptions.offsetX) / gameOptions.tileSize);
        console.log(row + ', ' + col)
        if (this.validPick(row, col)) {
          // console.log('valid')
          this.currentTile = { row: row, column: col }
          if (!isSameTile(this.previousTile, this.currentTile) && areNext(this.previousTile, this.currentTile) && this.currentPathCost < 10) { //&& !this.unitAtTile(row, col) && this.currentPathCost < this.getUnitMovement(this.selectedTile.row, this.selectedTile.column)
            this.clearPath()
            this.currentPathCost = 0
            console.log('good pick')
            this.previousTile = { row: row, column: col }
            easystar.findPath(this.selectedTile.column, this.selectedTile.row, this.currentTile.column, this.currentTile.row, function (path) {
              if (path === null) {
                console.log("Path was not found.");
              } else {
                console.log("Path was found. The first Point is " + path[0].x + " " + path[0].y);
                //console.log(path)
                this.drawPath(path)
                finalPath = path
                this.finalTile = { row: row, column: col }
                this.currentPathCost = pathCost(finalPath)

                console.log('Max: ' + this.maxPath + ' Path Length: ' + finalPath.length)
              }
            }.bind(this));
            easystar.calculate();
          }
        }

      }
    } else {
      if (!pointer.isDown) return;
      // console.log(p.x - p.prevPosition.x)
      if (pointer.x - pointer.prevPosition.x != 0) {
        this.drag = true
        this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
        this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
      }
    }


  }
  clickEnd(pointer) {
    if (this.drag) {
      this.drag = false
      return
    }

    if (this.startMove) {
      if (this.continueMove) {
        var pl = finalPath.length - 1
        console.log('final Path length' + pl)
        console.log('Path cost: ' + this.currentPathCost)
        this.moveUnit()
        this.startMove = false
        this.continueMove = false
      }
    } else {
      let row = Math.floor((pointer.worldY - gameOptions.offsetY) / gameOptions.tileSize);
      let col = Math.floor((pointer.worldX - gameOptions.offsetX) / gameOptions.tileSize);
      if (this.validPick(row, col)) {

        this.events.emit('closeMenu')
        this.events.emit('hideBuild');
        this.events.emit('hideImpBuild')
        this.events.emit('hideUnitBuild')
        this.selectedTile = null
        this.selectedUnit = null
        console.log(row + ', ' + col)
        console.log('Border number: ' + getBorderNumber(row, col))
        var pos = getPosition(row, col)
        //this.cameras.main.centerOn(pos.x, pos.y)
        this.cursor.setPosition(pos.x, pos.y)
        this.selectedTile = { row: row, column: col }
        if (groundLayerData[row][col].explored) {
          console.log(groundStaticData[groundLayerData[row][col].frame].name)
          console.log(groundLayerData[row][col])
          this.events.emit('updateGround', groundLayerData[row][col]);

          this.events.emit('showBuild');
          this.events.emit('showGroundHelp');

          if (improvementLayerData[row][col] != null) {
            console.log(improvementLayerData[row][col])
            this.events.emit('showImpBuild');
            this.events.emit('hideBuild');

            this.events.emit('updateImprovement', improvementLayerData[row][col]);
          } else {
            this.events.emit('hideImprovement')
            this.events.emit('showBuild');
            this.events.emit('hideImpBuild')
          }
          if (unitLayerData[row][col] != null) {
            this.selectedUnit = unitLayerData[row][col]
            console.log(unitLayerData[row][col])
            this.events.emit('hideUnitBuild')
            this.events.emit('updateUnit', unitLayerData[row][col]);
          } else {
            this.events.emit('hideUnit')
            this.events.emit('showUnitBuild');
          }

        } else {
          console.log('???')
          console.log(groundStaticData[11].name)
          this.events.emit('hideGroundHelp');
          if (isConnectedOwner(row, col)) {
            console.log('connected to owner')
            this.events.emit('updateGroundUnknown', true)
            this.events.emit('hideUnit')
            this.events.emit('hideImprovement')
            this.events.emit('showBuild');
            this.events.emit('hideImpBuild')
          } else {
            console.log('NOT connected to owner')
            this.events.emit('updateGroundUnknown', false)
            this.events.emit('hideUnit')
            this.events.emit('hideImprovement')
            this.events.emit('hideBuild');
            this.events.emit('hideImpBuild')
          }



        }

        // console.log(groundLayerData[row][col])
      }
    }





  }
  drawPath(path) {
    // var cost = 0
    console.log(this.selectedUnit)
    console.log(unitTypes[this.selectedUnit.id].movement)
    for (let i = 1; i < path.length; i++) {// unitTypes[this.selectedUnit.id].movement
      const elementPrev = path[i - 1]
      const element = path[i];

      // cost += this.getCost(element.y, element.x)

      var imagePrev = groundLayerImage[elementPrev.y][elementPrev.x]
      var image = groundLayerImage[element.y][element.x]
      var line = this.add.line(null, null, imagePrev.x, imagePrev.y, image.x, image.y, 0xCD6155, 1).setOrigin(0);
      line.setLineWidth(gameOptions.lineWidth).setDepth(8)
      this.lineArray.push(line)
      if (i == path.length - 1) {
        //(scene [, x] [, y] [, points] [, innerRadius] [, outerRadius] [, fillColor] [, fillAlpha])
        // var rect = this.add.star(image.x, image.y, 6, gameOptions.tileSize * .3, gameOptions.tileSize * .5, 0xCD6155, 1)
        var rect = this.add.ellipse(image.x, image.y, gameOptions.tileSize * .75, gameOptions.tileSize * .75, 0xCD6155, 1).setDepth(8)

        //var rect = this.add.rectangle(image.x, image.y, gameOptions.tileSize * .85, gameOptions.tileSize * .85, 0xfafafa)
      } else {
        var rect = this.add.rectangle(image.x, image.y, gameOptions.tileSize / 4, gameOptions.tileSize / 4, 0xCD6155, 1).setDepth(8)
      }

      this.rectArray.push(rect)


    }
    // console.log('current path cost ' + cost)
  }
  clearPath() {
    if (this.lineArray.length > 0) {
      this.lineArray.forEach(function (line) {
        line.destroy()
      }.bind(this))
      this.lineArray = []
    }
    if (this.rectArray.length > 0) {
      this.rectArray.forEach(function (rect) {
        rect.destroy()
      }.bind(this))
      this.rectArray = []
    }
  }
  moveUnit() {
    this.cursor.setPosition(-100, -100)
    this.cursor.setFrame(0)
    // this.events.emit('statusText', 'Moving...');
    var tweens1 = [];
    /* var worldXY = board.tileXYToWorldXY(path[1].x, path[1].y)
    var tween = this.tweens.add({
      targets: unit,
      x: worldXY.x,
      y: worldXY.y,
      duration: 500
    }) */
    // console.log(path)
    // this.updateText('Moving...')
    var cost = 0
    for (var i = 1; i < finalPath.length; i++) {
      var pos = getPosition(finalPath[i].y, finalPath[i].x)
      cost += getCost(finalPath[i].y, finalPath[i].x)
      //var ex = path[i + 1].x;
      //var ey = path[i + 1].y;
      tweens1.push({
        x: pos.x,
        y: pos.y
      });
    }
    console.log(cost)
    //unitDataArray[finalPath[0].y][finalPath[0].x].fuel -= cost

    var timeline = this.tweens.timeline({
      targets: unitLayerImage[this.selectedTile.row][this.selectedTile.column],
      duration: 500,
      tweens: tweens1,
      onComplete: function () {

        this.completeMovement()
        /* unit.data.positionX = destination.x
        unit.data.positionY = destination.y
        board.addChess(unit, destination.x, destination.y, unitZ, true)
        selectedUnit = null
        this.moveUnitFlag = false
        this.updateText('Unit moved') */

      },
      onCompleteScope: this
    })
  }
  completeMovement() {
    // this.events.emit('statusText', 'Unit moved');
    // this.events.emit('unSelectedText')
    console.log('movement done')
    this.clearPath()
    // console.log(this.selectedTile)
    // console.log(this.currentTile)
    this.swapUnit(this.selectedTile, this.finalTile)
    this.currentTile = []
    this.previousTile = []
    this.selectedTile = []
    this.finalTile = null
  }
  swapUnit(from, to) {
    var temp = unitLayerData[from.row][from.column]
    var tempImage = unitLayerImage[from.row][from.column]
    unitLayerData[to.row][to.column] = temp
    unitLayerData[from.row][from.column] = null
    unitLayerImage[to.row][to.column] = tempImage
    unitLayerImage[from.row][from.column] = null
  }
  doBonus(owner) {
    if (Phaser.Math.Between(1, 10) < gameOptions.bonusProbability) {
      var tile = getRandomGrassTiles(owner)
      if (tile) {
        var ind = weighted_random(bonusIndexes, bonusTilesWeight)
        this.addTile(tile.row, tile.column, owner, ind)
      }
    }

  }
  addTile(row, column, owner, type) {
    groundLayerData[row][column].owner = owner
    groundLayerData[row][column].frame = type
    map[row][column] = type
    groundLayerImage[row][column].setFrame(type)
  }
  removeImprovement(row, column) {
    console.log(improvementayerImage[row][column])
    improvementLayerData[row][column] = null
    groundLayerData[row][column].improved = false
    improvementayerImage[row][column].destroy()
    improvementayerImage[row][column] = null
    console.log(improvementayerImage[row][column])
  }

  addImprovement(row, column, owner, type) {
    if (improvementLayerData[row][column] != null) {
      //upgrade/replace
      improvementLayerData[row][column] = new Improvement(type, owner, gameData.turn, true, false)
      improvementayerImage[row][column].setFrame(type)
    } else {
      //new
      improvementLayerData[row][column] = new Improvement(type, owner, gameData.turn, true, false)
      groundLayerData[row][column].owner = owner
      // groundLayerData[row][column].frame = type
      groundLayerData[row][column].improved = true
      //map[row][column] = type
      //groundLayerImage[row][column].setFrame(type)
      var pos = getPosition(row, column)
      var imp = this.add.sprite(pos.x, pos.y, 'tiles', type).setDepth(improvementDepth)
      imp.displayWidth = gameOptions.tileSize// - 5
      imp.displayHeight = gameOptions.tileSize// - 5
      improvementayerImage[row][column] = imp
    }

  }
  addUnit(row, column, owner, type) {
    unitLayerData[row][column] = new Unit(type, owner, gameData.turn, true)
    var pos = getPosition(row, column)
    var frame = playerArray[owner].id
    var imp = this.add.sprite(pos.x, pos.y, 'units', unitTypes[type].frames[frame]).setDepth(unitDepth)
    imp.displayWidth = gameOptions.tileSize// - 5
    imp.displayHeight = gameOptions.tileSize// - 5
    unitLayerImage[row][column] = imp
  }
  removeUnit(row, column, owner) {
    this.explode(row, column)
    unitLayerData[row][column] = null

    unitLayerImage[row][column].destroy()
    unitLayerImage[row][column] = null
    this.events.emit('hideUnit')

  }
  upgradeUnit(row, column, owner, type) {

    deductCost(type)


    this.events.emit('updateResources')
    this.explode(row, column)
    console.log('Upgrade')
    console.log(row + ', ' + column)
    console.log(owner)
    console.log(type)
    unitLayerData[row][column].id = type
    unitLayerData[row][column].hp = 100
    var frame = playerArray[owner].id
    unitLayerImage[row][column].setFrame(unitTypes[type].frames[frame])
    this.events.emit('updateUnit', unitLayerData[row][column]);
  }
  exploreTile(row, column, owner) {
    groundLayerData[row][column].explored = true
    groundLayerData[row][column].owner = owner
    if (this.getGroundIndex(row, column) == 1) {
      //var ind = this.getRandomResourceIndex()
      if (this.start) {
        var ind = weighted_random(startIndexes, startTilesWeight)
        groundLayerData[row][column].frame = ind
        map[row][column] = ind
        groundLayerImage[row][column].setFrame(ind)

      } else {
        var ind = weighted_random(resourceIndexes, newTilesWeight)
        groundLayerData[row][column].frame = ind
        map[row][column] = ind
        groundLayerImage[row][column].setFrame(ind)
      }

    } else {
      groundLayerImage[row][column].setFrame(this.getGroundIndex(row, column))
    }

    groundLayerImage[row][column].setDepth(exploredDepth)
  }

  getRandomResourceIndex() {
    return resourceIndexes[Phaser.Math.Between(0, resourceIndexes.length - 1)]
  }
  getGroundIndex(row, column) {
    return map[row][column]
  }

  moveRange(row, column, range) {
    /*  for (x - n TO x + n):
     for (y - n TO x + n):
         if (abs(x - x2) + abs(y - y2) <= n):
             mark as okay. */
    var tiles = []
    for (var r = row - range; r <= row + range; r++) {
      for (var c = column - range; c <= column + range; c++) {
        if (Math.abs(row - r) + Math.abs(column - c) <= range && this.validPick(r, c)) {
          tiles.push({ row: r, column: c })
        }
      }
    }
    return tiles
  }

  validPick(row, column) {
    return row >= 0 && row < gameOptions.rows && column >= 0 && column < gameOptions.columns && map[row] != undefined && map[row][column] != undefined
  }
  addScore() {
    this.events.emit('score');
  }
  explode(row, column) {
    // let posX = this.xOffset + this.dotSize * x + this.dotSize / 2;
    // let posY = this.yOffset + this.dotSize * y + this.dotSize / 2
    var explosion = this.bursts.get().setActive(true);

    // Place the explosion on the screen, and play the animation.
    explosion.setOrigin(0.5, 0.5).setScale(gameOptions.scale + 1).setDepth(3);
    var pos = getPosition(row, column)
    explosion.setPosition(pos.x, pos.y)
    explosion.play('puff');
    explosion.on('animationcomplete', function () {
      explosion.setActive(false);
      explosion.setPosition(-64, -64)
    }, this);
  }
  setupAnimaiton() {
    this.anims.create({
      key: 'fire_anim',
      frames: this.anims.generateFrameNumbers('tiles', { frames: [112, 113, 114, 115] }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'puff',
      frames: 'puff',
      frameRate: 8,
      repeat: 0
    });
    this.bursts = this.add.group({
      defaultKey: 'puff',
      maxSize: 30
    });
    this.anims.create({
      key: 'farm_anim',
      frames: this.anims.generateFrameNumbers('tiles', { frames: [23, 56] }),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: 'lumber_anim',
      frames: this.anims.generateFrameNumbers('tiles', { frames: [24, 55] }),
      frameRate: 6,
      repeat: -1
    });
    /*   this.anims.create({
        key: 'enemy_anim',
        frames: this.anims.generateFrameNumbers('enemy', { frames: [0, 1, 2, 3, 0, 1, 2, 3] }),
        frameRate: 8,
        repeat: -1
      }); */
  }
}


