import React from 'react';
import './FeaturedProperty.css';

export default props => (
  <div className="featured-property">
    <div className="property-img">
    </div>
    <div className="property-info">
      <div className="price">
        $700,000
      </div>
      <div className="address">
        1212 MAXINE DR
      </div>
      <div className="room-description">
        Bathrooms: 4 &nbsp;|&nbsp; Bedrooms: 5
      </div>
    </div>
  </div>
);
