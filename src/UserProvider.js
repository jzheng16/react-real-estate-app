import React, { Component } from 'react';


// Create state that all components will have access (UserContext is the product we will sell)
export const UserContext = React.createContext();

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(user) {
    this.setState({ user });
  }

  logout() {
    this.setState({ user: {} });
  }

  render() {
    const { user } = this.state;
    const { children } = this.props;
    return (
      <UserContext.Provider value={{ user, login: this.login, logout: this.logout }}>
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
