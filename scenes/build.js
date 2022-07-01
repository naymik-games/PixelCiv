var levelOptions = {

  colors: ["0xffffff", "0xff0000", "0x00ff00", "0x0000ff", "0xffff00"],

  numPages: 3,
  columns: 7,
  rows: 7,
  thumbWidth: 100,
  thumbHeight: 100,
  spacing: 10,
  localStorageName: "levelselect"
}



class build extends Phaser.Scene {
  constructor() {
    super("build");
  }
  preload() {



  }
  init(data) {
    this.level = data.level;
    this.group = data.group

  }
  create() {
    //this.cameras.main.setBackgroundColor(0xf7eac6);
    var timedEvent = this.time.addEvent({ delay: 300, callback: this.showPreview, callbackScope: this, loop: false });
    this.Main = this.scene.get('playGame');
    this.previewBox = this.add.container(1000, 0);
    var background = this.add.image(450, 920, 'blank').setTint(0xe1c59e);
    background.displayWidth = 900
    background.displayHeight = 1200

    this.previewBox.add(background);
    this.select = this.Main.tileData[this.Main.selectedTile.y][this.Main.selectedTile.x]
    var titleText = this.add.bitmapText(450, 375, 'topaz', 'Build ', 80).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.previewBox.add(titleText);

    var cancelIcon = this.add.image(760, 375, 'icons', 2).setInteractive().setScale(.8);
    cancelIcon.on('pointerdown', this.cancel, this);
    this.previewBox.add(cancelIcon);


    var resourcesLabel = this.add.bitmapText(75, 480, 'topaz', 'TILE RESOURCES:', 45).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);
    this.previewBox.add(resourcesLabel);
    var resourcesText = this.add.bitmapText(75, 575, 'topaz', this.objToString(this.select.resources), 40).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);
    this.previewBox.add(resourcesText);




    //show build improvements
    for (let i = 0; i < this.select.improvements.length; i++) {
      var test = this.add.image(210 + i * 160, 1425, 'improvements', this.select.improvements[i]).setScale(.75)
      this.previewBox.add(test);
      var nameLabel = this.add.bitmapText(210 + i * 160, test.y - 95, 'topaz', improvementNames[this.select.improvements[i]], 35).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
      this.previewBox.add(nameLabel);

    }

    this.buildButton = this.add.image(450, 1200, 'icons', 0).setInteractive().setScale(.8);
    this.buildButton.type = 0
    this.previewBox.add(this.buildButton);
    this.buildButton.on('pointerdown', this.buildImprovement, this)
    //improvement menu
    this.nameLabel = this.add.bitmapText(450, 675, 'topaz', improvementNames[0], 25).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.previewBox.add(this.nameLabel);
    this.infoLabel = this.add.bitmapText(450, 975, 'topaz', '--', 25).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.previewBox.add(this.infoLabel);
    this.scrollingMap = this.add.tileSprite(-game.config.width, 825, game.config.width * 2 + improvementNames.length * 160, 200, "transp").setOrigin(0, .5).setTint(0x333333);
    this.scrollingMap.setInteractive();
    this.input.setDraggable(this.scrollingMap);
    this.itemGroup = this.add.group(0, 0)
    this.isBeingDragged = false;
    for (let i = 0; i < improvementNames.length; i++) {
      var test = this.add.image(450 + i * 160, 825, 'improvements', i).setScale(.75)
      test.id = i
      this.previewBox.add(test);
      this.itemGroup.add(test)

    }
    this.selecter = this.add.image(450, 825, 'selecter').setScale(1)
    this.previewBox.add(this.selecter);
    this.input.on("dragstart", function (pointer, gameObject) {
      gameObject.startPosition = gameObject.x;
      gameObject.currentPosition = gameObject.x;
      this.isBeingDragged = true;
      console.log('start drag')
    }, this);
    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;

      var delta = gameObject.x - gameObject.currentPosition;
      gameObject.currentPosition = dragX;
      this.itemGroup.children.iterate(function (item) {
        item.x += delta;
      });

    }, this);
    this.input.on("dragend", function (pointer, gameObject) {
      this.isBeingDragged = false;
      this.itemGroup.children.iterate(function (item) {

        item.x = Phaser.Math.Snap.To(item.x, 160) - 40;
        if (item.x == 450) {
          // item.setScale(1.5)
        } else {
          //item.setScale(1)
        }
      });

      console.log('drag stop')
    }, this);



  }
  update() {
    this.itemGroup.children.iterate(function (item) {

      // item.x = Phaser.Math.Snap.To(item.x, 90);
      if (item.x < 495 && item.x > 405) {
        // item.setScale(1.5)
        this.nameLabel.setText(improvementNames[item.id])
        this.infoLabel.setText(this.makeInfo(item.id))
        this.buildButton.type = item.id
      } else {
        //item.setScale(1)
      }
    }, this);
  }
  buildImprovement() {
    console.log('build ' + this.buildButton.type + ' on ' + this.Main.selectedTile + ' for' + '0')
    this.Main.addImprovement(0, this.Main.selectedTile, this.buildButton.type)
  }
  makeInfo(id) {
    var text = ''
    text += improvementInfo[id].description + '\n'
    text += 'COST: Gold: ' + improvementInfo[id].costGold + ', Production: ' + improvementInfo[id].costProduction + '\n'
    text += 'Bonus: ' + improvementInfo[id].productionFactor

    return text
  }
  showPreview() {
    var tween = this.tweens.add({
      targets: this.previewBox,
      duration: 500,
      x: 0,
      ease: 'bounce'
    })
  }
  objToString(obj) {
    let str = '';
    var count = 1
    for (const [p, val] of Object.entries(obj)) {
      str += `${p}: ${val} `;
      if (count % 4 == 0 && count > 0) {

        str += `\n`;
      }

      count++
    }
    return str;
  }
  cancel() {
    this.scene.resume('playGame');
    this.scene.resume('UI');
    this.scene.stop();
  }








}

