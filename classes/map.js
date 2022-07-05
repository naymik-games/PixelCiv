let waterLight, waterDark, sand, floodPlain, grassLand, forest, plains, mountainLight, mountainDark, snow, genNoise;
waterDark = 0.2;

waterLight = 0.4;
sand = 0.45;
floodPlain = 0.5;
forest = 0.52
grassLand = 0.65;
plains = 0.68
mountainLight = 0.69;
mountainDark = 0.74;
snow = 1;
let terrainNames = ['Deep Water', 'Shallow Water', 'Sand', 'Flood Plain', 'Forest', 'Grass', 'Plains', 'Hills', 'Mountains', 'Snow']

class Map {
  constructor(width, height, mySeed) {
    this.width = width
    this.height = height
    this.mapArray = new Array(this.height).fill(null).map(() => new Array(this.width).fill(null));
    this.generateMap(mySeed)
  }
  generateMap(mySeed) {
    noiseSeed(mySeed)
    //console.log(value)
    var color
    var index
    for (let row = 0; row < this.height; row++) {

      for (let col = 0; col < this.width; col++) {
        genNoise = noise(col / 10, row / 10)
        // console.log(genNoise)
        if (genNoise < waterDark) {
          color = 0x005c99
          index = 0
        } else if (genNoise < waterLight) {
          color = 0x0099ff
          index = 1
        } else if (genNoise < sand) {
          color = 0xffff00
          index = 2
        } else if (genNoise < floodPlain) {
          color = 0x148F77
          index = 3

        } else if (genNoise < forest) {
          color = 0x145A32
          index = 4

        } else if (genNoise < grassLand) {
          color = 0x00cc00
          index = 5
        } else if (genNoise < plains) {
          color = 0xBA8345
          index = 6
        } else if (genNoise < mountainLight) {
          color = 0x595959
          index = 7
        } else if (genNoise < mountainDark) {
          color = 0x999999
          index = 8

        } else if (genNoise < snow) {
          color = 0xffffff
          index = 9
        }
        this.mapArray[row][col] = { index: index, color: color, biome: terrainNames[index], value: genNoise }
      }
    }
  }
}