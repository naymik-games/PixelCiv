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


//AVAILABLE IS ERA, REQUIRESIS TECH
let unitTypes = {
  SETTLER: { name: 'SETTLER', index: 'settler', frames: [0, 0, 0, 0], canUpgrade: false, upgradeAction: null, movement: 3, menu: ['move,', 'fortify', 'remove', 'settle'], available: [0, 1, 2, 3], requires: ['FIRE'] },
  WARRIOR: { name: 'WARRIOR', index: 'warrior', frames: [1, 1, 1, 1], canUpgrade: true, upgradeAction: 'SWORDSMAN', movement: 1, menu: ['move,', 'fortify', 'remove', 'attack'], available: [0], requires: ['FIRE'] },
  SPEARMAN: { name: 'SPEARMAN', index: 'spearman', frames: [2, 2, 2, 2], canUpgrade: true, upgradeAction: 'PIKEMAN', movement: 2, menu: ['move,', 'fortify', 'remove', 'attack'], available: [0], requires: ['FIRE', 'WARRIORCODE'] },
  LEGION: { name: 'LEGION', index: 'legion', frames: [3, 3, 3, 3], canUpgrade: true, upgradeAction: 'PIKEMAN', movement: 3, menu: ['move,', 'fortify', 'remove', 'attack'], available: [0], requires: ['FIRE', 'IRONWORKING'] },
  ARCHER: { name: 'ARCHER', index: 'archer', frames: [4, 4, 4, 4], canUpgrade: true, upgradeAction: 'LONGBOWMAN', movement: 2, menu: ['move,', 'fortify', 'remove', 'attack'], available: [0], requires: ['FIRE', 'WARRIORCODE'] },
  CHARIOT: { name: 'CHARIOT', index: 'chariot', frames: [5, 5, 5, 5], canUpgrade: false, upgradeAction: null, movement: 4, menu: ['move,', 'fortify', 'remove', 'attack'], available: [0], requires: ['FIRE', 'WHEEL'] },
  CATIPULT: { name: 'CATIPULT', index: 'catipult', frames: [6, 6, 6, 6], canUpgrade: false, upgradeAction: null, movement: 4, menu: ['move,', 'fortify', 'remove', 'attack'], available: [0], requires: ['FIRE', 'MATH'] },

  SWORDSMAN: { name: 'SWORDSMAN', index: 'swordsman', frames: [7, 7, 7, 7], canUpgrade: false, upgradeAction: null, movement: 2, menu: ['move,', 'fortify', 'remove', 'attack'], available: [1], requires: ['FIRE'] },
  PIKEMAN: { name: 'PIKEMAN', index: 'pikeman', frames: [8, 8, 8, 8], canUpgrade: true, upgradeAction: 'MUSKETEER', movement: 4, menu: ['move,', 'fortify', 'remove', 'attack'], available: [1], requires: ['FIRE', 'FEUDALISM'] },
  LONGBOWMAN: { name: 'LONGBOWMAN', index: 'longbowman', frames: [9, 9, 9, 9], canUpgrade: false, upgradeAction: null, movement: 3, menu: ['move,', 'fortify', 'remove', 'attack'], available: [1], requires: ['FIRE', 'FEUDALISM'] },
  KNIGHT: { name: 'KNIGHT', index: 'knight', frames: [10, 10, 10, 10], canUpgrade: true, upgradeAction: 'CALVERY', movement: 6, menu: ['move,', 'fortify', 'remove', 'attack'], available: [1], requires: ['FIRE', 'CHIVALRY'] },
  TREBUCHET: { name: 'TREBUCHET', index: 'trebuchet', frames: [11, 11, 11, 11], canUpgrade: false, upgradeAction: null, movement: 2, menu: ['move,', 'fortify', 'remove', 'attack'], available: [1], requires: ['FIRE', 'ENGINEERING'] },

  MUSKETEER: { name: 'MUSKETEER', index: 'musketeer', frames: [12, 12, 12, 12], canUpgrade: true, upgradeAction: 'RIFLEMAN', movement: 2, menu: ['move,', 'fortify', 'remove', 'attack'], available: [1, 2], requires: ['FIRE', 'GUNPOWDER'] },
  CANNON: { name: 'CANNON', index: 'cannon', frames: [13, 13, 13, 13], canUpgrade: false, upgradeAction: null, movement: 2, available: [1, 2], menu: ['move,', 'fortify', 'remove', 'attack'], requires: ['FIRE', 'GUNPOWDER'] },
  CALVERY: { name: 'CALVERY', index: 'calvery', frames: [14, 14, 14, 14], canUpgrade: false, upgradeAction: null, movement: 7, available: [2], menu: ['move,', 'fortify', 'remove', 'attack'], requires: ['FIRE', 'GUNPOWDER'] },
  RIFLEMAN: { name: 'RIFLEMAN', index: 'rifleman', frames: [15, 15, 15, 15], canUpgrade: true, upgradeAction: 'INFANTRY', movement: 4, available: [2], menu: ['move,', 'fortify', 'remove', 'attack'], requires: ['FIRE', 'REPLACEABLEPARTS'] },

  INFANTRY: { name: 'INFANTRY', index: 'infantry', frames: [16, 16, 16, 16], canUpgrade: true, upgradeAction: 'MECHANIZEDINFANTRY', movement: 4, menu: ['move,', 'fortify', 'remove', 'attack'], available: [3], requires: ['FIRE', 'REPLACEABLEPARTS'] },
  TANK: { name: 'INFANTRY', index: 'infantry', frames: [17, 17, 17, 17], canUpgrade: false, upgradeAction: null, movement: 7, available: [2, 3], menu: ['move,', 'fortify', 'remove', 'attack'], requires: ['FIRE', 'MECHANIZEDTRANSPORT'] },
  ARTILLERY: { name: 'ARTILLERY', index: 'artillery', frames: [18, 18, 18, 18], canUpgrade: false, upgradeAction: null, movement: 3, available: [3], menu: ['move,', 'fortify', 'remove', 'attack'], requires: ['FIRE', 'MECHANIZEDTRANSPORT'] },
  MECHANIZEDINFANTRY: { name: 'MECHANIZEDINFANTRY', index: 'mechanizedinfantry', frames: [19, 19, 19, 19], canUpgrade: false, upgradeAction: null, movement: 8, menu: ['move,', 'fortify', 'remove', 'attack'], available: [3], requires: ['FIRE', 'MECHANIZEDTRANSPORT'] },
  FIGHTER: { name: 'FIGHTER', index: 'fighter', frames: [20, 20, 20, 20], canUpgrade: false, upgradeAction: null, movement: 10, menu: ['move,', 'fortify', 'remove', 'attack'], available: [3], requires: ['FIRE', 'FLIGHT'] },
  BOMBER: { name: 'BOMBER', index: 'bomber', frames: [21, 21, 21, 21], canUpgrade: false, upgradeAction: null, movement: 11, menu: ['move,', 'fortify', 'remove', 'attack'], available: [3], requires: ['FIRE', 'FLIGHT'] },
  NUKE: { name: 'NUKE', index: 'nuke', frames: [22, 22, 22, 22], canUpgrade: false, upgradeAction: null, movement: 12, menu: ['move,', 'fortify', 'remove', 'attack'], available: [3], requires: ['FIRE', 'FISSION'] },

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