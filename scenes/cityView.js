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

    this.city = theGame.countries[theGame.currentPlayer].cities[this.select.city]
    console.log(theGame.countries[theGame.currentPlayer])

    var title = this.add.bitmapText(10, 50, 'topaz', civs[theGame.playerCiv].cityNames[this.select.city] + '-' + cityType[this.city.size], 55).setOrigin(0, .5).setTint(0xe1c59e);
    //var titleText = this.add.bitmapText(450, 375, 'topaz', civs[theGame.playerCiv].name, 80).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);

    this.city = theGame.countries[theGame.currentPlayer].cities[this.select.city]
    var cancelIcon = this.add.image(850, 50, 'icons', 2).setInteractive().setScale(.8);
    cancelIcon.on('pointerdown', this.cancel, this);

    var popIcon = this.add.image(75, 200, 'icons', 24).setScale(1).setAlpha(1);
    var popLabel = this.add.bitmapText(175, 200, 'topaz', this.city.population, 50).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);

    for (let i = 0; i < theGame.countries[theGame.currentPlayer].cities[this.select.city].citizens.length; i++) {
      const citizen = theGame.countries[theGame.currentPlayer].cities[this.select.city].citizens[i];
      var citizenIcon = this.add.image(250 + i * 75, 200, 'citizens', citizen.state).setScale(1).setAlpha(1);
    }


    var foodBoxIcon = this.add.image(575, 400, 'icons', 11).setScale(.75).setAlpha(1);
    var foodProduction = getBaseFood(theGame.currentPlayer, this.select.city)
    var foodOut = this.city.population * 2
    var food = this.city.food
    var netFoodPerTurn = foodProduction - foodOut
    // var foodNet = (foodProduction + foodStorage) - foodOut
    var foodNet = (food + netFoodPerTurn)
    var tempFoodText = foodProduction + ' - ' + foodOut
    var foodIcon = this.add.image(75, 400, 'icons', 9).setScale(.75).setAlpha(1);
    var tempFoodLabel = 'FPT  Citizen Need   Storage  Needed'
    var foodLabel = this.add.bitmapText(175, 300, 'topaz', tempFoodLabel, 30).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);
    var foodText = this.add.bitmapText(175, 400, 'topaz', tempFoodText, 40).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);
    var foodText = this.add.bitmapText(575, 400, 'topaz', foodNet, 40).setOrigin(.5, .5).setTint(0xAF5E49).setAlpha(1);
    var foodStorage = this.add.bitmapText(675, 400, 'topaz', this.city.foodStorage, 45).setOrigin(.5, .5).setTint(0xAF5E49).setAlpha(1);

    var hammerBoxIcon = this.add.image(575, 525, 'icons', 11).setScale(.75).setAlpha(1);
    var productionIcon = this.add.image(75, 525, 'icons', 5).setScale(.75).setAlpha(1);
    var hammerProduction = getBaseProduction(theGame.currentPlayer, this.select.city)
    var hptLabel = this.add.bitmapText(175, 525, 'topaz', hammerProduction, 40).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);
    var hammerNet = this.city.production + hammerProduction
    var hsLabel = this.add.bitmapText(575, 525, 'topaz', hammerNet, 40).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);


    var tradeBoxIcon = this.add.image(575, 650, 'icons', 11).setScale(.75).setAlpha(1);
    var tradeIcon = this.add.image(75, 650, 'icons', 6).setScale(.75).setAlpha(1);

    var tPT = getBaseTrade(theGame.currentPlayer, this.select.city)
    var tUnitCost = getUnitSupportCost(theGame.currentPlayer, this.select.city)
    var tMaintenance = this.city.maintenance
    var tTotalLoss = tUnitCost + tMaintenance
    var tGain = tPT - tTotalLoss
    var tBox = this.city.trade
    var tNet = tBox + tGain


    var tradeLabelText = tPT + ' - ' + tTotalLoss
    var tradeLabel = this.add.bitmapText(175, 650, 'topaz', tradeLabelText, 40).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);

    var tsLabel = this.add.bitmapText(575, 650, 'topaz', tNet, 40).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);


    console.log(gameBoard.getDistance(this.Main.selectedTile, theGame.countries[theGame.currentPlayer].capital))
    var distanceText = this.add.bitmapText(25, 1500, 'topaz', 'Distance to captial: ', 40).setOrigin(0, .5).setTint(0x000000).setAlpha(1);
  }
  cancel() {

    this.scene.resume('playGame');
    this.scene.resume('UI');
    this.scene.stop();
  }
}