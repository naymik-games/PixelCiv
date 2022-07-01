var Generator = {
  // game of life variables
  chanceToStartAlive: 0.4,
  deathLimit: 3,
  birthLimit: 4,
  numberOfSteps: 2,
  worldWidth: 64,
  worldHeight: 48,
  numCountries: 1,
  map: [[]],

  generateMap: function (data) {
    if (data) {
      this.chanceToStartAlive = data.chanceToStartAlive
      this.deathLimit = data.deathLimit
      this.birthLimit = data.birthLimit
      this.numberOfSteps = data.numberOfSteps
      this.worldWidth = data.worldWidth
      this.worldHeight = data.worldHeight
      this.numCountries = data.numCountries
    }


    // randomly scatter solid blocks
    this.initialiseMap(this.map);

    for (var i = 0; i < this.numberOfSteps; i++) {
      this.map = this.step(this.map);
    }
    var treasureHiddenLimit = 5;
    this.placeTreasure(treasureHiddenLimit)

    this.placeStartLocations(this.numCountries)
    return this.map;
  },

  initialiseMap: function (map) {
    for (var x = 0; x < this.worldWidth; x++) {
      map[x] = [];
      for (var y = 0; y < this.worldHeight; y++) {
        map[x][y] = 1;
      }
    }

    for (var x = 0; x < this.worldWidth; x++) {
      for (var y = 0; y < this.worldHeight; y++) {
        if (Math.random() < this.chanceToStartAlive) {
          map[x][y] = 0;
        }
      }
    }

    return map;
  },

  step: function (map) {
    var newMap = [[]];
    for (var x = 0; x < map.length; x++) {
      newMap[x] = [];
      for (var y = 0; y < map[0].length; y++) {
        var nbs = this.countAliveNeighbours(map, x, y);
        if (map[x][y] < 1) {
          // check if should die
          if (nbs < this.deathLimit) {
            newMap[x][y] = 1;
          } else {
            newMap[x][y] = 0;
          }
        } else {
          // tile currently empty
          if (nbs > this.birthLimit) {
            newMap[x][y] = 0;
          } else {
            newMap[x][y] = 1;
          }
        }
      }
    }

    return newMap;
  },

  countAliveNeighbours: function (map, x, y) {
    var count = 0;
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        var nb_x = i + x;
        var nb_y = j + y;
        if (i === 0 && j === 0) {
          // pass
        } else if (nb_x < 0 || nb_y < 0 || nb_x >= map.length || nb_y >= map[0].length) {
          // if at the edge, consider it a solid
          count = count + 1;
        } else if (map[nb_x][nb_y] === 1) {
          count = count + 1;
        }
      }
    }

    return count;
  },

  placeTreasure: function (limit) {
    for (var x = 0; x < this.worldWidth; x++) {
      for (var y = 0; y < this.worldHeight; y++) {
        if (this.map[x][y] === 0) {
          var nbs = this.countAliveNeighbours(this.map, x, y);
          if (nbs >= limit) {
            this.map[x][y] = 2;
          }
        }
      }
    }
  },
  placeStartLocations: function (limit) {
    var count = 0
    while (count < limit) {
      var col = Math.floor(Math.random() * this.worldWidth)
      var row = Math.floor(Math.random() * this.worldHeight)
      if (col > 1 && col < this.worldWidth - 2 && row > 1 && row < this.worldHeight - 2) {
        if (this.map[col][row] == 1) {
          this.map[col][row] = 3
          count++
        }
      }

    }
    /* for (var x = 0; x < this.worldWidth; x++) {
      for (var y = 0; y < this.worldHeight; y++) {
        if (this.map[x][y] === 1) {
          var nbs = this.countAliveNeighbours(this.map, x, y);
          if (nbs >= limit) {
            this.map[x][y] = 3;
          }
        }
      }
    } */
  }
}