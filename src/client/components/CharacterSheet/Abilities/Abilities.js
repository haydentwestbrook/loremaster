import React from "react";
import Ability from "./Ability";
import AbilitiesModal from "./AbilitiesModal";
import { Row, Column } from "../../common/Markup/Markup";

const Abilities = props => {
  const { write, character, updateCharacter } = props;
  const abilities = character.abilities;

  const update = data => {
    const updated = Object.assign(character.abilities, data);
    updateCharacter(Object.assign(character, updated));
  };

  const calculateAbilities = abilities => {
    return abilities;
  };

  const renderAbilities = Object.keys(calculateAbilities(abilities)).map(
    key => {
      const value = abilities[key];
      return (
        <Ability
          key={key}
          value={value}
          label={key}
          write={write}
          onChange={e => update({ [key]: e.target.value })}
        />
      );
    }
  );

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
