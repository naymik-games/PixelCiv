class UI extends Phaser.Scene {

  constructor() {

    super("UI");
  }
  preload() {



  }
  create() {
    this.Main = this.scene.get('playGame');

    this.citizensVisible = false
    this.subHeader = this.add.image(game.config.width / 2, 0, 'blank').setOrigin(.5, 0).setTint(0xAF5E49).setAlpha(1);
    this.subHeader.displayWidth = game.config.width;
    this.subHeader.displayHeight = 100;

    this.currentPlayerText = this.add.bitmapText(10, 50, 'topaz', '', 55).setOrigin(0, .5).setTint(0xe1c59e).setAlpha(1).setInteractive();
    // this.currentPlayerText = this.add.bitmapText(10, 50, 'topaz', civNames[0], 55).setOrigin(0, .5).setTint(0xe1c59e).setAlpha(1).setInteractive();
    this.worldView = this.add.image(350, 50, 'icons', 22).setInteractive().setAlpha(1)
    this.worldView.on('pointerdown', function () {
      this.scene.pause('playGame');
      this.scene.pause();
      this.scene.launch('worldView');
    }, this)
    this.scienceView = this.add.image(450, 50, 'icons', 17).setInteractive().setAlpha(1)
    this.scienceView.on('pointerdown', function () {
      this.scene.pause('playGame');
      this.scene.pause();
      this.scene.launch('scienceView');
    }, this)
    this.cityView = this.add.image(550, 50, 'icons', 16).setInteractive().setAlpha(1)
    this.cityView.on('pointerdown', function () {
      this.scene.pause('playGame');
      this.scene.pause();
      this.scene.launch('countryView');
    }, this)
    this.saveCity = this.add.image(650, 50, 'icons', 14).setInteractive().setAlpha(1)
    this.saveCity.on('pointerdown', function () {
      this.Main.saveGame()
    }, this)
    this.gotToCity = this.add.image(750, 50, 'icons', 13).setInteractive().setAlpha(1)
    this.gotToCity.on('pointerdown', function () {
      this.Main.zoomToCity()
    }, this)
    this.turn = this.add.image(850, 50, 'icons', 11).setInteractive().setAlpha(1)
    this.dayText = this.add.bitmapText(this.turn.x, this.turn.y - 5, 'topaz', '1', 60).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.turn.on('pointerdown', function () {
      theGame.day++
      this.dayText.setText(theGame.day)
      this.Main.endRound()
      // this.Main.currentPlayer++
      /*     if (this.Main.currentPlayer == theGame.countries.length) {
            this.Main.currentPlayer = 0
            this.Main.day++
            this.dayText.setText(this.Main.day)
            this.Main.endRound()
          }
          this.Main.endPlayerTurn() */
      // this.currentPlayerText.setText(civs[theGame.countries[theGame.currentPlayer].civ].name)
    }, this)




    this.footer = this.add.image(game.config.width / 2, game.config.height, 'blank').setOrigin(.5, 1).setTint(0x000000).setAlpha(.7);
    this.footer.displayWidth = game.config.width;
    this.footer.displayHeight = 100;



    this.cityContainer = this.add.container()
    this.header = this.add.image(game.config.width / 2, 100, 'blank').setOrigin(.5, 0).setTint(0xe1c59e);
    this.header.displayWidth = 900;
    this.header.displayHeight = 175;
    this.cityContainer.add(this.header)
    this.sizeText = this.add.bitmapText(225, 215, 'topaz', '1', 40).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.cityContainer.add(this.sizeText)
    this.statusIcons = this.add.image(900, 100, 'status').setOrigin(1, 0)
    this.cityContainer.add(this.statusIcons)

    this.cityLabel = this.add.bitmapText(25, 150, 'topaz', ' ', 50).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);
    this.cityContainer.add(this.cityLabel)
    this.popLabel = this.add.bitmapText(350, 225, 'topaz', '-', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.cityContainer.add(this.popLabel)
    this.foodLabel = this.add.bitmapText(450, 225, 'topaz', '-', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.cityContainer.add(this.foodLabel)
    this.productionLabel = this.add.bitmapText(550, 225, 'topaz', '-', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.cityContainer.add(this.productionLabel)
    this.goldLabel = this.add.bitmapText(650, 225, 'topaz', '-', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.cityContainer.add(this.goldLabel)
    this.tradeLabel = this.add.bitmapText(750, 225, 'topaz', '-', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.cityContainer.add(this.tradeLabel)
    this.strengthLabel = this.add.bitmapText(850, 225, 'topaz', '-', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.cityContainer.add(this.strengthLabel)

    this.cityContainer.setAlpha(0)


    this.infoText = this.add.bitmapText(15, game.config.height - 50, 'topaz', 'status', 40).setOrigin(0, .5).setTint(0xcbf7ff).setAlpha(1);

    this.tempText = this.add.bitmapText(15, game.config.height - 450, 'topaz', 'temp', 50).setOrigin(0, .5).setTint(0xcbf7ff).setAlpha(1);


    var toggle = 0
    var cursor = this.add.image(825, 1490, 'icons', 3).setInteractive().setScale(1).setAlpha(.5);

    cursor.on('pointerdown', function () {
      if (toggle == 0) {
        this.Main.selectMode = 'drag'
        toggle = 1
        cursor.setAlpha(1)
        gameBoard.setInteractive(false)
      } else {
        this.Main.selectMode = 'click'
        toggle = 0
        cursor.setAlpha(.5)
        gameBoard.setInteractive(true)
      }
    }, this)



    this.cityButton = this.add.image(75, 1490, 'icons', 15).setInteractive().setAlpha(0)
    this.cityButton.on('pointerdown', function () {
      if (this.Main.currentPlayer > 0) { return }
      if (this.Main.selectedTile == null) { return }
      this.infoText.setText('View city details')
      this.scene.pause('playGame');
      this.scene.pause();
      this.scene.launch('cityView');
    }, this)
    this.build = this.add.image(175, 1490, 'icons', 4).setInteractive().setAlpha(0)
    this.build.on('pointerdown', function () {
      if (this.Main.currentPlayer > 0) { return }
      if (this.Main.selectedTile == null) { return }
      this.infoText.setText('Add city improvement')
      this.scene.pause('playGame');
      this.scene.pause();
      this.scene.launch('build');
    }, this)
    this.buildUnit = this.add.image(275, 1490, 'icons', 10).setInteractive().setAlpha(0)
    this.buildUnit.on('pointerdown', function () {
      if (this.Main.currentPlayer > 0) { return }
      if (this.Main.selectedTile == null) { return }
      this.infoText.setText('Add city unit')
      this.scene.pause('playGame');
      this.scene.pause();
      this.scene.launch('buildUnit');
    }, this)
    this.citizenButton = this.add.image(375, 1490, 'icons', 23).setInteractive().setAlpha(0)
    this.citizenButton.on('pointerdown', function () {
      if (this.Main.currentPlayer > 0) { return }
      if (this.Main.selectedTile == null) { return }
      //this.scene.pause('playGame'); 
      //this.scene.pause();
      //this.scene.launch('buildUnit');
      if (this.citizensVisible) {
        this.Main.hideCitizens()
        this.citizensVisible = false
        this.infoText.setText('')
      } else {
        this.Main.showCitizens()
        this.citizensVisible = true
        this.infoText.setText('Select citizen and then new tile')
      }

    }, this)

    this.Main.events.on('info', function (data) {
      this.infoText.setText(data)
    }, this);


  }

  update() {
    this.tempText.setText(JSON.stringify(this.Main.selectedTile))
  }
  cityStatsVisibility(status) {
    if (status == 'on') {
      this.cityContainer.setAlpha(1)
    } else {
      this.cityContainer.setAlpha(0)
    }
  }
  makeCitizenLayer() {
    this.citizenContainer = this.add.container()
    var owner = theGame.tileData[this.Main.selectedTile.y][this.Main.selectedTile.x].owner
    var city = theGame.tileData[this.Main.selectedTile.y][this.Main.selectedTile.x].city
    for (let i = 0; i < theGame.countries[owner].cities[city].citizens.length; i++) {
      const citizen = theGame.countries[owner].cities[city].citizens[i];
      var worldXY = gameBoard.tileXYToWorldXY(citizen.tile.x, citizen.tile.y)
      console.log(citizen.tile)
      var citizenIcon = this.add.image(worldXY.x, worldXY.y, 'citizens', citizen.state).setScale(1).setAlpha(1).setDepth(7);
      gameBoard.addChess(citizenIcon, citizen.tile.x, citizen.tile.y, 9, true);
    }
  }
  updatePop(selected, type) {
    if (selected != null) {
      if (type == 'city') {
        var owner = theGame.tileData[selected.y][selected.x].owner
        var city = theGame.tileData[selected.y][selected.x].city
        this.popLabel.setText(theGame.countries[owner].cities[city].population)
      } else {
        var owner = theGame.tileData[selected.y][selected.x].owner
        var city = theGame.tileData[selected.y][selected.x].city
        this.popLabel.setText(theGame.countries[owner].population)
      }


    } else {

      this.popLabel.setText('-')
    }
  }
  setStatusLabels(selected, type) {
    //console.log(selected)
    //this.currentPlayerText.setText(civs[theGame.playerCiv].name)
    if (selected != null) {
      if (type == 'city') {
        var owner = theGame.tileData[selected.y][selected.x].owner
        var city = theGame.tileData[selected.y][selected.x].city
        this.cityLabel.setText(theGame.countries[owner].cities[city].name)
        this.sizeText.setText(theGame.countries[owner].cities[city].size)
        this.productionLabel.setText(theGame.countries[owner].cities[city].production)
        this.goldLabel.setText(theGame.countries[owner].cities[city].trade)
        this.tradeLabel.setText(theGame.countries[owner].cities[city].trade)
        this.strengthLabel.setText(theGame.countries[owner].cities[city].strength)
        this.foodLabel.setText(theGame.countries[owner].cities[city].food)
        this.popLabel.setText(theGame.countries[owner].cities[city].population)
      }

    } else {
      this.cityLabel.setText('')
      this.productionLabel.setText('-')
      this.goldLabel.setText('-')
      this.tradeLabel.setText('-')
      this.strengthLabel.setText('-')
      this.foodLabel.setText('-')
      this.popLabel.setText('-')
    }

  }


}