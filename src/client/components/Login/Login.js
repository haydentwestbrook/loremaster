import React from "react";
import Alert from "../common/Alert/Alert";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      success: false,
      message: false
    };
  }

  changeUsername(e) {
    this.setState({ username: e.target.value });
  }

  changePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit = event => {
    const { handleLogin } = this.props;
    event.preventDefault();
    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(this.state)
    }).then(res =>
      res
        .json()
        .then(res => {
          if (res.success && res.token) handleLogin(res.token);
          else this.setState(res);
        })
        .catch(error => console.log(error))
    );
  };

  render() {
    const { username, password, message, success } = this.state;
    return (
      <div className="login">
        <form onSubmit={e => this.onSubmit(e)}>
          <Alert show={message} success={success} message={message} />
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={e => this.changeUsername(e)}
              value={username}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={e => this.changePassword(e)}
              value={password}
            />
          </div>
          <div className="form-group">
            <input type="submit" name="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
