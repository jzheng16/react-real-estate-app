import React, { Component } from 'react';
import axios from 'axios';
import history from '../../history';
import WithUserContext from '../../WithUserContext';
import './SignUp.css';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', confirmPassword: '', error: '' };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }


  signingUp = event => {
    const { email, password, confirmPassword } = this.state;
    const { context: { login } } = this.props;
    event.preventDefault();
    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords must match' });
    } else {
      // axios is communicating with the server to make the call
      axios
        .post('/api/user/signup', { email, password })
        .then(response => {
          if (typeof response.data === 'object') {
            const user = response.data;
            login(user);
            // redirecting user to home page - later to saved properties
            history.push('/');
          } else {
            const error = response.data;
            this.setState({ error });
          }
        })
        .catch(err => console.error(err));
    }
  }


  render() {
    const { error, password, confirmPassword } = this.state;


    return (
      <div className="signUpContainer">
        <form id="signUp" onSubmit={this.signingUp}>
          {error ? <div id="error-msg"> {error} </div>
            : null
          }
          <label htmlFor="email"> Email
            <input
              className="signup-input"
              id="email"
              type="email"
              name="email"
              autoComplete="username"
              onChange={this.onChange}
            />
          </label>
          {/* onChange will run every time the input Changes */}
          <label htmlFor="password"> Password
            <input
              className="signup-input"
              style={password && confirmPassword && password !== confirmPassword ? { border: '1px solid red' } : {}}
              id="password"
              type="password"
              name="password"
              autoComplete="new-password"
              onChange={this.onChange}
            />
          </label>
          <label htmlFor="confirmPassword"> Confirm Password
            <input
              className="signup-input"
              style={password && confirmPassword && password !== confirmPassword ? { border: '1px solid red' } : {}}
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              onChange={this.onChange}
            />
          </label>
          <button
            id="signUpButton"
            type="submit"
          >
            Register
          </button>
        </form>


      </div>
    );
  }
}

export default WithUserContext(SignUp);
