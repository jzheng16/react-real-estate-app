import React, { Component } from 'react';
import axios from 'axios';
import history from '../../history';

const AuthContext = React.createContext();


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { emailState: '', passwordState: '', isLoggedIn: false };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.loggingIn = this.loggingIn.bind(this);
  }

  onEmailChange(event) {
    const email = event.target.value;
    const { emailState } = this.state;
    this.setState({ emailState: email });
    console.log('What is my email state right now???', emailState);
  }

  onPasswordChange(event) {
    const password = event.target.value;
    const { passwordState } = this.state;
    this.setState({ passwordState: password });
    console.log(
      'What is my password state right now???',
      passwordState,
    );
  }

  loggingIn(event) {
    const { emailState, passwordState } = this.state;

    event.preventDefault();

    axios
      .post('/login', {
        email: emailState,
        password: passwordState,
      })
      .then(response => {
        console.log(response.data);
        if (typeof response.data === 'object') {
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
    const { error, emailState, passwordState } = this.state;
    return (

      <div>
        <form id="Login" onSubmit={this.loggingIn}>
          Email:
          <input type="email" name="emailInput" value={emailState} onChange={this.onEmailChange} />
          {/* onChange will run every time the input Changes */}
          Password:
          <input
            type="password"
            name="passwordInput"
            onChange={this.onPasswordChange}
            value={passwordState}
          />
          <button type="submit"> Login </button>
        </form>
        {error ? <div>{error}</div> : null}
        <a href="/signup">Sign Up Here</a>
      </div>
    );
  }
}

export default Login;
