import React, { Component } from "react";
import axios from "axios";
import history from "../../history";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { emailState: "", passwordState: "" };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.loggingIn = this.loggingIn.bind(this);
  }

  onEmailChange(event) {
    const email = event.target.value;
    this.setState({ emailState: email });
    console.log("What is my email state right now???", this.state.emailState);
  }

  onPasswordChange(event) {
    const password = event.target.value;
    this.setState({ passwordState: password });
    console.log(
      "What is my password state right now???",
      this.state.passwordState
    );
  }

  loggingIn(event) {
    event.preventDefault();

    axios
      .post("/login", {
        email: this.state.emailState,
        password: this.state.passwordState
      })
      .then(response => {
        console.log(response.data);
        if (typeof response.data === "object") {
          history.push({
            pathname: "UserSavedProperties",
            state: response.data
          });
          // redirecting user to UserSavedProperties page - later to saved properties
        } else {
          this.setState({ error: response.data });
        }
      });
  }

  render() {
    return (
      <div>
        <form id="Login" onSubmit={this.loggingIn}>
          Email:
          <input type="email" name="emailInput" onChange={this.onEmailChange} />
          {/* onChange will run every time the input Changes */}
          Password:
          <input
            type="password"
            name="passwordInput"
            onChange={this.onPasswordChange}
          />
          <button type="Submit"> Login </button>
        </form>
        {this.state.error ? <div>{this.state.error}</div> : null}
        <a href="/signup">Sign Up Here</a>
      </div>
    );
  }
}

export default Login;
