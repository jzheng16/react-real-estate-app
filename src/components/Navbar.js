import React, { Component } from 'react';
import realtorImg from '../assets/realtor.jpg';
import mainlogo from '../assets/main-logo.png';


class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = { menuIsOpen: false }
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    console.log('menu is clicked', this.state.menuIsOpen);
    this.setState({ menuIsOpen: !this.state.menuIsOpen })
  }


  componentDidMount() {
    //this.getUserInformation();
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

          <div onClick={this.toggleMenu}>
            <i className="fas fa-bars" id="ham-icon"></i>
          </div>
          <i className="fas fa-user-circle"></i>
        </div>

        {this.state.menuIsOpen === true ?
          <ul className="expanded-menu">
            <li>
              <a href="./index.html">HOME</a>
            </li>
            <li>
              <a href="./property-search.html">PROPERTY SEARCH</a>
            </li>
            <li>
              <a href="./market-trends.html">MARKET TRENDS</a>
            </li>
            <li>

              <a href="/profile">ABOUT ME</a>

            </li>
            <li>
              <a href="./contact.html">CONTACT</a>
            </li>
          </ul>

          :

          null

        }

      </div>
    )
  }

}

export default Navbar;

