let playerIndexMap = {
  70: 0,
  71: 1,
  72: 2,
  73: 3
}

let staticPlayerData = {
  0: { name: 'BLUE ARROW', id: 0, frame: 70, color: 0x4060C0, AIexploreAgressiveness: 2, AIbuildAgressiveness: 4 },
  1: { name: 'RED SWORD', id: 1, frame: 70, color: 0xA04040, AIexploreAgressiveness: 3, AIbuildAgressiveness: 4 },
  2: { name: 'BLACK SHEILD', id: 2, frame: 70, color: 0x404040, AIexploreAgressiveness: 4, AIbuildAgressiveness: 4 },
  3: { name: 'YELLOW LEAF', id: 3, frame: 70, color: 0xE0E040, AIexploreAgressiveness: 2, AIbuildAgressiveness: 4 },
}
/*
characteristics 
exploration agressivenss staticPlayerData[].AIexploreAgressiveness

*/
class Player {
  constructor(index, human, name, frame, playerIndex, startResource) {
    this.id = index //static data index
    this.playerIndex = playerIndex //index in array/owner
    this.center = null
    this.name = name
    this.frame = frame
    this.human = human
    this.luxuries = [0, 0, 0, 0, 0, 0, 0, 0]//HORSES,GAME, SILVER, COPPER, GRAPES, WOOL, SPICES, FLAX
    this.resources = startResource//[75, 250, 0, 0, 0, 0]//startingValues[gameOptions.difficulty] // [33, 122, 72, 55, 231, 888]  [250, 250, 250, 250, 250, 250] [75, 250, 0, 0, 0, 0]
    this.metrics = [0, 0, 0, 0, 0]//strength, defense, culture, science, happiness
    this.level = 1
    this.currentTech = null
    this.techs = []
    this.era = 'ANCIENT'
  }
}


//tech techIndex requires
/* THEOLOGY: { name: 'THEOLOGY', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 0 },
LITERACY: { name: 'LITERACY', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 1 },
EDUCAION: { name: 'EDUCATION', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 2 },
PRINTINGPRESS: { name: 'PRINTING PRESS', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 3 },

ASTRONOMY: { name: 'ASTRONOMY', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 6 },
MAGNATISM: { name: 'MAGNATISM', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 7 },
NAVIGATION: { name: 'NAVIGATION', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 8 },

TRADE: { name: 'TRADE', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 12 },
CURRENCY: { name: 'CURRENCY', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 13 },
BANKING: { name: 'BANKING', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 14 },

IRONWORKING: { name: 'IRON WORKING', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 18 },
MASONARY: { name: 'MASONARY', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 19 },
CONSTRUCTION: { name: 'CONSTRUCTION', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 20 },
ENGINEERING: { name: 'ENGINEERING', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 21 },

CODEOFLAWS: { name: 'CODE OF LAWS', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 24 },
FEUDALISM: { name: 'FEUDALISM', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 25 },
MONARCHY: { name: 'MONARCHY', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 26 },
REPUBLIC: { name: 'RUPUBLIC', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 27 },
DEMOCROCY: { name: 'DEMOCROCY', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 28 },

MATHMATICS: { name: 'ENGINEERING', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 30 },
PHYSICS: { name: 'PHYSICS', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 31 },
CHEMISTRY: { name: 'CHEMISTRY', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 32 },
GRAVITY: { name: 'GRAVITY', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 33 },
INVENTION: { name: 'INVENTION', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 34 },
GUNPOWDER: { name: 'GUNPOWDER', cost: [100, 0, 0, 100, 0, 0], days: 10, id: 0, iconIndex: 35 }, */