import React, { Component } from "react";
import realtorImg from "../../assets/realtor.jpg";
import mainlogo from "../../assets/main-logo.png";
import "./Navbar.css";


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { menuIsOpen: false, width: 0 };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  toggleMenu() {
    this.setState({ menuIsOpen: !this.state.menuIsOpen });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions)
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth });

  }


  render() {
    return (
      <div>
        <div className="navbar">
          <div className="agent-image">
            <img id="realtor-img" src={realtorImg} alt="realtor" />
          </div>

          <div className="main-logo">
            <img id="main-logo-img" src={mainlogo} alt="main-logo" />
          </div>
          <span className="logo-text">Preferred Realtors</span>

          {this.state.width < 650 ?
            <div onClick={this.toggleMenu}>
              <i className="fas fa-bars" id="ham-icon" />
            </div>
            :
            <nav>
              <ul className="regular-nav">
                <li className="nav-item">
                  <a href="/">HOME</a>
                </li>
                <li className="nav-item">
                  <a href="/propertysearch">PROPERTY SEARCH</a>
                </li>

                <li className="nav-item">
                  <a href="/usersavedproperties">Saved Properties</a>
                </li>
                <li className="nav-item">
                  <a href="/profile">ABOUT ME</a>
                </li>
                <li classname="nav-item">
                  <a href="/request">Request More Information</a>
                </li>
              </ul>
            </nav>

          }


          <a href="/login"> <i className="fas fa-user-circle" /> </a>
        </div>

        {this.state.menuIsOpen === true ? (
          <nav>
            <ul className="expanded-menu">
              <li className="nav-item">
                <a href="/">HOME</a>
              </li>
              <li className="nav-item">
                <a href="/propertysearch">PROPERTY SEARCH</a>
              </li>

              <li className="nav-item">
                <a href="/usersavedproperties">Saved Properties</a>
              </li>
              <li className="nav-item">
                <a href="/profile">ABOUT ME</a>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>
    );
  }
}

export default Navbar;
