import dispatcher from './dispatcher';

export function updateCharacter(character) {
  dispatcher.dispatch({
    type: 'UPDATE_CHARACTER',
    character: character
  });
}

export function loadCharacter(index) {
  dispatcher.dispatch({
    type: 'LOAD_CHARACTER',
    index: index
  });
}

export function saveCharacter(index, character) {
  dispatcher.dispatch({
    type: 'SAVE_CHARACTER',
    index: index,
    character: character
  });
}

export function deleteCharacter(index) {
  dispatcher.dispatch({
    type: 'DELETE_CHARACTER',
    index: index
  });
}

export function newCharacter() {
  dispatcher.dispatch({
    type: 'NEW_CHARACTER'
  });
}

export function loadCharacterList() {
  dispatcher.dispatch({
    type: 'LOAD_CHARACTER_LIST'
  });
}
