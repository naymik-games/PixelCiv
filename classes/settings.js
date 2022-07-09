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
let civNames = ['ROME', 'AMERICA', 'RUSSIA', 'FRANCE', 'CHINA', 'ENGLAND']
let cityNames = [['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'], ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'], ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'], ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'], ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'], ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX']]
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
  { name: 'WORKER', description: 'Prepare tiles adjacent to the city for improvement', costFood: 1, costProduction: 10, days: 5, workTime: 3, actions: [FARM, MINE, GOTO] },
  { name: 'SETTLER', description: 'Settles a new City', costFood: 1, costProduction: 20, days: 10, actions: [GOTO, SETTLE] },
  { name: 'WARRIOR', description: 'Basic defense and attack', costFood: 1, costProduction: 5, days: 5, actions: [GOTO, FORTIFY] }
]
var colorArray = [0xFF6633, 0xFFB399, 0xFF33FF, 0xFFFF99, 0x00B3E6,
  0xE6B333, 0x3366E6, 0x999966, 0x99FF99, 0xB34D4D,
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
let theGame;
let tileData;
let gameData
let gameLoad = 'new'
let defaultValues = {
  game: {},
  countries: [],
  tiles: []
}
