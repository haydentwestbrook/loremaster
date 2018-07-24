import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="border split-nav">
        <div className="nav-brand">
          <h3>
            <Link to="/">LoreMaster</Link>
          </h3>
        </div>
        <div className="collapsible">
          <input id="collapsible-nav" type="checkbox" name="collapsible-nav" />
          <button>
            <label htmlFor="collapsible-nav">
              <div className="bar1" />
              <div className="bar2" />
              <div className="bar3" />
            </label>
          </button>
          <div className="collapsible-body">
            <ul className="inline">
              <li>
                <Link to="/characters">Characters</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
