class UI extends Phaser.Scene {

  constructor() {

    super("UI");
  }
  preload() {



  }
  create() {
    this.menuOffsetY = 450

    this.Main = this.scene.get('playGame');
    //////////////////////
    console.log(gameData.currentPlayer)
    this.header = this.add.image(game.config.width / 2, 0, 'blank').setOrigin(.5, 0).setTint(0x444444).setAlpha(.9);//0x3e5e71
    this.header.displayWidth = game.config.width;
    this.header.displayHeight = 90;
    this.playerIcon = this.add.image(25, 5, 'player_icons', playerArray[gameData.currentPlayer].id).setScale(4).setOrigin(0, 0).setInteractive()
    this.playerIcon.on('pointerdown', function () {
      this.scene.pause()
      this.scene.pause('playGame')
      this.scene.launch('pauseGame')
    }, this)
    this.playerText = this.add.text(100, 25, playerArray[gameData.currentPlayer].name, { fontFamily: 'KenneyMiniSquare', fontSize: '60px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

    this.turnText = this.add.text(game.config.width - 225, 25, gameData.day, { fontFamily: 'KenneyMiniSquare', fontSize: '60px', color: '#3EA270', align: 'left' }).setOrigin(1, .5).setInteractive()//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,


    this.endTurnText = this.add.text(game.config.width - 25, 25, 'END >', { fontFamily: 'KenneyMiniSquare', fontSize: '60px', color: '#fafafa', align: 'left' }).setOrigin(1, .5).setInteractive()//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    this.endTurnText.on('pointerdown', function () {
      this.endTurn()
    }, this)

    // 128.5 + i * 128.5, 100


    ////////////////////
    this.zoomLevel = 1
    this.zoomContainer = this.add.container()
    this.zoomIn = this.add.image(840, 790, 'game_icons', 9).setScale(.75).setOrigin(.5, .5).setInteractive()
    this.zoomContainer.add(this.zoomIn)
    this.zoomOut = this.add.image(840, 1030, 'game_icons', 10).setScale(.75).setOrigin(.5, .5).setInteractive()
    this.zoomContainer.add(this.zoomOut)
    this.zoomHome = this.add.image(840, 910, 'game_icons', 21).setScale(.75).setOrigin(.5, .5).setInteractive()
    this.zoomContainer.add(this.zoomHome)
    this.zoomMenu = this.add.image(840, 1140, 'game_icons', 20).setScale(.75).setOrigin(.5, .5).setInteractive()
    this.zoomContainer.add(this.zoomMenu)
    this.zoomContainer.setAlpha(0)
    this.zoomHome.on('pointerdown', function () {
      var pos = getPosition(playerArray[0].center.row, playerArray[0].center.column)
      this.Main.cameras.main.centerOn(pos.x, pos.y)
    }, this)
    this.zoomIn.on('pointerdown', function () {
      this.zoomLevel += .5
      if (this.zoomLevel == 3) {
        this.zoomLevel = .5
      }
      this.Main.cameras.main.setZoom(this.zoomLevel)
    }, this)
    this.zoomOut.on('pointerdown', function () {
      this.zoomLevel -= .5
      if (this.zoomLevel == 0) {
        this.zoomLevel = 2.5
      }
      this.Main.cameras.main.setZoom(this.zoomLevel)
    }, this)
    this.zoomMenu.on('pointerdown', function () {
      this.scene.stop()
      this.scene.stop('playGame')
      this.scene.start('startGame')

    }, this)
    // RESOURCE CONTAINER/////////////////////////////////////////////////
    this.resourceContainer = this.add.container()
    this.resourceBack = this.add.image(game.config.width / 2, 90, 'blank').setOrigin(.5, 0).setTint(0x000000).setAlpha(.9);//0x3e5e71
    this.resourceBack.displayWidth = game.config.width;
    this.resourceBack.displayHeight = 160;
    this.resourceContainer.add(this.resourceBack)
    this.resourceHolder = []
    for (let i = 0; i < 6; i++) {
      var icon = this.add.image(128.5 + i * 128.5, 100, 'resource_icons', i).setScale(4).setOrigin(.5, 0)
      this.resourceContainer.add(icon)
      var text = this.add.text(128.5 + i * 128.5, 175, playerArray[gameData.currentPlayer].resources[i], { fontFamily: 'KenneyMiniSquare', fontSize: '50px', color: '#fafafa', align: 'center' }).setOrigin(.5, 0).setInteractive()//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
      this.resourceHolder.push(text)
      this.resourceContainer.add(text)
    }
    this.border = this.add.image(game.config.width / 2, 250, 'blank').setOrigin(.5, 0).setTint(0x444444).setAlpha(.9);//0x3e5e71
    this.border.displayWidth = game.config.width;
    this.border.displayHeight = 15;
    this.resourceContainer.add(this.border)
    this.resourceContainer.setAlpha(1).setPosition(0, 90)
    ///////////////////

    // COST/GAIN CONTAINER //////////////////////////////////////////////////////////
    this.costContainer = this.add.container()
    var costBack = this.add.image(game.config.width / 2, 265, 'blank').setOrigin(.5, 0).setTint(0x000000).setAlpha(.9);//0x3e5e71
    costBack.displayWidth = game.config.width;
    costBack.displayHeight = 140;
    this.costContainer.add(costBack)

    this.costHolder = []
    for (let i = 0; i < 6; i++) {
      var text = this.add.text(128.5 + i * 128.5, 260, '0', { fontFamily: 'KenneyMiniSquare', fontSize: '50px', color: '#AF335C', align: 'center' }).setOrigin(.5, 0).setInteractive()//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
      this.costHolder.push(text)
      this.costContainer.add(text)
    }

    this.incomeHolder = []
    for (let i = 0; i < 6; i++) {
      var text = this.add.text(128.5 + i * 128.5, 325, '0', { fontFamily: 'KenneyMiniSquare', fontSize: '50px', color: '#3EA270', align: 'center' }).setOrigin(.5, 0).setInteractive()//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
      this.incomeHolder.push(text)
      this.costContainer.add(text)
    }

    this.borderc = this.add.image(game.config.width / 2, 395, 'blank').setOrigin(.5, 0).setTint(0xfafafa).setAlpha(.9);//0x3e5e71
    this.borderc.displayWidth = game.config.width;
    this.borderc.displayHeight = 15;
    this.costContainer.add(this.borderc)
    this.costContainer.setAlpha(0).setPosition(0, 90)
    /////////////////////

    // RESEARCH CONTAINER///////////////////////////////////////////////////////
    this.researchIndicator = this.add.image(game.config.width, 100, 'tech_icons', 1).setScale(4).setOrigin(1, 0)
    this.researchText = this.add.text(game.config.width - 70, 95, '?', { fontFamily: 'KenneyMiniSquare', fontSize: '55px', color: '#fafafa', align: 'right' }).setOrigin(1, 0)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    if (playerArray[gameData.currentPlayer].currentTech != null) {
      this.researchText.setText(techDaysTillComplete())
      this.researchIndicator.setFrame(tech[playerArray[gameData.currentPlayer].currentTech.techIndex].iconIndex)
    } else {
      this.researchText.setText('?')
      this.researchIndicator.setFrame(1)
    }
    ///////////////////////////

    // this.score = 0;
    // this.scoreText = this.add.bitmapText(85, 100, 'topaz', this.score, 80).setOrigin(.5).setTint(0xcbf7ff).setAlpha(1);
    //this.displayMenu('grass')
    this.createBuildIcons()
    this.createGroundPanel()
    this.createImprovementPanel()
    this.createUnitPanel()
    this.upgradeUnitIcon.on('pointerdown', function () {
      console.log('upgrade unit')
      console.log(this.Main.selectedTile)
      var type = unitTypes[unitLayerData[this.Main.selectedTile.row][this.Main.selectedTile.column].id].upgradeAction
      this.Main.upgradeUnit(this.Main.selectedTile.row, this.Main.selectedTile.column, gameData.currentPlayer, type)
    }, this)
    this.moveUnitIcon.on('pointerdown', function () {
      console.log('move unit')
      this.Main.startMove = true
      this.Main.cursor.setFrame(1)
    }, this)
    this.attackUnitIcon.on('pointerdown', function () {
      console.log('attack!')
    }, this)
    this.settleUnitIcon.on('pointerdown', function () {
      console.log('settle!')
      this.Main.addCity()
    }, this)
    this.removeUnitIcon.on('pointerdown', function () {
      console.log('remove unit')
      this.Main.removeUnit(this.Main.selectedTile.row, this.Main.selectedTile.column, gameData.currentPlayer)
      /*   console.log(groundLayerData[this.Main.selectedTile.row][this.Main.selectedTile.column])
        var tile = groundLayerData[this.Main.selectedTile.row][this.Main.selectedTile.column]
        if (this.menu1) {
          this.menu1.destroy()
        }
        if (tile.explored) {
          this.displayMenu(groundStaticData[tile.frame].type)
        } else {
          this.displayMenu(groundStaticData[11].type)
        } */

    }, this)
    this.buildUnitIcon = this.add.image(137.5, game.config.height - 300, 'build_unit_button').setScale(.75).setInteractive().setAlpha(0)
    this.buildUnitIcon.on('pointerdown', function () {
      this.displayMenu('units')
    }, this)

    this.Main.events.on('score', function () {

      this.score += 1;
      //console.log('dots ' + string)
      this.scoreText.setText(this.score)
    }, this);
    /////////////////////////////////////////////
    this.Main.events.on('showControls', function (tile) {
      this.zoomContainer.setAlpha(1)

    }, this);
    ////////////////////////////////////////////
    /////////////////////////////////////////////
    this.Main.events.on('hideControls', function (tile) {
      this.zoomContainer.setAlpha(0)

    }, this);
    ////////////////////////////////////////////
    /////////////////////////////////////////////
    this.Main.events.on('updateResources', function () {
      this.updateResources()
    }, this);
    ////////////////////////////////////////////
    /////////////////////////////////////////////
    this.Main.events.on('closeMenu', function (tile) {
      if (this.menu1) {
        this.menu1.destroy()
      }
      this.costContainer.setAlpha(0)
      this.buildContainer.setAlpha(0)
      // this.selector.y = -100
    }, this);
    ////////////////////////////////////////////
    /////////////////////////////////////////////
    this.Main.events.on('updateGround', function (tile, connected) {
      this.updateGroundPanel(tile, connected)

    }, this);
    ////////////////////////////////////////////
    /////////////////////////////////////////////
    this.Main.events.on('showBuild', function (tile) {
      this.buildIcon.setAlpha(1)

    }, this);
    ////////////////////////////////////////////
    /////////////////////////////////////////////
    this.Main.events.on('hideBuild', function (tile) {
      this.buildIcon.setAlpha(0)

    }, this);
    ////////////////////////////////////////////
    /////////////////////////////////////////////
    this.Main.events.on('showGroundHelp', function (tile) {
      this.buildHelpIcon.setAlpha(1)

    }, this);
    ////////////////////////////////////////////
    /////////////////////////////////////////////
    this.Main.events.on('hideGroundHelp', function (tile) {
      this.buildHelpIcon.setAlpha(0)

    }, this);
    ////////////////////////////////////////////
    /////////////////////////////////////////////
    this.Main.events.on('showImpBuild', function (tile) {
      this.buildImpIcon.setAlpha(1)

    }, this);
    ////////////////////////////////////////////
    /////////////////////////////////////////////
    this.Main.events.on('hideImpBuild', function (tile) {
      this.buildImpIcon.setAlpha(0)

    }, this);
    ////////////////////////////////////////////
    /////////////////////////////////////////////
    this.Main.events.on('showUnitBuild', function (tile) {
      this.buildUnitIcon.setAlpha(1)

    }, this);
    ////////////////////////////////////////////
    /////////////////////////////////////////////
    this.Main.events.on('hideUnitBuild', function (tile) {
      this.buildUnitIcon.setAlpha(0)

    }, this);
    ////////////////////////////////////////////
    /////////////////////////////////////////////
    this.Main.events.on('updateGroundUnknown', function (owner) {




    }, this);
    ////////////////////////////////////////////
    /////////////////////////////////////////////
    this.Main.events.on('updateImprovement', function (tile) {
      this.updateImprovementPanel(tile)
    }, this);
    ////////////////////////////////////////////

    /////////////////////////////////////////////
    this.Main.events.on('hideImprovement', function (tile) {
      this.improvementDetailsContainer.setAlpha(0)
    }, this);
    ////////////////////////////////////////////

    /////////////////////////////////////////////
    this.Main.events.on('updateUnit', function (tile) {
      this.updateUnitPanel(tile)
    }, this);
    ////////////////////////////////////////////
    /////////////////////////////////////////////
    this.Main.events.on('hideUnit', function (tile) {
      this.unitDetailsContainer.setAlpha(0)
    }, this);
    ////////////////////////////////////////////

  }

