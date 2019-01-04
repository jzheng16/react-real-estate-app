import React, { Component } from 'react';
import axios from 'axios';
import convertXMLtoJson from '../../../utilities/convertXMLToJson';
import './SearchAddress.css';

class PlacesAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.searchZillow = this.searchZillow.bind(this);
  }

  componentDidMount() {
    const { setAddress, propertyLat, propertyLng, heading } = this.props;
    // initialize the autocomplete functionality using the #pac-input input box
    const inputNode = document.getElementById('pac-input');
    // Only return places with a specific address?
    const options = {
      types: ['address'],
      componentRestrictions: { country: 'us' },
    };
    const autoComplete = new window.google.maps.places.Autocomplete(inputNode, options);

    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace();
      const { geometry: { location }, formatted_address } = place;
      console.log('place', place);
      setAddress({
        address: formatted_address,
        propertyLng: location.lng(),
        propertyLat: location.lat(),
      });
      const target = new window.google.maps.LatLng(
        propertyLat,
        propertyLng,
      );
      const sv = new window.google.maps.StreetViewService();
      const pano = sv.getPanoramaByLocation(target, 100, (result, status) => {
        console.log('status', status);
        if (status === window.google.maps.StreetViewStatus.OK) {
          setAddress({
            address: formatted_address,
            propertyLng: location.lng(),
            propertyLat: location.lat(),
            heading: window.google.maps.geometry.spherical.computeHeading(
              result.location.latLng,
              target,
            ),
          });

          console.log('heading', heading);
        } else {
          console.log('Cannot find a street view for this property.');
        }
      });
    });
  }

  // TODO: Clean up janky address formatting function
  searchZillow() {
    const { address, setProperty, setError, setComparables } = this.props;

    // Clear previous search first?
    setProperty({}, 0);

    const formattedAddress = address.split(',');
    const streetAddress = formattedAddress[0];
    const formattedStreetAddress = streetAddress.replace('-', '');
    const city = formattedAddress[1];
    const statezip = formattedAddress[2];
    const formattedCity = city.replace(/' '/g, '');
    const formattedStateZip = statezip.replace(' ', '').split(' ');
    const formattedCityStateZip = formattedStateZip[0];
    // console.log('Street address: ', formattedStreetAddress);
    // console.log('formattedCityStateZip: ', formattedCityStateZip);

    const finalAddress = encodeURIComponent(formattedStreetAddress);
    const finalCityStateZip = encodeURIComponent(
      `${formattedCity}, ${formattedCityStateZip}`,
    );
    // console.log('Final address: ', finalAddress);
    // console.log('Final formattedCityStateZip: ', finalCityStateZip);
    axios
      .get(`/api/zillow/deepSearch/${finalAddress}/${finalCityStateZip}`)
      .then(response => {
        const xmlDOM = new DOMParser().parseFromString(
          response.data,
          'text/xml',
        );
        const json = convertXMLtoJson(xmlDOM);
        if (json['SearchResults:searchresults'].response === undefined) {
          const error = json['SearchResults:searchresults'].message.text;
          setError(error);
          console.log('Zillow API call error', error);
        } else {
          const estate = json['SearchResults:searchresults'].response.results.result;
          setProperty(estate, estate.zpid);
          axios
            .get(`/api/zillow/deepComparables/${estate.zpid}`)
            .then(similarProperties => {
              const xml = new DOMParser().parseFromString(
                similarProperties.data,
                'text/xml',
              );
              const comparables = convertXMLtoJson(xml);
              console.log(comparables['Comps:comps'].response.properties.comparables.comp);
              setComparables(comparables['Comps:comps'].response.properties.comparables.comp);
              console.log('Similar properties: ', comparables);
            });
        }
      })
      .catch(err => console.log('Error processing zillow request', err));
  }

  render() {
    const { address } = this.props;
    return (
      <div className="pac">
        <input id="pac-input" defaultValue={address} type="text" placeholder="Search for a property..." />
        <button type="button" className="search" onClick={this.searchZillow}> <i className="fas fa-search"></i> </button>
      </div>

    );
  }
}

export default PlacesAutocomplete;
