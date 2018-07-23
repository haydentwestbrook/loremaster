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

    this.store = new LocalStorageHelper();
    const char = this.loadCharacter();
    if (char) {
      this.state = char;
    } else {
      this.state = {
        info: {
          name: "Noruk",
          background: "",
          experience: 0,
          aligntment: "",
          race: null,
          levels: {}
        },
        attributes: {
          Strength: 10,
          Dexterity: 10,
          Constitution: 10,
          Intelligence: 10,
          Wisdom: 10,
          Charisma: 10
        }
      };
    }
    this.saveCharacter();
  }

  getKey() {
    return "LM_1";
  }

  updateCharacter(state) {
    this.setState(state).then(this.saveCharacter);
  }

  loadCharacter() {
    const key = this.getKey();
    const obj = JSON.parse(this.store.get(key));
    this.setState(obj);
  }

  saveCharacter() {
    const key = this.getKey();
    this.store.remove(key);
    this.store.set(key, JSON.stringify(this.state));
  }
}

export default CharacterContainer;
