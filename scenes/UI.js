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
    this.header.displayHeight = 200;

    this.subHeader = this.add.image(game.config.width / 2, 200, 'blank').setOrigin(.5, 0).setTint(0x000000).setAlpha(.7);
    this.subHeader.displayWidth = game.config.width;
    this.subHeader.displayHeight = 100;

    this.footer = this.add.image(game.config.width / 2, game.config.height, 'blank').setOrigin(.5, 1).setTint(0x000000).setAlpha(.7);
    this.footer.displayWidth = game.config.width;
    this.footer.displayHeight = 100;

    this.dayLabel = this.add.bitmapText(85, 40, 'topaz', 'DAY', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.dayText = this.add.bitmapText(85, 120, 'topaz', '1', 80).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);

    this.statusIcons = this.add.image(900, 0, 'status').setOrigin(1, 0)
    this.productionLabel = this.add.bitmapText(450, 120, 'topaz', '0', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.goldLabel = this.add.bitmapText(550, 120, 'topaz', '0', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.happinessLabel = this.add.bitmapText(650, 120, 'topaz', '0', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.strengthLabel = this.add.bitmapText(750, 120, 'topaz', '0', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.foodLabel = this.add.bitmapText(850, 120, 'topaz', '0', 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);

    this.currentPlayerText = this.add.bitmapText(10, 250, 'topaz', civNames[0], 55).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1).setInteractive();
    this.currentPlayerText.on('pointerdown', function () {
      this.Main.currentPlayer++
      if (this.Main.currentPlayer == this.Main.countries.length) {
        this.Main.currentPlayer = 0
        this.Main.day++
        this.dayText.setText(this.Main.day)
        this.Main.endRound()
      }
      this.Main.endPlayerTurn()
      this.currentPlayerText.setText(civNames[this.Main.currentPlayer])
    }, this)

    this.infoText = this.add.bitmapText(15, game.config.height - 50, 'topaz', 'status', 60).setOrigin(0, .5).setTint(0xcbf7ff).setAlpha(1);




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

    this.Main.events.on('info', function (data) {
      this.infoText.setText(data)
    }, this);


  }

  update() {

  }
  setStatusLabels() {

    this.productionLabel.setText(this.Main.countries[0].production)
    this.goldLabel.setText(this.Main.countries[0].trade)
    this.happinessLabel.setText(this.Main.countries[0].happiness)
    this.strengthLabel.setText(this.Main.countries[0].strength)
    this.foodLabel.setText(this.Main.countries[0].food)
  }


}