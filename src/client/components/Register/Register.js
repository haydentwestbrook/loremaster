import React from "react";

const Register = () => {
  const onSubmit = event => {
    event.preventDefault();
    console.log("register");
  };

  return (
    <div className="register" action="/register">
      <form
        onSubmit={event => {
          onSubmit(event);
        }}
      >
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <div className="form-group">
          <label>Repeat password</label>
          <input type="password" name="password-repeat" />
        </div>
        <div className="form-group">
          <input type="submit" name="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Register;
