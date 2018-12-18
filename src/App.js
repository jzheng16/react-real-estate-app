import React, { Component } from 'react';
import Routes from './routes';

import Navbar from './components/Navbar/Navbar';
import Topstrip from './components/Topstrip';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => (
  <div className="App">
    <Topstrip />
    <Navbar />
    <Routes />
    <Footer />
  </div>
);

export default App;
