import React from 'react';
import { Provider } from 'unstated';
import CharacterSheet from '../CharacterSheet/CharacterSheet';
import Lookup from '../Lookup/Lookup';
import CharacterContainer from '../containers/CharacterContainer/CharacterContainer';
import FiveEContainer from '../containers/FiveEContainer/FiveEContainer';
import { Row, Column as Col } from '../common/Markup/Markup';

const Main = () => {
  const containers = [CharacterContainer, FiveEContainer];
  return (
    <div className="main">
      <nav className="border">
        <div className="nav-brand">
          <h3>
            <a href="/">LoreMaster</a>
          </h3>
        </div>
      </nav>
      <Provider inject={containers}>
        <CharacterSheet />
        <Lookup />
      </Provider>
    </div>
  );
};

export default Main;
