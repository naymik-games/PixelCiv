class worldView extends Phaser.Scene {
  constructor() {
    super("worldView");
  }
  preload() {



  }
  init(data) {
    this.level = data.level
    this.group = data.group

  }
  create() {
    var background = this.add.image(450, 100, 'blank').setOrigin(.5, 0).setTint(0xe1c59e);
    background.displayWidth = 900
    background.displayHeight = 1440
    this.subHeader = this.add.image(game.config.width / 2, 0, 'blank').setOrigin(.5, 0).setTint(0xAF5E49).setAlpha(1);
    this.subHeader.displayWidth = game.config.width;
    this.subHeader.displayHeight = 100;
    var title = this.add.bitmapText(10, 50, 'topaz', civs[theGame.playerCiv].name + ' - WORLD ADVISOR', 55).setOrigin(0, .5).setTint(0xe1c59e);

    var cancelIcon = this.add.image(850, 50, 'icons', 2).setInteractive().setScale(.8);
    cancelIcon.on('pointerdown', this.cancel, this);

    for (let c = 0; c < theGame.countries.length; c++) {
      const country = theGame.countries[c];
      console.log(civs[country.civ].name)
      var countryName = this.add.bitmapText(10, 300 + c * 125, 'topaz', civs[country.civ].name, 45).setOrigin(0, .5).setTint(0xAF5E49);

    }
  }
  cancel() {
    this.scene.resume('playGame');
    this.scene.resume('UI');
    this.scene.stop();
  }
}