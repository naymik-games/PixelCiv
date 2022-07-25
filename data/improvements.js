let improvementInfo = [
  {
    id: 0,
    name: 'Granary',
    cost: 60,
    culture: 0,
    maintenance: 1,
    requires: 0,
    description: 'Halves food storage requirement for population growth'
  },
  {
    id: 1,
    name: 'Temple',
    cost: 60,
    culture: 2,
    maintenance: 1,
    requires: 6,
    description: 'Makes 1 unhappy citizen conetent'
  },
  {
    id: 2,
    name: 'Palace',
    cost: 100,
    culture: 1,
    maintenance: 0,
    requires: 5,
    description: 'Nation center. Eliminats corruption in capital and reduces nearby'
  },
  {
    id: 3,
    name: 'City Walls',
    cost: 20,
    culture: 0,
    maintenance: 0,
    requires: 5,
    description: 'Bombardment defense of 8, +50% bonus against land attack'
  },
  {
    id: 4,
    name: 'Aqueduct',
    cost: 100,
    culture: 0,
    maintenance: 1,
    requires: 11,
    description: 'Allows population growth past size 6'
  },
  {
    id: 5,
    name: 'Barracks',
    cost: 40,
    culture: 0,
    maintenance: 1,
    requires: -1,
    description: 'Produces vetern ground units, allows upgrade, heals after one turn'
  },
  {
    id: 6,
    name: 'Colosseum',
    cost: 120,
    culture: 2,
    maintenance: 2,
    requires: 11,
    description: 'Makes 2 unhappy citizens content'
  },
  {
    id: 7,
    name: 'Courthouse',
    cost: 80,
    culture: 0,
    maintenance: 1,
    requires: 14,
    description: 'Reduces corruption'
  },
  {
    id: 8,
    name: 'Harbor',
    cost: 80,
    culture: 0,
    maintenance: 1,
    requires: 16,
    description: '+1 food form coast and water. Vetern sea units and upgrades'
  },
  {
    id: 9,
    name: 'Library',
    cost: 80,
    culture: 3,
    maintenance: 1,
    requires: 15,
    description: '50% increase city science output'
  },
  {
    id: 10,
    name: 'Marketplace',
    cost: 100,
    culture: 0,
    maintenance: 1,
    requires: 12,
    description: '50% increase to tax revenue, increased effect of luxery resources'
  }
]


let greatWonders = [
  {
    id: 0,
    name: 'Great Wall',
    cost: 200,
    culture: 2,
    requires: 11,//construction
    expires: 0, //metallurgy need id
    benefit: 'Doubles effects of city walls'
  },
  {
    id: 1,
    name: 'SETI Program',
    cost: 1000,
    culture: 3,
    requires: 0,//computers need it
    expires: 0, //metallurgy need id
    benefit: 'Doubles science output of city'
  },
  {
    id: 2,
    name: 'Lighthouse',
    cost: 400,
    culture: 2,
    requires: 16,//map making
    expires: 0, //magnetism need id
    benefit: '+1 ship movement. Galleys can travel safely at sea'
  },
  {
    id: 3,
    name: 'Colossus',
    cost: 200,
    culture: 3,
    requires: 4,//bronze working
    expires: 0, //flight need id
    benefit: '+1 commerce in any square already producing commerce in that city'
  },
  {
    id: 4,
    name: 'Great Library',
    cost: 400,
    culture: 6,
    requires: 20,//Monarchy
    expires: 0, //education need id
    benefit: 'Civilization receives any civilization advance already discovered by 2 other known civs for free.'
  }
]