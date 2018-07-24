import React from "react";
import { Container } from "unstated";
import LocalStorageHelper from "../../helpers/LocalStorageHelper";

class CharacterContainer extends Container {
  constructor(props) {
    super(props);

    this.updateCharacter = this.updateCharacter.bind(this);
    this.loadCharacter = this.loadCharacter.bind(this);
    this.saveCharacter = this.saveCharacter.bind(this);
    this.getKey = this.getKey.bind(this);
    this.loadCharacterList = this.loadCharacterList.bind(this);
    this.getBlankCharacter = this.getBlankCharacter.bind(this);

    this.store = new LocalStorageHelper();
    this.state = {
      list: null,
      character: this.getBlankCharacter()
    };
  }

  getKey() {
    return "LM_1";
  }

  getBlankCharacter() {
    return {
      info: {
        name: "",
        race: null,
        levels: null,
        background: "",
        experience: 0,
        alignment: "",
        playerName: ""
      },
      abilities: {
        Strength: 10,
        Desxterity: 10,
        Constitution: 10,
        Intelligence: 10,
        Wisdom: 10,
        Charisma: 10
      }
    };
  }

  updateCharacter(state, key) {
    this.setState({ character: state }).then(() => this.saveCharacter(key));
  }

  loadCharacter(key) {
    const obj = JSON.parse(this.store.get(key));
    if (obj) this.setState({ character: obj });
  }

  saveCharacter(key) {
    this.store.remove(key);
    this.store.set(key, JSON.stringify(this.state.character));
  }

  loadCharacterList() {
    this.setState({ list: [{ name: "Noruk", id: 0 }] });
  }
}

export default CharacterContainer;
