
let game;


window.onload = function () {
  var config = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1640
    },


    scene: [preloadGame, startGame, playGame, UI, build, buildUnit, unitUI, countryView, cityView, scienceView]
  };


  game = new Phaser.Game(config);
  window.focus();
}


