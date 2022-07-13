class unitUI extends Phaser.Scene {
  constructor() {
    super("unitUI");
  }
  preload() {



  }
  init(data) {
    this.units = data.units;
    this.tile = data.tile;
    this.chess = data.chess


  }
  create() {
    //console.log(this.unit)
    this.onUnit = 0
    this.unitTotal = this.units.length
    this.Main = this.scene.get('playGame');
    this.subHeader = this.add.image(game.config.width / 2, 1240, 'blank').setOrigin(.5, 0).setTint(0x000000).setAlpha(.7);
    this.subHeader.displayWidth = game.config.width;
    this.subHeader.displayHeight = 100;
    this.unitDetails = this.add.bitmapText(450, 1290, 'topaz', '', 55).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    var nextUnitButton = this.add.image(450, 1190, 'icons', 12).setInteractive().setAlpha(0)
    nextUnitButton.on('pointerdown', function () {
      this.onUnit++
      if (this.onUnit == this.unitTotal) {
        this.onUnit = 0
      }
      this.showUnit(this.onUnit)
    }, this)
    if (this.units.length > 1) {
      nextUnitButton.setAlpha(1)
    }
    this.showUnit(this.onUnit)
    //console.log(unitInfo[this.unit.id].actions)


  }
  showUnit(num) {
    if (buttonContainer) {
      buttonContainer.destroy()
    }
    this.unitDetails.setText(unitInfo[this.units[num].id].name + ' ' + this.units[num].index)
    for (let i = 0; i < this.chess.length; i++) {
      const element = this.chess[i];
      if (element.index == this.units[num].index) {
        element.setAlpha(.5)
        console.log(this.units[num])
        this.Main.selectedUnitChess = element
        this.Main.selectedUnit = this.units[num].index

      }

    }
    var buttonContainer = this.add.container()
    for (let i = 0; i < unitInfo[this.units[num].id].actions.length; i++) {
      const action = unitInfo[this.units[num].id].actions[i];
      var actionButton = this.add.image(200 + i * 125, 1390, 'actions', action).setInteractive().setAlpha(1)
      actionButton.action = action
      actionButton.unitNum = num
      actionButton.on('pointerup', this.unitAction.bind(this, actionButton));
      buttonContainer.add(actionButton)
    }
  }
  unitAction(action) {
    if (action.action == 0) {
      //farm
      console.log('start farm')
      this.units[action.unitNum].currentAction = action.action
      this.units[action.unitNum].performingAction = true
      this.units[action.unitNum].currentLocation = this.tile
      this.units[action.unitNum].dayPlaced = theGame.day
      this.units[action.unitNum].placed = true
      this.scene.stop();
    } else if (action.action == 1) {
      console.log('start mine')
      this.units[action.unitNum].currentAction = action.action
      this.units[action.unitNum].performingAction = true
      this.units[action.unitNum].currentLocation = this.tile
      this.units[action.unitNum].dayPlaced = theGame.day
      this.units[action.unitNum].placed = true
      this.scene.stop();
    } else if (action.action == 2) {
      //go to
      this.Main.moveUnit = true
      this.scene.stop();
    } else if (action.action == 4) {
      //settle
      this.units[action.unitNum].currentAction = action.action
      this.units[action.unitNum].performingAction = true
      this.units[action.unitNum].currentLocation = this.tile
      this.units[action.unitNum].dayPlaced = theGame.day
      this.units[action.unitNum].placed = true
      var newID = theGame.countries[this.units[0].owner].cities.length
      settleNewCity(this.units[action.unitNum].owner, this.tile, this.Main.selectedUnit, this.Main.selectedUnitChess, newID)
      this.Main.removeUnitChess(this.Main.selectedUnitChess)
      this.Main.addCity(this.tile, newID)
      this.scene.stop();
    } else if (action.action == 5) {
      //fortify
      this.units[action.unitNum].currentAction = action.action
      this.units[action.unitNum].performingAction = true
      this.units[action.unitNum].currentLocation = this.tile
      this.units[action.unitNum].dayPlaced = theGame.day
      this.units[action.unitNum].placed = true
      this.scene.stop();
    }
    console.log(this.unit)
  }
}