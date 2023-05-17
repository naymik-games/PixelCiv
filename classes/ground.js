class Ground {
  // / { frame: groundIndex, owner: null, improved: false, explored: false }
  constructor(index) {
    this.frame = index
    this.improved = false
    this.explored = false
    this.border = false

  }
}


let groundStaticData = {
  1: { name: 'GRASS', type: 'grass', cost: 2, helpText: '' },
  2: { name: 'SAND', type: 'sand', cost: 2 },
  3: { name: 'RIVER', type: 'freshwater', cost: null },
  4: { name: 'RIVER', type: 'freshwater', cost: null },
  5: { name: 'RIVER', type: 'freshwater', cost: null },
  6: { name: 'COAST', type: 'coast', cost: null },
  7: { name: 'COAST', type: 'coast', cost: null },
  8: { name: 'COAST', type: 'coast', cost: null },
  //9: {name: 'COAST', type: 'coast'},

  10: { name: '???', type: 'unexplored', cost: 2 },
  11: { name: '???', type: 'unexplored', cost: 2 },
  12: { name: '???', type: 'unexplored', cost: 2 },
  13: { name: 'RIVER', type: 'freshwater', cost: null },
  14: { name: 'RIVER', type: 'freshwater', cost: null },
  15: { name: 'RIVER', type: 'freshwater', cost: null },
  16: { name: 'COAST', type: 'coast', cost: null },
  17: { name: 'SEA', type: 'ocean', cost: null },
  18: { name: 'COAST', type: 'coast', cost: null },
  // 19: {name: 'COAST', type: 'coast'},

  // 20: {name: 'COAST', type: 'coast'},
  //21: {name: 'COAST', type: 'coast'},
  22: { name: 'COAST', type: 'coast', cost: null },
  23: { name: 'COAST', type: 'coast', cost: null },
  24: { name: 'COAST', type: 'coast', cost: null },
  25: { name: 'COAST', type: 'coast', cost: null },
  26: { name: 'COAST', type: 'coast', cost: null },
  27: { name: 'COAST', type: 'coast', cost: null },
  28: { name: 'COAST', type: 'coast', cost: null },
  29: { name: 'COAST', type: 'coast', cost: null },

  30: { name: 'FOREST', type: 'tree', cost: 2 },
  31: { name: 'ORCHARD', type: 'fruittree', cost: 2 },
  32: { name: 'HILL', type: 'hill', cost: 2 },
  33: { name: 'LAKE', type: 'lake', cost: null },
  // 34: { name: 'FOREST', type: 'tree' },
  35: { name: 'SAND DUNE', type: 'dune', cost: 2 },
  36: { name: 'MOUNTAIN', type: 'mountain', cost: null },
  37: { name: 'GOLD', type: 'gold', cost: 2 },
  38: { name: 'SWAMP', type: 'swamp', cost: null },
  39: { name: 'PALM TREE', type: 'palmtree', cost: 2 },

  //40: { name: 'F', type: 'DUNE' },
  //41
  //42
  //43
  //44
  //45
  46: { name: 'FISH', type: 'fish', cost: null },
  47: { name: 'CATTLE', type: 'cattle', cost: 2 },
  48: { name: 'MUSHROOM', type: 'mushroom', cost: 2 },
  //49

  100: { name: 'HORSES', type: 'horses', cost: null },
  101: { name: 'GAME', type: 'game', cost: null },
  102: { name: 'SILVER', type: 'silver', cost: null },
  103: { name: 'COPPER', type: 'copper', cost: null },
  104: { name: 'GRAPES', type: 'grapes', cost: null },
  105: { name: 'WOOL', type: 'wool', cost: null },
  106: { name: 'SPICES', type: 'spices', cost: null },
  107: { name: 'FLAX', type: 'flax', cost: null },

}

