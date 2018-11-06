import React, { Component } from 'react';
import CharacterStore from '../../stores/CharacterStore';
import {
  updateCharacter,
  loadCharacter,
  saveCharacter
} from '../../stores/actions';
import Authorize from '../../Authentication/Authorize';
import { Row, Column } from '../../common/Markup/Markup';
import Loading from '../../Loading/Loading';
import CharInfo from './CharInfo/CharInfo';
import Abilities from './Abilities/Abilities';

class CharacterSheetInternal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      write: true,
      error: false,
      loading: true,
      character: null
    };
  }

  componentDidMount() {
    const index = parseInt(this.props.match.params.index);
    if (index) {
      CharacterStore.on('update', () => {
        this.setState({
          loading: false,
          character: CharacterStore.get()
        });
      });
      loadCharacter(index);
    } else {
      this.setState({ error: true });
    }
  }

  componentWillUnmount() {
    CharacterStore.removeAllListeners();
  }

  update = character => {
    const index = parseInt(this.props.match.params.index);
    updateCharacter(character);
    saveCharacter(index, character);
  };

  render() {
    const { write, error, character, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div className="character">
        <CharInfo
          character={character}
          write={write}
          updateCharacter={this.update}
        />
        <Row>
          <Abilities
            character={character}
            write={write}
            updateCharacter={this.update}
          />
        </Row>
      </div>
    );
  }
}

const CharacterSheetWrapper = props => {
  return (
    <Authorize redirect={true}>
      <CharacterSheetInternal {...props} />
    </Authorize>
  );
};

export default CharacterSheetWrapper;
