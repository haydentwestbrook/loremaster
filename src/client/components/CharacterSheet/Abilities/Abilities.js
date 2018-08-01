import React from "react";
import Ability from "./Ability";
import { Column } from "../../common/Markup/Markup";

const Abilities = props => {
  const { write, character, updateCharacter } = props;
  const abilities = character.abilities;

  const update = data => {
    const updated = Object.assign(character.abilities, data);
    updateCharacter(Object.assign(character, updated));
  };

  const renderAbilities = Object.keys(abilities).map(key => {
    const value = abilities[key];
    return (
      <div className="abilities" key={key}>
        <Ability
          value={value}
          label={key}
          write={write}
          onChange={e => update({ [key]: e.target.value })}
        />
      </div>
    );
  });

  return <Column num="1">{renderAbilities}</Column>;
};

export default Abilities;
