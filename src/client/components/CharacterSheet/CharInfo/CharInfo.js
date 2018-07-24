import React, { Component } from "react";
import Input from "../../common/Input/Input";
import { Row, Column, Collapsible } from "../../common/Markup/Markup";

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

  buildClassDisplay(levels) {
    return "";
  }

  buildRaceDisplay(race) {
    return "";
  }

  render() {
    const { write, character } = this.props;
    const info = character.info;
    return (
      <Row>
        <Collapsible label="Info" id="collapsible1" checked="true">
          <Row classes="flex-center">
            <Column lg="6" sm="12" classes={"align-middle"}>
              <Input
                label="Character Name"
                value={info.name}
                write={write}
                onChange={e => this.update({ name: e.target.value })}
              />
            </Column>
            <Column lg="6" sm="12">
              <Row classes="flex-center">
                <Column lg="4">
                  <Input
                    label="Class and Level"
                    value={this.buildClassDisplay(info.levels)}
                    write={false}
                    onChange={e => {
                      return null;
                    }}
                  />
                </Column>
                <Column lg="4">
                  <Input
                    label="Background"
                    value={info.background}
                    write={write}
                    onChange={e => this.update({ background: e.target.value })}
                  />
                </Column>
                <Column lg="4">
                  <Input
                    label="Player Name"
                    value={info.playerName}
                    write={write}
                    onChange={e => this.update({ playerName: e.target.value })}
                  />
                </Column>
              </Row>
              <Row classes="flex-center">
                <Column lg="4">
                  <Input
                    label="Race"
                    value={this.buildRaceDisplay(info.race)}
                    write={false}
                    onChange={e => {
                      return null;
                    }}
                  />
                </Column>
                <Column lg="4">
                  <Input
                    label="Alignment"
                    value={info.alignment}
                    write={write}
                    onChange={e => this.update({ alignment: e.target.value })}
                  />
                </Column>
                <Column lg="4">
                  <Input
                    label="Experience"
                    value={info.experience}
                    write={write}
                    onChange={e => this.update({ experience: e.target.value })}
                  />
                </Column>
              </Row>
            </Column>
          </Row>
        </Collapsible>
      </Row>
    );
  }
}

export default CharInfo;
