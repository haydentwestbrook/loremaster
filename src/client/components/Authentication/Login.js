import React from 'react';
import { Redirect } from 'react-router-dom';
import Alert from '../common/Alert/Alert';
import settings from '../../settings';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.state = {
      username: '',
      password: '',
      success: false,
      message: false,
      loggedIn: false,
      loading: false
    };
  }

  changeUsername(e) {
    this.setState({ username: e.target.value });
  }

  changePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit = (event, handleLogin) => {
    event.preventDefault();
    this.setState({ loading: true });
    fetch(settings.apiUrl + '/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(this.state)
    }).then(res =>
      res
        .json()
        .then(res => {
          this.setState({ loading: false });
          if (res.success) {
            localStorage.setItem(settings.authToken, res.token);
            this.setState({ loggedIn: true });
          } else this.setState(res);
        })
        .catch(error => console.log(error))
    );
  };

  render() {
    const {
      username,
      password,
      message,
      success,
      loggedIn,
      loading
    } = this.state;
    if (loggedIn) return <Redirect to="/characters" />;
    else
      return (
        <div className="login">
          <form onSubmit={e => this.onSubmit(e)}>
            <Alert show={message} success={success} message={message} />
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="input-text"
                name="username"
                onChange={e => this.changeUsername(e)}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="input-text"
                name="password"
                onChange={e => this.changePassword(e)}
                value={password}
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

export default Login;
