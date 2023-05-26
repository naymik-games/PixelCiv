class techScreen extends Phaser.Scene {
  constructor() {
    super("techScreen");
  }
  preload() {


  }
  create() {
    this.Pause = this.scene.get('pauseGame');
    this.UIscene = this.scene.get('UI')
    this.top = this.add.image(game.config.width / 2, 0, 'nation_panel_top').setOrigin(.5, 0);


    this.middle = this.add.image(game.config.width / 2, 50, 'nation_panel').setOrigin(.5, 0)
    this.middle.displayHeight = game.config.height - 50


    this.bottom = this.add.image(game.config.width / 2, game.config.height, 'nation_panel_bottom').setOrigin(.5, 1)
    this.close = this.add.image(game.config.width - 35, 35, 'game_icons', 5).setScale(.75).setOrigin(1, 0).setInteractive()
    this.close.on('pointerdown', function () {
      this.scene.stop()

      this.scene.resume('pauseGame')

    }, this)

    //var sizeIndex = playerArray[gameData.currentPlayer].resources[0] * ownerTileCount(gameData.currentPlayer) * countImprovements(gameData.currentPlayer)

    //this.indexText = this.add.text(50, 275, 'SIZE INDEX: ' + sizeIndex, { fontFamily: 'KenneyMiniSquare', fontSize: '60px', color: '#fafafa', align: 'left' }).setOrigin(0)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    var resourceMap = [8, 9, 10, 11, 12, 13, 14, 15]
    /* for (let i = 0; i < 8; i++) {
      var lux = this.add.image(75 + i * 75, 500, 'resource_icons', resourceMap[i]).setScale(4).setOrigin(.5).setInteractive()
      var luxText = this.add.text(75 + i * 75, 550, playerArray[gameData.currentPlayer].luxuries[i], { fontFamily: 'KenneyMiniSquare', fontSize: '40px', color: '#fafafa', align: 'center' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

    } */

    //make tech cost say, 500 points. Each citizen is a point. So if you have 100 population, it would take 5 turns


    this.techTree = this.add.image(game.config.width / 2, 305, 'tech_tree_full', 0).setScale(5.25).setOrigin(.5, 0)
    var tilesize = 16 * 5.25
    var tilesizeHalf = tilesize / 2
    var techXOffset = 25 + tilesizeHalf
    var techYOffset = 305 + tilesizeHalf
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 7; x++) {
        if (techMaps[0][y][x] > -1) {
          var icon = this.add.image(techXOffset + x * (tilesize + tilesizeHalf), techYOffset + y * (tilesize + tilesize), 'tech_icons', techMaps[playerArray[gameData.currentPlayer].era][y][x]).setScale(5.5).setOrigin(.5).setAlpha(.5).setInteractive()
          icon.techIndex = techMapsNames[playerArray[gameData.currentPlayer].era][y][x]
          icon.on('pointerdown', this.techPress.bind(this, icon))
          for (let i = 0; i < playerArray[gameData.currentPlayer].techs.length; i++) {
            if (tech[playerArray[gameData.currentPlayer].techs[i]].iconIndex == techMaps[playerArray[gameData.currentPlayer].era][y][x]) {
              icon.setAlpha(1)
            }
          }
        }

      }
    }
    this.selectedTech = null
    this.nameText = this.add.text(50, 1250, '', { fontFamily: 'KenneyPixelSquare', fontSize: '60px', color: '#fafafa', align: 'left' }).setOrigin(0)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    this.requiresText = this.add.text(50, 1325, '', { fontFamily: 'KenneyMiniSquare', fontSize: '40px', color: '#fafafa', align: 'left' }).setOrigin(0)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    this.techIcon = this.add.image(game.config.width - 50, 1250, 'tech_icons', 3).setScale(6).setOrigin(1, 0).setInteractive().setAlpha(0)
    this.techIcon.on('pointerdown', this.startResearch, this)
  }
  startResearch() {
    playerArray[gameData.currentPlayer].currentTech = new Tech(this.selectedTech, gameData.day, true)
    this.techIcon.setAlpha(0)
    //console.log(this.selectedTech)
    this.scene.stop()

    this.scene.resume('pauseGame')
    this.Pause.techText.setText('RESEARCHING ' + tech[playerArray[gameData.currentPlayer].currentTech.techIndex].name)
    this.UIscene.researchIndicator.setFrame(tech[playerArray[gameData.currentPlayer].currentTech.techIndex].iconIndex)
    this.UIscene.researchText.setText(techDaysTillComplete())
  }
  techPress(item) {
    this.selectedTech = null
    console.log(item.techIndex)
    // console.log(tech[item.techIndex])
    this.nameText.setText(tech[item.techIndex].name)
    this.techIcon.setFrame(tech[item.techIndex].iconIndex)
    var text = ''
    for (let i = 0; i < tech[item.techIndex].requires.length; i++) {
      const element = tech[item.techIndex].requires[i];

      text += element + ', '

    }
    this.requiresText.setText(text)

    var have = this.haveIt(item.techIndex)
    var can = this.canResearch(item.techIndex)
    //console.log(can)
    if (can && !have && playerArray[gameData.currentPlayer].currentTech == null) {
      this.techIcon.setAlpha(1)
      this.selectedTech = item.techIndex
    } else {
      this.techIcon.setAlpha(0)
    }

  }
  haveIt(index) {
    if (playerArray[gameData.currentPlayer].techs.indexOf(index) > -1) {
      //console.log('Have It')
      return true
    } else {
      //console.log('Dont Have It')
      return false
    }
  }
  canResearch(index) {
    tech[index]
    var num = 0
    //console.log(playerArray[gameData.currentPlayer].techs)
    for (let i = 0; i < tech[index].requires.length; i++) {
      const element = tech[index].requires[i];
      //console.log(element)

      if (playerArray[gameData.currentPlayer].techs.indexOf(element) > -1) {
        num++
      }
    }
    //console.log(num)
    if (num == tech[index].requires.length) {
      return true
    } else {
      return false
    }
  }
}
let techAncient = [
  [0, 1, 2, 3, 4, 5, 6],
  [-1, 8, 9, 10, -1, -1, 13],
  [14, -1, 16, 17, 18, 19, 20],
  [21, 22, 23, -1, -1, 26, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1]
]
let techAncientName = [
  ['BRONZEWORKING', 'MASONARY', 'ALPHABET', 'POTTERY', 'WARRIORCODE', 'WHEEL', 'CEREMONIALBURIAL'],
  [-1, 'MATH', 'WRITING', 'MAPMAKING', -1, -1, 'MYSTICISM'],
  ['IRONWORKING', -1, 'PHILOSOPHY', 'CODEOFLAWS', 'LITERACY', 'HORSEBACKRIDING', 'POLYTHEISM'],
  ['CONSTRUCTION', 'CURRENCY', 'REPUBLIC', -1, -1, 'MONARCHY', -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1]
]
let techMiddle = [
  [42, -1, 44, -1, -1, 47, -1],
  [-1, 50, -1, 52, -1, -1, 55],
  [-1, 57, -1, -1, 60, -1, 62],
  [-1, 64, -1, 66, 67, 68, 69],
  [70, -1, 72, 73, 74, -1, 76],
  [77, 78, 79, -1, -1, -1, -1]
]
let techMiddleName = [
  ['ENGINEERING', -1, 'FEUDALISM', -1, -1, 'MONOTHEISM', -1],
  [-1, 'INVENTION', -1, 'CHIVALRY', -1, -1, 'RELIGION'],
  [-1, 'GUNPOWDER', -1, -1, 'EDUCATION', -1, 'PRINTINGPRESS'],
  [-1, 'CHEMISTRY', -1, 'ASTRONOMY', 'BANKING', 'MUSICTHEORY', 'DEMOCRACY'],
  ['METALLURGY', -1, 'PHYSICS', 'NAVIGATION', 'ECONOMICS', -1, 'FREEARTISTRY'],
  ['MILITARYCODE', 'MAGNETISM', 'THEORYOFGRAVITY', -1, -1, -1, -1]
]
let techIndustrial = [
  [-1, 85, -1, 87, 88, 89, -1],
  [91, -1, 93, 94, 95, 96, 97],
  [-1, 99, 100, 101, -1, 103, 104],
  [-1, 106, -1, 108, 109, -1, -1],
  [-1, 113, 114, 115, -1, 117, -1],
  [-1, -1, -1, -1, 123, -1, -1]
]
let techIndustrialName = [
  [-1, 'MEDICINE', -1, 'STEAMPOWER', 'IRONCLAD', 'NATIONALISM', -1],
  ['SANITATION', -1, 'ELECTRICITY', 'CORPORATION', 'INDUSTRIALIZATION', 'ESPIONAGE', 'COMMUNISM'],
  [-1, 'SCIENTIFIC METHOD', 'REPLACABLEPARTS', 'STEEL', -1, 'REFINING', 'FACISM'],
  [-1, 'ATOMICTHEORY', -1, 'MASSPRODUCTION', 'COMBUSTION', -1, -1],
  [-1, 'ELECTRONICS', 'AMPHIBIOUSWAR', 'MECHANIZEDTRANSPORT', -1, 'FLIGHT', -1],
  [-1, -1, -1, -1, 'ADVANCEDFLIGHT', -1, -1]
]
let techModern = [
  [126, -1, 128, -1, 130, -1, 132],
  [133, -1, 135, -1, 137, 138, -1],
  [140, 141, -1, -1, 144, 145, 146],
  [-1, 148, 149, -1, -1, -1, 153],
  [-1, -1, -1, 157, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1]
]
let techModernName = [
  ['COMPUTERS', -1, 'FISSION', -1, 'ROCKETRY', -1, 'ECOLOGY'],
  ['MINITURATION', -1, '', -1, 'SPACEFLIGHT', 'RECYCLING', -1],
  ['GENETICS', 'LASER', -1, -1, 'SUPERCONDUCTING', 'SATALITES', 'SYNTHETICFIBERS'],
  [-1, 'ROBOTICS', 'SMARTWEAPONS', -1, -1, -1, 'STEALTH'],
  [-1, -1, -1, 'INTEGRATEDDEFENSE', -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1]
]
//future tech 161
let techMaps = [techAncient, techMiddle, techIndustrial, techModern]
let techMapsNames = [techAncientName, techMiddleName, techIndustrialName, techModernName]
//console.log(techMapsNames[0][0][1])
//erra row col
/* let techMap = [
  [0, -1, 2, -1, 4],
  [5, 6, -1, 8, 9],
  [10, 11, 12, 13, 14],
  [-1, 16, -1, 18, 19],
  [20, 21, 22, 23, 24],
  [-1, -1, 27, -1, 29]
]
let techMapName = [
  ['HORSEBACKRIDING', -1, 'THEOLOGY', -1, 'IRONWORKING'],
  ['CHIVALRY', 'EDUCATION', -1, 'FEUDALISM', 'CONSTRUCTION'],
  ['MONARCHY', 'ASTRONOMY', 'PHYSICS', 'MATHMATICS', 'ENGINEERING'],
  [-1, 'PRINTINGPRESS', -1, 'CURRENCY', 'INVENTION'],
  ['DEMOCROCY', 'GRAVITY', 'MAGNATISM', 'BANKING', 'CHEMISTRY'],
  [-1, -1, 'NAVIGATION', -1, 'GUNPOWDER']
] */
let techAIorder = ['HORSEBACKRIDING', 'THEOLOGY', 'IRONWORKING',
  'FEUDALISM', 'CHIVALRY', 'EDUCATION', 'CONSTRUCTION',
  'MONARCHY', 'ASTRONOMY', 'PHYSICS', 'MATHMATICS', 'ENGINEERING',
  'PRINTINGPRESS', 'CURRENCY', 'INVENTION',
  'DEMOCROCY', 'GRAVITY', 'MAGNATISM', 'BANKING', 'CHEMISTRY',
  'NAVIGATION', 'GUNPOWDER']
