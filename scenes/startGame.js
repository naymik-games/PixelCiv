class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');

  }
  create() {

    gameData = JSON.parse(localStorage.getItem('PCSave'));
    if (gameData === null || gameData.length <= 0) {
      localStorage.setItem('PCSave', JSON.stringify(defaultValues));
      gameData = defaultValues;
    }

    this.cameras.main.setBackgroundColor(0xf7eac6);

    var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'SquareDots', 150).setOrigin(.5).setTint(0xc76210);

    var startTime = this.add.bitmapText(game.config.width / 2 - 50, 275, 'topaz', 'New Game', 50).setOrigin(0, .5).setTint(0x000000);
    var small = this.add.bitmapText(100, 375, 'topaz', 'small', 50).setOrigin(.5).setTint(0x000000).setInteractive();
    var medium = this.add.bitmapText(450, 375, 'topaz', 'medium', 50).setOrigin(.5).setTint(0x000000).setInteractive();
    var large = this.add.bitmapText(800, 375, 'topaz', 'large', 50).setOrigin(.5).setTint(0x000000).setInteractive();

    small.on('pointerdown', this.newSmall, this);
    medium.on('pointerdown', this.newMedium, this);
    large.on('pointerdown', this.newLarge, this);

    var startTime2 = this.add.bitmapText(game.config.width / 2 - 50, 575, 'topaz', 'Load Game', 50).setOrigin(0, .5).setTint(0x000000);
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
  }
  newMedium() {
    gameLoad = 'new'
    gameWidth = 90
    gameHeight = 60
    gameSeed = 34147
    gamePlayers = 5
    playerCiv = 1
    this.scene.start('playGame');
    this.scene.launch('UI');
  }
  newLarge() {
    gameLoad = 'new'
    gameWidth = 125
    gameHeight = 85
    gameSeed = 2368
    gamePlayers = 8
    playerCiv = 0
    this.scene.start('playGame');
    this.scene.launch('UI');
  }
  loadSaved() {
    gameLoad = 'load'
    this.scene.start('playGame');
    this.scene.launch('UI');
  }
}