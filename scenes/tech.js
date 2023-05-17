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
    this.close = this.add.image(game.config.width - 25, 275, 'game_icons', 5).setScale(.75).setOrigin(1, 0).setInteractive()
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


    this.techTree = this.add.image(game.config.width / 2, game.config.height / 2, 'tech_tree').setScale(1).setOrigin(.5)
    var techXOffset = 114 + 48
    var techYOffset = 412 + 48
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 5; x++) {
        if (techMap[y][x] > -1) {
          var icon = this.add.image(techXOffset + x * (96 + 48), techYOffset + y * (96 + 48), 'tech_icons', techMap[y][x]).setScale(6).setOrigin(.5).setAlpha(.5).setInteractive()
          icon.techIndex = techMapName[y][x]
          icon.on('pointerdown', this.techPress.bind(this, icon))
          for (let i = 0; i < playerArray[gameData.currentPlayer].techs.length; i++) {
            if (tech[playerArray[gameData.currentPlayer].techs[i]].iconIndex == techMap[y][x]) {
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
    console.log(this.selectedTech)
    this.scene.stop()

    this.scene.resume('pauseGame')
    this.Pause.techText.setText('RESEARCHING ' + tech[playerArray[gameData.currentPlayer].currentTech.techIndex].name)
    this.UIscene.researchIndicator.setFrame(tech[playerArray[gameData.currentPlayer].currentTech.techIndex].iconIndex)
    this.UIscene.researchText.setText(techDaysTillComplete())
  }
  techPress(item) {
    this.selectedTech = null
    console.log(item.techIndex)
    console.log(tech[item.techIndex])
    this.nameText.setText(tech[item.techIndex].name)
    var text = ''
    for (let i = 0; i < tech[item.techIndex].requires.length; i++) {
      const element = tech[item.techIndex].requires[i];

      text += element + ', '

    }
    this.requiresText.setText(text)

    var have = this.haveIt(item.techIndex)
    var can = this.canResearch(item.techIndex)
    console.log(can)
    if (can && !have && playerArray[gameData.currentPlayer].currentTech == null) {
      this.techIcon.setAlpha(1)
      this.selectedTech = item.techIndex
    } else {
      this.techIcon.setAlpha(0)
    }

  }
  haveIt(index) {
    if (playerArray[gameData.currentPlayer].techs.indexOf(index) > -1) {
      console.log('Have It')
      return true
    } else {
      console.log('Dont Have It')
      return false
    }
  }
  canResearch(index) {
    tech[index]
    var num = 0
    console.log(playerArray[gameData.currentPlayer].techs)
    for (let i = 0; i < tech[index].requires.length; i++) {
      const element = tech[index].requires[i];
      console.log(element)

      if (playerArray[gameData.currentPlayer].techs.indexOf(element) > -1) {
        num++
      }
    }
    console.log(num)
    if (num == tech[index].requires.length) {
      return true
    } else {
      return false
    }
  }
}
let techMap = [
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
]
let techAIorder = ['HORSEBACKRIDING', 'THEOLOGY', 'IRONWORKING',
  'FEUDALISM', 'CHIVALRY', 'EDUCATION', 'CONSTRUCTION',
  'MONARCHY', 'ASTRONOMY', 'PHYSICS', 'MATHMATICS', 'ENGINEERING',
  'PRINTINGPRESS', 'CURRENCY', 'INVENTION',
  'DEMOCROCY', 'GRAVITY', 'MAGNATISM', 'BANKING', 'CHEMISTRY',
  'NAVIGATION', 'GUNPOWDER']
let tech = {
  HORSEBACKRIDING: { name: 'HORSEBACK RIDING', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 0, requires: [] },
  THEOLOGY: { name: 'THEOLOGY', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 2, requires: [] },

  IRONWORKING: { name: 'IRON WORKING', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 4, requires: [] },

  CHIVALRY: { name: 'CHIVALRY', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 5, requires: ['HORSEBACKRIDING', 'THEOLOGY', 'FEUDALISM'] },
  EDUCATION: { name: 'EDUCATION', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 6, requires: ['THEOLOGY'] },
  FEUDALISM: { name: 'FEUDALISM', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 8, requires: ['IRONWORKING', 'THEOLOGY'] },
  CONSTRUCTION: { name: 'CONSTRUCTION', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 9, requires: ['IRONWORKING'] },

  MONARCHY: { name: 'MONARCHY', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 10, requires: ['CHIVALRY'] },
  ASTRONOMY: { name: 'ASTRONOMY', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 11, requires: ['EDUCATION', 'FEUDALISM'] },
  PHYSICS: { name: 'PHYSICS', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 12, requires: ['EDUCATION', 'FEUDALISM'] },
  MATHMATICS: { name: 'ENGINEERING', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 13, requires: ['EDUCATION', 'FEUDALISM'] },
  ENGINEERING: { name: 'ENGINEERING', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 14, requires: ['EDUCATION', 'FEUDALISM'] },

  PRINTINGPRESS: { name: 'PRINTING PRESS', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 16, requires: ['EDUCATION'] },
  CURRENCY: { name: 'CURRENCY', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 18, requires: ['MATHMATICS'] },
  INVENTION: { name: 'INVENTION', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 19, requires: ['MATHMATICS', 'ENGINEERING'] },

  DEMOCROCY: { name: 'DEMOCROCY', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 20, requires: ['MONARCHY', 'PRINTINGPRESS'] },
  GRAVITY: { name: 'GRAVITY', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 21, requires: ['MATHMATICS'] },
  MAGNATISM: { name: 'MAGNATISM', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 22, requires: ['MATHMATICS'] },
  BANKING: { name: 'BANKING', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 23, requires: ['CURRENCY'] },
  CHEMISTRY: { name: 'CHEMISTRY', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 24, requires: ['INVENTION'] },

  NAVIGATION: { name: 'NAVIGATION', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 27, requires: ['MAGNATISM'] },
  GUNPOWDER: { name: 'GUNPOWDER', cost: [100, 0, 0, 100, 0, 0], points: 500, id: 0, iconIndex: 29, requires: ['CHEMISTRY'] },
}
class Tech {
  constructor(index, day, complete) {
    this.techIndex = index
    this.dayAdded = day
    this.complete = complete
    this.pointsProgress = 0
  }
}

