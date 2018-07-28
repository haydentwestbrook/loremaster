import React from "react";
import { Container } from "unstated";
import settings from "../../../settings";

class AuthContainer extends Container {
  constructor(props) {
    super(props);

    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  isLoggedIn() {
    return localStorage.getItem(settings.authToken) !== null;
  }
}

export default AuthContainer;
