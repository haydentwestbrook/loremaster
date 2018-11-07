import _ from 'lodash';

export const computeAbilities = character => {
  const { race, subrace } = character.info;
  const abilities = Object.assign({}, character.abilities);
  _.forEach(
    _.zip(
      Object.keys(abilities),
      race ? race.ability_bonuses : [],
      subrace ? subrace.ability_bonuses : []
    ),
    abilityGroup => {
      const key = abilityGroup.shift();
      abilities[key] = abilities[key] + _.sum(abilityGroup);
    }
  );
  return abilities;
};
