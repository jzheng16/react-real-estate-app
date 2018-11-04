import React, { Component } from 'react';
import axios from 'axios';
import convertXMLtoJson from '../../utilities/convertXMLToJson';
import LocationSearchInput from '../PlacesAutocomplete/PlacesAutocomplete';

class PropertySearch extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} }
  }

  componentDidMount() {

    axios('/deepsearch')
      .then(response => {
        const xmlDOM = new DOMParser().parseFromString(response.data, 'text/xml');
        console.log(convertXMLtoJson(xmlDOM));
      })
      .catch(err => console.log('error', err));

  }

  searchProperty(event) {
    event.preventDefault();
    console.log('What is this form giving me? ', event);
    console.log('City: ', event.target.city.value);
    console.log('Zipcode: ', event.target.zipcode.value);
    console.log('Street: ', event.target.streetaddress.value);
    console.log('State: ', event.target.state.value);
    axios.get('/backend/city/address/zipcode/state')
  }

  render() {
    return (
      <div>
        <LocationSearchInput />
        <form id="propertySearchForm" onSubmit={this.searchProperty}>
          Street: <input type="text" name="streetaddress" />
          City: <input type="text" name="city" />
          State: <input type="text" name="state" />
          Zip: <input type="number" name="zipcode" />
          <button id="propSearchButton" type="submit">Search</button>
        </form>
      </div>
    )
  }
}

export default PropertySearch;