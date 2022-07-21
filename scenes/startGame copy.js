class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');
    this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');

  }
  create() {

    gameData = JSON.parse(localStorage.getItem('PCSave'));
    if (gameData === null || gameData.length <= 0) {
      localStorage.setItem('PCSave', JSON.stringify(defaultValues));
      gameData = defaultValues;
    }
    this.mapSize = 'small'
    this.map = -1
    this.nation = 0
    this.cameras.main.setBackgroundColor(COLOR_MAIN_TAN);

    var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'PixelCiv', 150).setOrigin(.5).setTint(0xc76210);

    var startTime = this.add.bitmapText(game.config.width / 2 - 50, 275, 'topaz', 'New Game', 50).setOrigin(0, .5).setTint(COLOR_MAIN_ORANGE);
    var small = this.add.bitmapText(150, 375, 'topaz', 'SMALL', 50).setOrigin(.5).setTint(0x000000).setInteractive();
    var medium = this.add.bitmapText(450, 375, 'topaz', 'MEDIUM', 50).setOrigin(.5).setTint(0x000000).setInteractive();
    var large = this.add.bitmapText(750, 375, 'topaz', 'LARGE', 50).setOrigin(.5).setTint(0x000000).setInteractive();
    var selector1 = this.add.bitmapText(750, 375, 'topaz', '*', 70).setOrigin(1, .5).setTint(0x000000).setInteractive();
    var smallMap01 = this.add.bitmapText(150, 475, 'topaz', 'Map 1', 50).setOrigin(.5).setTint(COLOR_MAIN_ORANGE).setInteractive();
    smallMap01.on('pointerdown', function () {
      this.mapSize = 'small'
      this.map = 0
      selector1.setPosition((smallMap01.x - smallMap01.width / 2) - 10, smallMap01.y)
    }, this);
    var smallMap02 = this.add.bitmapText(150, 575, 'topaz', 'Map 2', 50).setOrigin(.5).setTint(COLOR_MAIN_ORANGE).setInteractive();
    smallMap02.on('pointerdown', function () {
      this.mapSize = 'small'
      this.map = 1
      selector1.setPosition((smallMap02.x - smallMap02.width / 2) - 10, smallMap02.y)
    }, this);
    var smallMap03 = this.add.bitmapText(150, 675, 'topaz', 'Map 3', 50).setOrigin(.5).setTint(COLOR_MAIN_ORANGE).setInteractive();
    smallMap03.on('pointerdown', function () {
      this.mapSize = 'small'
      this.map = 2
      selector1.setPosition((smallMap03.x - smallMap03.width / 2) - 10, smallMap03.y)
    }, this);
    var smallMap04 = this.add.bitmapText(150, 775, 'topaz', 'Map R', 50).setOrigin(.5).setTint(COLOR_MAIN_ORANGE).setInteractive();
    smallMap04.on('pointerdown', function () {
      this.mapSize = 'small'
      this.map = -1
      selector1.setPosition((smallMap04.x - smallMap04.width / 2) - 10, smallMap04.y)
    }, this);


    var mediumMap01 = this.add.bitmapText(450, 475, 'topaz', 'Map 1', 50).setOrigin(.5).setTint(COLOR_MAIN_ORANGE).setInteractive();
    mediumMap01.on('pointerdown', function () {
      this.mapSize = 'medium'
      this.map = 0
      selector1.setPosition((mediumMap01.x - mediumMap01.width / 2) - 10, mediumMap01.y)
    }, this);
    var mediumMap02 = this.add.bitmapText(450, 575, 'topaz', 'Map 2', 50).setOrigin(.5).setTint(COLOR_MAIN_ORANGE).setInteractive();
    mediumMap02.on('pointerdown', function () {
      this.mapSize = 'medium'
      this.map = 1
      selector1.setPosition((mediumMap02.x - mediumMap02.width / 2) - 10, mediumMap02.y)
    }, this);
    var mediumMap03 = this.add.bitmapText(450, 675, 'topaz', 'Map 3', 50).setOrigin(.5).setTint(COLOR_MAIN_ORANGE).setInteractive();
    mediumMap03.on('pointerdown', function () {
      this.mapSize = 'medium'
      this.map = 2
      selector1.setPosition((mediumMap03.x - mediumMap03.width / 2) - 10, mediumMap03.y)
    }, this);
    var mediumMap04 = this.add.bitmapText(450, 775, 'topaz', 'Map R', 50).setOrigin(.5).setTint(COLOR_MAIN_ORANGE).setInteractive();
    mediumMap04.on('pointerdown', function () {
      this.mapSize = 'medium'
      this.map = -1
      selector1.setPosition((mediumMap04.x - mediumMap04.width / 2) - 10, mediumMap04.y)
    }, this);

    var largeMap01 = this.add.bitmapText(750, 475, 'topaz', 'Map 1', 50).setOrigin(.5).setTint(COLOR_MAIN_ORANGE).setInteractive();
    largeMap01.on('pointerdown', function () {
      this.mapSize = 'large'
      this.map = 0
      selector1.setPosition((largeMap01.x - largeMap01.width / 2) - 10, largeMap01.y)
    }, this);
    var largeMap02 = this.add.bitmapText(750, 575, 'topaz', 'Map 2', 50).setOrigin(.5).setTint(COLOR_MAIN_ORANGE).setInteractive();
    largeMap02.on('pointerdown', function () {
      this.mapSize = 'large'
      this.map = 1
      selector1.setPosition((largeMap02.x - largeMap02.width / 2) - 10, largeMap02.y)
    }, this);
    var largeMap03 = this.add.bitmapText(750, 675, 'topaz', 'Map 3', 50).setOrigin(.5).setTint(COLOR_MAIN_ORANGE).setInteractive();
    largeMap03.on('pointerdown', function () {
      this.mapSize = 'large'
      this.map = 2
      selector1.setPosition((largeMap03.x - largeMap03.width / 2) - 10, largeMap03.y)
    }, this);
    var largeMap04 = this.add.bitmapText(750, 775, 'topaz', 'Map R', 50).setOrigin(.5).setTint(COLOR_MAIN_ORANGE).setInteractive();
    largeMap04.on('pointerdown', function () {
      this.mapSize = 'large'
      this.map = -1
      selector1.setPosition((largeMap04.x - largeMap04.width / 2) - 10, largeMap04.y)
    }, this);

    // small.on('pointerdown', this.newSmall, this);
    //  medium.on('pointerdown', this.newMedium, this);
    //  large.on('pointerdown', this.newLarge, this);







    var startTime2 = this.add.bitmapText(game.config.width / 2 - 50, 1575, 'topaz', 'Load Game', 50).setOrigin(0, .5).setTint(0x000000);
    startTime2.setInteractive();
    startTime2.on('pointerdown', this.loadSaved, this);


  }
  newSmall() {
    gameLoad = 'new'
    gameWidth = 50
    gameHeight = 35
    gameSeed = 2368
    gamePlayers = 3
    playerCiv = 3
    this.scene.start('playGame');
    this.scene.launch('UI');
    this.scene.launch('showMessages');
    //2368, 87522,298765
  }
  newMedium() {
    gameLoad = 'new'
    gameWidth = 90
    gameHeight = 60
    gameSeed = Math.floor(Math.random() * 90000) + 10000;
    gamePlayers = 5
    playerCiv = 0
    this.scene.start('playGame');
    this.scene.launch('UI');
    this.scene.launch('showMessages');
    //34147,84959,550932
  }
  newLarge() {
    gameLoad = 'new'
    gameWidth = 125
    gameHeight = 85
    gameSeed = 89763
    gamePlayers = 8
    playerCiv = 0
    this.scene.start('playGame');
    this.scene.launch('UI');
    this.scene.launch('showMessages');
    // 2368,68340
  }
  loadSaved() {
    gameLoad = 'load'
    this.scene.start('playGame');
    this.scene.launch('UI');
    this.scene.launch('showMessages');
  }
}