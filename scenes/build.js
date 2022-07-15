


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
    console.log(theGame.tileData.length)
    this.previewBox.add(background);
    this.select = theGame.tileData[this.Main.selectedTile.y][this.Main.selectedTile.x]
    console.log(this.select)
    var titleText = this.add.bitmapText(450, 375, 'topaz', cityNames[this.select.owner][this.select.city], 80).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.previewBox.add(titleText);

    var cancelIcon = this.add.image(760, 375, 'icons', 2).setInteractive().setScale(.8);
    cancelIcon.on('pointerdown', this.cancel, this);
    this.previewBox.add(cancelIcon);

    if (this.select.cityCenter) {
      var resourcesLabel = this.add.bitmapText(75, 480, 'topaz', 'TILE RESOURCES:', 45).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);
      this.previewBox.add(resourcesLabel);
      var foodIcon = this.add.image(75, 560, 'icons', 9).setOrigin(0, .5).setScale(.5)
      this.previewBox.add(foodIcon)
      var foodLabel = this.add.bitmapText(135, 560, 'topaz', this.select.values.Food, 45).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);
      this.previewBox.add(foodLabel)
      var productionIcon = this.add.image(250, 560, 'icons', 5).setOrigin(0, .5).setScale(.5)
      this.previewBox.add(productionIcon)
      var productionLabel = this.add.bitmapText(315, 560, 'topaz', this.select.values.Production, 45).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);
      this.previewBox.add(productionLabel)
      var tradeIcon = this.add.image(425, 560, 'icons', 6).setOrigin(0, .5).setScale(.5)
      this.previewBox.add(tradeIcon)
      var tradeLabel = this.add.bitmapText(490, 560, 'topaz', this.select.values.Trade, 45).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);
      this.previewBox.add(tradeLabel)
      var resourcesText = this.add.bitmapText(75, 625, 'topaz', this.makeResourceInfo(this.select.values), 38).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);
      this.previewBox.add(resourcesText);

      //improvement menu
      this.nameLabel = this.add.bitmapText(450, 725, 'topaz', improvementInfo[0], 25).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
      this.previewBox.add(this.nameLabel);
      this.infoLabel = this.add.bitmapText(450, 1025, 'topaz', '--', 30).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
      this.previewBox.add(this.infoLabel);
      this.message = this.add.bitmapText(50, 1150, 'topaz', '--', 40).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);
      this.previewBox.add(this.message);
      this.scrollingMap = this.add.tileSprite(-game.config.width, 850, game.config.width * 2 + improvementInfo.length * 160, 200, "transp").setOrigin(0, .5).setTint(0x333333);
      this.scrollingMap.setInteractive();
      this.input.setDraggable(this.scrollingMap);
      this.itemGroup = this.add.group(0, 0)
      this.isBeingDragged = false;
      for (let i = 0; i < improvementInfo.length; i++) {
        var test = this.add.image(450 + i * 160, 850, 'improvements', i).setScale(.75)
        test.id = i
        this.previewBox.add(test);
        this.itemGroup.add(test)

      }
      this.selecter = this.add.image(450, 850, 'selecter').setScale(1)
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


    //show build improvements
    this.showCurrentImprovements(0, this.select.city, this.select.id)

    if (this.select.improvements.length < 4) {
      this.buildButton = this.add.image(150, 1000, 'icons', 0).setInteractive().setScale(.8);
      this.buildButton.type = 0
      this.previewBox.add(this.buildButton);
      this.buildButton.on('pointerdown', this.buildImprovement, this)
    }



    //console.log(this.getTileImprovementsByID(0, this.select.id))

  }
  update() {
    if (!this.select.cityCenter) {
      this.itemGroup.children.iterate(function (item) {

        // item.x = Phaser.Math.Snap.To(item.x, 90);
        if (item.x < 495 && item.x > 405) {
          // item.setScale(1.5)
          this.nameLabel.setText(improvementInfo[item.id].name)
          this.infoLabel.setText(this.makeInfo(item.id))
          this.buildButton.type = item.id
        } else {
          //item.setScale(1)
        }
      }, this);
    }

  }
  buildImprovement() {
    console.log('build ' + this.buildButton.type + ' on ' + this.Main.selectedTile + ' for' + '0')
    this.infoLabel.setAlpha(0)
    this.buildButton.setAlpha(0)
    this.message.setText('Building ' + improvementInfo[this.buildButton.type].name + ' in ' + improvementInfo[this.buildButton.type].days + ' days.')
    this.Main.addImprovement(this.select.owner, this.select.city, this.Main.selectedTile, this.buildButton.type, false)
    console.log(this.Main.countries[0].cities[this.select.city].improvements.length)
  }
  getTileImprovementsByID(owner, city, tileID) {
    //myArray.filter(x => x.id === '45');
    let impr = theGame.countries[owner].cities[city].improvements.filter(x => x.tileID === tileID);
    return impr
  }
  showCurrentImprovements(owner, city, tileID) {
    let tileImprovements = this.getTileImprovementsByID(owner, city, tileID)
    for (let i = 0; i < tileImprovements.length; i++) {
      if (tileImprovements[i].complete) {
        var alpha = 1
      } else {
        var alpha = .5
      }
      var test = this.add.image(210 + i * 160, 1425, 'improvements', tileImprovements[i].id).setScale(.75).setAlpha(alpha)
      this.previewBox.add(test);
      var nameLabel = this.add.bitmapText(210 + i * 160, test.y - 95, 'topaz', improvementInfo[tileImprovements[i].id].name, 30).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
      this.previewBox.add(nameLabel);

    }
  }
  makeInfo(id) {
    var text = ''
    text += improvementInfo[id].description + '\n'
    text += 'COST: Gold: ' + improvementInfo[id].costGold + ', Production: ' + improvementInfo[id].costProduction + '\n'

    text += 'Build Time: ' + improvementInfo[id].days + ', Maintenance: ' + improvementInfo[id].maintenance + '\n'
    text += 'Bonus: '
    if (improvementInfo[id].foodBonus > 0) {
      text += '+' + improvementInfo[id].foodBonus + ' Food '
    }
    if (improvementInfo[id].productionBonus > 0) {
      text += '+' + improvementInfo[id].productionBonus + ' Production '
    }
    if (improvementInfo[id].tradeBonus > 0) {
      text += '+' + improvementInfo[id].tradeBonus + ' Trade '
    }
    if (improvementInfo[id].strengthBonus > 0) {
      text += '+' + improvementInfo[id].strengthBonus + ' Strength '
    }
    if (improvementInfo[id].cultureBonus > 0) {
      text += '+' + improvementInfo[id].cultureBonus + ' Culture '
    }

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
  makeResourceInfo(rec) {
    var str = ''
    str += 'Oil: ' + rec.Oil + ', '
    str += 'Coal: ' + rec.Coal + ', '
    str += 'Gold: ' + rec.Gold + ',\n'
    str += 'Wood: ' + rec.Wood + ', '
    str += 'Stone: ' + rec.Stone + ', '
    str += 'Iron: ' + rec.Iron
    return str
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

