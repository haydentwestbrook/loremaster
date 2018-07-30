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
    this.getNewCharacter = this.getNewCharacter.bind(this);

    this.store = new LocalStorageHelper();
    this.state = {
      list: null,
      character: this.getNewCharacter()
    };
  }

  getKey() {
    return "LM_1";
  }

  getNewCharacter() {
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
    fetch("/getCharacter", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: { userId: userId, token: token }
    })
      .then(res => res.json().then(res => this.setState(res.character)))
      .catch(error => console.log(error));
  }

  saveCharacter(key) {
    this.store.remove(key);
    this.store.set(key, JSON.stringify(this.state.character));
  }

  loadCharacterList(userId, token) {
    fetch("/getCharacters", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: { userId: userId, token: token }
    })
      .then(res => res.json().then(res => this.setState(res.characters)))
      .catch(error => console.log(error));
  }
}

export default CharacterContainer;
