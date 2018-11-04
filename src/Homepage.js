import React, { Component } from 'react';


import Navbar from './components/Navbar';
import Topstrip from './components/Topstrip';


import './Homepage.css';


class Homepage extends Component {
  render() {
    return (
      <div className="homepage">

        <Banner />
        <AgentInfo />
        <Slogan />
        <FeaturedProperty />

      </div>
    );
  }
}

export default Homepage;