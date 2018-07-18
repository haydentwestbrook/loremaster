import React from 'react';
import { Container } from 'unstated';
import LocalStorageHelper from '../../helpers/LocalStorageHelper';

class CharacterContainer extends Container {
  constructor(props) {
    super(props);

    this.updateCharacter = this.updateCharacter.bind(this);
    this.loadCharacter = this.loadCharacter.bind(this);
    this.saveCharacter = this.saveCharacter.bind(this);

    this.store = new LocalStorageHelper();
    const char = this.store.get('LM_1');
    if (char) {
      this.state = char;
    } else {
      this.state = {
        key: 'LM_1',
        info: {
          name: 'Noruk',
          background: '',
          experience: 0,
          aligntment: '',
          race: null,
          levels: {}
        }
      };
    }
    this.saveCharacter();
    //window.setInterval(this.saveCharacter, 3000);
  }

  updateCharacter(state) {
    this.setState(state).then(this.saveCharacter);
  }

  loadCharacter() {
    const key = this.state.key;
    this.setState(JSON.parse(this.store.get(key)));
  }

  saveCharacter() {
    console.log('saving');
    const key = this.state.key;
    this.store.remove(key);
    this.store.set(key, JSON.stringify(this.state));
  }
}

export default CharacterContainer;
