import React, { Component } from "react";
import realtorImg from "../assets/realtor.jpg";
import mainlogo from "../assets/main-logo.png";

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
    window.addEventListener('resize', this.updateDimensions)
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth });
    console.log(this.state.width);
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

          {this.state.width < 500 ?
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
                <li className="nav-item">
                  <a href="/contact">CONTACT</a>
                </li>
              </ul>
            </nav>

          }


          <a href="/login"> <i className="fas fa-user-circle" /> </a>
        </div>

        {this.state.menuIsOpen === true ? (
          <ul className="expanded-menu">
            <li>
              <a href="/">HOME</a>
            </li>
            <li>
              <a href="/propertysearch">PROPERTY SEARCH</a>
            </li>
            <li>
              <a href="/market-trends.html">MARKET TRENDS</a>
            </li>
            <li>
              <a href="/profile">ABOUT ME</a>
            </li>
            <li>
              <a href="./contact.html">CONTACT</a>
            </li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Navbar;
