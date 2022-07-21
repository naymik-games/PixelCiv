const FARM = 0
const MINE = 1
const GOTO = 2
const DISBAND = 3
const SETTLE = 4
const FORTIFY = 5
const SCOUT = 6
const AUTOWORK = 7

let unitInfo = [
  { name: 'WORKER', description: 'Prepare tiles adjacent to the city for improvement', costProduction: 10, days: 5, workTime: 4, actions: [FARM, MINE, GOTO, AUTOWORK], a: 0, d: 0, m: 1 },
  { name: 'SETTLER', description: 'Settles a new City', costProduction: 30, days: 10, actions: [GOTO, SETTLE], a: 0, d: 0, m: 1 },
  { name: 'WARRIOR', description: 'Basic defense and attack', costProduction: 10, days: 5, actions: [GOTO, FORTIFY, SCOUT], a: 1, d: 1, m: 1 },
  { name: 'SCOUT', description: 'Explore the map', costProduction: 10, days: 5, actions: [GOTO, FORTIFY, SCOUT], a: 0, d: 0, m: 2 }
]