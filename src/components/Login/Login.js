import React, { Component } from 'react';
import axios from 'axios';
import history from '../../history';
import { UserContext } from '../../UserProvider';
import WithUserContext from '../../WithUserContext';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.loggingIn = this.loggingIn.bind(this);
  }

  onEmailChange(event) {
    const emailInput = event.target.value;
    this.setState({ email: emailInput });
  }

  onPasswordChange(event) {
    const passwordInput = event.target.value;
    this.setState({ password: passwordInput });
  }

  loggingIn(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const { context: { login } } = this.props;
    console.log(login);
    axios
      .post('/login', {
        email,
        password,
      })
      .then(response => {
        if (typeof response.data === 'object') {
          login(response.data);
          history.push({
            pathname: 'usersavedproperties',
            state: response.data,
          });
          // redirecting user to UserSavedProperties page - later to saved properties
        } else {
          this.setState({ error: response.data });
        }
      });
  }

  render() {
    // Destructuring the error property off of this.state
    const { error } = this.state;
    return (
      <div>
        <div>
          <form id="Login" onSubmit={this.loggingIn}>
            Email:
            <input type="email" name="emailInput" autoComplete="username" onChange={this.onEmailChange} />
            Password:
            <input
              type="password"
              name="passwordInput"
              autoComplete="current-password"
              onChange={this.onPasswordChange}
            />
            <button type="submit"> Login </button>
          </form>

          {/* ternary expression down below: if error, show error, otherwise, show null (nothing) */}
          {error ? <div>{error}</div> : null}
          <a href="/signup">Sign Up Here</a>
        </div>
      </div>
    );
  }
}

export default WithUserContext(Login);
