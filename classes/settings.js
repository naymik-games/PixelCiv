const Random = Phaser.Math.Between;
const COLOR_PRIMARY = 0x03a9f4;
const COLOR_LIGHT = 0x67daff;
const COLOR_DARK = 0x007ac1;
const FARM = 0
const MINE = 1
const GOTO = 2
const DISBAND = 3
const SETTLE = 4
const FORTIFY = 5
let civIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let civNames = ['ROME', 'AMERICA', 'RUSSIA', 'FRANCE', 'CHINA', 'ENGLAND', 'EGYPT', 'GREECE', 'VIKING']
let cityNames = [['ONE r', 'TWO r', 'THREE r', 'FOUR r', 'FIVE r', 'SIX r'], ['ONE a', 'TWO a', 'THREE a', 'FOUR', 'FIVE', 'SIX'], ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'], ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'], ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'], ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'], ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'], ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'], ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX']]
let ageNames = ['Ancient', 'Medival', 'Industrial', 'Electric', 'Modern', 'Future']
let improvementNames = ['FARM', 'LUMBER MILL', 'QUARY', 'ARCHERY', 'BLACK SMITH', 'FORT', 'MINE', 'TEMPLE', 'GRANARY', 'PALACE', 'AQUADUCT', 'COLUSEUM']
let improvementInfo = [
  { name: 'FARM', description: 'Increase food production', foodBonus: 1, productionBonus: 0, tradeBonus: 0, strengthBonus: 0, cultureBonus: 0, costProduction: 10, costGold: 5, days: 3, maintenance: 1 },
  { name: 'LUMBER MILL', description: 'Improve industry', foodBonus: 0, productionBonus: 2, tradeBonus: 0, strengthBonus: 0, cultureBonus: 0, costProduction: 10, costGold: 5, days: 3, maintenance: 1 },
  { name: 'QUARY', description: 'Increase industry', foodBonus: 0, productionBonus: 1, tradeBonus: 0, strengthBonus: 0, cultureBonus: 0, costProduction: 10, costGold: 5, days: 3, maintenance: 1 },
  { name: 'ARCHERY', description: 'Improve military strength', foodBonus: 0, productionBonus: 0, tradeBonus: 0, strengthBonus: 1, cultureBonus: 0, costProduction: 15, costGold: 5, days: 5, maintenance: 1 },
  { name: 'BLACK SMITH', description: 'Increase industry', foodBonus: 0, productionBonus: 1, tradeBonus: 1, strengthBonus: 0, cultureBonus: 0, costProduction: 17, costGold: 7, days: 4, maintenance: 1 },
  { name: 'FORT', description: 'Increase military strength', foodBonus: 0, productionBonus: 0, tradeBonus: 0, strengthBonus: 2, cultureBonus: 0, costProduction: 50, costGold: 10, days: 10, maintenance: 5 },
  { name: 'MINE', description: 'Increase industry', foodBonus: 0, productionBonus: 1, tradeBonus: 1, strengthBonus: 0, cultureBonus: 0, costProduction: 30, costGold: 10, days: 5, maintenance: 2 },
  { name: 'TEMPLE', description: 'Provide spiritual satisfaction', foodBonus: 0, productionBonus: 0, tradeBonus: 0, strengthBonus: 0, cultureBonus: 1, costProduction: 100, costGold: 100, days: 15, maintenance: 10 },
  { name: 'GRANARY', description: 'Icreease food storage', foodBonus: 1, productionBonus: 0, tradeBonus: 1, strengthBonus: 0, cultureBonus: 1, costProduction: 50, costGold: 8, days: 5, maintenance: 1 },
  { name: 'PALACE', description: 'Palace', foodBonus: 0, productionBonus: 0, tradeBonus: 1, strengthBonus: 0, cultureBonus: 1, costProduction: 100, costGold: 100, days: 15, maintenance: 10 },
  { name: 'AQUADUCT', description: 'Increase farming and health', foodBonus: 1, productionBonus: 0, tradeBonus: 0, strengthBonus: 0, cultureBonus: 1, costProduction: 75, costGold: 12, days: 10, maintenance: 2 },
  { name: 'COLUSEUM', description: 'Provide entertainment', foodBonus: 0, productionBonus: 0, tradeBonus: 1, strengthBonus: 0, cultureBonus: 2, costProduction: 100, costGold: 15, days: 5, maintenance: 3 },
]
let unitInfo = [
  { name: 'WORKER', description: 'Prepare tiles adjacent to the city for improvement', costProduction: 10, days: 5, workTime: 4, actions: [FARM, MINE, GOTO, FORTIFY], a: 0, d: 0, m: 1 },
  { name: 'SETTLER', description: 'Settles a new City', costProduction: 30, days: 10, actions: [GOTO, SETTLE], a: 0, d: 0, m: 1 },
  { name: 'WARRIOR', description: 'Basic defense and attack', costProduction: 10, days: 5, actions: [GOTO, FORTIFY], a: 1, d: 1, m: 1 }
]
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

