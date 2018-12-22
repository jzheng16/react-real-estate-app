import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import history from '../../history';
import './Login.css';

import WithUserContext from '../../WithUserContext';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '' };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  loggingIn = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { context: { login } } = this.props;
    axios
      .post('/login', { email, password })
      .then(response => {
        if (typeof response.data === 'object') {
          login(response.data);

          // redirecting user to UserSavedProperties page - later to saved properties
          history.push('/usersavedproperties');
        } else {
          this.setState({ error: response.data });
        }
      });
  }

  render() {
    // Destructuring the error property off of this.state
    const { error } = this.state;
    return (
      <div className="loginContainer">
        {/* ternary expression down below: if error, show error, otherwise, show null (nothing) */}
        <form id="Login" onSubmit={this.loggingIn}>
          {error ? <div id="error-msg">{error}</div> : null}
          <label className="input-label" htmlFor="email"> Email
            <input
              style={error ? { border: '1px solid red' } : {}}
              className="login-input"
              id="email"
              type="email"
              name="email"
              autoComplete="username"
              onChange={this.onChange}
            />
          </label>
          {/* onChange will run every time the input Changes */}
          <label className="input-label" htmlFor="password"> Password
            <input
              style={error ? { border: '1px solid red' } : {}}
              className="login-input"
              id="password"
              type="password"
              name="password"
              autoComplete="new-password"
              onChange={this.onChange}
            />
          </label>
          <button id="loginButton" type="submit"> Login </button>
          <Link id="signup-link" to="/signup">Signup Here</Link>
        </form>


      </div>
    );
  }
}

export default WithUserContext(Login);
