class unitUI extends Phaser.Scene {
  constructor() {
    super("unitUI");
  }
  preload() {



  }
  init(data) {
    this.unit = data.unit;
    this.tile = data.tile;


  }
  create() {
    console.log(this.unit)
    this.subHeader = this.add.image(game.config.width / 2, 1240, 'blank').setOrigin(.5, 0).setTint(0x000000).setAlpha(.7);
    this.subHeader.displayWidth = game.config.width;
    this.subHeader.displayHeight = 100;
    this.unitDetails = this.add.bitmapText(450, 1290, 'topaz', unitInfo[this.unit.id].name, 55).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    console.log(unitInfo[this.unit.id].actions)
    for (let i = 0; i < unitInfo[this.unit.id].actions.length; i++) {
      const action = unitInfo[this.unit.id].actions[i];
      var actionButton = this.add.image(200 + i * 125, 1390, 'actions', action).setInteractive().setAlpha(1)
      actionButton.action = action
      actionButton.on('pointerup', this.unitAction.bind(this, actionButton));
    }

  }
  unitAction(action) {
    if (action.action == 0) {
      //farm
      this.unit.currentAction = action.action
      this.unit.performingAction = true
      this.unit.currentLocation = this.tile
      this.unit.dayPlaced = theGame.day
      this.scene.stop();
    } else if (action.action == 2) {
      //go to
      this.scene.stop();
    }
    console.log(this.unit)
  }
}