import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {createBrowserHistory} from 'history';
import { Provider } from 'unstated';
import Main from './components/Main/Main';
import Loading from './components/Loading/Loading';
import CharacterSheet from './components/CharacterSheet/CharacterSheet';
import Lookup from './components/Lookup/Lookup';
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
        <nav className="border split-nav">
          <div className="nav-brand">
            <h3>
              <Link to="/">LoreMaster</Link>
            </h3>
          </div>
          <div class="collapsible">
            <input id="collapsible1" type="checkbox" name="collapsible1" />
            <button>
            <label for="collapsible1">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
              </label>
            </button>
            <div class="collapsible-body">
              <ul class="inline">
                <li><Link to="/character">Character</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <Provider inject={containers}>
          {loaded ? this.props.children : (<Loading />)}
        </Provider>
      </div>
    );
  }
}
