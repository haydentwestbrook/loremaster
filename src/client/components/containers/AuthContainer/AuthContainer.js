import React from "react";
import { Container } from "unstated";

class AuthContainer extends Container {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(token) {}
}
