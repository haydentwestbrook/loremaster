import { Dispatcher } from 'flux';

export const dispatcher = new Dispatcher();

export function loadCharacterList() {
  dispatcher.dispatch({
    type: 'LOAD_CHARACTER_LIST'
  });
}

export function newCharacter() {
  dispatcher.dispatch({
    type: 'NEW_CHARACTER'
  });
}

export const characterActions = {
  updateCharacter: character => {
    dispatcher.dispatch({
      type: 'UPDATE_CHARACTER',
      character: character
    });
  },

  loadCharacter: index => {
    dispatcher.dispatch({
      type: 'LOAD_CHARACTER',
      index: index
    });
  },

  saveCharacter: (index, character) => {
    dispatcher.dispatch({
      type: 'SAVE_CHARACTER',
      index: index,
      character: character
    });
  },

  deleteCharacter: index => {
    dispatcher.dispatch({
      type: 'DELETE_CHARACTER',
      index: index
    });
  }
};

export const fiveEActions = {
  getFiveEDataWithUrl: url => {
    dispatcher.dispatch({
      type: 'GET_FIVE_E_WITH_URL',
      url: url
    });
  },

  getFiveEDataWithObj: data => {
    dispatcher.dispatch({
      type: 'GET_FIVE_E_WITH_OBJ',
      data: data
    });
  }
};

export const modalActions = {
  openModal: modalId => {
    dispatcher.dispatch({
      type: 'OPEN_MODAL',
      id: modalId
    });
  },
  closeModal: () => {
    dispatcher.dispatch({
      type: 'CLOSE_MODAL'
    });
  }
};
