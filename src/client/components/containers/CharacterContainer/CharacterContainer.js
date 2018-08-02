import React from 'react';
import { Container } from 'unstated';
import LocalStorageHelper from '../../helpers/LocalStorageHelper';
import settings from '../../../settings';
import mockCharacter from '../../../mocks/mockCharacter';

class CharacterContainer extends Container {
  constructor(props) {
    super(props);

    this.updateCharacter = this.updateCharacter.bind(this);
    this.loadCharacter = this.loadCharacter.bind(this);
    this.saveCharacter = this.saveCharacter.bind(this);
    this.loadCharacterList = this.loadCharacterList.bind(this);
    this.getNewCharacter = this.getNewCharacter.bind(this);

    this.state = {
      list: null,
      character: null,
      newIndex: null
    };
  }

  getNewCharacter() {
    const token = localStorage.getItem(settings.authToken);
    fetch(settings.apiUrl + '/characters/new', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ token: token })
    })
      .then(res => {
        res.json().then(res =>
          this.setState({
            newIndex: res.character.index,
            character: JSON.parse(res.character.data)
          })
        );
      })
      .catch(error => console.log(error));
  }

  updateCharacter(state, index) {
    this.setState({ character: state }).then(() =>
      this.saveCharacter(index, state)
    );
  }

  loadCharacter(index) {
    if (settings.debug)
      return this.setState({ character: mockCharacter, newIndex: null });
    const token = localStorage.getItem(settings.authToken);
    fetch(settings.apiUrl + '/characters/get', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ token: token, index: index })
    })
      .then(res =>
        res.json().then(res =>
          this.setState({
            character: JSON.parse(res.data),
            newIndex: null
          })
        )
      )
      .catch(error => console.log(error));
  }

  loadCharacterList() {
    const token = localStorage.getItem(settings.authToken);
    fetch(settings.apiUrl + '/characters/get', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ token: token, index: 'all' })
    })
      .then(res => res.json().then(res => this.setState({ list: res })))
      .catch(error => console.log(error));
  }

  saveCharacter(index, data) {
    const token = localStorage.getItem(settings.authToken);
    fetch(settings.apiUrl + '/characters/save', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        token: token,
        index: index,
        data: data
      })
    }).catch(error => console.log(error));
  }

  deleteCharacter(index) {
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
  }
}

export default CharacterContainer;
