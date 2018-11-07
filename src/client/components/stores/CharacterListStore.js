import { EventEmitter } from 'events';
import { dispatcher } from './actions';
import LocalStorageHelper from '../helpers/LocalStorageHelper';
import settings from '../../settings';
import mockCharacter from '../../mocks/mockCharacter';

class CharacterListStore extends EventEmitter {
  constructor() {
    super();
    this.characters = [];
  }

  get = () => {
    return this.characters;
  };

  loadCharacterList = () => {
    const token = localStorage.getItem(settings.authToken);
    fetch(settings.apiUrl + '/characters/get', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ token: token, index: 'all' })
    })
      .then(res =>
        res.json().then(res => {
          this.characters = res;
          this.emit('update');
        })
      )
      .catch(error => console.log(error));
  };

  deleteCharacter = index => {};

  handleActions = action => {
    switch (action.type) {
      case 'LOAD_CHARACTER_LIST': {
        this.loadCharacterList();
        break;
      }
      case 'DELETE_CHARACTER': {
        this.deleteCharacter(action.index);
        break;
      }
    }
  };
}

const characterListStore = new CharacterListStore();
dispatcher.register(characterListStore.handleActions.bind(characterListStore));

export default characterListStore;
