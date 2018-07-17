import React from 'react';
import { Container } from 'unstated';

const urlBase = 'http://www.dnd5eapi.co/api/';

class FiveEContainer extends Container {
  constructor(props) {
    super(props);

    this.callApi = this.callApi.bind(this);
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

  callApi(url) {
    this.setState({ fetching: true, data: null });
    fetch(url).then(res => {
      res.json().then(res => {
        this.setState({ fetching: false, data: res });
      }, this.handleApiError);
    }, this.handleApiError);
  }

  handleApiError() {
    console.log('Api call failed');
  }

  get(urlObj) {
    this.callApi(this.buildUrl(urlObj));
  }
}

export default FiveEContainer;
