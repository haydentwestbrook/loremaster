import { EventEmitter } from 'events';
import dispatcher from './dispatcher';
import LocalStorageHelper from '../helpers/LocalStorageHelper';
import settings from '../../settings';
import mockCharacter from '../../mocks/mockCharacter';

class CharacterStore extends EventEmitter {
  constructor() {
    super();
    this.character = mockCharacter;
    this.index = null;
  }

  get = () => {
    return this.character;
  };

  updateCharacter = character => {
    this.character = character;
    this.emit('update');
  };

  loadCharacter = index => {
    this.index = index;
    const token = localStorage.getItem(settings.authToken);
    fetch(settings.apiUrl + '/characters/get', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ token: token, index: index })
    })
      .then(res =>
        res.json().then(res => {
          this.character = JSON.parse(res.data);
          this.emit('update');
        })
      )
      .catch(error => {
        console.log(error);
        this.emit('error');
      });
  };

  saveCharacter = (index, character) => {
    const token = localStorage.getItem(settings.authToken);
    fetch(settings.apiUrl + '/characters/save', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        token: token,
        index: index,
        data: character
      })
    }).catch(error => console.log(error));
  };

  deleteCharacter = index => {
    const token = localStorage.getItem(settings.authToken);
    fetch(settings.apiUrl + '/characters/delete', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        token: token,
        index: index
      })
    }).catch(error => console.log(error));
  };

  handleActions = action => {
    switch (action.type) {
      case 'UPDATE_CHARACTER': {
        this.updateCharacter(action.character);
        break;
      }
      case 'LOAD_CHARACTER': {
        this.loadCharacter(action.index);
        break;
      }
      case 'SAVE_CHARACTER': {
        this.saveCharacter(action.index, action.character);
        break;
      }
      case 'DELETE_CHARACTER': {
        this.deleteCharacter(action.index);
        break;
      }
    }
  };
}

const characterStore = new CharacterStore();
dispatcher.register(characterStore.handleActions.bind(characterStore));

export default characterStore;
