import React, { Component } from 'react';
import Input from '../../../common/Input/Input';

class CharInfo extends Component {
  constructor(props) {
    super(props);

    this.updateChar = this.updateChar.bind(this);
    this.buildClassDisplay = this.buildClassDisplay.bind(this);
    this.buildRaceDisplay = this.buildRaceDisplay.bind(this);
  }

  updateChar(data) {
    const character = this.props.character.state;
    const updateCharacter = this.props.character.updateCharacter;
    const updated = Object.assign(character.info, data);
    this.setState(updated);
    updateCharacter(Object.assign(character, updated));
  }

  buildClassDisplay(levels) {
    return '';
  }

  buildRaceDisplay(race) {
    return '';
  }

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
              <Input
                label="Class and Level"
                value={this.buildClassDisplay(info.levels)}
                write={false}
                onChange={e => {
                  return null;
                }}
              />
            </div>
            <div className="col col-4">
              <Input
                label="Background"
                value={info.background}
                write={write}
                onChange={e => this.updateChar({ background: e.target.value })}
              />
            </div>
            <div className="col col-4">
              <Input
                label="Player Name"
                value={info.playerName}
                write={write}
                onChange={e => this.updateChar({ playerName: e.target.value })}
              />
            </div>
          </div>
          <div className="row flex-center">
            <div className="col col-4">
              <Input
                label="Race/Template"
                value={this.buildRaceDisplay(info.race)}
                write={false}
                onChange={e => {
                  return null;
                }}
              />
            </div>
            <div className="col col-4">
              <Input
                label="Alignment"
                value={info.Alignment}
                write={write}
                onChange={e => this.updateChar({ alignment: e.target.value })}
              />
            </div>
            <div className="col col-4">
              <Input
                label="Experience"
                value={info.experience}
                write={write}
                onChange={e => this.updateChar({ experience: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CharInfo;