let tech = {
  FIRE: { name: 'FIRE', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 164, requires: [] },

  BRONZEWORKING: { name: 'BRONZE WORKING', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 0, requires: [] },
  MASONARY: { name: 'MASONARY', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 1, requires: [] },
  ALPHABET: { name: 'ALPHABET', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 2, requires: [] },
  POTTERY: { name: 'POTTERY', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 3, requires: [] },
  WARRIORCODE: { name: 'WARRIOR CODE', cost: [100, 0, 0, 100, 0, 0], points: 600, id: 0, iconIndex: 4, requires: [] },
  WHEEL: { name: 'WHEEL', cost: [100, 0, 0, 100, 0, 0], points: 700, id: 0, iconIndex: 5, requires: [] },
  CEREMONIALBURIAL: { name: 'CEREMONIAL BURIAL', cost: [100, 0, 0, 500, 0, 0], points: 500, id: 0, iconIndex: 6, requires: [] },

  MATH: { name: 'MATH', cost: [100, 0, 0, 100, 0, 0], points: 700, id: 0, iconIndex: 8, requires: ['MASONARY', 'ALPHABET'] },
  WRITING: { name: 'WRITING', cost: [100, 0, 0, 100, 0, 0], points: 800, id: 0, iconIndex: 9, requires: ['ALPHABET'] },
  MAPMAKING: { name: 'MAP MAKING', cost: [100, 0, 0, 100, 0, 0], points: 700, id: 0, iconIndex: 10, requires: ['WRITING', 'POTTERY'] },
  MYSTICISM: { name: 'MYSTICISM', cost: [100, 0, 0, 100, 0, 0], points: 600, id: 0, iconIndex: 13, requires: ['CEREMONIALBURIAL'] },

  IRONWORKING: { name: 'IRON WORKING', cost: [100, 0, 0, 100, 0, 0], points: 900, id: 0, iconIndex: 4, requires: ['BRONZEWORKING'] },
  PHILOSOPHY: { name: 'PHILOSOPHY', cost: [100, 0, 0, 100, 0, 0], points: 700, id: 0, iconIndex: 0, requires: ['WRITING'] },
  CODEOFLAWS: { name: 'CODE OF LAWS', cost: [100, 0, 0, 100, 0, 0], points: 800, id: 0, iconIndex: 0, requires: ['WRITING'] },
  LITERACY: { name: 'LITERACY', cost: [100, 0, 0, 100, 0, 0], points: 900, id: 0, iconIndex: 0, requires: ['WRITING'] },
  HORSEBACKRIDING: { name: 'HORSEBACK RIDING', cost: [100, 0, 0, 600, 0, 0], points: 500, id: 0, iconIndex: 0, requires: ['WARRIORCODE', 'WHEEL'] },
  PLOYTHEISM: { name: 'PLOYTHEISM', cost: [100, 0, 0, 100, 0, 0], points: 700, id: 0, iconIndex: 13, requires: ['MYSTICISM'] },

  CONSTRUCTION: { name: 'CONSTRUCTION', cost: [100, 0, 0, 100, 0, 0], points: 1200, id: 0, iconIndex: 9, requires: ['IRONWORKING', 'MATH'] },
  CURRENCY: { name: 'CURRENCY', cost: [100, 0, 0, 100, 0, 0], points: 900, id: 0, iconIndex: 18, requires: ['MATH'] },
  REPUBLIC: { name: 'REPUBLIC', cost: [100, 0, 0, 100, 0, 0], points: 900, id: 0, iconIndex: 18, requires: ['MATH'] },
  MONARCHY: { name: 'MONARCHY', cost: [100, 0, 0, 100, 0, 0], points: 1200, id: 0, iconIndex: 10, requires: ['PLOYTHEISM', 'WARRIORCODE'] },
  //////////////

  ENGINEERING: { name: 'ENGINEERING', cost: [100, 0, 0, 100, 0, 0], points: 1300, id: 0, iconIndex: 14, requires: [] },
  FEUDALISM: { name: 'FEUDALISM', cost: [100, 0, 0, 100, 0, 0], points: 1500, id: 0, iconIndex: 8, requires: [] },
  MONOTHEISM: { name: 'MONOTHEISM', cost: [100, 0, 0, 100, 0, 0], points: 1100, id: 0, iconIndex: 8, requires: [] },
  INVENTION: { name: 'INVENTION', cost: [100, 0, 0, 100, 0, 0], points: 1000, id: 0, iconIndex: 8, requires: ['ENGINEERING', 'FEUDALISM'] },
  CHIVALRY: { name: 'CHIVALRY', cost: [100, 0, 0, 100, 0, 0], points: 1500, id: 0, iconIndex: 5, requires: ['MONTHEISM', 'FEUDALISM'] },
  THEOLOGY: { name: 'THEOLOGY', cost: [100, 0, 0, 100, 0, 0], points: 1500, id: 0, iconIndex: 2, requires: ['MONTHEISM'] },
  GUNPOWDER: { name: 'GUNPOWDER', cost: [100, 0, 0, 100, 0, 0], points: 2500, id: 0, iconIndex: 29, requires: ['INVENTION'] },
  EDUCATION: { name: 'EDUCATION', cost: [100, 0, 0, 100, 0, 0], points: 1600, id: 0, iconIndex: 6, requires: ['THEOLOGY'] },
  PRINTINGPRESS: { name: 'PRINTING PRESS', cost: [100, 0, 0, 100, 0, 0], points: 2500, id: 0, iconIndex: 16, requires: ['THEOLOGY'] },
  CHEMISTRY: { name: 'CHEMISTRY', cost: [100, 0, 0, 100, 0, 0], points: 1700, id: 0, iconIndex: 24, requires: ['GUNPOWDER'] },
  ASTRONOMY: { name: 'ASTRONOMY', cost: [100, 0, 0, 100, 0, 0], points: 1600, id: 0, iconIndex: 11, requires: ['EDUCATION'] },
  BANKING: { name: 'BANKING', cost: [100, 0, 0, 100, 0, 0], points: 1500, id: 0, iconIndex: 23, requires: ['EDUCATION'] },
  MUSICTHEORY: { name: 'MUSICTHEORY', cost: [100, 0, 0, 100, 0, 0], points: 1500, id: 0, iconIndex: 23, requires: ['EDUCATION'] },
  DEMOCROCY: { name: 'DEMOCROCY', cost: [100, 0, 0, 100, 0, 0], points: 1800, id: 0, iconIndex: 20, requires: ['PRINTINGPRESS'] },
  METALLURGY: { name: 'METALLURGY', cost: [100, 0, 0, 100, 0, 0], points: 1700, id: 0, iconIndex: 12, requires: ['CHEMISTRY'] },
  PHYSICS: { name: 'PHYSICS', cost: [100, 0, 0, 100, 0, 0], points: 1600, id: 0, iconIndex: 12, requires: ['ASTRONOMY', 'CHEMISTRY'] },
  NAVIGATION: { name: 'NAVIGATION', cost: [100, 0, 0, 100, 0, 0], points: 1900, id: 0, iconIndex: 27, requires: ['ASTRONOMY'] },
  ECONOMICS: { name: 'ECONOMICS', cost: [100, 0, 0, 100, 0, 0], points: 1500, id: 0, iconIndex: 16, requires: ['BANKING'] },
  FREEARTISTRY: { name: 'FREE ARTISTRY', cost: [100, 0, 0, 100, 0, 0], points: 1500, id: 0, iconIndex: 20, requires: ['DEMOCROCY'] },
  MILITARYTRADDITION: { name: 'MILITARY TRADDITION', cost: [100, 0, 0, 100, 0, 0], points: 1500, id: 0, iconIndex: 16, requires: ['METALLURGY'] },
  MAGNATISM: { name: 'MAGNATISM', cost: [100, 0, 0, 100, 0, 0], points: 1500, id: 0, iconIndex: 22, requires: ['PHYSICS'] },
  GRAVITY: { name: 'GRAVITY', cost: [100, 0, 0, 100, 0, 0], points: 2000, id: 0, iconIndex: 21, requires: ['PHYSICS'] },
  ///////////////////////

  MEDICINE: { name: 'MEDICINE', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: [] },
  STEAMPOWER: { name: 'STEAM POWER', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: [] },
  IRONCLAD: { name: 'IRONCLAD', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['STEAMPOWER'] },

  NATIONALISM: { name: 'NATIONALISM', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: [] },
  SANITATION: { name: 'SANITATION', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['MEDICINE'] },
  ELECTRICITY: { name: 'ELECTRICITY', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['STEAMPOWER'] },
  CORPORATION: { name: 'CORPORATION', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['INDUSTRIALIZATION'] },
  INDUSTRIALIZATION: { name: 'INDUSTRIALIZATION', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['STEAMPOWER'] },
  ESPIONAGE: { name: 'ESPIONAGE', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['INDUSTRIALIZATION', 'NATIONALISM'] },
  COMMUNISM: { name: 'COMMUNISM', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['NATIONALISM'] },

  SCIENTIFICMETHOD: { name: 'SCIENTIFIC METHOD', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['MEDICINE', 'ELECTRICITY'] },
  REPLACEABLEPARTS: { name: 'REPLACEABLE PARTS', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['ELECTRICITY'] },
  STEEL: { name: 'STEEL', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['INDUSTRIALIZATION'] },
  REFINING: { name: 'REFINING', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['INDUSTRIALIZATION'] },
  FACISM: { name: 'FACISM', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['NATIONALISM'] },

  ATOMICTHEORY: { name: 'ATOMIC THEORY', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['SCIENTIFICMETHOD'] },
  MASSPRODUCTION: { name: 'MASSPRODUCTION', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['COMBUSTION', 'REPLACEABLEPARTS'] },
  COMBUSTION: { name: 'COMBUSTION', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['STEEL', 'REFINING'] },

  ELECTRONICS: { name: 'ELECTRONICS', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['ATOMICTHEORY'] },
  AMPHIBIOUSWAR: { name: 'AMPHIBIOUS WAR', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['MASSPRODUCTION'] },
  MECHANIZEDTRANSPORT: { name: 'MECHANIZED TRANSPORT', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['MASSPRODUCTION'] },
  FLIGHT: { name: 'FLIGHT', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['COMBUSTION'] },

  ADVANCEDFLIGHT: { name: 'ADVANCED FLIGHT', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['MECHANIZEDTRANSPORT', 'FLIGHT'] },
  ////////////////
  COMPUTERS: { name: 'COMPUTERS', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: [] },
  FISSION: { name: 'FISSION', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: [] },
  ROCKETRY: { name: 'ROCKETRY', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: [] },
  ECOLOGY: { name: 'ECOLOGY', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: [] },

  MINITURIZATION: { name: 'MINITURIZATION', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['COMPUTERS'] },
  NUCLEARPOWER: { name: 'NUCLEAR POWER', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['FISSION'] },
  SPACEFLIGHT: { name: 'SPACE FLIGHT', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['ROCKETRY'] },
  RECYCLING: { name: 'RECYCLING', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['ECOLOGY'] },

  GENETICS: { name: 'GENETICS', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['MINITURIZATION'] },
  LASER: { name: 'LASER', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['COMPUTERS', 'NUCLEARPOWER'] },
  SUPERCONDUCTING: { name: 'SUPERCONDUCTING', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['SPACEFLIGHT', 'NUCLEARPOWER'] },
  SATILITES: { name: 'SATILITES', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['SPACEFLIGHT'] },
  SYNTHETICFIBERS: { name: 'SYNTHETIC FIBERS', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['ECOLOGY'] },

  ROBOTICS: { name: 'ROBOTICS', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['LASER', 'MINITURIZATION'] },
  SMARTWEAPONS: { name: 'SMARTWEAPONS', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['LASER', 'SATILITES'] },
  STEALTH: { name: 'STEALTH', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['SYNTHETICFIBERS'] },
  INTEGRATEDDEFENSE: { name: 'INTEGRATED DEFENSE', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['SMARTWEAPONS', 'SUPERCONDUCTING', 'SATILITES'] },
}
class Tech {
  constructor(index, day, complete) {
    this.techIndex = index
    this.dayAdded = day
    this.complete = complete
    this.pointsProgress = 0
  }
}




