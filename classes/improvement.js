//tile constants

//ground/resources
const GRASS = 1
const FOREST = 30
const ORCHARD = 31
const HILL = 32
const LAKE = 33
const DUNE = 35
const MOUNTAIN = 36
const GOLD = 37
const SWAMP = 38
const PALMTREE = 39
const FISH = 46
const CATTLE = 47
const MUSHROOM = 48
const FISHINGHUT = 50
const CAMP = 70
const FORT = 71
const CASTLE = 72

//luxery resources
const HORSES = 100//happiness + 5
const GAME = 101 //happiness + 5
const SILVER = 102//happiness + 5
const COPPER = 103//happiness + 5
const GRAPES = 104//happiness + 5
const WOOL = 105//happiness + 5
const SPICES = 106//happiness + 5
const FLAX = 107//happiness + 5


//improvements
const FARM = 61
const LUMBER = 62
const MINE = 63
const QUARRY = 64
const GOLDMINE = 65
const PASTURE = 66
const HOUSE = 67
const BIGHOUSE = 68
const SANDQUARRY = 69
const BARRACKS = 73
const GRAINERY = 74
const THEATER = 75
const MONUMENT = 76
const CATHEDRAL = 77
const COURTHOUSE = 78
const WELL = 79
const FISHING = 80
const LIGHTHOUSE = 81
const WHEAT = 82
const WORKSHOP = 83
const MARKET = 84
const LUMBERCAMP = 85
const GREENHOUSE = 86
const AQUADUCT = 87
const TOWER = 88




