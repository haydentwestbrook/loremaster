import React, { Component } from "react";
import { Subscribe } from "unstated";
import { Link } from "react-router-dom";
import CharacterContainer from "../containers/CharacterContainer/CharacterContainer";
import { Row, Column } from "../common/Markup/Markup";
import Loading from "../Loading/Loading";

class CharacterListInternal extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.context.loadCharacterList();
  }

  render() {
    const context = this.props.context;
    if (!context) return <Loading />;
    return (
      <ul>
        <Characters characters={context.state.list} />
        <li>
          <Link to="new">New Character</Link>
        </li>
      </ul>
    );
  }
}

const Characters = props => {
  const { characters } = props;
  if (!characters) return "";
  return characters.map(char => (
    <li key={char.id}>
      <Link to={"characters/" + char.id}>{char.name}</Link>
    </li>
  ));
};

const CharacterListWrapper = props => {
  return (
    <Subscribe to={[CharacterContainer]}>
      {context => <CharacterListInternal {...props} context={context} />}
    </Subscribe>
  );
};

export default CharacterListWrapper;
