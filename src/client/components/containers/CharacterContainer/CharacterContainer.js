import React from 'react';
import { Container } from 'unstated';

class CharacterContainer extends Container {
  constructor(props) {
    super(props);

    this.state = {
      info: {
        name: 'Noruk',
        background: '',
        experience: 0,
        aligntment: '',
        race: null,
        levels: {}
      }
    };

    this.updateCharacter = this.updateCharacter.bind(this);
  }

  updateCharacter(state) {
    this.setState(state);
  }
}

export default CharacterContainer;
