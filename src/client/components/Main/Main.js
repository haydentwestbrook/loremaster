import React from 'react';
import { Provider } from 'unstated';
import CharacterSheet from '../CharacterSheet/CharacterSheet';
import Lookup from '../Lookup/Lookup';
import CharacterContainer from '../containers/CharacterContainer/CharacterContainer';
import FiveEContainer from '../containers/FiveEContainer/FiveEContainer';

const Main = () => {
  return (
    <div className="main">
      <h1>Lore Master</h1>
      <Provider inject={[CharacterContainer, FiveEContainer]}>
        <CharacterSheet />
        <Lookup />
      </Provider>
    </div>
  );
};

export default Main;
