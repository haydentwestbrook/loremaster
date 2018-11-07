const newCharacter = {
  info: {
    name: 'New Character',
    race: {
      name: '',
      ability_bonuses: [0, 0, 0, 0, 0, 0]
    },
    subrace: {
      name: '',
      ability_bonuses: [0, 0, 0, 0, 0, 0]
    },
    levels: null,
    background: '',
    experience: 0,
    alignment: '',
    playerName: ''
  },
  abilities: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  }
};

module.exports = newCharacter;
