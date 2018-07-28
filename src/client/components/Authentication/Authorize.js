import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Subscribe } from "unstated";
import AuthContainer from "./AuthContainer/AuthContainer";

const Authorize = props => {
  const fallback = props.redirect ? <Redirect to="/" /> : null;

  return (
    <Subscribe to={[AuthContainer]}>
      {auth => (auth.isLoggedIn() ? props.children : fallback)}
    </Subscribe>
  );
};

export default Authorize;
