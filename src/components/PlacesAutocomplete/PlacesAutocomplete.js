import React from 'react';
import axios from 'axios';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '', place_location: '' };
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
    console.log('Street address: ', streetAddress);
    const city = formattedAddress[1];
    const formattedCity = city.replace(' ', '');
    console.log('city:', formattedCity);
    const statezip = formattedAddress[2];
    const formattedStateZip = statezip.replace(' ', '').split(' ');
    const formattedState = formattedStateZip[0];

    axios.get('')

    // 165-22 78th Ave, Flushing, NY 11366, USA
    // Zillow Address Format: &address=StreetAddress&citystatezip=City%2C+State

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

export default LocationSearchInput;