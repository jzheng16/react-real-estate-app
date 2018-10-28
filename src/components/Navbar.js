import React from 'react';
import realtorImg from '../assets/realtor.jpg';
import mainlogo from '../assets/main-logo.png';


export default props => {
  return (
    <div>
      <div class="navbar">
        <div class="agent-image">
          <img id="realtor-img" src={realtorImg} alt="realtor" />
        </div>

        <div class="main-logo">
          <img id="main-logo-img" src={mainlogo} alt="main-logo" />
        </div>
        <span class="logo-text">Preferred Realtors</span>


        <i class="fas fa-bars" id="ham-icon"></i>
        <i class="fas fa-user-circle"></i>
      </div>


      <ul class="expanded-menu">
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
          <a href="./about-me.html">ABOUT ME</a>
        </li>
        <li>
          <a href="./contact.html">CONTACT</a>
        </li>
      </ul>
    </div>
  )

}