import React from 'react';
import SignUp from './SignUp/SignUp';

const Topstrip = props => {
  return (
    <div className="top-strip">
      <a href="/signup"> Sign-up </a>
      <a href="/login">Login</a>
      <div className="phone-numbers">
        <span className="office-phone">
          Office Phone - 123.456.7890
      </span>
        <span className="divider">|</span>
        <span className="mobile-phone">
          Mobile Phone - 321.654.0987
      </span>
      </div>
    </div >
  )
}

export default Topstrip;