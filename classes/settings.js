const Random = Phaser.Math.Between;
const COLOR_MAIN_ORANGE = 0xAF5E49;
const COLOR_MAIN_TAN = 0xe1c59e;
const COLOR_DARK = 0xe1c59e;

//TILE z
const RESOURCE = 1
const CITY = 2
const IMPROVEMENT = 3
const ROAD = 4
const UNIT = 5
//((distance + 1) * Government corruption) /( number of corruption buildings + 1)


let civIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let ageNames = ['Ancient', 'Medival', 'Industrial', 'Electric', 'Modern', 'Future']
let cityType = ['nothing', 'Town', 'City', 'Metropolis']

let techAges = ['Ancient', 'Middle Ages', 'Industrial', 'Modern']
var colorArray = [0x2e86c1, 0xc0392b, 0x7d3c98, 0x229954, 0xf1c40f,
  0xdc7633, 0x7f8c8d, 0x2c3e50, 0xecf0f1, 0xB34D4D,
  0x80B300, 0x809900, 0xE6B3B3, 0x6680B3, 0x66991A,
  0xFF99E6, 0xCCFF1A, 0xFF1A66, 0xE6331A, 0x33FFCC,
  0x66994D, 0xB366CC, 0x4D8000, 0xB33300, 0xCC80CC,
  0x66664D, 0x991AFF, 0xE666FF, 0x4DB3FF, 0x1AB399,
  0xE666B3, 0x33991A, 0xCC9999, 0xB3B31A, 0x00E680,
  0x4D8066, 0x809980, 0xE6FF80, 0x1AFF33, 0x999933,
  0xFF3380, 0xCCCC00, 0x66E64D, 0x4D80CC, 0x9900B3,
  0xE64D66, 0x4DB380, 0xFF4D4D, 0x99E6E6, 0x6666FF];

let gameWidth = 100
let gameHeight = 75
let gameSeed = 1
let gamePlayers = 5
let playerCiv = 0
let gameBoard
let theGame;
let tileData;
let gameData
let gameLoad = 'new'
let defaultValues

