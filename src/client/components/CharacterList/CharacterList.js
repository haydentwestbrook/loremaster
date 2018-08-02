import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import { Link } from 'react-router-dom';
import CharacterContainer from '../containers/CharacterContainer/CharacterContainer';
import { Row, Column } from '../common/Markup/Markup';
import Loading from '../Loading/Loading';
import Authorize from '../Authentication/Authorize';

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
      <ul>
        <Characters characters={context.state.list} />
        <li>
          <Link to="/characters/new">New Character</Link>
        </li>
      </ul>
    );
  }
}

const Characters = props => {
  const { characters } = props;
  if (!characters) return '';
  return characters.map(char => (
    <li key={char.index}>
      <div className="list__character">
        <Link to={'characters/get/' + char.index}>{char.name}</Link>
        <Link to={'characters/delete/' + char.index}>Delete</Link>
      </div>
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
