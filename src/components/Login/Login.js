import React, { Component } from "react"

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

  render() {
    return (
      <form id="Login">
        Email: <input type="email" name="emailInput" onChange={this.onEmailChange} />
        {/* onChange will run every time the input Changes */}
        Password: <input type="password" name="passwordInput" onChange={this.onPasswordChange} />
      </form>
    )
  }
}

export default Login;

