import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Topstrip from './components/Topstrip';
import AgentInfo from './components/AgentInfo';
import Banner from './components/Banner';
import Slogan from './components/Slogan';
import FeaturedProperty from './components/FeaturedProperty';
import Footer from './components/Footer';
import './Homepage.css';


class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <Topstrip />
        <Navbar />
        <Banner />
        <AgentInfo />
        <Slogan />
        <FeaturedProperty />
        <Footer />
      </div>
    );
  }
}

export default Homepage;