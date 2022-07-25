function aiBuildImprovements() {
  for (let c = 1; c < theGame.countries.length; c++) {
    const country = theGame.countries[c];
    for (let i = 0; i < theGame.countries[c].cities.length; i++) {
      const city = theGame.countries[c].cities[i];
      //console.log(city.currentImprovementProduction)
      if (city.currentImprovementProduction == null) {
        let availableImprovements = getAvailableImprovements(c, i)
        //console.log(availableImprovements)
        if (availableImprovements.length > 0) {
          addImprovement(c, i, availableImprovements[0].id, false)
        }
        // theGame.countries[c].cities[i].currentImprovementProduction = availableImprovements[0].id

        //this.Main.addImprovement(this.select.owner, this.select.city, this.buildButton.type, false)
      }
    }
  }
}
//TO DO: DETERMINE IF CAN SUPPORT A UNIT, AND WHICH TYPE TO BUILD
function aiBuildUnits() {
  for (let c = 1; c < theGame.countries.length; c++) {
    const country = theGame.countries[c];
    for (let i = 0; i < theGame.countries[c].cities.length; i++) {
      const city = theGame.countries[c].cities[i];
      if (city.currentUnitProduction == null) {
        let availableUnits = getAvailableUnits(c, i)
        if (availableUnits.length > 0) {
          var neighborTileXY = gameBoard.getNeighborTileXY(theGame.countries[c].cities[i].cityCenter, 0)
          //type, tile, turnAdded, complete, placed, index, owner, cit
          var uni = new Unit(0, neighborTileXY, theGame.day, false, false, c, i)

          theGame.countries[c].units.push(uni)
          console.log('country ' + c)
          console.log('index ' + uni.index)
          console.log('id ' + uni.id)
          theGame.countries[c].cities[i].currentUnitProduction = { id: 0 }
        }
      }
    }
  }
}