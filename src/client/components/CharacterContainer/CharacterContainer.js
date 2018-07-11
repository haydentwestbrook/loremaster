import React from 'react';
import { Container } from 'unstated';

type CharacterContainerType = {
  character: object
};

class CharacterContainer extends Container<CharacterContainerType> {
  constructor(props) {
    super(props);

    character = {
      info: {
        name: 'Noruk'
      }
    };
  }

  updateCharacter(state) {
    character = state;
  }
}

export default CharacterContainer;
