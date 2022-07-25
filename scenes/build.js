


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

    this.Main = this.scene.get('playGame');

    var background = this.add.image(450, 100, 'blank').setOrigin(.5, 0).setTint(0xe1c59e);
    background.displayWidth = 900
    background.displayHeight = 1440
    this.subHeader = this.add.image(game.config.width / 2, 0, 'blank').setOrigin(.5, 0).setTint(0xAF5E49).setAlpha(1);
    this.subHeader.displayWidth = game.config.width;
    this.subHeader.displayHeight = 100;

    this.select = theGame.tileData[this.Main.selectedTile.y][this.Main.selectedTile.x]
    console.log(this.select)

    var title = this.add.bitmapText(10, 50, 'topaz', theGame.countries[this.select.owner].cities[this.select.city].name, 55).setOrigin(0, .5).setTint(0xe1c59e);
    var cancelIcon = this.add.image(850, 50, 'icons', 2).setInteractive().setScale(.8);
    cancelIcon.on('pointerdown', this.cancel, this);

    this.menuContainer = this.add.container()

    if (theGame.countries[this.select.owner].cities[this.select.city].currentImprovementProduction == null) {


      //improvement menu
      this.nameLabel = this.add.bitmapText(450, 150, 'topaz', improvementInfo[0].name, 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
      this.menuContainer.add(this.nameLabel);
      this.infoLabel = this.add.bitmapText(50, 550, 'topaz', '--', 40).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1).setMaxWidth(800);
      this.menuContainer.add(this.infoLabel);
      this.message = this.add.bitmapText(50, 500, 'topaz', '', 40).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);
      // this.menuContainer.add(this.message);
      this.scrollingMap = this.add.tileSprite(-game.config.width, 300, game.config.width * 2 + improvementInfo.length * 160, 200, "transp").setOrigin(0, .5).setTint(0x333333);
      this.scrollingMap.setInteractive();
      this.menuContainer.add(this.message);
      this.input.setDraggable(this.scrollingMap);
      this.itemGroup = this.add.group(0, 0)
      this.isBeingDragged = false;
      var availableImprovements = getAvailableImprovements(this.select.owner, this.select.city)
      for (let i = 0; i < availableImprovements.length; i++) {
        const improvement = availableImprovements[i]
        var test = this.add.image(450 + i * 160, 300, 'improvements', improvement.id).setScale(.75)
        test.id = improvement.id
        console.log(improvementInfo[test.id].name)
        this.menuContainer.add(test);
        this.itemGroup.add(test)

      }
      this.selecter = this.add.image(450, 300, 'selecter').setScale(1)
      this.menuContainer.add(this.selecter);
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


      this.buildButton = this.add.image(150, 1000, 'icons', 0).setInteractive().setScale(.8);
      this.buildButton.type = 0
      this.menuContainer.add(this.buildButton);
      this.buildButton.on('pointerdown', this.buildImprovement, this)

    } else {
      this.showBuildMessage()
    }


    //show build improvements
    this.showCurrentImprovements(0, this.select.city)







    //console.log(this.getTileImprovementsByID(0, this.select.id))

  }
  update() {
    if (theGame.countries[this.select.owner].cities[this.select.city].currentImprovementProduction == null) {
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

    var ppt = getBaseProduction(this.select.owner, this.select.city)
    if (improvementInfo[this.buildButton.type].cost > theGame.countries[this.select.owner].cities[this.select.city].production) {
      var turn = Math.ceil((improvementInfo[this.buildButton.type].cost - theGame.countries[this.select.owner].cities[this.select.city].production) / ppt)
      var infoText = turn + ' turns'
    } else {
      var infoText = '1 turn'
    }


    this.message.setText('Building ' + improvementInfo[this.buildButton.type].name + ' in ' + infoText)
    addImprovement(this.select.owner, this.select.city, this.buildButton.type, false)

    this.showCurrentImprovements(0, this.select.city)
    //console.log(this.Main.countries[0].cities[this.select.city].improvements.length)
  }
  showBuildMessage() {
    var unit = this.add.image(450, 300, 'improvements', theGame.countries[this.select.owner].cities[this.select.city].currentImprovementProduction).setScale(1).setAlpha(1)

    var ppt = getBaseProduction(this.select.owner, this.select.city)
    if (improvementInfo[theGame.countries[this.select.owner].cities[this.select.city].currentImprovementProduction].cost > theGame.countries[this.select.owner].cities[this.select.city].production) {
      var turn = Math.ceil((improvementInfo[theGame.countries[this.select.owner].cities[this.select.city].currentImprovementProduction].cost - theGame.countries[this.select.owner].cities[this.select.city].production) / ppt)
      var infoText = turn + ' turns'
    } else {
      var infoText = '1 turn'
    }


    this.message.setText('Building ' + improvementInfo[theGame.countries[this.select.owner].cities[this.select.city].currentImprovementProduction].name + ' in ' + infoText)
  }
  getTileImprovementsByID(owner, city) {
    //myArray.filter(x => x.id === '45');
    let impr = theGame.countries[owner].cities[city].improvements.filter(x => x.tileID === tileID);
    return impr
  }
  showCurrentImprovements(owner, city) {
    console.log('show current')
    let tileImprovements = theGame.countries[owner].cities[city].improvements
    console.log(tileImprovements)
    for (let i = 0; i < tileImprovements.length; i++) {
      if (tileImprovements[i].complete) {
        var alpha = 1
        var infoText = '-' + improvementInfo[tileImprovements[i].id].maintenance + ' upkeep'
      } else {
        var alpha = .5
        var ppt = getBaseProduction(this.select.owner, this.select.city)
        if (improvementInfo[tileImprovements[i].id].cost > theGame.countries[this.select.owner].cities[this.select.city].production) {
          var turn = Math.ceil((improvementInfo[tileImprovements[i].id].cost - theGame.countries[this.select.owner].cities[this.select.city].production) / ppt)
          var infoText = turn + ' turns'
        } else {
          var infoText = '1 turn'
        }
      }
      var test = this.add.image(125 + i * 160, 1400, 'improvements', tileImprovements[i].id).setScale(.75).setAlpha(alpha)

      var nameLabel = this.add.bitmapText(210 + i * 160, test.y - 95, 'topaz', improvementInfo[tileImprovements[i].id].name, 30).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
      var info = this.add.bitmapText(210 + i * 160, test.y + 95, 'topaz', infoText, 30).setOrigin(.5).setTint(0xAF5E49).setAlpha(1)

    }
  }
  makeInfo(id) {

    var ppt = getBaseProduction(this.select.owner, this.select.city)
    if (improvementInfo[id].cost > theGame.countries[this.select.owner].cities[this.select.city].production) {
      var turns = Math.ceil((improvementInfo[id].cost - theGame.countries[this.select.owner].cities[this.select.city].production) / ppt)
    } else {
      var turns = 1
    }

    var text = ''
    text += improvementInfo[id].description + '\n'
    text += 'COST: ' + improvementInfo[id].cost + '(' + turns + ' turns)\n'
    text += 'Upkeep: ' + improvementInfo[id].maintenance + '\n'
    text += '+' + improvementInfo[id].culture + ' Culture '

    return text
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