class Improvement {
  // { frame: playerIndex, owner: staticPlayerData[playerIndex].id, complete: true, turnAdded: 1, isHome: true }
  constructor(index, owner, added, complete, home) {
    this.id = index //frame of improvement
    this.owner = owner
    this.complete = complete;
    this.turnAdded = added
    this.isHome = home


  }
}
//{ population: -25, food: -75, lumber: -100, ore: 0,stone: 0, gold: 0 }
//restrictions: nearwater; requires: ; tech: 
let actionData = {
  EXPLORE: { cost: [-1, -5, 0, 0, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  EXPLOREMANY: { cost: [-50, -100, 0, 0, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  CLEAR: { cost: [-1, -5, 0, 0, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  CHOP: { cost: [-1, -5, 0, 0, 0, 0], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: null },
  DRAIN: { cost: [-1, -50, 0, 0, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  PICKFRUIT: { cost: [-1, -5, 0, 0, 0, 0], gain: [0, 25, 0, 0, 0, 0], restriction: null, requires: null },
  GATHER: { cost: [-1, 0, 0, 0, 0, 0], gain: [0, 5, 0, 0, 0, 0], restriction: null, requires: null },
  HARVESTLUMBER: { cost: [-1, -5, 0, 0, 0, 0], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: null },

  MINE: { cost: [-25, -75, -100, 0, 0, 0], gain: [0, 0, 0, 5, 0, 0], restriction: null, requires: null },
  LUMBERMILL: { cost: [-10, -50, -25, 0, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  GOLDMINE: { cost: [-10, 0, -50, -25, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  FARM: { cost: [-10, -25, -75, 0, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  FISHINGHUT: { cost: [-15, -55, -100, 0, 0, 0], gain: [0, 25, 0, 0, 0, 0], restriction: null, requires: null },
  PASTURE: { cost: [-5, 0, -50, 0, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  QUARRY: { cost: [-25, -50, -75, -5, 0, 0], gain: [0, 0, 0, 0, 25, 0], restriction: null, requires: null },
  SANDQUARRY: { cost: [-25, -50, -75, -5, 0, 0], gain: [0, 0, 0, 0, 5, 0], restriction: null, requires: null },
  HOUSE: { cost: [-10, -25, -50, 0, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  TOWER: { cost: [-5, -5, -10, -5, -50, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  LUMBERCAMP: { cost: [-25, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: ['IRONWORKING'] },
  MARKET: { cost: [-25, -100, -50, -75, -0, -20], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: ['CURRENCY'] },

  COURTHOUSE: { cost: [-25, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: ['FEUDALISM'] },
  GREENHOUSE: { cost: [-25, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: null },
  WORKSHOP: { cost: [-25, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: ['IRONWORKING'] },
  LIGHTHOUSE: { cost: [-25, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: ['NAVIGATION'] },
  WELL: { cost: [-25, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: null },
  AQUADUCT: { cost: [-25, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: ['NEAR WATER'], requires: ['ENGINEERING'] },

  CATHEDRAL: { cost: [-25, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: ['THEOLOGY'] },
  THEATER: { cost: [-25, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: ['EDUCATION'] },
  MONUMENT: { cost: [-25, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: null },
  GRAINERY: { cost: [-25, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: null },
  BARRACKS: { cost: [-25, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: null },
  MONUMENT: { cost: [-25, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: ['CONSTRUCTION'] },

  UPGRADEHOUSE: { cost: [-10, -100, -75, 0, -25, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  UPGRADECAMP: { cost: [-10, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  UPGRADEFORT: { cost: [-10, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },

  COLLECTHORSES: { cost: [-10, -150, -25, 0, 0, 0], gain: [0, 0, 0, 0, 0, 5], restriction: null, requires: null },
  COLLECTGAME: { cost: [-10, -150, -25, 0, 0, 0], gain: [0, 25, 0, 0, 0, 0], restriction: null, requires: null },
  COLLECTSILVER: { cost: [-10, -150, -25, 0, 0, 0], gain: [0, 0, 0, 15, 0, 0], restriction: null, requires: null },
  COLLECTCOPPER: { cost: [-10, -150, -25, 0, 0, 0], gain: [0, 0, 0, 10, 0, 0], restriction: null, requires: null },
  COLLECTGRAPES: { cost: [-10, -150, -25, 0, 0, 0], gain: [0, 25, 0, 0, 0, 5], restriction: null, requires: null },
  COLLECTWOOL: { cost: [-10, -150, -25, 0, 0, 0], gain: [0, 25, 0, 0, 0, 5], restriction: null, requires: null },
  COLLECTSPICES: { cost: [-10, -150, -25, 0, 0, 0], gain: [0, 0, 0, 0, 0, 10], restriction: null, requires: null },
  COLLECTFLAX: { cost: [-10, -150, -25, 0, 0, 0], gain: [0, 0, 0, 0, 0, 25], restriction: null, requires: null },

  SPEARMAN: { cost: [-10, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  SWORDSMAN: { cost: [-10, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  ARCHER: { cost: [-10, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  KNIGHT: { cost: [-10, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  LEADER: { cost: [-10, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },

  SPEARMANPLUS: { cost: [-10, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },//[-10, -150, -75, -25, -25, -25]
  SWORDSMANPLUS: { cost: [-10, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  ARCHERPLUS: { cost: [-10, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  KNIGHTPLUS: { cost: [-10, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  LEADERPLUS: { cost: [-10, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  CATAPULT: { cost: [-10, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },

}
//STARTING REVEAL
let startIndexes = [GRASS, FOREST, ORCHARD, HILL, LAKE, DUNE, MOUNTAIN, GOLD, SWAMP, PALMTREE]
let startTilesWeight = [13, 10, 9, 8, 7, 3, 8, 7, 6, 3, 8, 8, 6]
//WHEN EPLORING
let resourceIndexes = [GRASS, FOREST, ORCHARD, HILL, LAKE, DUNE, MOUNTAIN, GOLD, SWAMP, PALMTREE, CATTLE, MUSHROOM, HORSES, GAME, SILVER, COPPER, GRAPES, WOOL, SPICES, FLAX]
let newTilesWeight = [14, 10, 9, 8, 7, 3, 8, 7, 6, 3, 8, 6, 5, 5, 5, 5, 5, 5]
//BONUS
let bonusIndexes = [FOREST, ORCHARD, HILL, LAKE, SWAMP, PALMTREE, MUSHROOM]
let bonusTilesWeight = [10, 9, 8, 7, 4, 5, 8]

let improvementStaticData = {
  50: { name: 'FISHING HUT', type: 'fishinghut' },
  61: { name: 'FARM', type: 'farm' },
  62: { name: 'LUMBER MILL', type: 'lumbermill' },
  63: { name: 'MINE', type: 'mine' },
  64: { name: 'QUARRY', type: 'quarry' },
  65: { name: 'GOLD MINE', type: 'goldmine' },
  66: { name: 'PASTURE', type: 'pasture' },
  67: { name: 'HOUSE', type: 'house' },
  68: { name: 'BIG HOUSE', type: 'bighouse' },
  69: { name: 'QUARRY', type: 'sandquarry' },
  70: { name: 'CAMP', type: 'camp' },
  71: { name: 'FORT', type: 'fort' },
  72: { name: 'CASTLE', type: 'castle' },
  73: { name: 'BARRACKS', type: 'barracks' },
  74: { name: 'GRAINERY', type: 'grainery' },
  75: { name: 'THEATER', type: 'theater' },
  76: { name: 'MONUMENT', type: 'monument' },
  77: { name: 'CATHEDRAL', type: 'cathedral' },
  78: { name: 'COURTHOUSE', type: 'courthouse' },
  79: { name: 'WELL', type: 'well' },
  81: { name: 'LIGHTHOUSE', type: 'lighthouse' },
  82: { name: 'WHEAT FIELD', type: 'wheatfield' },
  83: { name: 'WORKSHOP', type: 'workshop' },
  84: { name: 'MARKET', type: 'market' },
  85: { name: 'LUMBER CAMP', type: 'lumbercamp' },
  86: { name: 'GREENHOUSE', type: 'greenhouse' },
  87: { name: 'AQUADUCT', type: 'aquaduct' },
  88: { name: 'TOWER', type: 'tower' },


}


/* COURTHOUSE
GREENHOUSE
WORKSHOP
LIGHTHOUSE
WELL
AQUADUCT

CATHEDRAL
THEATER
MONUMENT
GRAINERY
BARRACKS */