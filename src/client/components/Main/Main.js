import React from "react";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";

const Main = () => {
  return (
    <div className="splash">
      <h1>Login</h1>
      <Login />
      <h1>Or register</h1>
      <Register />
    </div>
  );
};

export default Main;
