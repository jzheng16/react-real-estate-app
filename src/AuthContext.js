import React, { Component } from 'react';

const AuthContext = React.createContext();

/* AuthContext.js */

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuth: false };
  }


  render() {
    const { isAuth } = this.state;
    const { children } = this.props;
    return (
      <AuthContext.Provider
        value={{ isAuth }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}
const AuthConsumer = AuthContext.Consumer;
export { AuthProvider, AuthConsumer };
