let conintueGame
class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');

  }
  create() {
    var text = 'PLAY'
    gameData = JSON.parse(localStorage.getItem('PixelCivGameData'));
    if (gameData === null || gameData.length <= 0) {

      gameData = gameDataDefault;

      conintueGame = false
      var turn = ''
    } else {
      text = 'CONTINUE'
      conintueGame = true
      var turn = 1
    }

    gameOptions = gameOptionsDefault
    this.cameras.main.setBackgroundColor(0x000000);

    // var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'SquareDots', 150).setOrigin(.5).setTint(0xc76210);
    this.title = this.add.text(game.config.width / 2, 100, 'PixelCiv', { fontFamily: 'KenneyPixelSquare', fontSize: '100px', color: '#fafafa', align: 'center' }).setOrigin(.5).setTint(0xc76210);

    if (conintueGame) {
      var startContinue = this.add.text(game.config.width / 2, 275, 'CONTINUE GAME', { fontFamily: 'KenneyPixelSquare', fontSize: '75px', color: '#fafafa', align: 'center' }).setOrigin(.5).setTint(0xfafafa);
      startContinue.setInteractive();
      startContinue.on('pointerdown', this.loadGame, this);
      var turnText = this.add.text(game.config.width / 2, 375, gameData.day, { fontFamily: 'KenneyMiniSquare', fontSize: '40px', color: '#fa0000', align: 'center' }).setOrigin(.5)

    }


    var numPlayers = 3
    var playerLabelText = this.add.text(game.config.width / 2, 475, 'PLAYERS', { fontFamily: 'KenneyPixelSquare', fontSize: '60px', color: '#979797', align: 'center' }).setOrigin(.5)
    var playerText = this.add.text(game.config.width / 2, 575, numPlayers, { fontFamily: 'KenneyPixelSquare', fontSize: '50px', color: '#fafafa', align: 'center' }).setOrigin(.5).setInteractive()
    playerText.on('pointerdown', function () {
      numPlayers++
      if (numPlayers == 5) {
        numPlayers = 2
      }
      gameOptions.numberOfPlayers = numPlayers
      playerText.setText(numPlayers)
    }, this)


    this.nationNum = 0
    var nationLabelText = this.add.text(game.config.width / 2, 675, 'CHOOSE NATION', { fontFamily: 'KenneyPixelSquare', fontSize: '60px', color: '#979797', align: 'center' }).setOrigin(.5)
    var nationText = this.add.text(game.config.width / 2, 775, staticPlayerData[this.nationNum].name, { fontFamily: 'KenneyPixelSquare', fontSize: '50px', color: '#fafafa', align: 'center' }).setOrigin(.5).setInteractive()
    var nationIcon = this.add.image(game.config.width / 2, 900, 'player_icons', 0).setScale(8)
    nationText.on('pointerdown', function () {
      this.nationNum++
      if (this.nationNum == 4) {
        this.nationNum = 0
      }
      nationText.setText(staticPlayerData[this.nationNum].name)
      nationIcon.setFrame(this.nationNum)
    }, this)
    //var fire = this.add.sprite(game.config.width / 2, 550, 'fire', 0).setScale(8)

    var difficulty = 1
    var diffs = ['EASY', 'NORMAL', 'HARD']
    var difficultyLabelText = this.add.text(game.config.width / 2, 1025, 'DIFFICULTY', { fontFamily: 'KenneyPixelSquare', fontSize: '60px', color: '#979797', align: 'center' }).setOrigin(.5)
    var difficultyText = this.add.text(game.config.width / 2, 1125, diffs[difficulty], { fontFamily: 'KenneyPixelSquare', fontSize: '50px', color: '#fafafa', align: 'center' }).setOrigin(.5).setInteractive()
    // var nationIcon = this.add.image(game.config.width / 2, 900, 'player_icons', 0).setScale(8)
    difficultyText.on('pointerdown', function () {
      difficulty++
      if (difficulty == 3) {
        difficulty = 0
      }
      gameOptions.difficulty = difficulty
      gameOptions.autopay = autopayValues[difficulty]
      gameOptions.initialTileRange = initialTileRangeValues[difficulty]
      gameOptions.aiExploreProbability = aiExploreProbabilityValues[difficulty]
      gameOptions.bonusProbability = bonusProbabilityValues[difficulty]
      difficultyText.setText(diffs[difficulty])

    }, this)







    var startTime = this.add.text(game.config.width / 2, 1275, 'NEW GAME', { fontFamily: 'KenneyPixelSquare', fontSize: '75px', color: '#fafafa', align: 'center' }).setOrigin(.5).setTint(0xfafafa);
    startTime.setInteractive();
    startTime.on('pointerdown', this.newGameClick, this);




    var godModeText = this.add.text(25, 1375, 'GOD MODE', { fontFamily: 'KenneyPixelSquare', fontSize: '40px', color: '#fafafa', align: 'left' }).setOrigin(0, .5).setTint(0xfafafa)
    var godSwitch = this.add.image(25, 1475, 'switch', godMode).setScale(4).setInteractive().setOrigin(0, .5)
    godSwitch.on('pointerdown', function () {
      if (godMode == 0) {
        godMode = 1
        godSwitch.setFrame(godMode)
      } else {
        godMode = 0
        godSwitch.setFrame(godMode)
      }
    }, this)

    if (conintueGame) {
      var eraseText = this.add.text(game.config.width - 25, 1375, 'ERASE', { fontFamily: 'KenneyPixelSquare', fontSize: '40px', color: '#fafafa', align: 'left' }).setOrigin(1, .5).setTint(0xfafafa).setInteractive()
      eraseText.on('pointerdown', function () {
        localStorage.removeItem('PixelCivPlayers');
        localStorage.removeItem('PixelCivMap');
        localStorage.removeItem('PixelCivGroundData');
        localStorage.removeItem('PixelCivImprovementData');
        localStorage.removeItem('PixelCivUnitData');
        localStorage.removeItem('PixelCivGameData');
        localStorage.removeItem('PixelCivGameOptions');
        this.scene.restart()
      }, this)
    }

    /*     this.clearDataText = this.add.text(game.config.width / 2, 1550, 'RESET DATA', { fontFamily: 'PixelSquare', fontSize: '40px', color: '#fa0000', align: 'center' }).setOrigin(.5).setInteractive()
        this.clearDataText.on('pointerdown', function () {
    
          this.clearDataText.setText('DATA CLEARED')
          turnText.setText(0)
    
          startTime.setText('PLAY')
          localStorage.removeItem('SettlersData');
          localStorage.removeItem('SettlersMap');
          localStorage.setItem('SettlersData', JSON.stringify(gameDataDefault));
          localStorage.setItem('SettlersMap', JSON.stringify(mapDefault));
          gameData = gameDataDefault;
          map = mapDefault
        }, this) */


  }
  newGameClick() {
    newGame = true
    var startResource = JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]));
    playerArray = []
    if (this.nationNum == 0) {
      playerArray.push(new Player(0, true, staticPlayerData[0].name, staticPlayerData[0].frame, 0, JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]))))
      playerArray.push(new Player(2, false, staticPlayerData[2].name, staticPlayerData[2].frame, 1, JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]))))
      playerArray.push(new Player(1, false, staticPlayerData[1].name, staticPlayerData[1].frame, 2, JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]))))
      playerArray.push(new Player(3, false, staticPlayerData[3].name, staticPlayerData[3].frame, 3, JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]))))
    } else if (this.nationNum == 1) {
      playerArray.push(new Player(1, true, staticPlayerData[1].name, staticPlayerData[1].frame, 0, JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]))))
      playerArray.push(new Player(2, false, staticPlayerData[2].name, staticPlayerData[2].frame, 1, JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]))))
      playerArray.push(new Player(0, false, staticPlayerData[0].name, staticPlayerData[0].frame, 2, JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]))))
      playerArray.push(new Player(3, false, staticPlayerData[3].name, staticPlayerData[3].frame, 3, JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]))))
    } else if (this.nationNum == 2) {
      playerArray.push(new Player(2, true, staticPlayerData[2].name, staticPlayerData[2].frame, 0, JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]))))
      playerArray.push(new Player(0, false, staticPlayerData[0].name, staticPlayerData[0].frame, 1, JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]))))
      playerArray.push(new Player(1, false, staticPlayerData[1].name, staticPlayerData[1].frame, 2, JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]))))
      playerArray.push(new Player(3, false, staticPlayerData[3].name, staticPlayerData[3].frame, 3, JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]))))
    } else if (this.nationNum == 3) {
      playerArray.push(new Player(3, true, staticPlayerData[3].name, staticPlayerData[3].frame, 0, JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]))))
      playerArray.push(new Player(2, false, staticPlayerData[2].name, staticPlayerData[2].frame, 1, JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]))))
      playerArray.push(new Player(1, false, staticPlayerData[1].name, staticPlayerData[1].frame, 2, JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]))))
      playerArray.push(new Player(0, false, staticPlayerData[0].name, staticPlayerData[0].frame, 3, JSON.parse(JSON.stringify(startingValues[gameOptions.difficulty]))))
    }

    /*     playerArray.push(new Player(2, true, staticPlayerData[2].name, staticPlayerData[2].frame, 0))
        playerArray.push(new Player(0, false, staticPlayerData[0].name, staticPlayerData[0].frame, 1))
        playerArray.push(new Player(1, false, staticPlayerData[1].name, staticPlayerData[1].frame, 2)) */
    this.scene.start('playGame');
    //this.scene.launch('UI');
  }
  loadGame() {
    newGame = false
    playerArray = []
    playerArray = JSON.parse(localStorage.getItem('PixelCivPlayers'));
    map = JSON.parse(localStorage.getItem('PixelCivMap'));
    groundLayerData = JSON.parse(localStorage.getItem('PixelCivGroundData'));
    improvementLayerData = JSON.parse(localStorage.getItem('PixelCivImprovementData'));
    unitLayerData = JSON.parse(localStorage.getItem('PixelCivUnitData'));
    // = JSON.parse(localStorage.getItem('PixelCivGameData'));
    gameOptions = JSON.parse(localStorage.getItem('PixelCivGameOptions'));
    this.scene.start('playGame');
  }

}