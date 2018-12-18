import React from 'react';
import { UserContext } from './UserProvider';

const WithUserContext = Component => props => (
  <UserContext.Consumer>
    {context => <Component context={context} />
    }
  </UserContext.Consumer>
);

export default WithUserContext;
