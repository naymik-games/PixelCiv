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



class buildUnit extends Phaser.Scene {
  constructor() {
    super("buildUnit");
  }
  preload() {



  }
  init(data) {
    this.level = data.level;
    this.group = data.group

  }
  create() {
    //this.cameras.main.setBackgroundColor(0xf7eac6);

    this.Main = this.scene.get('playGame');
    this.UI = this.scene.get('UI');
    var background = this.add.image(450, 100, 'blank').setOrigin(.5, 0).setTint(0xe1c59e);
    background.displayWidth = 900
    background.displayHeight = 1440
    this.subHeader = this.add.image(game.config.width / 2, 0, 'blank').setOrigin(.5, 0).setTint(0xAF5E49).setAlpha(1);
    this.subHeader.displayWidth = game.config.width;
    this.subHeader.displayHeight = 100;

    this.select = theGame.tileData[this.Main.selectedTile.y][this.Main.selectedTile.x]
    var title = this.add.bitmapText(10, 50, 'topaz', theGame.countries[this.select.owner].cities[this.select.city].name, 55).setOrigin(0, .5).setTint(0xe1c59e);



    // console.log(this.select)


    var cancelIcon = this.add.image(850, 50, 'icons', 2).setInteractive().setScale(.8);
    cancelIcon.on('pointerdown', this.cancel, this);



    //unit menu
    this.menuContainer = this.add.container()
    this.nameLabel = this.add.bitmapText(450, 150, 'topaz', unitInfo[0], 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.menuContainer.add(this.nameLabel)
    this.infoLabel = this.add.bitmapText(50, 550, 'topaz', '--', 40).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1).setMaxWidth(800);
    this.menuContainer.add(this.infoLabel)
    this.message = this.add.bitmapText(50, 500, 'topaz', '', 40).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);

    this.scrollingMap = this.add.tileSprite(-game.config.width, 300, game.config.width * 2 + improvementInfo.length * 160, 200, "transp").setOrigin(0, .5).setTint(0x333333);
    this.menuContainer.add(this.scrollingMap)
    this.scrollingMap.setInteractive();
    this.input.setDraggable(this.scrollingMap);
    this.itemGroup = this.add.group(0, 0)
    this.isBeingDragged = false;
    for (let i = 0; i < improvementInfo.length; i++) {
      var test = this.add.image(450 + i * 160, 300, 'units', i).setScale(3)
      test.id = i
      this.menuContainer.add(test)
      this.itemGroup.add(test)

    }
    this.selecter = this.add.image(450, 300, 'selecter').setScale(1)
    this.menuContainer.add(this.selecter)
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


    this.buildButton = this.add.image(750, 650, 'icons', 0).setInteractive().setScale(.8);
    this.buildButton.type = 0
    this.menuContainer.add(this.buildButton)
    this.buildButton.on('pointerdown', this.buildUnit, this)
    this.menuContainer.setAlpha(0)

    if (theGame.countries[this.select.owner].cities[this.select.city].currentUnitProduction == null) {
      this.menuContainer.setAlpha(1)
    } else {
      this.menuContainer.setAlpha(0)
      this.showCurrentProduction()
    }


    //show build improvements
    this.showCurrentUnits(0, this.select.city, this.select.id)

    //console.log(this.getTileImprovementsByID(0, this.select.id))

  }
  update() {
    if (this.select.cityCenter) {
      this.itemGroup.children.iterate(function (item) {

        // item.x = Phaser.Math.Snap.To(item.x, 90);
        if (item.x < 495 && item.x > 405) {
          // item.setScale(1.5)
          this.nameLabel.setText(unitInfo[item.id].name)
          this.infoLabel.setText(this.makeInfoUnit(item.id))
          this.buildButton.type = item.id
        } else {
          //item.setScale(1)
        }
      }, this);
    }

  }
  buildUnit() {
    console.log('build ' + this.buildButton.type + ' on ' + this.Main.selectedTile + ' for' + '0')
    this.menuContainer.setAlpha(0)



    var uni = new Unit(this.buildButton.type, this.Main.selectedTile, theGame.day, false, false, theGame.countries[this.select.owner].units.length, this.select.owner, this.select.city)

    theGame.countries[this.select.owner].units.push(uni)
    theGame.countries[this.select.owner].cities[this.select.city].currentUnitProduction = { id: this.buildButton.type }
    //theGame.countries[this.select.owner].cities[this.select.city].food -= unitInfo[this.buildButton.type].costFood
    //theGame.countries[this.select.owner].cities[this.select.city].production -= unitInfo[this.buildButton.type].costProduction
    this.UI.setStatusLabels(this.Main.selectedTile, 'city')
    this.showCurrentProduction()
    this.showCurrentUnits(0, this.select.city, this.select.id)

  }
  getTileImprovementsByID(owner, city, tileID) {
    //myArray.filter(x => x.id === '45');
    let impr = theGame.countries[owner].cities[city].units.filter(x => x.tileID === tileID);
    return impr
  }
  showCurrentProduction() {
    var unit = this.add.image(450, 300, 'units', theGame.countries[this.select.owner].cities[this.select.city].currentUnitProduction.id).setScale(4).setAlpha(1).setInteractive()
    var prod = getBaseProduction(this.select.owner, this.select.city)

    if (prod >= unitInfo[theGame.countries[this.select.owner].cities[this.select.city].currentUnitProduction.id].costProduction) {
      var time = '1 turn'
    } else {
      var turns = Math.ceil(unitInfo[theGame.countries[this.select.owner].cities[this.select.city].currentUnitProduction.id].costProduction / prod)
      var time = turns + ' turns'
    }
    this.message.setText('Building ' + unitInfo[theGame.countries[this.select.owner].cities[this.select.city].currentUnitProduction.id].name + ' in ' + time)
  }
  //for selected city
  showCurrentUnits(owner, city, tileID) {
    // let impr = theGame.countries[owner].getUnitsByCity(this.select.city)
    let impr = getUnitsByCity(owner, this.select.city)
    for (let i = 0; i < impr.length; i++) {
      if (impr[i].complete) {

        var unit = this.add.image(210 + i * 160, 1125, 'units', impr[i].id).setScale(2.5).setAlpha(1).setInteractive()
        unit.id = impr[i].id
        unit.index = impr[i].index
        unit.city = city
        //unit.on('pointerup', this.selectUnit.bind(this, unit));

        var nameLabel = this.add.bitmapText(210 + i * 160, unit.y - 95, 'topaz', unitInfo[impr[i].id].name, 30).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);

        var timeLeft = unit.index

        var prodLabel = this.add.bitmapText(210 + i * 160, unit.y + 95, 'topaz', timeLeft, 30).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);

      }


    }
  }
  selectUnit(unit) {
    console.log('unit selected' + unit.id)
    this.Main.readyUnit(unit.id, unit.index, unit.city)
    this.cancel()
  }
  makeInfoUnit(id) {
    var prod = getBaseProduction(this.select.owner, this.select.city)
    if (prod >= unitInfo[id].costProduction) {
      var time = '1 turn'
    } else {
      var turns = Math.ceil(unitInfo[id].costProduction / prod)
      var time = turns + ' turns'
    }

    var text = ''
    text += unitInfo[id].description + '\n'
    text += 'A: ' + unitInfo[id].a + ', D: ' + unitInfo[id].d + ', M: ' + unitInfo[id].m + '\n'
    text += 'Production: ' + unitInfo[id].costProduction + ' / ' + time

    return text
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

