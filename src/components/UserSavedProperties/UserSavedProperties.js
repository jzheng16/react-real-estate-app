import React, { Component } from 'react';
import './UserSavedProperties.css';
import axios from 'axios';
import shortid from 'shortid';
import WithUserContext from '../../WithUserContext';

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
        console.log(serverResponse.data.savedProperties);
        this.setState({ savedProperties: serverResponse.data.savedProperties });
      });
  }

  render() {
    const { savedProperties } = this.state;
    return (
      <div className="savedPropertiesContainer">
        <div>
          <div> Saved Properties for {}</div>
          <div className="card-grid">
            {savedProperties && savedProperties.map(property => (

              <div className="card" key={shortid.generate()}>
                <div className="header"> {property.address} </div>
                <div className="info">
                  <div className="info-list">{property.beds}</div>
                  <div className="info-list">{property.baths}</div>
                  <div className="info-list">${property.zestimate}</div>
                </div>
                <button type="button"> <a href="propertsearch"> View Details </a> </button>
                <button type="button"> Delete Saved Property </button>
              </div>

            ))}


          </div>
        </div>


      </div>

    );
  }
}

export default WithUserContext(UserSavedProperties);
