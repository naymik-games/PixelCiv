class GAME {
  constructor(width, height, players, seed, player) {
    this.width = width
    this.height = height
    this.gameSeed = seed
    this.players = players
    this.playerCiv = player
    this.day = 1
    this.age = 0
    this.countries = []
    this.tileData = new Array(this.height).fill(null).map(() => new Array(this.width).fill(null));
    this.currentPlayer = 0

  }

}