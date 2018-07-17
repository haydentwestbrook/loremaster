import React from 'react';
import { Subscribe } from 'unstated';
import FiveEContainer from '../containers/FiveEContainer/FiveEContainer';
import CharacterContainer from '../containers/CharacterContainer/CharacterContainer';
import CharInfo from './CharInfo/CharInfo';

const Character = props => {
  return (
    <Subscribe to={[CharacterContainer]}>
      {character => (
        <div className="character">
          <CharInfo
            character={character}
            write={true}
            updateChar={character.updateChar}
          />
        </div>
      )}
    </Subscribe>
  );
};

export default Character;
