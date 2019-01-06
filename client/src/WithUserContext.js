import React from 'react';
import { UserContext } from './UserProvider';

const WithUserContext = Component => props => (
  <UserContext.Consumer>
    {context => <Component {...props} context={context} />
    }
  </UserContext.Consumer>
);

export default WithUserContext;
