import React from "react";
import Input from "../../common/Input/Input";
import { Row, Column } from "../../common/Markup/Markup";

const Attributes = props => {
  const { write } = props;
  const character = props.character.state;
  const updateCharacter = props.character.updateCharacter;
  const attributes = props.character.state.attributes;

  const update = data => {
    const updated = Object.assign(character.attributes, data);
    updateCharacter(Object.assign(character, updated));
  };

  const getBonus = value => {
    const bonus = Math.floor((value - 10) / 2);
    return bonus < 0 ? bonus : "+" + bonus;
  };

  const renderAttributes = Object.keys(attributes).map(key => {
    const value = attributes[key];
    return (
      <div className="attribute" key={key}>
        <Input
          label={key}
          write={true}
          value={value}
          onChange={e => update({ [key]: e.target.value })}
          validation="number"
        />
        <Input write={false} value={getBonus(value)} />
      </div>
    );
  });

  return <Column num="1">{renderAttributes}</Column>;
};

export default Attributes;
