import React from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";

const Main = () => {
  return (
    <div className="main">
      <h1>Login</h1>
      <Login />
      <h1>Or register</h1>
      <Register />
    </div>
  );
};

export default Main;
