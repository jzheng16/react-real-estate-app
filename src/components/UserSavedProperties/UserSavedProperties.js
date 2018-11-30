import React, { Component } from 'react';
import './UserSavedProperties.css';
import axios from 'axios';

class UserSavedProperties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedProperties: [],
    };
  }

  componentDidMount() {
    axios.get('/getSavedProperties')
      .then(serverResponse => {
        console.log(serverResponse.data.userSavedProperties);
        this.setState({ savedProperties: serverResponse.data.userSavedProperties });
      });
  }

  render() {
    const { savedProperties } = this.state;
    const { location } = this.props;
    console.log('What is react-router sending to us: ', location);
    return (
      <div className="savedPropertiesContainer">


        <div> Saved Properties </div>
        <div className="card-grid">
          {savedProperties && savedProperties.map(property => (

            <div className="card">
              <div className="header"> {property.address} </div>
              <div className="info">
                <div className="info-list">{property.beds}</div>
                <div className="info-list">{property.baths}</div>
                <div className="info-list">{property.Zestimate}</div>
              </div>
              <button type="button"> <a href="propertsearch"> View Details </a> </button>
              <button type="button"> Delete Saved Property </button>
            </div>

          ))}


        </div>
      </div>

    );
  }
}

export default UserSavedProperties;
