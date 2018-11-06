import { EventEmitter } from 'events';
import dispatcher from './dispatcher';
import LocalStorageHelper from '../helpers/LocalStorageHelper';
import settings from '../../settings';
import mockCharacter from '../../mocks/mockCharacter';

class NewCharacterStore extends EventEmitter {
  constructor() {
    super();
    this.index = null;
  }

  getNewIndex = () => {
    return this.index;
  };

  newCharacter = () => {
    const token = localStorage.getItem(settings.authToken);
    fetch(settings.apiUrl + '/characters/new', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ token: token })
    })
      .then(res => {
        res.json().then(res => {
          this.index = res.character.index;
          this.emit('loaded');
        });
      })
      .catch(error => console.log(error));
  };

  handleActions = action => {
    switch (action.type) {
      case 'NEW_CHARACTER': {
        this.newCharacter(action.character);
        break;
      }
    }
  };
}

const newCharacterStore = new NewCharacterStore();
dispatcher.register(newCharacterStore.handleActions.bind(newCharacterStore));

export default newCharacterStore;