let farmBonusTerrain = [0, 0, 0, 1, 0, 1, 1, 0, 0, 0]
let mineBonusTerrain = [0, 0, 0, 1, 0, 1, 1, 2, 2, 1]
/*  0 deep water
1 shallow water
2 sand
3 flood plain
4 forest
5 grassland
6 plain
7 hills
8 mountain
9 snow */
let resources = [
  {
    name: 'Gold',
    type: 'Bonus',
    id: 0,
    bonus: { f: 0, p: 0, t: 4 },
    prequisite: -1,
    terrain: [7, 8, 9]
  },
  {
    name: 'Wheat',
    type: 'Bonus',
    id: 1,
    bonus: { f: 2, p: 0, t: 0 },
    prequisite: -1,
    terrain: [3, 5, 6]
  },
  {
    name: 'Fish',
    type: 'Bonus',
    id: 2,
    bonus: { f: 2, p: 0, t: 1 },
    prequisite: -1,
    terrain: [1]
  },
  {
    name: 'Cattle',
    type: 'Bonus',
    id: 3,
    bonus: { f: 2, p: 1, t: 0 },
    prequisite: -1,
    terrain: [5, 6]
  },
  {
    name: 'Whale',
    type: 'Bonus',
    id: 4,
    bonus: { f: 1, p: 1, t: 2 },
    prequisite: -1,
    terrain: [0]
  },
  {
    name: 'Game',
    type: 'Bonus',
    id: 5,
    bonus: { f: 1, p: 0, t: 0 },
    prequisite: -1,
    terrain: [4, 5, 6, 7]
  },
  {
    name: 'Dyes',
    type: 'Luxery',
    id: 6,
    bonus: { f: 0, p: 0, t: 1 },
    prequisite: -1,
    terrain: [3, 5, 6]
  },
  {
    name: 'Fur',
    type: 'Luxery',
    id: 7,
    bonus: { f: 0, p: 1, t: 1 },
    prequisite: -1,
    terrain: [4, 5, 7]
  }
  ,
  {
    name: 'Gems',
    type: 'Luxery',
    id: 8,
    bonus: { f: 0, p: 0, t: 4 },
    prequisite: -1,
    terrain: [2, 6, 8]
  },
  {
    name: 'Incense',
    type: 'Luxery',
    id: 9,
    bonus: { f: 0, p: 0, t: 1 },
    prequisite: -1,
    terrain: [2, 5, 6]
  },
  {
    name: 'Ivory',
    type: 'Luxery',
    id: 10,
    bonus: { f: 0, p: 0, t: 2 },
    prequisite: -1,
    terrain: [5, 6]
  },
  {
    name: 'Silk',
    type: 'Luxery',
    id: 11,
    bonus: { f: 0, p: 0, t: 3 },
    prequisite: -1,
    terrain: [3, 4, 5, 6]
  },
  {
    name: 'Spice',
    type: 'Luxery',
    id: 12,
    bonus: { f: 0, p: 0, t: 2 },
    prequisite: -1,
    terrain: [3, 5]
  },
  {
    name: 'Wine',
    type: 'Luxery',
    id: 13,
    bonus: { f: 1, p: 0, t: 1 },
    prequisite: -1,
    terrain: [3, 5]
  },
  {
    name: 'Aluminum',
    type: 'Strategic',
    id: 14,
    bonus: { f: 0, p: 2, t: 0 },
    prequisite: -1,
    terrain: [7, 8, 9]
  },
  {
    name: 'Coal',
    type: 'Strategic',
    id: 15,
    bonus: { f: 0, p: 2, t: 1 },
    prequisite: -1,
    terrain: [7, 8, 9]
  },
  {
    name: 'Horses',
    type: 'Strategic',
    id: 16,
    bonus: { f: 0, p: 0, t: 1 },
    prequisite: -1,
    terrain: [5, 6]
  },
  {
    name: 'Iron',
    type: 'Strategic',
    id: 17,
    bonus: { f: 0, p: 1, t: 0 },
    prequisite: -1,
    terrain: [7, 8, 9]
  },
  {
    name: 'Oil',
    type: 'Strategic',
    id: 18,
    bonus: { f: 0, p: 1, t: 2 },
    prequisite: -1,
    terrain: [0, 2, 6]
  },
  {
    name: 'Rubber',
    type: 'Strategic',
    id: 19,
    bonus: { f: 0, p: 0, t: 2 },
    prequisite: -1,
    terrain: [4]
  },
  {
    name: 'Saltpeter',
    type: 'Strategic',
    id: 20,
    bonus: { f: 0, p: 0, t: 1 },
    prequisite: -1,
    terrain: [2]
  },
  {
    name: 'Uranium',
    type: 'Strategic',
    id: 21,
    bonus: { f: 0, p: 2, t: 3 },
    prequisite: -1,
    terrain: [7, 8, 9]
  }

]
let resourcePicker = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
/* a) Attack strength is the likelihood of inflicting damage when attacking an opponent. Units with an attack strength equal to zero cannot initiate combat.

b) Defense strength represents the ability of a unit to defend itself when attacked; It is the likelihood that damage will be inflicted on an attacking unit.

c) Hit points indicate how much damage a unit can withstand before it is destroyed. The true number of hit points is the hit point value x10. A 2hp unit thus has 20 hit points.

d) Firepower indicates how much damage a unit can inflict in one round of combat. A successful round reduces the opponent’s total hit points by the value of the unit’s firepower.
 
U / (a + d), where:

U = the unit’s modified factor,

a = the attacker’s modified attack factor, and

d = the defender’s modified defense factor


Depending upon your difficulty level, a certain number of citizens are born content, the remainder all start out unhappy (this is the base unhappiness that shows up as "it's just too crowded").

So you start just one to a few content citizens and a lot of unhappy ones.

Now apply modifiers to make folks even MORE unhappy (war weariness, aggression against their mother land, having used the whip, having used conscription).

Then you apply the "make unhappy people content" modifiers (temples, wonders, military units (depending upon government), etc...).

Then you apply the "make people happy" modifiers (wonders, luxury resources, luxury tax spending) that can both make content people happy and make unhappy people content.
*/
