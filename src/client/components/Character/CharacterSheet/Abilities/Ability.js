import React from 'react';
import Input from '../../../common/Input/Input';
import InfoString from '../../../common/InfoString/InfoString';
import { Row, Column } from '../../../common/Markup/Markup';
import { getLabel } from './AbilitiesHelper';

const Ability = props => {
  const { value, label, onChange, index } = props;

  return (
    <div className="ability">
      <div className="ability__value">
        <Input write={false} value={value} validation="number" simple={true} />
        <Bonus value={value} />
      </div>
      <InfoString
        search={{ section: 'ability-scores', index: index + 1 }}
        Template={Description}
      >
        {getLabel(label)}
      </InfoString>
    </div>
  );
};

const Description = props => {
  const data = props.data;
  const lines = data.desc.map(line => {
    return (
      <p key={data.desc.indexOf(line)} className="modal-text">
        {line}
      </p>
    );
  });
  const skills = data.skills
    .map(function(skill) {
      return skill.name;
    })
    .join(', ');
  return (
    <div>
      {lines}
      <h5 className="modal-subtitle">Related Skills</h5>
      {skills}
    </div>
  );
};

const Bonus = props => {
  const { value } = props;

  const getBonus = value => {
    const bonus = Math.floor((value - 10) / 2);
    return bonus < 0 ? bonus : '+' + bonus;
  };

  return <Input write={false} value={getBonus(value)} simple={true} />;
};

export default Ability;
