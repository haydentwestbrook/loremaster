import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'unstated';
import Main from './components/Main/Main';
import Loading from './components/Loading/Loading';
import CharacterSheet from './components/CharacterSheet/CharacterSheet';
import Lookup from './components/Lookup/Lookup';
import Navbar from './components/Navbar/Navbar';
import CharacterContainer from './components/containers/CharacterContainer/CharacterContainer';
import FiveEContainer from './components/containers/FiveEContainer/FiveEContainer';

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
    const containers = [CharacterContainer, FiveEContainer];
    return (
      <div className="app">
        <Navbar />
        <Provider inject={containers}>
          {loaded ? this.props.children : <Loading />}
        </Provider>
      </div>
    );
  }
}
