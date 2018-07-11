import React from 'react';
import { Provider } from 'unstated';
import Character from '../Character/Character';

const Main = () => {
  return (
    <div className="main">
      <h1>Lore Master</h1>
      <Provider>
        <Character />
      </Provider>
    </div>
  );
};

export default Main;
