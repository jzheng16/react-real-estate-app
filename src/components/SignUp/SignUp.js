import React, { Component } from "react"
import axios from "axios"

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { emailState: "", passwordState: "", error: "" };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.signingUp = this.signingUp.bind(this);
  }

  onEmailChange(event) {
    const email = event.target.value;
    this.setState({ emailState: email });
    console.log('email: ', this.state.emailState);
  }

  onPasswordChange(event) {
    const password = event.target.value;
    this.setState({ passwordState: password });
    console.log('email: ', this.state.passwordState);
  }

  signingUp(event) {
    event.preventDefault();

    axios
      // axios is communicating with the server to make the call
      .post('/signup', { email: this.state.emailState, password: this.state.passwordState })
      .then(response => {
        console.log(response.data)
        if (typeof response.data === "object") {
          // redirecting user to home page - later to saved properties

        }
        else {
          this.setState({ error: response.data })
        }
      })
  }


  render() {
    return (
      <div>
        <form id="signUp" onSubmit={this.signingUp}>
          Email: <input type="email" name="emailInput" onChange={this.onEmailChange} />
          {/* onChange will run every time the input Changes */}
          Password: <input type="password" name="passwordInput" onChange={this.onPasswordChange} />
          <button type="submit">SUBMIT</button>
        </form>
        {this.state.error ? <div> {this.state.error} </div>
          :
          null
        }
      </div>
    )
  }
}

export default SignUp;

