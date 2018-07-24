import React, { Component } from 'react';
import { Subscribe } from 'unstated';
import FiveEContainer from '../containers/FiveEContainer/FiveEContainer';
import CharacterContainer from '../containers/CharacterContainer/CharacterContainer';
import { Row, Column } from '../common/Markup/Markup';
import Loading from '../Loading/Loading';
import CharInfo from './CharInfo/CharInfo';
import Attributes from './Attributes/Attributes';

class CharacterSheetInternal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      write: true
    };
  }

  didComponentMount() {
    this.props.context.loadCharacter();
  }

  render() {
    const { write } = this.state;
    if (!props.context) return <Loading />;
    const character = this.props.context.state;
    return (
      <div className="character">
        // <CharInfo character={character} write={write} />
        <Row>
          // <Attributes character={character} write={write} />
        </Row>
      </div>
    );
  }
}

const CharacterSheetWrapper = props => {
  console.log('test');
  return (
    <Subscribe to={[CharacterContainer]}>
      {context => {
        <CharacterSheetInternal {...props} context={context} />;
      }}
    </Subscribe>
  );
};

export default CharacterSheetWrapper;
