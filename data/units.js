const FARM = 0
const MINE = 1
const GOTO = 2
const DISBAND = 3
const SETTLE = 4
const FORTIFY = 5
const SCOUT = 6
const AUTOWORK = 7

let unitInfo = [
  { id: 0, key: 'Worker', name: 'WORKER', description: 'Prepare tiles adjacent to the city for improvement', costProduction: 10, days: 5, workTime: 4, actions: [FARM, MINE, GOTO, AUTOWORK], a: 0, d: 0, m: 1, b: 0, r: 0, f: 0, requires: -1 },
  { id: 1, key: 'Settler', name: 'SETTLER', description: 'Settles a new City', costProduction: 30, days: 10, actions: [GOTO, SETTLE], a: 0, d: 0, m: 1, b: 0, r: 0, f: 0, requires: -1 },
  { id: 2, key: 'Warrior', name: 'WARRIOR', description: 'Basic defense and attack', costProduction: 10, days: 5, actions: [GOTO, FORTIFY, SCOUT], a: 1, d: 1, m: 1, b: 0, r: 0, f: 0, requires: -1 },
  { id: 3, key: 'Scout', name: 'SCOUT', description: 'Explore the map', costProduction: 10, days: 5, actions: [GOTO, FORTIFY, SCOUT], a: 0, d: 0, m: 2, b: 0, r: 0, f: 0, requires: -1 },
  { id: 4, key: 'WorkBoat', name: 'CURRAGH', description: 'Small ship', costProduction: 15, days: 5, actions: [GOTO, FORTIFY, SCOUT], a: 1, d: 1, m: 2, b: 0, r: 0, f: 0, requires: 1 },
  { id: 5, key: 'Spearman', name: 'SPEARMAN', description: 'Good defense', costProduction: 20, days: 5, actions: [GOTO, FORTIFY, SCOUT], a: 1, d: 2, m: 1, b: 0, r: 0, f: 0, requires: 4 },
  { id: 6, key: 'Horseman', name: 'HORSEMAN', description: 'Explore the map', costProduction: 30, days: 5, actions: [GOTO, FORTIFY, SCOUT], a: 2, d: 1, m: 2, b: 0, r: 0, f: 0, requires: 17 },
  { id: 7, key: 'Swordsman', name: 'SWORDSMAN', description: 'Standard infantry', costProduction: 30, days: 5, actions: [GOTO, FORTIFY, SCOUT], a: 3, d: 2, m: 1, b: 0, r: 0, f: 0, requires: 7 },
  { id: 8, key: 'Trireme', name: 'GALLEY', description: 'Explore the map', costProduction: 30, days: 5, actions: [GOTO, FORTIFY, SCOUT], a: 1, d: 1, m: 3, b: 0, r: 0, f: 0, requires: 16 },
  { id: 9, key: 'Catapult', name: 'CATAPULT', description: 'Limited bombardment', costProduction: 20, days: 5, actions: [GOTO, FORTIFY, SCOUT], a: 0, d: 0, m: 1, b: 4, r: 1, f: 1, requires: -1 },
  { id: 10, key: 'WarChariot', name: 'CHARIOT', description: 'Weak unit', costProduction: 20, days: 5, actions: [GOTO, FORTIFY, SCOUT], a: 1, d: 1, m: 2, b: 0, r: 0, f: 0, requires: 3 },
  { id: 11, key: 'Archer', name: 'ARCHER', description: 'Shoot', costProduction: 20, days: 5, actions: [GOTO, FORTIFY, SCOUT], a: 2, d: 1, m: 1, b: 1, r: 0, f: 1, requires: 2 },

]
/* //0 pottery
1 alphabet
2 warrior ConvolverNode
3 wheel
4 bronze workimng
5 masonary
6 cerimonial burial
7 iron working
8 math
9 writing
10 mysticism
11 construction
12 currancy
13 philosophy
14 code of laws
15 literature
16 map making
17 horseback riding
18 polythesum
19 republic
20 monarchy */