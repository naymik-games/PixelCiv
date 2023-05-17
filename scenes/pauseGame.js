class pauseGame extends Phaser.Scene {
  constructor() {
    super("pauseGame");
  }
  preload() {


  }
  create() {
    this.top = this.add.image(game.config.width / 2, 250, 'nation_panel_top').setOrigin(.5, 0);


    this.middle = this.add.image(game.config.width / 2, 300, 'nation_panel').setOrigin(.5, 0)
    this.middle.displayHeight = game.config.height - 300


    this.bottom = this.add.image(game.config.width / 2, game.config.height, 'nation_panel_bottom').setOrigin(.5, 1)
    this.close = this.add.image(game.config.width - 25, 275, 'game_icons', 5).setScale(.75).setOrigin(1, 0).setInteractive()
    this.close.on('pointerdown', function () {
      this.scene.stop()

      this.scene.resume('playGame')
      this.scene.resume('UI')
    }, this)
    console.log(playerArray[gameData.currentPlayer].resources[0])
    console.log(ownerTileCount(gameData.currentPlayer))
    console.log(countImprovements(gameData.currentPlayer))
    var sizeIndex = playerArray[gameData.currentPlayer].resources[0] * ownerTileCount(gameData.currentPlayer) * countImprovements(gameData.currentPlayer)

    /*    
    SCORE
    The amount of Gold Gold in a player's treasury
        The amount of resources a player possesses
        The number of tiles within your borders
        The number of cities in your empire
        The number of people in your empire
        The number of Social Policies you have adopted
        The number of technologies you possess
        The number of "Future Techs" you possess (as Future Tech is a repeatable technology)
        The number of wonders you have constructed (contributes the most points towards victory) */




    this.indexText = this.add.text(50, 275, 'SIZE INDEX: ' + sizeIndex, { fontFamily: 'KenneyMiniSquare', fontSize: '60px', color: '#fafafa', align: 'left' }).setOrigin(0)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    var resourceMap = [8, 9, 10, 11, 12, 13, 14, 15]
    for (let i = 0; i < 8; i++) {
      var lux = this.add.image(75 + i * 75, 500, 'resource_icons', resourceMap[i]).setScale(4).setOrigin(.5).setInteractive()
      var luxText = this.add.text(75 + i * 75, 550, playerArray[gameData.currentPlayer].luxuries[i], { fontFamily: 'KenneyMiniSquare', fontSize: '40px', color: '#fafafa', align: 'center' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

    }




    if (playerArray[gameData.currentPlayer].currentTech != null) {
      this.techText = this.add.text(50, 650, 'RESEARCHING ' + tech[playerArray[gameData.currentPlayer].currentTech.techIndex].name, { fontFamily: 'KenneyMiniSquare', fontSize: '40px', color: '#fafafa', align: 'left' }).setOrigin(0)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
      this.techSubText = this.add.text(50, 700, 'COMPLETE IN ' + techDaysTillComplete(), { fontFamily: 'KenneyMiniSquare', fontSize: '40px', color: '#fafafa', align: 'left' }).setOrigin(0)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

    } else {
      this.techText = this.add.text(50, 650, 'NOT RESEARCHING', { fontFamily: 'KenneyMiniSquare', fontSize: '40px', color: '#fafafa', align: 'left' }).setOrigin(0)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
      this.techSubText = this.add.text(50, 700, '', { fontFamily: 'KenneyMiniSquare', fontSize: '40px', color: '#fafafa', align: 'left' }).setOrigin(0)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

    }
    //TECH ICONS
    var x = 0
    for (let i = 0; i < playerArray[gameData.currentPlayer].techs.length; i++) {
      if (i <= 9) {
        var yoff = 800
        x = i
      } else if (i <= 19) {
        var yoff = 875
        x = i - 10
      } else {
        var yoff = 950
        x = i - 20
      }

      var lux = this.add.image(75 + x * 75, yoff, 'tech_icons', tech[playerArray[gameData.currentPlayer].techs[i]].iconIndex).setScale(4).setOrigin(.5).setInteractive()
    }


    this.techIcon = this.add.image(game.config.width - 75, 700, 'tech_icons', 1).setScale(6).setOrigin(.5).setInteractive()
    this.techIcon.on('pointerdown', function () {
      this.scene.pause()

      this.scene.launch('techScreen')

    }, this)
    //this.techTree = this.add.image(game.config.width / 2, game.config.height / 2, 'tech_tree').setScale(1).setOrigin(.5)

  }
}
