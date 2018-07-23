import React from "react";
import { Subscribe } from "unstated";
import { Link } from "react-router-dom";
import CharacterContainer from "../containers/CharacterContainer/CharacterContainer";
import { Row, Column } from "../common/Markup/Markup";

const CharacterList = props => {
  return (
    <Subscribe to={[CharacterContainer]}>
      {container => (
        <ul>
          <Characters characters={container.state} />
          <li>
            <Link to="new">New Character</Link>
          </li>
        </ul>
      )}
    </Subscribe>
  );
};

const Characters = props => {
  const { characters } = props;
  if (!characters) return "";
  return characters.list.map(char => (
    <li key={char.id}>
      <Link to={"characters/" + char.id}>{char.name}</Link>
    </li>
  ));
};

export default CharacterList;
