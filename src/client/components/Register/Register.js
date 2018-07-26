import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      passwordRepeat: ""
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
    return (
      <div className="register">
        <form
          onSubmit={e => {
            this.onSubmit(e);
          }}
        >
          {this.state.message ? (
            <div
              className={
                "alert " +
                (this.state.success ? "alert-success" : "alert-danger")
              }
            >
              {this.state.message}
            </div>
          ) : null}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={e => this.changeUsername(e)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={e => this.changePassword(e)}
            />
          </div>
          <div className="form-group">
            <label>Repeat password</label>
            <input
              type="password"
              name="password-repeat"
              onChange={e => this.changePasswordRepeat(e)}
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
