import React, { Component } from 'react';
import Routes from './routes';
import Navbar from './components/Navbar';
import Topstrip from './components/Topstrip';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Topstrip />
        <Navbar />
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default App;
