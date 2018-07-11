import React from 'react';
import { Container } from 'unstated';

const urlBase = '';

type FiveEContainerType = {
  data: object
};

class FiveEContainer extends Container<FiveEContainerType> {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  buildUrl(id) {
    return '';
  }

  callApi(url) {
    fetch(url).then(res => {
      res.json().then(res => {
        this.setState({ data: res });
      }, handleApiError);
    }, handleApiError);
  }

  handleApiError() {
    console.log('Api call failed');
  }

  get(id) {
    callApi(buildUrl(1));
  }
}

export default FiveEContainer;
