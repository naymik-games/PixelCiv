class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'plugins/rexui.min.js',
      //url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI'
    });
    //  this.load.plugin('rexgashaponplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgashaponplugin.min.js', true);
  }
  create() {
    /*  var gashapon = this.plugins.get('rexgashaponplugin').add({
       mode: 'shuffle',  // 0|'shuffle'|1|'random
       items: {  // name:count
         0: 3,
         1: 1,
         2: 2,
         3: 3,
         4: 3,
         5: 6,
         6: 2,
         7: 2,
         8: 4,
         9: 3,
         10: 3,
         11: 3,
         12: 3,
         13: 3,
         14: 3,
         15: 3,
         16: 3,
         17: 3,
         18: 3,
         19: 3,
         20: 3,
         21: 3,
       },
       reload: true,     // true|false
       rnd: undefined,
     });
 
     var item = gashapon.next();
     console.log(item)
 
  */

    gameData = JSON.parse(localStorage.getItem('PCSave'));
    if (gameData === null || gameData.length <= 0) {
      localStorage.setItem('PCSave', JSON.stringify(defaultValues));
      gameData = defaultValues;
    }
    this.size = 0
    this.map = 0
    this.nation = 0
    this.difficulty = 0

    var options1 = [
      { text: 'Small', value: 0 },
      { text: 'Medium', value: 1 },
      { text: 'Large', value: 3 },
    ];
    var options2 = [
      { text: 'Map 1', value: 0 },
      { text: 'map 2', value: 1 },
      { text: 'map 3', value: 2 },
      { text: 'Random', value: -1 }];
    var options3 = [
      { text: 'America', value: 0 },
      { text: 'Rome', value: 1 },
      { text: 'China', value: 2 },
      { text: 'Greece', value: 3 },
      { text: 'India', value: 4 },
      { text: 'Persia', value: 5 },
      { text: 'France', value: 6 },
      { text: 'England', value: 7 },
      { text: 'Russia', value: 8 }];

    var options4 = [
      { text: 'Easy', value: 0 },
      { text: 'Normal', value: 1 },
      { text: 'Hard', value: 3 },
    ];
    this.cameras.main.setBackgroundColor(COLOR_MAIN_TAN);

    var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'PixelCiv', 150).setOrigin(.5).setTint(0xc76210);
    ///////
    //menus
    ///////
    var newGameLabel = this.add.bitmapText(game.config.width / 2 - 50, 275, 'topaz', 'New Game', 50).setOrigin(0, .5).setTint(COLOR_MAIN_ORANGE);
    var mapLabel = this.add.bitmapText(50, 375, 'topaz', 'World Options', 40).setOrigin(0, .5).setTint(COLOR_MAIN_ORANGE);
    var dropDownList = this.rexUI.add.dropDownList({
      x: 200, y: 475,

      background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_MAIN_ORANGE),
      icon: this.rexUI.add.roundRectangle(0, 0, 20, 20, 10, COLOR_MAIN_TAN),
      text: CreateTextObject(this, '-- Size --').setFixedSize(150, 0),
      //text: CreateTextObject(this, '-- Size --').setMaxWidth(250, 0),
      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        icon: 10
      },


      options: options1,

      list: {
        createBackgroundCallback: function (scene) {
          return scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_MAIN_ORANGE);
        },
        createButtonCallback: function (scene, option, index, options) {
          var text = option.text;
          var button = scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0),

            text: CreateTextObject(scene, text),

            space: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
              icon: 10
            }
          });


          button.value = option.value;

          return button;
        },

        // scope: dropDownList
        onButtonClick: function (button, index, pointer, event) {
          // Set label text, and value
          this.text = button.text;
          this.value = button.value;
          //print.text += `Select ${button.text}, value=${button.value}\n`;
        },

        // scope: dropDownList
        onButtonOver: function (button, index, pointer, event) {
          button.getElement('background').setStrokeStyle(1, 0xffffff);
        },

        // scope: dropDownList
        onButtonOut: function (button, index, pointer, event) {
          button.getElement('background').setStrokeStyle();
        }
      },

      setValueCallbackScope: this,
      setValueCallback: function (dropDownList, value, previousValue) {
        this.size = value
        console.log(this.size)
        console.log(value);
      },
      value: undefined
    }).


      layout();





    var dropDownList2 = this.rexUI.add.dropDownList({
      x: 700, y: 475,

      background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_MAIN_ORANGE),
      icon: this.rexUI.add.roundRectangle(0, 0, 20, 20, 10, COLOR_MAIN_TAN),
      text: CreateTextObject(this, '-- Map --').setFixedSize(150, 0),

      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        icon: 10
      },


      options: options2,

      list: {
        createBackgroundCallback: function (scene) {
          return scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_MAIN_ORANGE);
        },
        createButtonCallback: function (scene, option, index, options) {
          var text = option.text;
          var button = scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0),

            text: CreateTextObject(scene, text),

            space: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
              icon: 10
            }
          });


          button.value = option.value;

          return button;
        },

        // scope: dropDownList
        onButtonClick: function (button, index, pointer, event) {
          // Set label text, and value
          this.text = button.text;
          this.value = button.value;
          //print2.text += `Select ${button.text}, value=${button.value}\n`;
        },

        // scope: dropDownList
        onButtonOver: function (button, index, pointer, event) {
          button.getElement('background').setStrokeStyle(1, 0xffffff);
        },

        // scope: dropDownList
        onButtonOut: function (button, index, pointer, event) {
          button.getElement('background').setStrokeStyle();
        }
      },

      setValueCallbackScope: this,
      setValueCallback: function (dropDownList, value, previousValue) {
        console.log(value);
        this.map = value
        console.log(this.map)
      },
      value: undefined
    }).


      layout();




    var nationLabel = this.add.bitmapText(50, 575, 'topaz', 'Civilization', 40).setOrigin(0, .5).setTint(COLOR_MAIN_ORANGE);


    var dropDownList3 = this.rexUI.add.dropDownList({
      x: 200, y: 675,

      background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_MAIN_ORANGE),
      icon: this.rexUI.add.roundRectangle(0, 0, 20, 20, 10, COLOR_MAIN_TAN),
      text: CreateTextObject(this, '-- Civ --').setFixedSize(150, 0),

      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        icon: 10
      },


      options: options3,

      list: {
        createBackgroundCallback: function (scene) {
          return scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_MAIN_ORANGE);
        },
        createButtonCallback: function (scene, option, index, options) {
          var text = option.text;
          var button = scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0),

            text: CreateTextObject(scene, text),

            space: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
              icon: 10
            }
          });


          button.value = option.value;

          return button;
        },

        // scope: dropDownList
        onButtonClick: function (button, index, pointer, event) {
          // Set label text, and value
          this.text = button.text;
          this.value = button.value;
          //print3.text += `Select ${button.text}, value=${button.value}\n`;
        },

        // scope: dropDownList
        onButtonOver: function (button, index, pointer, event) {
          button.getElement('background').setStrokeStyle(1, 0xffffff);
        },

        // scope: dropDownList
        onButtonOut: function (button, index, pointer, event) {
          button.getElement('background').setStrokeStyle();
        }
      },

      setValueCallbackScope: this,
      setValueCallback: function (dropDownList, value, previousValue) {
        console.log(value);
        this.nation = value
        console.log(this.nation)
      },
      value: undefined
    }).


      layout();




    var difficultyLabel = this.add.bitmapText(50, 775, 'topaz', 'Difficulty', 40).setOrigin(0, .5).setTint(COLOR_MAIN_ORANGE);


    var dropDownList4 = this.rexUI.add.dropDownList({
      x: 200, y: 875,

      background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_MAIN_ORANGE),
      icon: this.rexUI.add.roundRectangle(0, 0, 20, 20, 10, COLOR_MAIN_TAN),
      text: CreateTextObject(this, '-- Difficulty --').setFixedSize(150, 0),

      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        icon: 10
      },


      options: options4,

      list: {
        createBackgroundCallback: function (scene) {
          return scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_MAIN_ORANGE);
        },
        createButtonCallback: function (scene, option, index, options) {
          var text = option.text;
          var button = scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0),

            text: CreateTextObject(scene, text),

            space: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
              icon: 10
            }
          });


          button.value = option.value;

          return button;
        },

        // scope: dropDownList
        onButtonClick: function (button, index, pointer, event) {
          // Set label text, and value
          this.text = button.text;
          this.value = button.value;
          //print4.text += `Select ${button.text}, value=${button.value}\n`;
        },

        // scope: dropDownList
        onButtonOver: function (button, index, pointer, event) {
          button.getElement('background').setStrokeStyle(1, 0xffffff);
        },

        // scope: dropDownList
        onButtonOut: function (button, index, pointer, event) {
          button.getElement('background').setStrokeStyle();
        }
      },

      setValueCallbackScope: this,
      setValueCallback: function (dropDownList, value, previousValue) {
        console.log(value);
        this.difficulty = value
        console.log(this.difficulty)
      },
      value: undefined
    }).


      layout();


    //////
    //end menus
    //////





    var playLabel = this.add.bitmapText(450, 975, 'topaz', 'PLAY', 40).setOrigin(.5).setTint(COLOR_MAIN_ORANGE).setInteractive();
    playLabel.on('pointerdown', this.playNew, this)



























    var startTime2 = this.add.bitmapText(game.config.width / 2 - 50, 1575, 'topaz', 'Load Game', 50).setOrigin(0, .5).setTint(0x000000);
    startTime2.setInteractive();
    startTime2.on('pointerdown', this.loadSaved, this);


  }
  playNew() {
    console.log(this.size + ',' + this.map + ',' + this.nation + ',' + this.difficulty)
    gameLoad = 'new'
    if (this.size == 2) {
      gameWidth = 125
      gameHeight = 85
      gamePlayers = 8
      var seeds = [2368, 68340, 89763]
    } else if (this.size == 1) {
      gameWidth = 90
      gameHeight = 60
      gamePlayers = 5
      var seeds = [34147, 84959, 550932]
    } else {
      gameWidth = 50
      gameHeight = 35
      gamePlayers = 3
      var seeds = [2368, 87522, 298765]
    }
    if (this.map > -1) {
      gameSeed = seeds[this.map]
    } else {
      gameSeed = Math.floor(Math.random() * 90000) + 10000;
    }
    playerCiv = this.nation
    this.scene.start('playGame');
    this.scene.launch('UI');
    this.scene.launch('showMessages');
  }
  newSmall() {
    gameLoad = 'new'
    gameWidth = 50
    gameHeight = 35
    gameSeed = 2368
    gamePlayers = 3
    playerCiv = 3
    this.scene.start('playGame');
    this.scene.launch('UI');
    this.scene.launch('showMessages');
    //2368, 87522,298765
  }
  newMedium() {
    gameLoad = 'new'
    gameWidth = 90
    gameHeight = 60
    gameSeed = Math.floor(Math.random() * 90000) + 10000;
    gamePlayers = 5
    playerCiv = 0
    this.scene.start('playGame');
    this.scene.launch('UI');
    this.scene.launch('showMessages');
    //34147,84959,550932
  }
  newLarge() {
    gameLoad = 'new'
    gameWidth = 125
    gameHeight = 85
    gameSeed = 89763
    gamePlayers = 8
    playerCiv = 0
    this.scene.start('playGame');
    this.scene.launch('UI');
    this.scene.launch('showMessages');
    // 2368,68340,89763
  }
  loadSaved() {
    gameLoad = 'load'
    this.scene.start('playGame');
    this.scene.launch('UI');
    this.scene.launch('showMessages');
  }
}

var CreateTextObject = function (scene, text) {
  return scene.add.text(0, 0, text, { fontSize: 20 });
  //return scene.add.bitmapText(0, 0, 'topaz', text, 35);
};