import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Main from './components/Main/Main';
import Loading from './components/Loading/Loading';
import CharacterSheet from './components/Character/CharacterSheet/CharacterSheet';
import Lookup from './components/Lookup/Lookup';
import Navbar from './components/Navbar/Navbar';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: true };
  }

  render() {
    const { loaded } = this.state;
    return (
      <div className="app">
        <Navbar />
        <div className="main">{loaded ? this.props.children : <Loading />}</div>
      </div>
    );
  }
}
