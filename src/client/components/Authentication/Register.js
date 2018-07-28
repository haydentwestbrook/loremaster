import React from "react";
import Alert from "../common/Alert/Alert";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      passwordRepeat: "",
      success: false,
      message: false
    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changePasswordRepeat = this.changePasswordRepeat.bind(this);
  }

  changeUsername(event) {
    this.setState({ username: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  changePasswordRepeat(event) {
    this.setState({ passwordRepeat: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    fetch("/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(this.state)
    }).then(res =>
      res
        .json()
        .then(res => {
          this.setState(res);
        })
        .catch(error => console.log(error))
    );
  }

  render() {
    const { username, password, passwordRepeat, message, success } = this.state;
    return (
      <div className="register">
        <form
          onSubmit={e => {
            this.onSubmit(e);
          }}
        >
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
            <label>Repeat password</label>
            <input
              type="password"
              name="password-repeat"
              onChange={e => this.changePasswordRepeat(e)}
              value={passwordRepeat}
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

export default Register;