let resources = [
  {
    name: 'Gold',
    type: 'Bonus',
    id: 0,
    bonus: { f: 0, p: 0, t: 4 },
    prequisite: -1
  },
  {
    name: 'Wheat',
    type: 'Bonus',
    id: 1,
    bonus: { f: 2, p: 0, t: 0 },
    prequisite: -1
  },

  {
    name: 'Cattle',
    type: 'Bonus',
    id: 2,
    bonus: { f: 2, p: 1, t: 0 },
    prequisite: -1
  },
  {
    name: 'Wine',
    type: 'Luxery',
    id: 3,
    bonus: { f: 1, p: 0, t: 1 },
    prequisite: -1
  },
  {
    name: 'Spice',
    type: 'Luxery',
    id: 4,
    bonus: { f: 0, p: 0, t: 2 },
    prequisite: -1
  },
  {
    name: 'Gems',
    type: 'Luxery',
    id: 5,
    bonus: { f: 0, p: 0, t: 4 },
    prequisite: -1
  },
  {
    name: 'Silk',
    type: 'Luxery',
    id: 6,
    bonus: { f: 0, p: 0, t: 3 },
    prequisite: -1
  },
  {
    name: 'Fur',
    type: 'Luxery',
    id: 7,
    bonus: { f: 0, p: 1, t: 1 },
    prequisite: -1
  },
  {
    name: 'Incense',
    type: 'Luxery',
    id: 8,
    bonus: { f: 0, p: 0, t: 1 },
    prequisite: -1
  },
  {
    name: 'Saltpeter',
    type: 'Strategic',
    id: 9,
    bonus: { f: 0, p: 0, t: 1 },
    prequisite: -1
  },
  {
    name: 'Coal',
    type: 'Strategic',
    id: 10,
    bonus: { f: 0, p: 2, t: 1 },
    prequisite: -1
  },
  {
    name: 'Oil',
    type: 'Strategic',
    id: 11,
    bonus: { f: 0, p: 1, t: 2 },
    prequisite: -1
  },
  {
    name: 'Iron',
    type: 'Strategic',
    id: 12,
    bonus: { f: 0, p: 1, t: 0 },
    prequisite: -1
  },
  {
    name: 'Fish',
    type: 'Bonus',
    id: 13,
    bonus: { f: 2, p: 0, t: 1 },
    prequisite: -1
  }
]
let resourcePicker = [0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13]
/* a) Attack strength is the likelihood of inflicting damage when attacking an opponent. Units with an attack strength equal to zero cannot initiate combat.

b) Defense strength represents the ability of a unit to defend itself when attacked; It is the likelihood that damage will be inflicted on an attacking unit.

c) Hit points indicate how much damage a unit can withstand before it is destroyed. The true number of hit points is the hit point value x10. A 2hp unit thus has 20 hit points.

d) Firepower indicates how much damage a unit can inflict in one round of combat. A successful round reduces the opponent’s total hit points by the value of the unit’s firepower.
 
U / (a + d), where:

U = the unit’s modified factor,

a = the attacker’s modified attack factor, and

d = the defender’s modified defense factor



*/
