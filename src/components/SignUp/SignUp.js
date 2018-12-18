import React, { Component } from 'react';
import axios from 'axios';
import history from '../../history';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { emailState: '', passwordState: '', error: '' };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.signingUp = this.signingUp.bind(this);
  }

  onEmailChange(event) {
    const email = event.target.value;
    const { emailState } = this.state;
    this.setState({ emailState: email });
    console.log('email: ', emailState);
  }

  onPasswordChange(event) {
    const password = event.target.value;
    const { passwordState } = this.state;
    this.setState({ passwordState: password });
    console.log('password: ', passwordState);
  }

  signingUp(event) {
    const { emailState, passwordState } = this.state;
    event.preventDefault();

    // axios is communicating with the server to make the call
    axios
      .post('/signup', { email: emailState, password: passwordState })
      .then(response => {
        if (typeof response.data === 'object') {
          const user = response.data;
          // redirecting user to home page - later to saved properties
          history.push({
            pathname: '/',
            state: user,
          });
        } else {
          const error = response.data;
          this.setState({ error });
        }
      });
  }


  render() {
    const { error } = this.state;
    return (
      <div>
        <form id="signUp" onSubmit={this.signingUp}>
          Email: <input type="email" name="emailInput" autoComplete="username" onChange={this.onEmailChange} />
          {/* onChange will run every time the input Changes */}
          Password: <input type="password" name="passwordInput" autoComplete="new-password" onChange={this.onPasswordChange} />
          <button type="submit">SUBMIT</button>
        </form>
        {error ? <div> {error} </div>
          : null
        }
      </div>
    );
  }
}

export default SignUp;
