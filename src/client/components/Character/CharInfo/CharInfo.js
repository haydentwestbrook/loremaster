import React from 'react';
import Input from '../../../common/Input/Input';

class CharInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.character.state.info;
  }

  updateChar = data => {
    const character = this.props.character;
    const updateCharacter = this.props.character.updateCharacter;
    this.setState(Object.assign(this.state, data));
    updateCharacter(Object.assign(character, this.state));
  };

  render() {
    const { write } = this.props;
    const info = this.props.character.state.info;
    return (
      <div className="row flex-center">
        <div className="col col-6 align-middle">
          <Input
            label="Character Name"
            value={info.name}
            write={write}
            onChange={e => this.updateChar({ name: e.target.value })}
          />
        </div>
        <div className="col col-6">
          <div className="row flex-center">
            <div className="col col-4">
              <Input label="Class and Level" write={write} />
            </div>
            <div className="col col-4">
              <Input label="Background" write={write} />
            </div>
            <div className="col col-4">
              <Input label="Player Name" write={write} />
            </div>
          </div>
          <div className="row flex-center">
            <div className="col col-4">
              <Input label="Race" write={write} />
            </div>
            <div className="col col-4">
              <Input label="Alignment" write={write} />
            </div>
            <div className="col col-4">
              <Input label="Experience" write={write} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CharInfo;
