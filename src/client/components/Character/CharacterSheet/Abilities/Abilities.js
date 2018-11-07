import React from 'react';
import _ from 'lodash';
import Ability from './Ability';
import AbilitiesModal from './AbilitiesModal';
import { Row, Column } from '../../../common/Markup/Markup';
import { computeAbilities } from '../../compute/compute';

const Abilities = props => {
  const { write, character, updateCharacter } = props;
  const abilities = character.abilities;

  const update = data => {
    const updated = Object.assign(character.abilities, data);
    updateCharacter(Object.assign(character, updated));
  };

  const computedAbilities = computeAbilities(character);
  const keys = Object.keys(computedAbilities);
  const renderAbilities = keys.map(key => {
    const value = computedAbilities[key];
    return (
      <Ability
        index={keys.indexOf(key)}
        key={key}
        value={value}
        label={key}
        write={false}
      />
    );
  });

  return (
    <Column num="1" className="abilities">
      <Row>
        <span>Abilities</span>
        <AbilitiesModal abilities={abilities} write={write} update={update} />
      </Row>
      {renderAbilities}
    </Column>
  );
};

export default Abilities;
