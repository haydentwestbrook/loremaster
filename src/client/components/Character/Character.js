import React from 'react';
import { Subscribe } from 'unstated';
import FiveEContainer from '../FiveEContainer/FiveEContainer';
import CharacterContainer from '../CharacterContainer/CharacterContainer';
import CharInfo from './CharInfo/CharInfo';

const Character = props => {
  return (
    <Subscribe to={[FiveEContainer, CharacterContainer]}>
      {(api, character) => (
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
