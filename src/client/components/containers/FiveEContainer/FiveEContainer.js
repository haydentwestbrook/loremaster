import React from 'react';
import { Container } from 'unstated';

const urlBase = 'http://www.dnd5eapi.co/api/';

class FiveEContainer extends Container {
  constructor(props) {
    super(props);

    this.get = this.get.bind(this);
    this.buildUrl = this.buildUrl.bind(this);
    this.handleApiError = this.handleApiError.bind(this);

    this.state = {
      data: null,
      fetching: false
    };
  }

  buildUrl(urlObj) {
    const { section, index, name } = urlObj;
    let url = urlBase + section + '/';
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

  get(urlObj) {
    return new Promise((resolve, reject) => {
      this.setState({ fetching: true });
      fetch(this.buildUrl(urlObj)).then(res => {
        res.json().then(res => {
          this.setState({ fetching: false });
          resolve(res);
        }, this.handleApiError);
      }, this.handleApiError);
    });
  }
}

export default FiveEContainer;
