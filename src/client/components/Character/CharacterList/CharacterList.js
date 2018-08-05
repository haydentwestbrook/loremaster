import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { Link } from 'react-router-dom';
import CharacterContainer from '../../containers/CharacterContainer/CharacterContainer';
import { Row, Column } from '../../common/Markup/Markup';
import Loading from '../../Loading/Loading';
import Authorize from '../../Authentication/Authorize';

class CharacterListInternal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.context.loadCharacterList();
  }

  render() {
    const context = this.props.context;
    if (!context.state.list) return <Loading />;
    return (
      <ul className="character-list">
        <Characters characters={context.state.list} />
        <li className="character-list__new">
          <Link className="paper-btn btn-success" to="/characters/new">
            Create Character
          </Link>
        </li>
      </ul>
    );
  }
}

const Characters = props => {
  const { characters } = props;
  if (!characters) return '';
  return characters.map(char => (
    <li key={char.index} className="character-list__item border">
      <Link
        to={'characters/get/' + char.index}
        className="character-list__name"
      >
        {char.name}
      </Link>
      <Link
        to={'characters/delete/' + char.index}
        className="character-list__delete paper-btn btn-danger"
      >
        Delete
      </Link>
    </li>
  ));
};

const CharacterListWrapper = props => {
  return (
    <Authorize redirect={true}>
      <Subscribe to={[CharacterContainer]}>
        {context => <CharacterListInternal {...props} context={context} />}
      </Subscribe>
    </Authorize>
  );
};

export default CharacterListWrapper;
