import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "unstated";
import AuthContainer from "./components/containers/AuthContainer/AuthContainer";
import App from "./App";
import Main from "./components/Main/Main";
import CharacterList from "./components/CharacterList/CharacterList";
import CharacterSheet from "./components/CharacterSheet/CharacterSheet";
import "./styles/css/index.css";

ReactDOM.render(
  <Router>
    <Provider inject={[AuthContainer]}>
      <App>
        <Route exact path="/" component={Main} />
        <Route exact path="/characters" component={CharacterList} />
        <Route path="/characters/:id" component={CharacterSheet} />
      </App>
    </Provider>
  </Router>,
  document.getElementById("root")
);