  update() {

  }
  endTurn() {
    gameData.turn++

    gameData.currentPlayer++
    if (gameData.currentPlayer == gameOptions.numberOfPlayers) {
      gameData.currentPlayer = 0
      gameData.day++
    }
    console.log('Current Player ' + gameData.currentPlayer)
    console.log(playerArray[gameData.currentPlayer].currentTech)
    if (gameData.currentPlayer == 0) {
      console.log('You, human')
      this.header.setTint(0x444444)
      this.resourceContainer.setAlpha(1)

      border(0)
    } else {
      console.log('AI Player')
      this.header.setTint(0x000000)
      this.resourceContainer.setAlpha(1)
      //AI do chop and pick first check every turn
      for (var i = 0; i < 2; i++) {
        chopAI(this.Main, gameData.currentPlayer, FOREST)
        pickAI(this.Main, gameData.currentPlayer, ORCHARD)
      }
      //AI then do explore ever six turnes
      if (gameData.day % 6 == 0) {
        for (var i = 0; i < staticPlayerData[playerArray[gameData.currentPlayer].id].AIexploreAgressiveness; i++) {
          exploreAI(this.Main, gameData.currentPlayer)
        }
      }
      //AI then do buildign every eight turns
      if (gameData.day % 8 == 0) {
        for (var i = 0; i < staticPlayerData[playerArray[gameData.currentPlayer].id].AIbuildAgressiveness; i++) {
          buildImprovementAI(this.Main, gameData.currentPlayer)
        }
      }
      //AI select research
      /* if (playerArray[gameData.currentPlayer].currentTech == null) {
        console.log(playerArray[gameData.currentPlayer].techs)
        var numTechs = playerArray[gameData.currentPlayer].techs.length
        playerArray[gameData.currentPlayer].currentTech = new Tech(techAIorder[numTechs], gameData.day, false)
      } */

      border(gameData.currentPlayer)
    }
    ////////////////
    // MOVE UNITS
    ////////////////
    for (let i = 0; i < gameOptions.rows; i++) {
      for (let j = 0; j < gameOptions.columns; j++) {
        if (unitLayerData[i][j] != null) {
          if (unitLayerData[i][j].owner == gameData.currentPlayer && unitLayerData[i][j].path.length > 0) {
            console.log(unitLayerData[i][j].path)
            this.Main.moveUnit(unitLayerData[i][j], { row: i, column: j })
          }
        }
      }
    }
    ////////////////
    this.turnText.setText(gameData.day)
    this.Main.doBonus(gameData.currentPlayer)
    populationCalc()
    foodCalc()
    lumberCalc()
    oreCalc()
    stoneCalc()
    goldCalc()
    var researchDone = checkResearch()
    if (playerArray[gameData.currentPlayer].currentTech != null) {
      if (researchDone) {
        console.log('done researching ' + tech[playerArray[gameData.currentPlayer].currentTech.techIndex].name)
        playerArray[gameData.currentPlayer].techs.push(playerArray[gameData.currentPlayer].currentTech.techIndex)
        playerArray[gameData.currentPlayer].currentTech = null
        this.researchText.setText('?')
        this.researchIndicator.setFrame(1)
      } else {
        playerArray[gameData.currentPlayer].currentTech.pointsProgress += playerArray[gameData.currentPlayer].resources[0]
        this.researchText.setText(techDaysTillComplete())
        this.researchIndicator.setFrame(tech[playerArray[gameData.currentPlayer].currentTech.techIndex].iconIndex)
      }
    } else {
      this.researchText.setText('?')
      this.researchIndicator.setFrame(1)
      if (gameData.currentPlayer != 0) {
        if (playerArray[gameData.currentPlayer].currentTech == null) {
          // console.log(playerArray[gameData.currentPlayer].techs)
          var numTechs = playerArray[gameData.currentPlayer].techs.length
          // console.log(numTechs)
          // console.log(techAIorder[numTechs])
          playerArray[gameData.currentPlayer].currentTech = new Tech(techAIorder[numTechs], gameData.day, false)
        }
      }
    }



    //playerArray[gameData.currentPlayer].resources[1] += gameOptions.autopay
    this.playerIcon.setFrame(playerArray[gameData.currentPlayer].id)
    this.playerText.setText(playerArray[gameData.currentPlayer].name)

    this.updateResources()
    console.log(playerArray[0].resources)
    localStorage.setItem('PixelCivPlayers', JSON.stringify(playerArray));
    localStorage.setItem('PixelCivMap', JSON.stringify(map));
    localStorage.setItem('PixelCivGroundData', JSON.stringify(groundLayerData));
    localStorage.setItem('PixelCivImprovementData', JSON.stringify(improvementLayerData));
    localStorage.setItem('PixelCivUnitData', JSON.stringify(unitLayerData));
    localStorage.setItem('PixelCivGameData', JSON.stringify(gameData));
    localStorage.setItem('PixelCivGameOptions', JSON.stringify(gameOptions));
  }

