import React from "react";
import Input from "../../common/Input/Input";
import InfoString from "../../common/InfoString/InfoString";
import { Row, Column } from "../../common/Markup/Markup";

const Ability = props => {
  const { value, label, onChange, index } = props;

  return (
    <div className="ability">
      <InfoString search={{ section: "ability-scores", index: index }}>
        {label}
      </InfoString>
      <Input
        write={false}
        value={value}
        onChange={e => onChange(e)}
        validation="number"
        simple={true}
      />
      <Bonus value={value} />
    </div>
  );
};

const Bonus = props => {
  const { value } = props;

  const getBonus = value => {
    const bonus = Math.floor((value - 10) / 2);
    return bonus < 0 ? bonus : "+" + bonus;
  };

  return <Input write={false} value={getBonus(value)} simple={true} />;
};

export default Ability;
