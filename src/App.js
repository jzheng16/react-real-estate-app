import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Topstrip from './components/Topstrip';
import AgentInfo from './components/AgentInfo';
import Banner from './components/Banner';
import Slogan from './components/Slogan';
import FeaturedProperty from './components/FeaturedProperty';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
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

export default App;
