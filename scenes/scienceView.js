class scienceView extends Phaser.Scene {
  constructor() {
    super("scienceView");
  }
  preload() {



  }
  init(data) {
    this.level = data.level;
    this.group = data.group

  }
  create() {
    var background = this.add.image(450, 100, 'blank').setOrigin(.5, 0).setTint(0xe1c59e);
    background.displayWidth = 900
    background.displayHeight = 1440
    this.subHeader = this.add.image(game.config.width / 2, 0, 'blank').setOrigin(.5, 0).setTint(0xAF5E49).setAlpha(1);
    this.subHeader.displayWidth = game.config.width;
    this.subHeader.displayHeight = 100;
    var title = this.add.bitmapText(10, 50, 'topaz', civs[theGame.playerCiv].name + ' - SCIENCE ADVISOR', 55).setOrigin(0, .5).setTint(0xe1c59e);
    //var titleText = this.add.bitmapText(450, 375, 'topaz', civNames[theGame.playerCiv], 80).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);

    var cancelIcon = this.add.image(850, 50, 'icons', 2).setInteractive().setScale(.8);
    cancelIcon.on('pointerdown', this.cancel, this);


    console.log(theGame.countries[theGame.currentPlayer].techs)

    var currentText = this.add.bitmapText(10, 150, 'topaz', 'Current Technologies', 45).setOrigin(0, .5).setTint(0xAF5E49);

    var text = ''
    for (let i = 0; i < theGame.countries[theGame.currentPlayer].techs.length; i++) {
      var tec = theGame.countries[theGame.currentPlayer].techs[i]
      text += techTree[tec].name + ' '
      var icon = this.add.image(75 + i * 125, 275, 'science', techTree[tec].id)
    }




    let checker = (arr, target) => target.every(v => arr.includes(v));
    let possibleTechs = []
    techTree.forEach(tech => {
      // console.log(tech)
      // if (tech.prequisite.length > 0) {
      if (checker(theGame.countries[theGame.currentPlayer].techs, tech.prequisite)) {
        if (theGame.countries[theGame.currentPlayer].techs.indexOf(tech.id) < 0) {
          console.log(tech.name)
          possibleTechs.push(tech)
        }

      }
      // }
    });



    // var currentText = this.add.bitmapText(10, 400, 'topaz', 'Research Next:', 45).setOrigin(0, .5).setTint(0xAF5E49);

    this.menuContainer = this.add.container()
    this.itemGroup = this.add.group()
    var currentText = this.add.bitmapText(10, 400, 'topaz', 'Research Next:', 45).setOrigin(0, .5).setTint(0xAF5E49);
    this.menuContainer.add(currentText)
    this.nameLabel = this.add.bitmapText(450, 750, 'topaz', unitInfo[0], 45).setOrigin(.5, 0).setTint(0xAF5E49).setAlpha(1);
    this.menuContainer.add(this.nameLabel)
    this.infoLabel = this.add.bitmapText(50, 800, 'topaz', '--', 40).setOrigin(0, 0).setTint(0xAF5E49).setAlpha(1).setMaxWidth(800);
    this.menuContainer.add(this.infoLabel)

    this.scrollingMap = this.add.tileSprite(-game.config.width, 600, game.config.width * 2 + possibleTechs.length * 150, 200, "transp").setOrigin(0, .5).setTint(0x333333);
    this.menuContainer.add(this.scrollingMap)
    this.scrollingMap.setInteractive();
    this.input.setDraggable(this.scrollingMap);
    this.itemGroup = this.add.group(0, 0)
    this.isBeingDragged = false;
    for (let i = 0; i < possibleTechs.length; i++) {
      var test = this.add.image(450 + i * 150, 600, 'science', possibleTechs[i].id).setScale(1)
      test.id = possibleTechs[i].id
      this.menuContainer.add(test)
      this.itemGroup.add(test)

    }
    this.selecter = this.add.image(450, 600, 'selecter').setScale(1)
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

        item.x = Phaser.Math.Snap.To(item.x, 150) - 0;
        if (item.x == 450) {
          // item.setScale(1.5)
        } else {
          //item.setScale(1)
        }
      });

      console.log('drag stop')
    }, this);



    this.buildButton = this.add.image(750, 850, 'icons', 21).setInteractive().setScale(.8);
    this.buildButton.type = 0
    this.menuContainer.add(this.buildButton)
    this.buildButton.on('pointerdown', this.researchTech, this)
    this.menuContainer.setAlpha(0)


    if (theGame.countries[theGame.currentPlayer].currentResearch == null) {
      this.menuContainer.setAlpha(1)
    } else {
      this.showCurrentResearch()
    }





    //var tech = this.add.bitmapText(10, 350, 'topaz', text, 45).setOrigin(0, .5).setTint(0xAF5E49);






  }
  update() {
    this.itemGroup.children.iterate(function (item) {

      // item.x = Phaser.Math.Snap.To(item.x, 90);
      if (item.x < 495 && item.x > 405) {
        // item.setScale(1.5)
        this.nameLabel.setText(techTree[item.id].name)
        this.infoLabel.setText(this.makeTechInfo(item.id))
        this.buildButton.type = item.id
      } else {
        //item.setScale(1)
      }
    }, this);
  }
  isfound(techs, prerequisites) {

    prerequisites.every(element => {
      return techs.indexOf(element) !== -1;
    })





  }
  showCurrentResearch() {
    var currentTeh = theGame.countries[theGame.currentPlayer].currentResearch

    var currentTechText = this.add.bitmapText(10, 400, 'topaz', 'Researching ' + techTree[currentTeh].name, 45).setOrigin(0, .5).setTint(0xAF5E49);
    var icon = this.add.image(450, 575, 'science', techTree[currentTeh].id).setScale(1.5)
    var sciBox = this.add.bitmapText(10, 700, 'topaz', 'Sci Box ' + techTree[currentTeh].baseCost + ' / ' + theGame.countries[theGame.currentPlayer].scienceBox, 45).setOrigin(0, .5).setTint(0xAF5E49);
  }
  researchTech() {
    this.menuContainer.setAlpha(0)
    theGame.countries[theGame.currentPlayer].currentResearch = this.buildButton.type
    this.showCurrentResearch()
  }
  makeTechInfo(id) {
    var tech = techTree[id]
    var sciBudget = Math.floor(theGame.countries[theGame.currentPlayer].trade * (theGame.countries[theGame.currentPlayer].sciencePercent / 100))

    var text = 'Cost:' + tech.baseCost + '(' + sciBudget + ')\n'
    text += 'Allows:\n'
    for (let i = 0; i < techTree[id].allowsUnit.length; i++) {
      const element = techTree[id].allowsUnit[i];
      text += element + '\n'

    }
    for (let i = 0; i < techTree[id].allowsImprovement.length; i++) {
      const element = techTree[id].allowsImprovement[i];
      text += element + '\n'

    }
    return text
  }
  cancel() {
    this.scene.resume('playGame');
    this.scene.resume('UI');
    this.scene.stop();
  }
}