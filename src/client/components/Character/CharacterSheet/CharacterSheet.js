import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import FiveEContainer from '../../containers/FiveEContainer/FiveEContainer';
import CharacterContainer from '../../containers/CharacterContainer/CharacterContainer';
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
      error: false
    };
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    const context = this.props.context;
    const index = parseInt(this.props.match.params.index);
    if (index) {
      context.loadCharacter(index);
    } else {
      this.setState({ error: true });
    }
  }

  update(state) {
    const updateCharacter = this.props.context.updateCharacter;
    const index = parseInt(this.props.match.params.index);
    if (index) {
      updateCharacter(state, index);
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    const { write, error } = this.state;
    const { context } = this.props;
    if (!context.state.character) return <Loading />;
    const character = context.state.character;
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
      <Subscribe to={[CharacterContainer]}>
        {context => <CharacterSheetInternal {...props} context={context} />}
      </Subscribe>
    </Authorize>
  );
};

export default CharacterSheetWrapper;
