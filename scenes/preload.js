class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {


    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image("particle", "assets/particle.png");
    for (var i = 0; i < 125; i++) {
      this.load.image("particle", "assets/particle.png");
    }




    //this.load.image("particle", "assets/sprites/particle.png");
    this.load.bitmapFont('topaz', 'assets/fonts/topaz.png', 'assets/fonts/topaz.xml');
    /*   this.load.spritesheet("menu_icons", "assets/sprites/icons.png", {
        frameWidth: 96,
        frameHeight: 96
      }); */

    this.load.spritesheet("game_icons", "assets/sprites/game_icons_.png", {
      frameWidth: 128,
      frameHeight: 128
    });
    this.load.spritesheet("tiles", "assets/sprites/tiles.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("player_icons", "assets/sprites/player_logs.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("resource_icons", "assets/sprites/resource_icons.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("build_icons", "assets/sprites/game_icons2_.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("unit_icons", "assets/sprites/unit_icons.png", {
      frameWidth: 62,
      frameHeight: 62
    });
    this.load.spritesheet("units", "assets/sprites/units.png", {
      frameWidth: 24,
      frameHeight: 24,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("puff", "assets/sprites/puff.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet("switch", "assets/sprites/switch.png", {
      frameWidth: 32,
      frameHeight: 16
    });
    /*  this.load.spritesheet("fire", "assets/sprites/fire.png", {
       frameWidth: 16,
       frameHeight: 16,
       spacing: 1,
       margin: 1
     }); */
    this.load.spritesheet("borders", "assets/sprites/borders.png", {
      frameWidth: 16,
      frameHeight: 16,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("tech_icons", "assets/sprites/techs.png", {
      frameWidth: 16,
      frameHeight: 16,
      spacing: 1,
      margin: 1
    });
    this.load.spritesheet("cursors", "assets/sprites/cursors.png", {
      frameWidth: 52,
      frameHeight: 52,
      margin: 1,
      spacing: 1
    });
    this.load.image('blank', 'assets/sprites/blank.png');
    //this.load.image('cursor', 'assets/sprites/cursor.png');
    this.load.image('build_icon', 'assets/sprites/build_icon.png');
    this.load.image('build_modal', 'assets/sprites/build_modal.png');
    // this.load.image('add_unit_icon', 'assets/sprites/add_unit_icon.png');
    this.load.image('info_panel', 'assets/sprites/info_panel.png');
    this.load.image('unit_panel', 'assets/sprites/unit_panel_.png');
    this.load.image('build_unit_button', 'assets/sprites/build_unit_button.png');
    this.load.image('info_panel', 'assets/sprites/info_panel.png');
    this.load.image('unit_panel', 'assets/sprites/unit_panel.png');
    this.load.image('ground_panel', 'assets/sprites/ground_panel_.png');
    this.load.image('nation_panel', 'assets/sprites/nation_panel.png');
    this.load.image('nation_panel_top', 'assets/sprites/nation_panel_top.png');
    this.load.image('nation_panel_bottom', 'assets/sprites/nation_panel_bottom.png');
    this.load.image('tech_tree', 'assets/sprites/tech_tree.png');
  }
  create() {
    this.scene.start("startGame");
    //this.scene.start("PlayGame");

  }
}








