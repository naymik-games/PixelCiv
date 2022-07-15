class countryView extends Phaser.Scene {
  constructor() {
    super("countryView");
  }
  preload() {



  }
  init(data) {
    this.level = data.level;
    this.group = data.group

  }
  create() {
    var background = this.add.image(450, 100, 'blank').setOrigin(.5, 0).setTint(0xe1c59e);
    background.displayWidth = 900
    background.displayHeight = 1200
    this.subHeader = this.add.image(game.config.width / 2, 0, 'blank').setOrigin(.5, 0).setTint(0xAF5E49).setAlpha(1);
    this.subHeader.displayWidth = game.config.width;
    this.subHeader.displayHeight = 100;
    var title = this.add.bitmapText(10, 50, 'topaz', civs[theGame.playerCiv].name, 55).setOrigin(0, .5).setTint(0xe1c59e);
    //var titleText = this.add.bitmapText(450, 375, 'topaz', civNames[theGame.playerCiv], 80).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    console.log(theGame.countries[theGame.currentPlayer].techs)

    var text = ''
    for (let i = 0; i < theGame.countries[theGame.currentPlayer].techs.length; i++) {
      var tec = theGame.countries[theGame.currentPlayer].techs[i]
      text += techTree[tec].name + ' '

    }
    var tech = this.add.bitmapText(10, 250, 'topaz', text, 55).setOrigin(0, .5).setTint(0xAF5E49);

    var cancelIcon = this.add.image(850, 50, 'icons', 2).setInteractive().setScale(.8);
    cancelIcon.on('pointerdown', this.cancel, this);

  }
  cancel() {
    this.scene.resume('playGame');
    this.scene.resume('UI');
    this.scene.stop();
  }
}