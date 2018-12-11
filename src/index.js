import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import './index.css';
import App from './App';
import history from './history';
import UserProvider from './UserProvider';

ReactDOM.render(
  <UserProvider>
    {/* Everything underneath or inside of UserProvider will have access to our user state */}
    <Router history={history}>
      <App />
    </Router>
  </UserProvider>,
  document.getElementById('root'),
);
