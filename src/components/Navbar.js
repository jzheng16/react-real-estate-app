import React, { Component } from 'react';
import mainlogo from '../assets/main-logo.png';
import Ken from '../assets/keng.jpg';
import { AuthConsumer } from '../AuthContext';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { menuIsOpen: false, width: 0 };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
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
        <AuthConsumer>
          {({ isAuth }) => (
            <div className="navbar">
              <div className="agent-image">
                <img id="realtor-img" src={Ken} alt="realtor" />
              </div>
              <div className="main-logo">
                <img id="main-logo-img" src={mainlogo} alt="main-logo" />
              </div>
              <span className="logo-text">Preferred Realtors</span>
              {width < 500
                ? (
                  <button type="button" onClick={this.toggleMenu} onKeyDown={this.handleClick}>
                    <i className="fas fa-bars" id="ham-icon" />
                  </button>
                )
                : (


                  <nav>
                    {isAuth
                      ? (

                        <ul className="regular-nav">
                          {console.log('what is auth?', isAuth)}
                          <li className="nav-item"> <a href="/">HOME</a> </li>
                          <li className="nav-item">  <a href="/propertysearch">PROPERTY SEARCH</a> </li>
                          <li className="nav-item"> <a href="/usersavedproperties">Saved Properties</a> </li>
                          <li className="nav-item"> <a href="/profile">ABOUT ME</a> </li>
                          <li className="nav-item"> <a href="/contact">CONTACT</a> </li>
                        </ul>
                      )
                      : (
                        <ul className="regular-nav">
                          {console.log('what is auth?', isAuth)}
                          <li className="nav-item"> <a href="/">HOME</a> </li>
                          <li className="nav-item">  <a href="/propertysearch">PROPERTY SEARCH</a> </li>
                          <li className="nav-item"> <a href="/profile">ABOUT ME</a> </li>
                          <li className="nav-item"> <a href="/contact">CONTACT</a> </li>
                        </ul>
                      )
                    }

                  </nav>
                )}

              <a href="/login"> <i className="fas fa-user-circle" /> </a>
              {menuIsOpen && isAuth ? (
                <nav>
                  <ul className="expanded-menu">
                    <li className="nav-item"> <a href="/">HOME</a> </li>
                    <li className="nav-item">  <a href="/propertysearch">PROPERTY SEARCH</a> </li>
                    <li className="nav-item"> <a href="/usersavedproperties">Saved Properties</a> </li>
                    <li className="nav-item"> <a href="/profile">ABOUT ME</a> </li>
                    <li className="nav-item"> <a href="/contact">CONTACT</a> </li>
                  </ul>
                </nav>
              )
                : (
                  <nav>
                    <ul className="expanded-menu">
                      <li className="nav-item"> <a href="/">HOME</a> </li>
                      <li className="nav-item">  <a href="/propertysearch">PROPERTY SEARCH</a> </li>
                      <li className="nav-item"> <a href="/profile">ABOUT ME</a> </li>
                      <li className="nav-item"> <a href="/contact">CONTACT</a> </li>
                    </ul>
                  </nav>
                )
              }
            </div>
          )}

        </AuthConsumer>
      </div>


    );
  }
}

export default Navbar;
