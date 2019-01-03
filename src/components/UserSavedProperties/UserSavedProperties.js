import React, { Component } from 'react';
import './UserSavedProperties.css';
import axios from 'axios';
import shortid from 'shortid';
import WithUserContext from '../../WithUserContext';

class UserSavedProperties extends Component {
  // Refetch all properties
  componentDidMount() {
    axios.get('/api/user/me')
      .then(user => {
        if (Object.keys(user.data).length > 0) {
          this.props.context.login(user.data);
        }
      });
  }

  deleteSavedProperty(id) {

  }


  render() {
    const { savedProperties } = this.props.context.user;
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
                <button type="button"> <a href="propertysearch"> View Details </a> </button>
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
