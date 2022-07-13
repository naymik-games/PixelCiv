let techTree =
  [
    {
      //0
      name: 'Pottery',
      id: 0,
      era: 0,
      description: 'sldfj',
      prequisite: null,
      baseCost: 10,
      allowsImprovement: ['Granary'],
      allowsUnit: []

    },
    {

      name: 'Alphabet',
      id: 1,
      era: 0,
      description: 'sldfj',
      prequisite: null,
      baseCost: 10,
      allowsImprovement: [],
      allowsUnit: []

    },
    {

      name: 'Warrior Code',
      id: 2,
      era: 0,
      description: 'sldfj',
      prequisite: null,
      baseCost: 10,
      allowsImprovement: [],
      allowsUnit: ['Archer']

    },
    {

      name: 'Wheel',
      id: 3,
      era: 0,
      description: 'sldfj',
      prequisite: [],
      baseCost: 10,
      allowsUnit: ['Chariot'],
      allowsImprovement: []

    },
    {

      name: 'Bronze Working',
      id: 4,
      era: 0,
      description: 'sldfj',
      prequisite: null,
      baseCost: 10,
      allowsUnit: ['Spearman'],
      allowsImprovement: []

    },
    {

      name: 'Masonary',
      id: 5,
      era: 0,
      description: 'sldfj',
      prequisite: null,
      baseCost: 10,
      allowsUnit: [],
      allowsImprovement: ['City Walls', 'Palace']

    },
    {

      name: 'Ceremony Burial',
      id: 6,
      era: 0,
      description: 'sldfj',
      prequisite: null,
      baseCost: 10,
      allowsImprovement: ['Temple'],
      allowsUnit: []

    },
    //secon level

    {

      name: 'Iron Working',
      id: 7,
      era: 0,
      description: 'sldfj',
      prequisite: [4],
      baseCost: 10,
      allowsUnit: ['Legion'],
      allowsImprovement: []

    },
    {

      name: 'Mathematics',
      id: 8,
      era: 0,
      description: 'sldfj',
      prequisite: [1, 5],
      baseCost: 10,
      allowsUnit: ['Catapult'],
      allowsImprovement: []

    },
    {

      name: 'Writing',
      id: 9,
      era: 0,
      description: 'sldfj',
      prequisite: [1],
      baseCost: 10,
      allowsUnit: ['Diplomat'],
      allowsImprovement: ['Library']

    },
    {

      name: 'Mysticism',
      id: 10,
      era: 0,
      description: 'sldfj',
      prequisite: [6],
      baseCost: 10,
      allowsUnit: [],
      allowsImprovement: []

    },
    //third level
    {

      name: 'Construction',
      id: 11,
      era: 0,
      description: 'sldfj',
      prequisite: [7, 8],
      baseCost: 10,
      allowsUnit: [],
      allowsImprovement: ['Aquaduct', 'Coliseum', 'Fortress']

    },
    {

      name: 'Currencey',
      id: 12,
      era: 0,
      description: 'sldfj',
      prequisite: [8],
      baseCost: 10,
      allowsUnit: [],
      allowsImprovement: ['Marketplace']

    },
    {

      name: 'Philosophy',
      id: 13,
      era: 0,
      description: 'sldfj',
      prequisite: [9],
      baseCost: 10,
      allowsUnit: [],
      allowsImprovement: []

    },
    {

      name: 'Code of Laws',
      id: 14,
      era: 0,
      description: 'sldfj',
      prequisite: [9],
      baseCost: 10,
      allowsUnit: [],
      allowsImprovement: ['Courthouse']

    },
    {

      name: 'Literature',
      id: 15,
      era: 0,
      description: 'sldfj',
      prequisite: [9],
      baseCost: 10,
      allowsUnit: [],
      allowsImprovement: ['Library', 'University']

    },
    {

      name: 'Map Making',
      id: 16,
      era: 0,
      description: 'sldfj',
      prequisite: [0, 9],
      baseCost: 10,
      allowsUnit: ['Ship'],
      allowsImprovement: ['Lighthouse']

    },
    {

      name: 'Horseback Riding',
      id: 17,
      era: 0,
      description: 'sldfj',
      prequisite: [2, 3],
      baseCost: 10,
      allowsImprovement: [],
      allowsUnit: ['Horseman']

    },

    {

      name: 'Polytheism',
      id: 18,
      era: 0,
      description: 'sldfj',
      prequisite: [10],
      baseCost: 10,
      allowsUnit: [],
      allowsImprovement: []
      //also
    },
    //fourth levle
    {

      name: 'Republic',
      id: 19,
      era: 0,
      description: 'sldfj',
      prequisite: [13, 14],
      baseCost: 10,
      allowsUnit: [],
      allowsImprovement: []
      //also
    },
    {

      name: 'Monarchy',
      id: 20,
      era: 0,
      description: 'sldfj',
      prequisite: [2, 18],
      baseCost: 10,
      allowsUnit: [],
      allowsImprovement: []
      //also
    }

  ]
/* 

  [h1]Ancient Ages[/h1]
  Pottery - 2, Ceremonial Burial - 2, Bronze Working - 3, WarriorCode - 3,
  Masonry - 4,  Mysticism - 4, The Wheel - 4, Alphabet - 5, Horseback Riding - 5
  Iron Working - 6, Philosophy - 6, Mathematics - 8 Writing - 8, Code of Laws -
  10, Literature - 10*, Map Making - 12, Polytheism - 12, Currency - 16,
  Construction - 20, Monarchy - 24*, Republic - 28*.
  
  [h1]Middle Ages[/h1]
  Chivalry - 32*, Feudalism - 32, Engineering - 36, Monotheism - 36, Printing
  Press - 368, Music Theory - 40*, Theology - 40, Education - 44 Invention -
  44, Gunpowder - 48, Banking - 52, Free Artistry - 52*, Astronomy - 56,
  Navigation - 56*, Economics - 56*, Chemistry - 60, Metallurgy - 64,
  Military Tradition - 64*, Physics - 64, Democracy - 68*, Magnetism - 68,
  Theory of Gravity - 68.
  
  [h1]Industrial Ages[/h1]
  Espionage - 90*, Sanitation - 90*, Ironclads - 100*, Medicine - 100,
  Scientific Method - 100, The Corporation - 100, Amphibious Warfare - 120*,
  Communism - 120*, Industrialization - 120, Nationalism - 120*, Steam Power
  - 120, Fascism - 130*, Electricity - 140, Mass Production - 140, Motorized
  Transportation - 140, Replaceable Parts - 140, Steel - 140, Combustion - 160,
  Refining - 160, Advanced Flight - 180*, Electronics - 180, Flight - 180,
  Atomic Theory - 200. 
  
  [h1]Modern Age[/h1]
  Recycling - 240, Rocketry - 240, Computers - 260, Ecology - 260, Satellites -
  260, Fission - 280, Nuclear Power - 280, Synthetic Fibers - 280, Smart
  Weapons - 280, TheLasers - 280, Space Flight - 300, Stealth - 300,
  Superconductor - 300, Genetics - 320, Minituration - 320,  Robotics - 320
  IntergratedDefense - 360.
  * = Optional Tech */