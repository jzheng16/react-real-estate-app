import React, { Component } from "react";
import Banner from "./components/Banner";
import AgentInfo from "./components/AgentInfo";
import Slogan from "./components/Slogan";
import FeaturedProperty from "./components/FeaturedProperty";

import "./Homepage.css";

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
