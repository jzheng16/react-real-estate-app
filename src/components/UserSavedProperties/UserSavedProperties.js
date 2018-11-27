import React, { Component } from "react";
import './UserSavedProperties.css';

class UserSavedProperties extends Component {
  constructor(props) {
    super(props);
    this.state = { savedProperties: [] };
  }

  render() {
    const { savedProperties } = this.state;
    console.log(this.props.location);
    return (
      <div className="savedPropertiesContainer">


        <div> Saved Properties </div>
        <div className="card-grid">
          <div className="card">
            <div className="header"> Header Title {/* savedProperties.address */} </div>
            <div className="info">
              <div className="info-list">Beds</div>
              <div className="info-list">Baths</div>
              <div className="info-list">Zestimate</div>
            </div>
            <button type="button"> <a href="propertsearch"> View Details </a> </button>
            <button type="button"> Delete Saved Property </button>
          </div>


          <div className="card">
            <div className="header"> Header Title {/* savedProperties.address */} </div>
            <div className="info">
              <div className="info-list">Beds</div>
              <div className="info-list">Baths</div>
              <div className="info-list">Zestimate</div>
            </div>
            <button type="button"> <a href="propertsearch"> View Details </a> </button>
            <button type="button"> Delete Saved Property </button>
          </div>

        </div>
      </div>
      // now we are going to make a route in routes.js
    );
  }
}

export default UserSavedProperties;
