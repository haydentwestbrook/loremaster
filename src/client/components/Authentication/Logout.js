import React from "react";
import { Redirect } from "react-router-dom";
import { Subscribe } from "unstated";
import settings from "../../settings";

const Logout = props => {
  localStorage.removeItem(settings.authToken);
  return <Redirect to="/" />;
};

export default Logout;
