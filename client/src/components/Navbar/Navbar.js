import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';
import WithUserContext from '../../WithUserContext';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { menuIsOpen: false, width: 0 };
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  toggleMenu = () => {
    this.setState(prevState => ({ menuIsOpen: !prevState.menuIsOpen }));
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { width, menuIsOpen } = this.state;
    const { context: { user, logout } } = this.props;
    return (

      <div className="nav-container">


        {width < 650
          ? (
            <div className="mobile-nav">
              <div id="hamburger-icon" onClick={this.toggleMenu} onKeyDown={this.toggleMenu} role="button" tabIndex={0}>
                <i className="fas fa-bars" id="ham-icon" />
              </div>
              <div id="login-icon">
                {user.email
                  ? <button id="logout-button" type="button" onClick={logout}> <i className="fas fa-sign-out-alt"></i> Logout </button>
                  : <a href="/login"> <i className="fas fa-user-circle" /> </a>
                }
              </div>
              {menuIsOpen === true ? (
                <nav className="toggled-nav">
                  <ul className="expanded-menu">
                    <li className="nav-item"> <Link to="/">Home</Link> </li>
                    <li className="nav-item"> <Link to="/propertysearch">Property Search</Link> </li>
                    <li className="nav-item"> <Link to="/savedproperties">Saved Properties</Link> </li>
                    <li className="nav-item"> <Link to="/profile">About Me</Link> </li>
                    <li className="nav-item"> <Link to="/request">Request</Link> </li>

                  </ul>

                </nav>

              ) : null}
            </div>

          )
          : (
            <div>
              <nav className="navbar">
                <ul className="regular-nav">
                  <li className="nav-item"> <Link to="/"><i className="fas fa-2x fa-home"></i></Link> </li>
                  <li className="nav-item"> <Link to="/propertysearch">Property Search</Link> </li>
                  <li className="nav-item"> <Link to="/savedproperties">Saved Properties</Link> </li>
                  <li className="nav-item"> <Link to="/profile">About Me</Link> </li>
                  <li className="nav-item"> <Link to="/request">Request</Link> </li>
                  {user.email
                    ? <li className="nav-item"> <button id="logout-button" type="button" onClick={logout}> <i className="fas fa-sign-out-alt"></i> </button> </li>
                    : <li className="nav-item"> <Link to="/login"> <i className="fas fa-user-circle" /> </Link> </li>
                  }

                </ul>
              </nav>
            </div>

          )}
      </div>


    );
  }
}

export default WithUserContext(Navbar);
