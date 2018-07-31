import React from "react";
import { Container } from "unstated";
import LocalStorageHelper from "../../helpers/LocalStorageHelper";
import settings from "../../../settings";

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
      character: null,
      newCharNum: null
    };
  }

  getKey() {
    return "LM_1";
  }

  getNewCharacter() {
    const { id, token } = JSON.parse(localStorage.getItem(settings.authToken));
    fetch(settings.apiUrl + "/characters/new", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ userId: id, token: token })
    })
      .then(res => {
        res.json().then(res =>
          this.setState({
            newCharNum: res.character.num,
            character: JSON.parse(res.character.data)
          })
        );
      })
      .catch(error => console.log(error));
  }

  updateCharacter(state, key) {
    this.setState({ character: state }).then(() => this.saveCharacter(key));
  }

  loadCharacter(charNum) {
    const { id, token } = JSON.parse(localStorage.getItem(settings.authToken));
    fetch(settings.apiUrl + "/characters/get", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ userId: id, token: token, charNum: charNum })
    })
      .then(res =>
        res.json().then(res => {
          console.log(res);
          this.setState({
            character: JSON.parse(res.data),
            charNum: null
          });
        })
      )
      .catch(error => console.log(error));
  }

  loadCharacterList() {
    const { id, token } = JSON.parse(localStorage.getItem(settings.authToken));
    fetch(settings.apiUrl + "/characters/get", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ userId: id, token: token, charNum: "all" })
    })
      .then(res => res.json().then(res => this.setState({ list: res })))
      .catch(error => console.log(error));
  }

  saveCharacter(charNum, data) {
    const { id, token } = JSON.parse(localStorage.getItem(settings.authToken));
    fetch(settings.apiUrl + "/characters/save", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        userId: id,
        token: token,
        charNum: charNum,
        data: data
      })
    }).catch(error => console.log(error));
  }
}

export default CharacterContainer;
