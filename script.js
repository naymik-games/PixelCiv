
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


    scene: [preloadGame, startGame, playGame, UI, showMessages, build, buildUnit, unitUI, countryView, cityView, scienceView, worldView],
    //pixelArt: true,
    // roundPixels: true
  };


  game = new Phaser.Game(config);
  window.focus();
}


