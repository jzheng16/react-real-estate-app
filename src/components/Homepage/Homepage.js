import React from 'react';
import Banner from '../Banner';
import AgentInfo from '../AgentInfo';
import Slogan from '../Slogan';
import FeaturedProperty from '../FeaturedProperty/FeaturedProperty';

import './Homepage.css';

const Homepage = () => (
  <div className="homepage">
    <Banner />
    <AgentInfo />
    <Slogan />
    <FeaturedProperty />
  </div>
);

export default Homepage;
