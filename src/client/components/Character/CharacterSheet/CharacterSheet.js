import React, { Component } from 'react';
import CharacterStore from '../../stores/CharacterStore';
import { characterActions as actions } from '../../stores/actions';
import withAuthorize from '../../Authentication/Authorize';
import { Row, Column } from '../../common/Markup/Markup';
import Loading from '../../Loading/Loading';
import CharInfo from './CharInfo/CharInfo';
import Abilities from './Abilities/Abilities';

class CharacterSheet extends Component {
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
      actions.loadCharacter(index);
    } else {
      this.setState({ error: true });
    }
  }

  componentWillUnmount() {
    CharacterStore.removeAllListeners();
  }

  update = character => {
    const index = parseInt(this.props.match.params.index);
    actions.updateCharacter(character);
    actions.saveCharacter(index, character);
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
        <Abilities
          character={character}
          write={write}
          updateCharacter={this.update}
        />
      </div>
    );
  }
}

export default withAuthorize(CharacterSheet);
