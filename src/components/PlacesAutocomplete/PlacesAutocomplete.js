import React from 'react';
import axios from 'axios';
import convertXMLtoJson from '../../utilities/convertXMLToJson';
import './PlacesAutocomplete.css';
import convert from 'xml-js';




class PlacesAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '', place_location: '', city: '', property: {} };
    this.searchZillow = this.searchZillow.bind(this);

  }

  componentDidMount() {
    // initialize the autocomplete functionality using the #pac-input input box
    let inputNode = document.getElementById('pac-input');
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

    autoComplete.addListener('place_changed', () => {
      let place = autoComplete.getPlace();
      console.log('What is place?', place);
      let location = place.geometry.location;
      this.setState({
        address: place.formatted_address,
        place_location: location.toString(),
      });

    })
  }

  searchZillow() {
    console.log(this.state.address);
    const formattedAddress = this.state.address.split(',');
    const streetAddress = formattedAddress[0];
    const formattedStreetAddress = streetAddress.replace('-', '');
    const city = formattedAddress[1];
    const statezip = formattedAddress[2];
    const formattedCity = city.replace(/' '/g, '');
    console.log('city:', formattedCity.length);

    const formattedStateZip = statezip.replace(' ', '').split(' ');
    const formattedCityStateZip = formattedStateZip[0];
    console.log('Street address: ', formattedStreetAddress);
    console.log('formattedCityStateZip: ', formattedCityStateZip);

    const finalAddress = encodeURIComponent(formattedStreetAddress);
    const finalCityStateZip = encodeURIComponent(formattedCity + ', ' + formattedCityStateZip)
    console.log('Final address: ', finalAddress);
    console.log('Final formattedCityStateZip: ', finalCityStateZip);
    axios.get(`/deepSearchResults/${finalAddress}/${finalCityStateZip}`)
      .then(response => {

        const xmlDOM = new DOMParser().parseFromString(response.data, 'text/xml');
        const json = convert.xml2json(xmlDOM, { compact: true, spaces: 4 });
        console.log(json);

        this.setState = ({
          property: json
        })
        console.log('What is my property state right now?', this.state.property);
      })
      .catch(err => console.log('error', err));
  }




  render() {


    return (
      <div>
        <div id='pac-container'>
          <input id='pac-input' type='text' placeholder='Enter a location' />
          <button onClick={this.searchZillow}> Search </button>
        </div>




      </div>
    );
  }
}

export default PlacesAutocomplete;