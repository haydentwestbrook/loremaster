import React from 'react';
import { Container } from 'unstated';
import LocalStorageHelper from '../../helpers/LocalStorageHelper';

class CharacterContainer extends Container {
  constructor(props) {
    super(props);

    this.updateCharacter = this.updateCharacter.bind(this);
    this.loadCharacter = this.loadCharacter.bind(this);
    this.saveCharacter = this.saveCharacter.bind(this);
    this.getKey = this.getKey.bind(this);
    this.loadCharacterList = this.loadCharacterList.bind(this);

    this.store = new LocalStorageHelper();
    this.state = null;
  }

  getKey() {
    return 'LM_1';
  }

  updateCharacter(state) {
    this.setState(state).then(this.saveCharacter);
  }

  loadCharacter(key) {
    const obj = JSON.parse(this.store.get(key));
    this.setState(obj);
  }

  saveCharacter(key) {
    this.store.remove(key);
    this.store.set(key, JSON.stringify(this.state));
  }

  loadCharacterList() {
    this.setState({ list: [{ key: 'LM_1', name: 'Noruk', id: 0 }] });
  }
}

export default CharacterContainer;