/*
[
   [-1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1],
   [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1]
]



List of Technologies (82 techs total):
Ancient Times (21)
Bronze Workings-
Masonry-
Alphabet-
Pottery-
The Wheel-
Warrior Code
Ceremonial Burial-
Iron Working-
Mathematics-
Writing-
Mysticism-
Philosophy-
Code of Laws-
Literature (new)
Map Making-
Horseback Riding-
Polytheism
Construction-
Currency-
The Republic-
Monarchy-

Renaissance (22)
Monotheism
Feudalism
Engineering
Theology
Chivalry
Invention
Printing Press (new)
Education (new)
Music Theory (new)
Gunpowder
Banking
Astronomy
Chemistry
Democracy
Economics
Navigation
Physics
Metallurgy
Free Artistry (new)
Theory of Gravity
Magnetism
Military Tradition (new)

Industrial (22):
Nationalism (new)
Steam Power
Medicine
Industrialization
Electricity
Sanitation
Communism
Espionage
The Corporation
Scientific Method (new)
Refining
Steel
Atomic Theory
Combustion
Replaceable Parts (new)
Flight
Amphibious warfare
Mass production
Electronics
Advanced flight
Motorized Transport (new)
Radio

Modern (17):
Recycling
Rocketry
Fission
Computers
Ecology (new)
Space Flight
Nuclear Power
Miniaturization
Synthetic Fibers (new)
The Laser
Genetics
Superconductor
Satellites (new)
Stealth
Smart Weapons (new)
Robotics
Integrated Defense (new)
Ancient Times (21) +Renaissance (22)+Industrial (22)+Modern (17) = 82 techs
*/

