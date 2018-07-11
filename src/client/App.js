import React, { Component, Fragment } from 'react';
import Main from './components/Main/Main';
import Loading from './components/Loading/Loading';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(data => this.setState({ loaded: true }));
  }

  render() {
    const { loaded } = this.state;
    return (
      <React.Fragment>
        {loaded ? <Main /> : null}
        <Loading loaded={loaded} />
      </React.Fragment>
    );
  }
}
