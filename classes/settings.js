
function loadFont(name, url) {
  var newFont = new FontFace(name, `url(${url})`);
  newFont.load().then(function (loaded) {
    document.fonts.add(loaded);
  }).catch(function (error) {
    return error;
  });
}
loadFont("KenneyPixelSquare", "assets/fonts/KenneyPixelSquare.ttf");
loadFont("KenneyMiniSquare", "assets/fonts/KenneyMiniSquare.ttf");

let gameSettings;
var defaultValues = {
  mostDotsMoves: 0,
  mostDotsTime: 0,
  levelStatus: [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  totalSquares: 0,
  group: 0,
  currentLevel: 0
}
let newGame = true
let godMode = 1
let groundLayerImage = []
let groundLayerData = []


let improvementayerImage = []
let improvementLayerData = []
let unitLayerImage = []
let unitLayerData = []
let borderArray = []

let neighbor4Coords = [[0, 1], [0, -1], [-1, 0], [1, 0]]
let neighbor8Coords = [[0, 1], [0, -1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, 1], [1, -1]]


let groundLayerDataTile = { frame: 0, owner: 0, improved: false }
let improvementLayerDataTile = { frame: 0, owner: 0, complete: false, turnAdded: 0 }
let unitLayerDataTile = { frame: 0, type: 0, owner: 0, complete: false, turnAdded: 0, hp: 100 }
let gameData
let gameDataDefault = {
  currentPlayer: 0,
  turn: 1,
  day: 1
}





let menus = {
  unexplored: [
    {
      name: 'EXPLORE',
      index: 'EXPLORE'
    }
  ],
  grass: [
    {
      name: 'HOUSE',
      index: 'HOUSE'
    },
    {
      name: 'FARM',
      index: 'FARM'
    },
    {
      name: 'LUMBER MILL',
      index: 'LUMBERMILL'
    },
    {
      name: 'TOWER',
      index: 'TOWER'
    },
    {
      name: 'AQUADUCT',
      index: 'AQUADUCT',

    },
    {
      name: 'MARKET',
      index: 'MARKET'
    }
  ],
  tree: [
    {
      name: 'CHOP',
      index: 'CHOP'
    },
    {
      name: 'LUMBER CAMP',
      index: 'LUMBERCAMP',

    }
  ],
  mountain: [
    {
      name: 'MINE',
      index: 'MINE'
    }
  ],
  sand: [
    {
      name: 'MINE',
      index: 'MINE'
    }
  ],
  fruittree: [
    {
      name: 'PICK FRUIT',
      index: 'PICKFRUIT'
    }
  ],
  hill: [
    {
      name: 'QUARRY',
      index: 'QUARRY'
    }
  ],
  lake: [
    {
      name: 'FISHING HUT',
      index: 'FISHINGHUT'
    },
    {
      name: 'AQUADUCT',
      index: 'AQUADUCT',

    }
  ],
  gold: [
    {
      name: 'GOLD MINE',
      index: 'GOLDMINE'
    }
  ],
  dune: [
    {
      name: 'QUARRY',
      index: 'SANDQUARRY'
    }
  ],
  palmtree: [
    {
      name: 'CHOP',
      index: 'HARVESTLUMBER'
    }
  ],
  swamp: [
    {
      name: 'DRAIN',
      index: 'DRAIN'
    }
  ],
  cattle: [
    {
      name: 'PASTURE',
      index: 'PASTURE'
    }
  ],
  mushroom: [
    {
      name: 'GATHER',
      index: 'GATHER'
    }
  ],
  farm: [
    {
      name: 'CLEAR',
      index: 'CLEAR'
    }
  ],
  lumbermill: [
    {
      name: 'CLEAR',
      index: 'CLEAR'
    }
  ],
  fishinghut: [
    {
      name: 'CLEAR',
      index: 'CLEAR'
    }
  ],
  quarry: [
    {
      name: 'CLEAR',
      index: 'CLEAR'
    }
  ],
  sandquarry: [
    {
      name: 'CLEAR',
      index: 'CLEAR'
    }
  ],
  house: [
    {
      name: 'CLEAR',
      index: 'CLEAR'
    },
    {
      name: 'UPGRADE',
      index: 'UPGRADEHOUSE'
    }
  ],
  bighouse: [
    {
      name: 'CLEAR',
      index: 'CLEAR'
    }/* ,
    {
      name: 'UPGRADE',
      index: 'UPGRADEHOUSE'
    } */
  ],
  camp: [
    {
      name: 'UPGRADE',
      index: 'UPGRADECAMP'
    }
  ],
  tower: [
    {
      name: 'UPGRADE',
      index: 'UPGRADETOWER'
    },
    {
      name: 'ATTACK',
      index: 'TOWERATTACK'
    }
  ],
  horses: [
    {
      name: 'COLLECT',
      index: 'COLLECTHORSES'
    }
  ],
  game: [
    {
      name: 'COLLECT',
      index: 'COLLECTGAME'
    }
  ],
  silver: [
    {
      name: 'COLLECT',
      index: 'COLLECTSILVER'
    }
  ],
  copper: [
    {
      name: 'COLLECT',
      index: 'COLLECTCOPPER'
    }
  ],
  grapes: [
    {
      name: 'COLLECT',
      index: 'COLLECTGRAPES'
    }
  ],
  wool: [
    {
      name: 'COLLECT',
      index: 'COLLECTWOOL'
    }
  ],
  spices: [
    {
      name: 'COLLECT',
      index: 'COLLECTSPICES'
    }
  ],
  flax: [
    {
      name: 'COLLECT',
      index: 'COLLECTFLAX'
    }
  ],
  units: [
    {
      name: 'SPEARMAN',
      index: 'SPEARMAN'
    },
    {
      name: 'SWORDSMAN',
      index: 'SWORDSMAN'
    },
    {
      name: 'ARCHER',
      index: 'ARCHER'
    },
    {
      name: 'KNIGHT',
      index: 'KNIGHT'
    },
    {
      name: 'LEADER',
      index: 'LEADER'
    },
    {
      name: 'CATAPULT',
      index: 'CATAPULT'
    }
  ]
}