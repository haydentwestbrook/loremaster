import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadCharacterList } from '../../stores/actions';
import CharacterListStore from '../../stores/CharacterListStore';
import { Row, Column } from '../../common/Markup/Markup';
import Loading from '../../Loading/Loading';
import Authorize from '../../Authentication/Authorize';

class CharacterListInternal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: null
    };
  }

  componentDidMount() {
    loadCharacterList();
    CharacterListStore.on('update', () => {
      this.setState({
        loading: false,
        characters: CharacterListStore.get()
      });
    });
  }

  componentWillUnmount() {
    CharacterListStore.removeAllListeners();
  }

  render() {
    const { characters } = this.state;
    if (!characters) return <Loading />;
    return (
      <ul className="character-list">
        <Characters characters={characters} />
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
        to={'/characters/get/' + char.index}
        className="character-list__name"
      >
        {char.name}
      </Link>
      <Link
        to={'/characters/delete/' + char.index}
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
      <CharacterListInternal {...props} />
    </Authorize>
  );
};

export default CharacterListWrapper;
