import { EventEmitter } from 'events';
import { dispatcher } from './actions';
import settings from '../../settings';

class FiveEStore extends EventEmitter {
  constructor() {
    super();

    this.urlBase = 'http://www.dnd5eapi.co/api/';
  }

  get(urlObj) {
    return new Promise((resolve, reject) => {
      fetch(this.buildUrl(urlObj)).then(res => {
        res.json().then(res => {
          resolve(res);
        }, this.handleApiError);
      }, this.handleApiError);
    });
  }

  getWithUrl(url) {
    return new Promise((resolve, reject) => {
      fetch(url).then(res => {
        res.json().then(res => {
          resolve(res);
        }, this.handleApiError);
      }, this.handleApiError);
    });
  }

  handleActions(action) {
    switch (action.type) {
      case 'GET_FIVE_E_WITH_URL': {
        getWithUrl(action.url);
        break;
      }
      case 'GET_FIVE_E_WITH_OBJ': {
        get(action.data);
        break;
      }
    }
  }

  buildUrl(urlObj) {
    const { section, index, name } = urlObj;
    let url = this.urlBase + section + '/';
    if (name) {
      url = url + '?name=' + name;
    } else if (index) {
      url = url + index;
    }
    return url;
  }

  handleApiError() {
    console.log('Api call failed');
  }
}

const fiveEStore = new FiveEStore();
dispatcher.register(fiveEStore.handleActions.bind(fiveEStore));

export default fiveEStore;
