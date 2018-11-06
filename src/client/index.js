import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import Main from './components/Main/Main';
import Logout from './components/Authentication/Logout';
import CharacterList from './components/Character/CharacterList/CharacterList';
import CharacterSheet from './components/Character/CharacterSheet/CharacterSheet';
import NewCharacter from './components/Character/NewCharacter/NewCharacter';
import DeleteCharacter from './components/Character/DeleteCharacter/DeleteCharacter';
import './styles/css/index.css';

ReactDOM.render(
  <Router>
    <App>
      <Route exact path="/" component={Main} />
      <Route exact path="/characters" component={CharacterList} />
      <Route path="/characters/get/:index" component={CharacterSheet} />
      <Route path="/characters/new" component={NewCharacter} />
      <Route path="/characters/delete/:index" component={DeleteCharacter} />
      <Route exact path="/logout" component={Logout} />
    </App>
  </Router>,
  document.getElementById('root')
);
