import React, { Component } from "react";
import { Subscribe } from "unstated";
import FiveEContainer from "../containers/FiveEContainer/FiveEContainer";
import CharacterContainer from "../containers/CharacterContainer/CharacterContainer";
import Authorize from "../Authentication/Authorize";
import { Row, Column } from "../common/Markup/Markup";
import Loading from "../Loading/Loading";
import CharInfo from "./CharInfo/CharInfo";
import Abilities from "./Abilities/Abilities";

class CharacterSheetInternal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      write: true
    };
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    console.log("Did mount");
  }

  componentDidUpdate() {
    const context = this.props.context;
    console.log("Did update");
    if (!context.state.newCharNum) {
      const id = this.props.match.params.id;
      context.loadCharacter(parseInt(id));
    }
  }

  update(state) {
    const updateCharacter = this.props.context.updateCharacter;
    const id = this.props.match.params.id;
    updateCharacter(state, id);
  }

  render() {
    console.log("RENDER CharacterSheet");
    const { write } = this.state;
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
