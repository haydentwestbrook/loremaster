import React, { Component } from 'react';
import Input from '../../../common/Input/Input';
import { Row, Column, Collapsible } from '../../../common/Markup/Markup';
import RaceModal from './RaceModal';
import ClassModal from '../ClassModal/ClassModal';

class CharInfo extends Component {
  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
    this.buildClassDisplay = this.buildClassDisplay.bind(this);
    this.buildRaceDisplay = this.buildRaceDisplay.bind(this);
    this.update = this.update.bind(this);
  }

  update(data) {
    const { character, updateCharacter } = this.props;
    const updated = Object.assign(character.info, data);
    updateCharacter(Object.assign(character, updated));
  }

  buildCharacterName(info) {
    return info.name;
  }

  buildClassDisplay(levels) {
    return '';
  }

  buildRaceDisplay(race, subrace) {
    return subrace ? subrace.name : race ? race.name : null;
  }

  render() {
    const { write, character } = this.props;
    const info = character.info;
    return (
      <div className="char-info">
        <Input
          label="Character Name"
          value={info.name}
          write={write}
          onChange={e => this.update({ name: e.target.value })}
        />
        <div className="char-info__edit-input">
          <Input
            label="Class and Level"
            modalId="class-modal"
            value={this.buildClassDisplay(info.levels)}
            write={false}
            onChange={e => {
              return null;
            }}
          />
          <ClassModal info={info} write={write} update={this.update} id="class-modal"/>
        </div>
        <Input
          label="Background"
          value={info.background}
          write={write}
          onChange={e => this.update({ background: e.target.value })}
        />
        <Input
          label="Player Name"
          value={info.playerName}
          write={write}
          onChange={e => this.update({ playerName: e.target.value })}
        />
        <div className="char-info__edit-input">
          <Input
            label="Race"
            modalId="race-modal"
            value={this.buildRaceDisplay(character.race, character.subrace)}
            write={false}
            onChange={e => {
              return null;
            }}
          />
          <RaceModal info={info} write={write} update={this.update} id="race-modal"/>
        </div>
        <Input
          label="Alignment"
          value={info.alignment}
          write={write}
          onChange={e => this.update({ alignment: e.target.value })}
        />
        <Input
          label="Experience"
          value={info.experience}
          write={write}
          onChange={e => this.update({ experience: e.target.value })}
        />
      </div>
    );
  }
}

export default CharInfo;
