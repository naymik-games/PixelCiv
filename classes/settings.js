const Random = Phaser.Math.Between;
const COLOR_PRIMARY = 0x03a9f4;
const COLOR_LIGHT = 0x67daff;
const COLOR_DARK = 0x007ac1;

let civNames = ['ROME', 'AMERICA', 'RUSSIA', 'FRANCE', 'CHINA', 'ENGLAND']
let improvementNames = ['FARM', 'LUMBER MILL', 'QUARY', 'ARCHERY', 'BLACK SMITH', 'FORT', 'MINE', 'CAPITAL']
let improvementInfo = [
  { description: 'Increase food production', productionFactor: 1.5, costProduction: 5, costGold: 5, days: 3 },
  { description: 'Improve industry', productionFactor: 1.5, costProduction: 5, costGold: 5, days: 3 },
  { description: 'Increase industry', productionFactor: 1.5, costProduction: 5, costGold: 5, days: 3 },
  { description: 'Improve military strength', productionFactor: 1.25, costProduction: 5, costGold: 5, days: 5 },
  { description: 'Increase industry', productionFactor: 2, costProduction: 7, costGold: 7, days: 4 },
  { description: 'Increase military strength', productionFactor: 2, costProduction: 10, costGold: 10, days: 10 },
  { description: 'Increase industry', productionFactor: 2, costProduction: 10, costGold: 10, days: 5 },
  { description: 'City Center', productionFactor: 1, costProduction: 100, costGold: 100, days: 15 },

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