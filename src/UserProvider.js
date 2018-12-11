import React, { Component } from 'react';


// Create state that all components will have access (UserContext is the product we will sell)
export const UserContext = React.createContext();

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { name: 'Ken' },
    };
  }

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
