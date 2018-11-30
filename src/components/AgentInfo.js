import React from 'react';
import realtor from '../assets/realtor.jpg';

export default props => (
  <div className="agent-info">
    <div className="realtor-img-wrapper">
      <img src={realtor} alt="realtor" />
    </div>
    <div className="company-description">
      Thanks to our global network and stellar reputation, RE/MAX is the industry leader in competitive advantages for
      anybody
      buying or selling their home. When you look for the highest quality real estate service, look no further than a
      RE/MAX
      Associate, for everything from buying, renting, or selling your home, as seamless and effortless as it can be.
      Our
      websites make finding your next home a breeze, and our Associates have the knowledge and experience to answer all
      of
      your questions. RE/MAX Associates are The Real Estate Leaders® you can always depend on.
    </div>
    <div className="contact-links">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-2x fa-facebook-f"></i>
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-2x fa-linkedin"></i>
      </a>
    </div>
  </div>
);
