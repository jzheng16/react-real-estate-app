import React, { Component } from 'react';
import Ken from '../../assets/keng.jpg';
import mainlogo from '../../assets/main-logo.png';

import './Navbar.css';


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
    return (
      <div>
        <div className="navbar">
          <div className="agent-image">
            <img id="realtor-img" src={Ken} alt="realtor" />
            <img id="main-logo-img" src={mainlogo} alt="main-logo" />
          </div>

          {width < 650
            ? (
              <div id="hamburger-icon" onClick={this.toggleMenu} onKeyDown={this.toggleMenu} role="button" tabIndex={0}>
                <i className="fas fa-bars" id="ham-icon" />
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
            )
            : (
              <nav>
                <ul className="regular-nav">
                  <li className="nav-item"> <a href="/">Home</a> </li>
                  <li className="nav-item"> <a href="/propertysearch">Property Search</a> </li>
                  <li className="nav-item"> <a href="/savedproperties">Saved Properties</a> </li>
                  <li className="nav-item"> <a href="/profile">About Me</a> </li>
                  <li className="nav-item"> <a href="/request">Request</a> </li>
                </ul>
              </nav>
            )}
          <a href="/login"> <i className="fas fa-user-circle" /> </a>
        </div>
      </div>
    );
  }
}

export default Navbar;
