import React, { Component } from "react"
import axios from 'axios';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { emailState: "", passwordState: "" };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onEmailChange(event) {
    const email = event.target.value;
    this.setState({ emailState: email })
    console.log('What is my email state right now???', this.state.emailState);

  }

  onPasswordChange(event) {
    const password = event.target.value;
    this.setState({ passwordState: password })
    console.log('What is my password state right now???', this.state.passwordState);
  }

  onSubmit = (e) => {
    e.preventDefault();
    axios.post('/login', { email: this.state.emailState, password: this.state.passwordState })
      .then(data => {
        console.log('data', data.data)
        axios.get('/hello')
          .then(user => {
            console.log(user.data)
          })
      })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} id="Login">
        Email: <input type="email" name="emailInput" onChange={this.onEmailChange} />
        {/* onChange will run every time the input Changes */}
        Password: <input type="password" name="passwordInput" onChange={this.onPasswordChange} />
        <button type="Submit"> Login </button>
      </form>
    )
  }
}

export default Login;