  updateResources() {
    for (let i = 0; i < 6; i++) {
      var resourceText = this.resourceHolder[i]
      resourceText.setText(playerArray[gameData.currentPlayer].resources[i])
    }
  }
  displayMenu(type) {
    console.log(type)
    this.zoomContainer.setAlpha(0)
    this.selector = this.add.image(game.config.width, -50, 'blank').setOrigin(1, 0).setDepth(1).setTint(0x000000).setAlpha(1)
    this.selector.displayWidth = 400
    this.selector.displayHeight = 60
    this.menu1 = this.add.container()
    this.menuBack = this.add.image(game.config.width, this.menuOffsetY, 'blank').setOrigin(1, 0).setTint(0x444444).setDepth(0).setAlpha(.9)
    this.menuBack.displayWidth = 400
    this.menuBack.displayHeight = menus[type].length * 75
    this.menu1.add(this.menuBack)
    this.menu1.add(this.selector)
    // if (tileInfo[cardIndex].menu != null) {
    for (let i = 0; i < menus[type].length; i++) {
      const menuItem = menus[type][i];
      // var item = this.add.bitmapText(game.config.width - 10, menuOffsetY + i * 65, 'topaz', menuItem.name, 50).setOrigin(1,.5).setTint(0xfafafa).setInteractive();
      var item = this.add.text(game.config.width - 25, this.menuOffsetY + i * 75, menuItem.name, { fontFamily: 'KenneyMiniSquare', fontSize: '55px', color: '#fafafa', align: 'right', }).setOrigin(1, 0).setInteractive().setDepth(5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

      item.menuItem = menuItem.index
      console.log(item.menuItem)
      if (checkCost(item.menuItem) && checkRequirements(item.menuItem) && checkRestrictions(item.menuItem)) {
        item.setTint(0xfafafa)
      } else {
        item.setTint(0xAF335C)
      }
      item.on('pointerdown', this.menuPress.bind(this, item))
      this.menu1.add(item)

    }
    this.menu1.setPosition(0, 100)
    //}

  }
  menuPress(item) {
    if (checkCost(item.menuItem) || godMode == 1) {
      this.buildContainer.setAlpha(1)
    } else {
      this.buildContainer.setAlpha(0)
    }

    //this.buildContainer.setAlpha(1)
    for (let i = 0; i < 6; i++) {
      this.costHolder[i].setText(actionData[item.menuItem].cost[i])
    }
    for (let i = 0; i < 6; i++) {
      this.incomeHolder[i].setText(actionData[item.menuItem].gain[i])
    }
    this.Main.selectedAction = item.menuItem
    this.costContainer.setAlpha(1)
    //item.setBackgroundColor('#333333');
    // var textData = item.getTextBounds()
    var tween = this.tweens.add({
      targets: this.selector,
      y: item.y + 7,
      //displayWidth: textData.global.width + 50,
      duration: 75
    })
  }
  createBuildIcons() {
    var buildOffsetY = 700
    var buildOffsetX = 275
    this.buildContainer = this.add.container()


    this.buildcBackb = this.add.image(buildOffsetX, buildOffsetY, 'build_modal').setOrigin(.5).setAlpha(1);

    this.buildContainer.add(this.buildcBackb)

    this.okIcon = this.add.image(buildOffsetX - 84, buildOffsetY, 'build_icons', 0).setScale(gameOptions.scale + 1).setInteractive().setDepth(3).setOrigin(.5)
    this.buildContainer.add(this.okIcon)
    this.cancelIcon = this.add.image(buildOffsetX + 84, buildOffsetY, 'build_icons', 1).setScale(gameOptions.scale + 1).setInteractive().setDepth(3).setOrigin(.5)
    this.buildContainer.add(this.cancelIcon)
    this.buildText = this.add.text(buildOffsetX, buildOffsetY - 100, 'BUILD?', { fontFamily: 'KenneyMiniSquare', fontSize: '50px', color: '#fafafa', align: 'center' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    this.buildContainer.add(this.buildText)
    this.buildContainer.setAlpha(0)


    this.okIcon.on('pointerdown', function () {
      this.buildContainer.setAlpha(0)
      this.costContainer.setAlpha(0)
      // this.costContainer.setAlpha(0)
      //  this.gainContainer.setAlpha(0)
      this.selector.y = -100
      this.menu1.destroy()
      //   console.log('Build ' + this.action)
      this.Main.build()
    }, this)
    this.cancelIcon.on('pointerdown', function () {
      this.buildContainer.setAlpha(0)
      this.costContainer.setAlpha(0)
      // this.costContainer.setAlpha(0)
      // this.gainContainer.setAlpha(0)
      this.selector.y = -100
      this.menu1.destroy()
      this.Main.selectedAction = null
      // console.log('Do Not Build ' + this.action)
    }, this)
  }
  createImprovementPanel() {
    this.improvementBack = this.add.image(game.config.width / 2, game.config.height - 115, 'ground_panel').setOrigin(.5, 1).setAlpha(.9);
    this.improvementDetailsContainer = this.add.container()
    this.improvementDetailsContainer.add(this.improvementBack)

    this.improvementText = this.add.text(190, game.config.height - 175, 'improvement', { fontFamily: 'KenneyMiniSquare', fontSize: '40px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    this.improvementDetailsContainer.add(this.improvementText)
    this.selectedimprovement = this.add.image(58, game.config.height - 172, 'tiles', 71)
    this.selectedimprovement.displayWidth = 75;
    this.selectedimprovement.displayHeight = 75;
    this.improvementDetailsContainer.add(this.selectedimprovement)
    // this.improvmentOwnerText = this.add.text(game.config.width / 2, game.config.height - 50, 'PLAYER 1', { fontFamily: 'KenneyMiniSquare', fontSize: '40px', color: '#fafafa', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    this.improvementIcon = this.add.image(137, game.config.height - 172, 'player_icons', 1)
    this.improvementIcon.displayWidth = 75;
    this.improvementIcon.displayHeight = 75;
    this.improvementDetailsContainer.add(this.improvementIcon)
    this.improvementDetailsContainer.setAlpha(0)

    this.buildImpIcon = this.add.image(900 - 137, game.config.height - 172, 'unit_icons', 5).setInteractive().setAlpha(0).setOrigin(.5)
    this.buildImpIcon.on('pointerdown', function () {

      var tile = improvementLayerData[this.Main.selectedTile.row][this.Main.selectedTile.column]
      console.log(tile)
      if (this.menu1) {
        this.menu1.destroy()
      }
      this.displayMenu(improvementStaticData[tile.id].type)


    }, this)

    this.improvementelpIcon = this.add.image(900 - 52, game.config.height - 172, 'unit_icons', 4).setInteractive().setAlpha(1).setOrigin(.5)
    this.improvementDetailsContainer.add(this.improvementelpIcon)
    this.improvementelpIcon.on('pointerdown', function () {

    }, this)
  }
  updateImprovementPanel(tile) {
    this.improvementDetailsContainer.setAlpha(1)
    console.log(tile)
    console.log(playerArray[tile.owner].id)
    //this.improvmentOwnerText.setText(playerArray[tile.owner].name)
    this.improvementIcon.setFrame(playerArray[tile.owner].id)
    this.improvementText.setText(improvementStaticData[tile.id].name)
    this.selectedimprovement.setFrame(tile.id)
  }
  createGroundPanel() {
    this.terrainBack = this.add.image(game.config.width, game.config.height, 'ground_panel').setOrigin(1, 1).setAlpha(.9);
    this.terrainDetailsContainer = this.add.container()
    this.terrainDetailsContainer.add(this.terrainBack)

    this.terrainText = this.add.text(190, game.config.height - 60, 'Terrain', { fontFamily: 'KenneyMiniSquare', fontSize: '40px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    this.terrainDetailsContainer.add(this.terrainText)

    this.selectedTerrain = this.add.image(58, game.config.height - 57, 'tiles', 1).setInteractive()
    this.selectedTerrain.displayWidth = 75;
    this.selectedTerrain.displayHeight = 75;
    this.terrainDetailsContainer.add(this.selectedTerrain)

    //this.ownerText = this.add.text(game.config.width - 150, game.config.height - 50, 'PLAYER 1', { fontFamily: 'KenneyMiniSquare', fontSize: '40px', color: '#fafafa', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    this.ownerIcon = this.add.image(137, game.config.height - 57, 'player_icons', 1)
    this.ownerIcon.displayWidth = 75;
    this.ownerIcon.displayHeight = 75;
    this.terrainDetailsContainer.add(this.ownerIcon)

    this.buildIcon = this.add.image(900 - 137, game.config.height - 57, 'unit_icons', 5).setInteractive().setAlpha(0).setOrigin(.5)
    this.buildIcon.on('pointerdown', function () {
      console.log(groundLayerData[this.Main.selectedTile.row][this.Main.selectedTile.column])
      var tile = groundLayerData[this.Main.selectedTile.row][this.Main.selectedTile.column]
      if (this.menu1) {
        this.menu1.destroy()
      }
      if (tile.revealed) {
        this.displayMenu(groundStaticData[tile.frame].type)
      } else {
        if (isConnected(this.Main.selectedTile.row, this.Main.selectedTile.column)) {
          this.displayMenu(groundStaticData[11].type)
        }

      }

    }, this)
    this.buildHelpIcon = this.add.image(900 - 52, game.config.height - 57, 'unit_icons', 4).setInteractive().setAlpha(0).setOrigin(.5)
    this.buildIcon.on('pointerdown', function () {

    }, this)
    // this.terrainDetailsContainer.add(this.buildHelpIcon)
    //this.terrainStars = this.add.image(game.config.width - 137.5, game.config.height - 75, 'stars', 0).setScale(5)
  }
  updateGroundPanel(tile, connected) {
    console.log(tile)
    if (tile.revealed) {
      this.terrainText.setText(groundStaticData[tile.frame].name)
      this.selectedTerrain.setFrame(tile.frame)
      if (tile.owner != null) {
        this.ownerIcon.setFrame(playerArray[tile.owner].id)
      } else {
        this.ownerIcon.setFrame(4)
      }

    } else {
      this.terrainText.setText('UNKNOWN')
      this.selectedTerrain.setFrame(11)
      this.ownerIcon.setFrame(4)
      this.terrainText.setText('???')
    }

    /*  if (owner) {
       this.ownerIcon.setFrame(playerArray[gameData.currentPlayer].id)
       // this.ownerText.setText('??????')
       this.terrainText.setText('UNEXPLORED')
       this.selectedTerrain.setFrame(11)
  
     } else {
       this.ownerIcon.setFrame(4)
       this.terrainText.setText('UNEXPLORED')
       this.selectedTerrain.setFrame(11)
     }
  */







    //this.ownerIcon.setFrame(playerArray[tile.owner].id)
    // this.ownerText.setText(playerArray[tile.owner].name)
    //this.terrainText.setText(groundStaticData[tile.frame].name)
    //this.selectedTerrain.setFrame(tile.frame)
    /* this.selectedTerrain.on('pointerdown', function () {
      if (this.menu1) {
        this.menu1.destroy()
      }
      this.displayMenu(groundStaticData[tile.frame].type)
      console.log(tile)
      console.log(playerArray[tile.owner].id)
    }, this) */
  }
  createUnitPanel() {

    var x1 = 900 - 375
    var x2 = 900 - 298
    var x3 = 900 - 218
    var x4 = 900 - 137
    var x5 = 900 - 52
    var y1 = game.config.height - 365
    var y2 = game.config.height - 286

    this.unitBack = this.add.image(0, game.config.height - 230, 'unit_panel').setOrigin(0, 1).setAlpha(1);

    this.upgradeUnitIcon = this.add.image(x1, y1, 'unit_icons', 0)
    this.moveUnitIcon = this.add.image(x2, y1, 'unit_icons', 1).setInteractive()
    this.attackUnitIcon = this.add.image(x3, y1, 'unit_icons', 2)
    this.fortifyUnitIcon = this.add.image(x4, y1, 'unit_icons', 7).setInteractive()
    this.settleUnitIcon = this.add.image(x5, y1, 'unit_icons', 6).setInteractive()

    this.removeUnitIcon = this.add.image(x4, y2, 'unit_icons', 3).setInteractive()
    this.unitHelpIcon = this.add.image(x5, y2, 'unit_icons', 4).setInteractive().setAlpha(1).setOrigin(.5)


    this.hpBarBack = this.add.image(190, game.config.height - 370, 'blank').setOrigin(0, .5).setTint(0x000000)
    this.hpBarBack.displayWidth = 260
    this.hpBarBack.displayHeight = 20

    this.hpBar = this.add.image(190, game.config.height - 370, 'blank').setOrigin(0, .5).setTint(0x00ff00)
    this.hpBar.displayWidth = 260
    this.hpBar.displayHeight = 20


    this.unitDetailsContainer = this.add.container()
    this.unitDetailsContainer.add(this.unitBack)
    this.unitDetailsContainer.add(this.upgradeUnitIcon)
    this.unitDetailsContainer.add(this.moveUnitIcon)
    this.unitDetailsContainer.add(this.attackUnitIcon)
    this.unitDetailsContainer.add(this.removeUnitIcon)
    this.unitDetailsContainer.add(this.unitHelpIcon)
    this.unitDetailsContainer.add(this.fortifyUnitIcon)
    this.unitDetailsContainer.add(this.settleUnitIcon)
    this.unitDetailsContainer.add(this.hpBarBack)


    this.unitDetailsContainer.add(this.hpBar)

    this.unitDetailsContainer.add(this.upgradeUnitIcon)
    this.unitText = this.add.text(190, game.config.height - 290, 'unit', { fontFamily: 'KenneyMiniSquare', fontSize: '40px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    this.unitDetailsContainer.add(this.unitText)
    this.selectedUnit = this.add.image(103, game.config.height - 329, 'units', 5)
    this.selectedUnit.displayWidth = 155;
    this.selectedUnit.displayHeight = 155;
    this.unitDetailsContainer.add(this.selectedUnit)


    this.unitHelpIcon.on('pointerdown', function () {

    }, this)
    //this.unitOwnerText = this.add.text(150, game.config.height - 50, 'PLAYER 1', { fontFamily: 'KenneyMiniSquare', fontSize: '40px', color: '#fafafa', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    // this.unitDetailsContainer.add(this.unitOwnerText)
    this.unitDetailsContainer.setAlpha(0)
    /*  this.upgradeUnitIcon = this.add.image(0, game.config.height - 325, 'game_icons', 14).setScale(.75).setInteractive().setAlpha(1).setOrigin(0, 1)
     this.moveUnitIcon = this.add.image(96, game.config.height - 325, 'game_icons', 17).setScale(.75).setInteractive().setAlpha(1).setOrigin(0, 1) */

    //this.terrainStars = this.add.image(game.config.width - 137.5, game.config.height - 75, 'stars', 0).setScale(5)
  }
  updateUnitPanel(tile) {
    this.unitDetailsContainer.setAlpha(1)
    console.log(tile.owner)
    console.log(unitTypes[tile.id].frames[tile.owner])
    console.log(tile.tookAction)
    this.unitText.setText(unitTypes[tile.id].name)
    //this.unitOwnerText.setText(playerArray[tile.owner].name)
    //  this.improvementText.setText(unitStaticData[tile.id].name)
    var frame = playerArray[tile.owner].id
    this.selectedUnit.setFrame(unitTypes[tile.id].frames[frame])
    this.hpBar.displayWidth = 260 * (tile.hp / 100)
    //console.log(checkCost(unitTypes[tile.id].upgradeAction))

    //check upgrade icon
    if (unitTypes[tile.id].canUpgrade && (checkCost(unitTypes[tile.id].upgradeAction) || godMode == 1)) {

      this.upgradeUnitIcon.setAlpha(1)
      this.upgradeUnitIcon.setInteractive()
    } else {
      this.upgradeUnitIcon.setAlpha(.3)
      this.upgradeUnitIcon.disableInteractive()
    }
    //check attack icon
    if (unitTypes[tile.id].menu.indexOf('attack') > -1) {
      this.attackUnitIcon.setAlpha(1)
      this.attackUnitIcon.setInteractive()
    } else {
      this.attackUnitIcon.setAlpha(.3)
      this.attackUnitIcon.disableInteractive()
    }
    //check settle icon
    if (unitTypes[tile.id].menu.indexOf('settle') > -1) {
      this.settleUnitIcon.setAlpha(1)
      this.settleUnitIcon.setInteractive()
    } else {
      this.settleUnitIcon.setAlpha(.3)
      this.settleUnitIcon.disableInteractive()
    }
    //check fortify icon
    if (unitTypes[tile.id].menu.indexOf('fortify') > -1) {
      this.fortifyUnitIcon.setAlpha(1)
      this.fortifyUnitIcon.setInteractive()
    } else {
      this.fortifyUnitIcon.setAlpha(.3)
      this.fortifyUnitIcon.disableInteractive()
    }
  }


}