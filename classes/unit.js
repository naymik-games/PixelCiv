class Unit {
  // { frame: playerIndex, owner: staticPlayerData[playerIndex].id, complete: true, turnAdded: 1, isHome: true }
  constructor(index, owner, added, complete) {
    this.id = index
    this.owner = owner
    this.complete = complete;
    this.turnAdded = added
    this.hp = 100
    this.path = []
    this.tookAction = null
  }
}



let unitTypes = {
  SETTLER: { name: 'SETTLER', index: 'settler', frames: [0, 0, 0, 0], canUpgrade: false, upgradeAction: null, movement: 3, menu: ['move,', 'fortify', 'remove', 'settle'] },
  WARRIOR: { name: 'WARRIOR', index: 'warrior', frames: [1, 1, 1, 1], canUpgrade: true, upgradeAction: 'SWORDSMANPLUS', movement: 4 },
  SPEARMAN: { name: 'SPEARMAN', index: 'spearman', frames: [2, 2, 2, 2], canUpgrade: true, upgradeAction: 'ARCHERPLUS', movement: 3 },
  LEGION: { name: 'LEGION', index: 'legion', frames: [3, 3, 3, 3], canUpgrade: true, upgradeAction: 'ARCHERPLUS', movement: 3 },
  ARCHER: { name: 'ARCHER', index: 'archer', frames: [4, 4, 4, 4], canUpgrade: true, upgradeAction: 'ARCHERPLUS', movement: 3 },
  KNIGHT: { name: 'KNIGHT', index: 'knight', frames: [3, 23, 43, 63], canUpgrade: true, upgradeAction: 'KNIGHTPLUS', movement: 10 },
  LEADER: { name: 'LEADER', index: 'leader', frames: [4, 24, 44, 64], canUpgrade: true, upgradeAction: 'LEADERPLUS', movement: 8 },
  SPEARMANPLUS: { name: 'SPEARMAN +', index: 'spearmanplus', frames: [5, 25, 45, 65], canUpgrade: false, upgradeAction: 'NO', movement: 7 },
  SWORDSMANPLUS: { name: 'SWORDSMAN +', index: 'swordsmanplus', frames: [6, 26, 46, 66], canUpgrade: false, upgradeAction: 'NO', movement: 8 },
  ARCHERPLUS: { name: 'ARCHER +', index: 'archerplus', frames: [7, 27, 47, 67], canUpgrade: false, upgradeAction: 'NO', movement: 5 },
  KNIGHTPLUS: { name: 'KNIGHT +', index: 'knightplus', frames: [8, 28, 48, 68], canUpgrade: false, upgradeAction: 'NO', movement: 12 },
  LEADERPLUS: { name: 'LEADER +', index: 'leaderplus', frames: [9, 29, 49, 69], canUpgrade: false, upgradeAction: 'NO', movement: 10 },
}

/* 
Legion
Phalanx
Armor (Tank)
Artillery
Cannon
Caravan
Catapult
Cavalry
Chariot
Diplomat
Knight

Mech
Militia
Musketeer

Riflemen
Settlers 
*/