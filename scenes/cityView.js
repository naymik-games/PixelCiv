class cityView extends Phaser.Scene {
  constructor() {
    super("cityView");
  }
  preload() {



  }
  init(data) {
    this.level = data.level;
    this.group = data.group

  }
  create() {
    this.Main = this.scene.get('playGame');
    this.select = theGame.tileData[this.Main.selectedTile.y][this.Main.selectedTile.x]
    var background = this.add.image(450, 100, 'blank').setOrigin(.5, 0).setTint(0xe1c59e);
    background.displayWidth = 900
    background.displayHeight = 1440
    this.subHeader = this.add.image(game.config.width / 2, 0, 'blank').setOrigin(.5, 0).setTint(0xAF5E49).setAlpha(1);
    this.subHeader.displayWidth = game.config.width;
    this.subHeader.displayHeight = 100;
    var title = this.add.bitmapText(10, 50, 'topaz', civs[theGame.playerCiv].cityNames[this.select.city], 55).setOrigin(0, .5).setTint(0xe1c59e);
    //var titleText = this.add.bitmapText(450, 375, 'topaz', civs[theGame.playerCiv].name, 80).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);

    this.city = theGame.countries[theGame.currentPlayer].cities[this.select.city]
    var cancelIcon = this.add.image(850, 50, 'icons', 2).setInteractive().setScale(.8);
    cancelIcon.on('pointerdown', this.cancel, this);

    var popIcon = this.add.image(75, 200, 'icons', 10).setScale(1).setAlpha(1);
    var popLabel = this.add.bitmapText(175, 200, 'topaz', this.city.population, 50).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);

    var foodBoxIcon = this.add.image(575, 400, 'icons', 11).setScale(1).setAlpha(1);
    var foodProduction = getBaseFood(theGame.currentPlayer, this.select.city)
    var foodOut = this.city.population * 2
    var food = this.city.food
    var netFoodPerTurn = foodProduction - foodOut
    // var foodNet = (foodProduction + foodStorage) - foodOut
    var foodNet = (food + netFoodPerTurn)
    var tempFoodText = foodProduction + ' - ' + foodOut
    var foodIcon = this.add.image(75, 400, 'icons', 9).setScale(1).setAlpha(1);
    var tempFoodLabel = 'FPT  Citizen Need   Storage  Needed'
    var foodLabel = this.add.bitmapText(175, 300, 'topaz', tempFoodLabel, 40).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);
    var foodText = this.add.bitmapText(175, 400, 'topaz', tempFoodText, 50).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);
    var foodText = this.add.bitmapText(575, 400, 'topaz', foodNet, 45).setOrigin(.5, .5).setTint(0xAF5E49).setAlpha(1);


    var productionIcon = this.add.image(75, 750, 'icons', 5).setScale(1).setAlpha(1);
    var hammerProduction = getBaseProduction(theGame.currentPlayer, this.select.city)
    var hptLabel = this.add.bitmapText(175, 750, 'topaz', hammerProduction + ' / ' + this.city.production, 40).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);

    var tradeIcon = this.add.image(75, 900, 'icons', 6).setScale(1).setAlpha(1);
    var tradeProduction = getBaseTrade(theGame.currentPlayer, this.select.city)
    var tradeLabel = this.add.bitmapText(175, 900, 'topaz', tradeProduction + ' / ' + this.city.trade, 40).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);

  }
  cancel() {

    this.scene.resume('playGame');
    this.scene.resume('UI');
    this.scene.stop();
  }
}