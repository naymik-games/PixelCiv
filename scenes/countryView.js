class countryView extends Phaser.Scene {
  constructor() {
    super("countryView");
  }
  preload() {

    this.load.scenePlugin({
      key: 'rexuiplugin',
      // url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      url: 'plugins/rexui.min.js',
      sceneKey: 'rexUI'
    });

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
    var title = this.add.bitmapText(10, 50, 'topaz', civs[theGame.playerCiv].name, 55).setOrigin(0, .5).setTint(0xe1c59e);
    //var titleText = this.add.bitmapText(450, 375, 'topaz', civNames[theGame.playerCiv], 80).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);
    this.statusIcons = this.add.image(900, 100, 'status').setOrigin(1, 0)

    this.cityLabel = this.add.bitmapText(25, 150, 'topaz', 'sdfgfd ', 50).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);

    this.popLabel = this.add.bitmapText(350, 225, 'topaz', theGame.countries[theGame.currentPlayer].population, 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);

    this.foodLabel = this.add.bitmapText(450, 225, 'topaz', theGame.countries[theGame.currentPlayer].food, 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);

    this.productionLabel = this.add.bitmapText(550, 225, 'topaz', theGame.countries[theGame.currentPlayer].production, 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);

    this.goldLabel = this.add.bitmapText(650, 225, 'topaz', theGame.countries[theGame.currentPlayer].trade, 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);

    this.cultureLabel = this.add.bitmapText(750, 225, 'topaz', theGame.countries[theGame.currentPlayer].culture, 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);

    this.strengthLabel = this.add.bitmapText(850, 225, 'topaz', theGame.countries[theGame.currentPlayer].strength, 45).setOrigin(.5).setTint(0xAF5E49).setAlpha(1);


    ///////
    // research lable
    if (theGame.countries[theGame.currentPlayer].currentResearch == null) {
      var text = 'Not researching anything'
    } else {
      var text = 'Researching ' + techTree[theGame.countries[theGame.currentPlayer].currentResearch].name
    }
    this.researchingLabel = this.add.bitmapText(75, 1100, 'topaz', text, 45).setOrigin(0, .5).setTint(0xAF5E49).setAlpha(1);

    ///////
    // Budget sliders
    var moneyIcon = this.add.image(75, 800, 'icons', 20).setScale(.75).setAlpha(1);
    var scienceIcon = this.add.image(375, 800, 'icons', 18).setScale(.75).setAlpha(1);
    var cultureIcon = this.add.image(675, 800, 'icons', 19).setScale(.75).setAlpha(1);

    this.numberBar1 = this.rexUI.add.numberBar({
      x: 450,
      y: 1225,
      width: 800, // Fixed width
      height: 100,
      icon: moneyIcon,
      text: this.add.bitmapText(150, 800, 'topaz', '', 55).setTint(0xAF5E49),
      slider: {
        // width: 120, // Fixed width
        height: 50,
        track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 25, 0xAF5E49),
        indicator: this.rexUI.add.roundRectangle(0, 0, 0, 50, 25, 0xDFD8CA),
        thumb: this.rexUI.add.roundRectangle(0, 0, 0, 70, 10, 0x105652),
        input: 'click'
      },

      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,

        icon: 15,
        slider: 15
      },
      enable: false,
      valuechangeCallback: function (value, oldValue, numberBar) {
        numberBar.text = Math.round(Phaser.Math.Linear(0, 100, value));

      }
    }).layout();

    this.numberBar1.setValue(theGame.countries[theGame.currentPlayer].treasuryPercent, 0, 100);






    this.numberBar2 = this.rexUI.add.numberBar({
      x: 450,
      y: 1350,
      width: 800, // Fixed width
      height: 100,
      icon: scienceIcon,
      text: this.add.bitmapText(150, 800, 'topaz', '', 55).setTint(0xAF5E49),
      slider: {
        // width: 120, // Fixed width
        track: this.rexUI.add.roundRectangle(0, 0, 0, 50, 25, 0xAF5E49),
        indicator: this.rexUI.add.roundRectangle(0, 0, 0, 50, 25, 0xDFD8CA),
        thumb: this.rexUI.add.roundRectangle(0, 0, 0, 70, 10, 0x105652),
        input: 'click'
      },

      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,

        icon: 15,
        slider: 15
      },

      valuechangeCallback: function (value, oldValue, numberBar) {
        numberBar.text = Math.round(Phaser.Math.Linear(0, 100, value));

      }
    }).layout();

    this.numberBar2.setValue(theGame.countries[theGame.currentPlayer].sciencePercent, 0, 100);




    this.numberBar3 = this.rexUI.add.numberBar({
      x: 450,
      y: 1475,
      width: 800, // Fixed width
      height: 100,
      icon: cultureIcon,
      text: this.add.bitmapText(150, 800, 'topaz', '', 55).setTint(0xAF5E49),
      slider: {
        // width: 120, // Fixed width
        track: this.rexUI.add.roundRectangle(0, 0, 0, 50, 25, 0xAF5E49),
        indicator: this.rexUI.add.roundRectangle(0, 0, 0, 50, 25, 0xDFD8CA),
        thumb: this.rexUI.add.roundRectangle(0, 0, 0, 70, 10, 0x105652),
        input: 'click'
      },

      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,

        icon: 10,
        slider: 10
      },

      valuechangeCallback: function (value, oldValue, numberBar) {
        numberBar.text = Math.round(Phaser.Math.Linear(0, 100, value));

      }
    }).layout();

    this.numberBar3.setValue(theGame.countries[theGame.currentPlayer].entertainmentPercent, 0, 100);




    this.numberBar2.on('valuechange', function (newValue, oldValue, numberBar) {


      theGame.countries[theGame.currentPlayer].sciencePercent = Math.round(Phaser.Math.Linear(0, 100, newValue))
      if (Math.round(Phaser.Math.Linear(0, 100, newValue)) + this.numberBar3.getValue(0, 100) > 100) {
        var newEntV = 100 - Math.round(Phaser.Math.Linear(0, 100, newValue))
        this.numberBar3.setValue(newEntV, 0, 100)
      }
      var tnewValue = 100 - (Math.round(Phaser.Math.Linear(0, 100, newValue)) + this.numberBar3.getValue(0, 100))
      this.numberBar1.setValue(tnewValue, 0, 100)
      theGame.countries[theGame.currentPlayer].treasuryPercent = tnewValue
    }, this);
    this.numberBar3.on('valuechange', function (newValue, oldValue, numberBar) {


      theGame.countries[theGame.currentPlayer].entertainmentPercent = Math.round(Phaser.Math.Linear(0, 100, newValue))
      if (Math.round(Phaser.Math.Linear(0, 100, newValue)) + this.numberBar2.getValue(0, 100) > 100) {
        var newSciV = 100 - Math.round(Phaser.Math.Linear(0, 100, newValue))
        this.numberBar2.setValue(newSciV, 0, 100)
      }
      var tnewValue = 100 - (Math.round(Phaser.Math.Linear(0, 100, newValue)) + this.numberBar2.getValue(0, 100))
      this.numberBar1.setValue(tnewValue, 0, 100)
      theGame.countries[theGame.currentPlayer].treasuryPercent = tnewValue
    }, this);
    /* let array1 = [1,2,3],
    array2 = [1,2,3,4],
    array3 = [1,2];
    
    
    
    console.log(checker(array2, array1));  // true
    console.log(checker(array3, array1));  // false
    
    */
    /*     let checker = (arr, target) => target.every(v => arr.includes(v));
        techTree.forEach(tech => {
          // console.log(tech)
          // if (tech.prequisite.length > 0) {
     
          if (checker(theGame.countries[theGame.currentPlayer].techs, tech.prequisite)) {
            if (theGame.countries[theGame.currentPlayer].techs.indexOf(tech.id) < 0) {
              console.log(tech.name)
            }
     
          }
          // }
     
     
        }); */

    /*     var text = ''
        for (let i = 0; i < theGame.countries[theGame.currentPlayer].techs.length; i++) {
          var tec = theGame.countries[theGame.currentPlayer].techs[i]
          text += techTree[tec].name + ' '
     
        }
        var tech = this.add.bitmapText(10, 350, 'topaz', text, 55).setOrigin(0, .5).setTint(0xAF5E49); */

    var cancelIcon = this.add.image(850, 50, 'icons', 2).setInteractive().setScale(.8);
    cancelIcon.on('pointerdown', this.cancel, this);

  }
  isfound(techs, prerequisites) {

    prerequisites.every(element => {
      return techs.indexOf(element) !== -1;
    })





  }
  adjustSliders() {
    console.log('adjusting')
  }
  cancel() {
    theGame.countries[theGame.currentPlayer].treasuryPercent = this.numberBar1.getValue(0, 100)

    theGame.countries[theGame.currentPlayer].entertainmentPercent = this.numberBar3.getValue(0, 100)
    this.scene.resume('playGame');
    this.scene.resume('UI');
    this.scene.stop();
  }
}