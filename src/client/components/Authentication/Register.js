import React from 'react';
import settings from '../../settings';
import Alert from '../common/Alert/Alert';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      passwordRepeat: '',
      success: false,
      message: false,
      loading: false
    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changePasswordRepeat = this.changePasswordRepeat.bind(this);
    this.validate = this.validate.bind(this);
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

  validate() {
    const { username, password, passwordRepeat } = this.state;
    if (password == passwordRepeat) {
      return true;
    }
    this.setState({ success: false, message: 'Passwords must match.' });
    return false;
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
      this.setState({ loading: true });
      fetch(settings.apiUrl + '/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(this.state)
      }).then(res => {
        this.setState({ loading: false });
        res
          .json()
          .then(res => {
            this.setState(res);
          })
          .catch(error => console.log(error));
      });
    }
  }

  render() {
    const {
      username,
      password,
      passwordRepeat,
      message,
      success,
      loading
    } = this.state;
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
              className="input-text"
              type="text"
              name="username"
              onChange={e => this.changeUsername(e)}
              value={username}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="input-text"
              type="password"
              name="password"
              onChange={e => this.changePassword(e)}
              value={password}
            />
          </div>
          <div className="form-group">
            <label>Repeat password</label>
            <input
              className="input-text"
              type="password"
              name="password-repeat"
              onChange={e => this.changePasswordRepeat(e)}
              value={passwordRepeat}
            />
          </div>
          <div className="form-group">
            <input
              className="btn paper-btn btn-secondary"
              type="submit"
              name="submit"
              value={loading ? 'Loading...' : 'Submit'}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
