export const getLabel = short => {
  switch (short) {
    case 'str':
      return 'Strength';
    case 'dex':
      return 'Dexterity';
    case 'con':
      return 'Constitution';
    case 'int':
      return 'Intelligence';
    case 'wis':
      return 'Wisdom';
    case 'cha':
      return 'Charisma';
    default:
      return short;
  }
};
