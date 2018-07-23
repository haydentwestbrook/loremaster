import React from "react";
import { Subscribe } from "unstated";
import FiveEContainer from "../containers/FiveEContainer/FiveEContainer";
import CharacterContainer from "../containers/CharacterContainer/CharacterContainer";
import { Row, Column } from "../common/Markup/Markup";
import CharInfo from "./CharInfo/CharInfo";
import Attributes from "./Attributes/Attributes";

const Character = props => {
  const { id } = props.match.params;

  console.log(props);

  return (
    <Subscribe to={[CharacterContainer]}>
      {container => {
        container.loadCharacter(id);
        const character = container.state;
        return (
          <div className="character">
            <CharInfo character={character} write={true} />
            <Row>
              <Attributes character={character} write={true} />
            </Row>
          </div>
        );
      }}
    </Subscribe>
  );
};

export default Character;
