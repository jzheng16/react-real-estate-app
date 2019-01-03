import React, { Component } from 'react';
import axios from 'axios';
import history from './history';
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

  componentDidMount() {
    axios.get('/api/user/me')
      .then(user => {
        if (Object.keys(user.data).length > 0) {
          console.log('user', user.data);
          this.setState({ user: user.data });
        }
      });
  }

  login(user) {
    this.setState({ user });
  }

  logout() {
    axios.get('/api/user/logout')
      .catch(err => console.error('error logging out', err));
    this.setState({ user: {} });
    history.push('/');
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
