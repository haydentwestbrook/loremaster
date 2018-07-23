import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./App";
import Main from "./components/Main/Main";
import CharacterList from "./components/CharacterList/CharacterList";
import CharacterSheet from "./components/CharacterSheet/CharacterSheet";
import "./styles/css/index.css";

ReactDOM.render(
  <Router>
    <App>
      <Route exact={true} path="/" component={Main} />
      <Route path="/characters" component={CharacterList} />
      <Route path="/characters/:id" component={CharacterSheet} />
    </App>
  </Router>,
  document.getElementById("root")
);
