class UI extends Phaser.Scene {

  constructor() {

    super("UI");
  }
  preload() {



  }
  create() {
    this.Main = this.scene.get('playGame');
    this.header = this.add.image(game.config.width / 2, 0, 'blank').setOrigin(.5, 0).setTint(0xe1c59e);
    this.header.displayWidth = 900;
    this.header.displayHeight = 175;

    this.subHeader = this.add.image(game.config.width / 2, 175, 'blank').setOrigin(.5, 0).setTint(0x000000).setAlpha(.7);
    this.subHeader.displayWidth = game.config.width;
    this.subHeader.displayHeight = 100;

    this.footer = this.add.image(game.config.width / 2, game.config.height, 'blank').setOrigin(.5, 1).setTint(0x000000).setAlpha(.7);
    this.footer.displayWidth = game.config.width;
    this.footer.displayHeight = 100;
    this.turn = this.add.image(850, 225, 'icons', 11).setInteractive().setAlpha(1)

    this.dayText = this.add.bitmapText(this.turn.x, this.turn.y - 5, 'topaz', '1', 60).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);



    this.sizeText = this.add.bitmapText(225, 115, 'topaz', '1', 40).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.statusIcons = this.add.image(900, 0, 'status').setOrigin(1, 0)

    this.cityLabel = this.add.bitmapText(25, 50, 'topaz', ' ', 60).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);

    this.popLabel = this.add.bitmapText(350, 125, 'topaz', '-', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.foodLabel = this.add.bitmapText(450, 125, 'topaz', '-', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.productionLabel = this.add.bitmapText(550, 125, 'topaz', '-', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.goldLabel = this.add.bitmapText(650, 125, 'topaz', '-', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.happinessLabel = this.add.bitmapText(750, 125, 'topaz', '-', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.strengthLabel = this.add.bitmapText(850, 125, 'topaz', '-', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);


    this.currentPlayerText = this.add.bitmapText(10, 225, 'topaz', civNames[0], 55).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1).setInteractive();
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
      this.currentPlayerText.setText(civNames[theGame.currentPlayer])
    }, this)

    this.infoText = this.add.bitmapText(15, game.config.height - 50, 'topaz', 'status', 50).setOrigin(0, .5).setTint(0xcbf7ff).setAlpha(1);




    var toggle = 0
    var cursor = this.add.image(825, 1490, 'icons', 3).setInteractive().setScale(1).setAlpha(.5);

    cursor.on('pointerdown', function () {
      if (toggle == 0) {
        this.Main.selectMode = 'drag'
        toggle = 1
        cursor.setAlpha(1)
        this.Main.board.setInteractive(false)
      } else {
        this.Main.selectMode = 'click'
        toggle = 0
        cursor.setAlpha(.5)
        this.Main.board.setInteractive(true)
      }
    }, this)
    this.build = this.add.image(75, 1490, 'icons', 4).setInteractive().setAlpha(0)
    this.build.on('pointerdown', function () {
      if (this.Main.currentPlayer > 0) { return }
      if (this.Main.selectedTile == null) { return }
      this.scene.pause('playGame');
      this.scene.pause();
      this.scene.launch('build');
    }, this)
    this.buildUnit = this.add.image(175, 1490, 'icons', 10).setInteractive().setAlpha(0)
    this.buildUnit.on('pointerdown', function () {
      if (this.Main.currentPlayer > 0) { return }
      if (this.Main.selectedTile == null) { return }
      this.scene.pause('playGame');
      this.scene.pause();
      this.scene.launch('buildUnit');
    }, this)
    this.Main.events.on('info', function (data) {
      this.infoText.setText(data)
    }, this);


  }

  update() {

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
    console.log(selected)
    if (selected != null) {
      if (type == 'city') {
        var owner = theGame.tileData[selected.y][selected.x].owner
        var city = theGame.tileData[selected.y][selected.x].city
        this.cityLabel.setText(theGame.countries[owner].cities[city].name)
        this.productionLabel.setText(theGame.countries[owner].cities[city].production)
        this.goldLabel.setText(theGame.countries[owner].cities[city].trade)
        this.happinessLabel.setText(theGame.countries[owner].cities[city].happiness)
        this.strengthLabel.setText(theGame.countries[owner].cities[city].strength)
        this.foodLabel.setText(theGame.countries[owner].cities[city].food)
        this.popLabel.setText(theGame.countries[owner].cities[city].population)
      } else {
        var owner = theGame.tileData[selected.y][selected.x].owner
        var city = theGame.tileData[selected.y][selected.x].city
        this.cityLabel.setText(civNames[owner])
        this.productionLabel.setText(theGame.countries[owner].production)
        this.goldLabel.setText(theGame.countries[owner].trade)
        this.happinessLabel.setText(theGame.countries[owner].happiness)
        this.strengthLabel.setText(theGame.countries[owner].strength)
        this.foodLabel.setText(theGame.countries[owner].food)
        this.popLabel.setText(theGame.countries[owner].population)
      }

    } else {
      this.cityLabel.setText('')
      this.productionLabel.setText('-')
      this.goldLabel.setText('-')
      this.happinessLabel.setText('-')
      this.strengthLabel.setText('-')
      this.foodLabel.setText('-')
      this.popLabel.setText('-')
    }

  }


}