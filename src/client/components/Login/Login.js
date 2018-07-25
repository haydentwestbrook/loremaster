import React from "react";

const Login = () => {
  return (
    <div className="login">
      <form method="post">
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <div className="form-group">
          <input type="submit" name="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
