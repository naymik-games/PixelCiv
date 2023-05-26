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

const CAMP = 150
const FORT = 160
const CASTLE = 170

//luxery resources
const HORSES = 170//happiness + 5
const GAME = 171 //happiness + 5
const SILVER = 172//happiness + 5
const COPPER = 173//happiness + 5
const GRAPES = 174//happiness + 5
const WOOL = 175//happiness + 5
const SPICES = 176//happiness + 5
const GEMS = 177//happiness + 5
const OIL = 178//happiness + 5
const COAL = 179//happiness + 5

//improvements
const FARM = 90
const LUMBER = 91
const MINE = 92
const QUARRY = 93
const GOLDMINE = 94
const PASTURE = 95
const HOUSE = 96
const BIGHOUSE = 97
const SANDQUARRY = 69
const BARRACKS = 72
const GRAINERY = 77
const THEATER = 99
const MONUMENT = 98
const CATHEDRAL = 73
const COURTHOUSE = 75
const WELL = 79
const FISHING = 119
const LIGHTHOUSE = 99
const WHEAT = 82
const WORKSHOP = 98
const MARKET = 117
const LUMBERCAMP = 130
const GREENHOUSE = 86
const AQUADUCT = 70
const TOWER = 131




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
  EXPLORE: { cost: [-10, -5, 0, 0, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  EXPLOREMANY: { cost: [-50, -100, 0, 0, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  CLEAR: { cost: [0, -5, 0, 0, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  CHOP: { cost: [0, -5, 0, 0, 0, 0], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: null },
  DRAIN: { cost: [0, -50, 0, 0, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  PICKFRUIT: { cost: [0, -5, 0, 0, 0, 0], gain: [0, 25, 0, 0, 0, 0], restriction: null, requires: null },
  GATHER: { cost: [0, 0, 0, 0, 0, 0], gain: [0, 5, 0, 0, 0, 0], restriction: null, requires: null },
  HARVESTLUMBER: { cost: [0, -5, 0, 0, 0, 0], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: null },

  MINE: { cost: [0, -75, -100, 0, 0, 0], gain: [0, 0, 0, 5, 0, 0], restriction: null, requires: null },
  LUMBERMILL: { cost: [0, -50, -25, 0, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  GOLDMINE: { cost: [0, 0, -50, -25, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  FARM: { cost: [0, -25, -75, 0, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  FISHINGHUT: { cost: [0, -55, -100, 0, 0, 0], gain: [0, 25, 0, 0, 0, 0], restriction: null, requires: null },
  PASTURE: { cost: [0, 0, -50, 0, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  QUARRY: { cost: [0, -50, -75, -5, 0, 0], gain: [0, 0, 0, 0, 25, 0], restriction: null, requires: null },
  SANDQUARRY: { cost: [0, -50, -75, -5, 0, 0], gain: [0, 0, 0, 0, 5, 0], restriction: null, requires: null },
  HOUSE: { cost: [0, -25, -50, 0, 0, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  TOWER: { cost: [-50, -5, -10, -5, -50, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  LUMBERCAMP: { cost: [0, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: ['IRONWORKING'] },
  MARKET: { cost: [0, -100, -50, -75, -0, -20], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: ['CURRENCY'] },

  COURTHOUSE: { cost: [0, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: ['FEUDALISM'] },
  GREENHOUSE: { cost: [0, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: null },
  WORKSHOP: { cost: [0, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: ['IRONWORKING'] },
  LIGHTHOUSE: { cost: [0, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: ['NAVIGATION'] },
  WELL: { cost: [0, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: null },
  AQUADUCT: { cost: [0, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: ['NEAR WATER'], requires: ['ENGINEERING'] },

  CATHEDRAL: { cost: [0, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: ['THEOLOGY'] },
  THEATER: { cost: [0, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: ['EDUCATION'] },
  MONUMENT: { cost: [0, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: null },
  GRAINERY: { cost: [0, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: null },
  BARRACKS: { cost: [0, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: null },
  MONUMENT: { cost: [0, -100, -25, -75, -0, -10], gain: [0, 0, 25, 0, 0, 0], restriction: null, requires: ['CONSTRUCTION'] },

  UPGRADEHOUSE: { cost: [-10, -100, -75, 0, -25, 0], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  UPGRADECAMP: { cost: [-10, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  UPGRADEFORT: { cost: [-10, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },

  COLLECTHORSES: { cost: [0, -150, -25, 0, 0, 0], gain: [0, 0, 0, 0, 0, 5], restriction: null, requires: null },
  COLLECTGAME: { cost: [0, -150, -25, 0, 0, 0], gain: [0, 25, 0, 0, 0, 0], restriction: null, requires: null },
  COLLECTSILVER: { cost: [0, -150, -25, 0, 0, 0], gain: [0, 0, 0, 15, 0, 0], restriction: null, requires: null },
  COLLECTCOPPER: { cost: [0, -150, -25, 0, 0, 0], gain: [0, 0, 0, 10, 0, 0], restriction: null, requires: null },
  COLLECTGRAPES: { cost: [0, -150, -25, 0, 0, 0], gain: [0, 25, 0, 0, 0, 5], restriction: null, requires: null },
  COLLECTWOOL: { cost: [0, -150, -25, 0, 0, 0], gain: [0, 25, 0, 0, 0, 5], restriction: null, requires: null },
  COLLECTSPICES: { cost: [0, -150, -25, 0, 0, 0], gain: [0, 0, 0, 0, 0, 10], restriction: null, requires: null },
  COLLECTGEMS: { cost: [0, -150, -25, 0, 0, 0], gain: [0, 0, 0, 0, 0, 25], restriction: null, requires: null },

  SETTLER: { cost: [-10, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  WARRIOR: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  SPEARMAN: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  LEGION: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  ARCHER: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  CHARIOT: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  CATIPULT: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },

  SWORDSMAN: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  PIKEMAN: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  LONGBOWMAN: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  KNIGHT: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  TREBUCHET: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },

  MUSKETEER: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  CANNON: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  CALVERY: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  RIFLEMAN: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },

  INFANTRY: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  TANK: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  ARTILLERY: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  MECHANIZEDINFANTRY: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  FIGHTER: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  BOMBER: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },
  NUKE: { cost: [-1, -150, -75, -25, -25, -25], gain: [0, 0, 0, 0, 0, 0], restriction: null, requires: null },

}
//STARTING REVEAL
let startIndexes = [GRASS, FOREST, ORCHARD, HILL, LAKE, DUNE, MOUNTAIN, GOLD, SWAMP, PALMTREE]
let startTilesWeight = [13, 10, 9, 8, 7, 3, 8, 7, 6, 3, 8, 8, 6]
//WHEN EPLORING
let resourceIndexes = [GRASS, FOREST, ORCHARD, HILL, LAKE, DUNE, MOUNTAIN, GOLD, SWAMP, PALMTREE, CATTLE, MUSHROOM, HORSES, GAME, SILVER, COPPER, GRAPES, WOOL, SPICES, GEMS]
let newTilesWeight = [14, 10, 9, 8, 7, 3, 8, 7, 6, 3, 8, 6, 5, 5, 5, 5, 5, 5]
//BONUS
let bonusIndexes = [FOREST, ORCHARD, HILL, LAKE, SWAMP, PALMTREE, MUSHROOM]
let bonusTilesWeight = [10, 9, 8, 7, 4, 5, 8]

let improvementStaticData = {
  119: { name: 'FISHING HUT', type: 'fishinghut' },
  90: { name: 'FARM', type: 'farm' },
  91: { name: 'LUMBER MILL', type: 'lumbermill' },
  92: { name: 'MINE', type: 'mine' },
  93: { name: 'QUARRY', type: 'quarry' },
  94: { name: 'GOLD MINE', type: 'goldmine' },
  95: { name: 'PASTURE', type: 'pasture' },
  96: { name: 'HOUSE', type: 'house' },
  97: { name: 'BIG HOUSE', type: 'bighouse' },
  93: { name: 'QUARRY', type: 'sandquarry' },
  150: { name: 'CAMP', type: 'camp' },
  151: { name: 'FORT', type: 'fort' },
  160: { name: 'CASTLE', type: 'castle' },
  72: { name: 'BARRACKS', type: 'barracks' },
  77: { name: 'GRAINERY', type: 'grainery' },
  74: { name: 'THEATER', type: 'theater' },
  74: { name: 'MONUMENT', type: 'monument' },
  73: { name: 'CATHEDRAL', type: 'cathedral' },
  75: { name: 'COURTHOUSE', type: 'courthouse' },
  75: { name: 'WELL', type: 'well' },
  89: { name: 'LIGHTHOUSE', type: 'lighthouse' },
  88: { name: 'WHEAT FIELD', type: 'wheatfield' },
  83: { name: 'WORKSHOP', type: 'workshop' },
  117: { name: 'MARKET', type: 'market' },
  130: { name: 'LUMBER CAMP', type: 'lumbercamp' },
  130: { name: 'GREENHOUSE', type: 'greenhouse' },
  70: { name: 'AQUADUCT', type: 'aquaduct' },
  131: { name: 'TOWER', type: 'tower' },


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