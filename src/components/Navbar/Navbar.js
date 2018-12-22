import React, { Component } from 'react';
import './Navbar.css';
import WithUserContext from '../../WithUserContext';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { menuIsOpen: false, width: 0 };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  toggleMenu() {
    this.setState(prevState => ({ menuIsOpen: !prevState.menuIsOpen }));
  }

  updateDimensions() {
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
                <div id="login-icon">
                  <a href="/login"> <i className="fas fa-user-circle" /> </a>
                </div>
                {menuIsOpen === true ? (
                  <nav className="toggled-nav">
                    <ul className="expanded-menu">
                      <li className="nav-item"> <a href="/">Home</a> </li>
                      <li className="nav-item"> <a href="/propertysearch">Property Search</a> </li>
                      <li className="nav-item"> <a href="/savedproperties">Saved Properties</a> </li>
                      <li className="nav-item"> <a href="/profile">About Me</a> </li>
                      <li className="nav-item"> <a href="/request">Request</a> </li>

                    </ul>

                  </nav>

                ) : null}
              </div>
            </div>
          )
          : (
            <div className="navbar">
              <nav>
                <ul className="regular-nav">
                  <li className="nav-item"> <a href="/"><i className="fas fa-2x fa-home"></i></a> </li>
                  <li className="nav-item"> <a href="/propertysearch">Property Search</a> </li>
                  <li className="nav-item"> <a href="/savedproperties">Saved Properties</a> </li>
                  <li className="nav-item"> <a href="/profile">About Me</a> </li>
                  <li className="nav-item"> <a href="/request">Request</a> </li>
                  {user.email
                    ? <li className="nav-item"> <button type="button" onClick={logout}> <i className="fas fa-sign-out-alt"></i> </button> </li>
                    : <li className="nav-item"> <a href="/login"> <i className="fas fa-user-circle" /> </a> </li>
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
