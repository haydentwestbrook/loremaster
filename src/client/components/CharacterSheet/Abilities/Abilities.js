import React from "react";
import Input from "../../common/Input/Input";
import { Row, Column } from "../../common/Markup/Markup";

const Abilities = props => {
  const { write, character, updateCharacter } = props;
  const abilities = character.abilities;

  const update = data => {
    const updated = Object.assign(character.abilities, data);
    updateCharacter(Object.assign(character, updated));
  };

  const getBonus = value => {
    const bonus = Math.floor((value - 10) / 2);
    return bonus < 0 ? bonus : "+" + bonus;
  };

  const renderAbilities = Object.keys(abilities).map(key => {
    const value = abilities[key];
    return (
      <div className="attribute" key={key}>
        <Input
          label={key}
          write={write}
          value={value}
          onChange={e => update({ [key]: e.target.value })}
          validation="number"
        />
        <Input write={false} value={getBonus(value)} />
      </div>
    );
  });

  return <Column num="1">{renderAbilities}</Column>;
};

export default Abilities;
