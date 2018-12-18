import React from 'react';
import axios from 'axios';
import history from '../../history';

import { StreetView, StyledMapWithAnInfoBox } from './GoogleMapComponents';
import convertXMLtoJson from '../../utilities/convertXMLToJson';
import PropertyInformation from './PropertyInformation';
import './PlacesAutocomplete.css';

class PlacesAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      estate: {},
      estate2: {},
      error: '',
      isMarkerShown: false,
      isInfoBoxShown: false,
      propertyLng: 0,
      propertyLat: 0,
      propertyZpid: 0,
      heading: 0,
    };
    this.searchZillow = this.searchZillow.bind(this);
    this.toggleMarkerInfoBox = this.toggleMarkerInfoBox.bind(this);
    this.savedProperty = this.savedProperty.bind(this);
  }

  componentDidMount() {
    const { propertyLat, propertyLng, heading } = this.state;
    // initialize the autocomplete functionality using the #pac-input input box
    const inputNode = document.getElementById('pac-input');
    const autoComplete = new window.google.maps.places.Autocomplete(inputNode);

    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace();
      const { geometry: { location }, formatted_address } = place;
      console.log('place', place);
      this.setState({
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
        if (status === window.google.maps.StreetViewStatus.OK) {
          this.setState({
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

  toggleMarkerInfoBox() {
    this.setState(prevState => ({ isInfoBoxShown: !prevState.isInfoBoxShown }));
  }

  savedProperty(beds, baths, zestimate, address, event) {
    const { propertyZpid } = this.state;

    const savedPropertyInformation = {
      beds, baths, zestimate, address,
    };

    /* If the user wants to save a property, we have to make sure they're logged in,
       if not redirect them to login
    */

    // if (!user) {
    //   history.push({
    //     pathname: '/login',
    //     state: savedPropertyInformation,
    //   });
    // }


    console.log(zestimate, baths, beds, address);
    axios.post('/saveProperty', savedPropertyInformation)
      .then(response => {
        console.log('What is our server responding with?', response.data);
      })
      .catch(err => console.log('error', err));
  }

  searchZillow() {
    const {
      error,
      address,
      estate,
      propertyZpid,
    } = this.state;
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
      .get(`/deepSearchResults/${finalAddress}/${finalCityStateZip}`)
      .then(response => {
        const xmlDOM = new DOMParser().parseFromString(
          response.data,
          'text/xml',
        );
        const json = convertXMLtoJson(xmlDOM);
        console.log('JSON: ', json);
        if (json['SearchResults:searchresults'].response === undefined) {
          this.setState({
            error: json['SearchResults:searchresults'].message.text,
          });
          console.log('Zillow API Call error: ', error);
        } else {
          this.setState({
            estate: json['SearchResults:searchresults'].response.results.result,
            propertyZpid:
              json['SearchResults:searchresults'].response.results.result.zpid,
          });
          console.log('Property Information: ', estate);
          console.log('Property Zpid: ', propertyZpid);

          axios
            .get(`/deepComparables/${propertyZpid}`)
            .then(response => {
              const xmlDOM = new DOMParser().parseFromString(
                response.data,
                'text/xml',
              );
              const comparables = convertXMLtoJson(xmlDOM);
              console.log('comparables: ', comparables);
            });
        }
      })
      .catch(err => console.log('Error processing zillow request', err));
  }

  render() {
    const {
      estate,
      address,
      propertyLat,
      propertyLng,
      isMarkerShown,
      isInfoBoxShown,
      heading,
    } = this.state;
    // destructuring very important for rendering component state, or else we'd have to (below)
    // const markershow=this.state.markerShown
    // const address=this.state.address
    // const estate=this.state.estate
    // const propertyLat=this.state.propertyLat
    // const propretyLng=this.state.propertyLng
    // const infoboxShown=this.stat.infoBoxShown

    const { location } = this.props;
    console.log('this.props.location', location);

    return (
      <div className="places-container">
        <div id="pac-container">
          <input id="pac-input" type="text" placeholder="Search for a property..." />
          <button type="button" className="search" onClick={this.searchZillow}> <i className="fas fa-search"></i> </button>
        </div>

        {propertyLat && propertyLng
          ? (
            <div className="propertyDisplay">
              <div id="street-view">
                <StreetView
                  propertyLat={propertyLat}
                  propertyLng={propertyLng}
                  heading={heading}
                />
              </div>


              <div id="googleMap">
                <StyledMapWithAnInfoBox
                  toggleMarkerInfoBox={this.toggleMarkerInfoBox}
                  propertyLat={propertyLat}
                  propertyLng={propertyLng}
                  isMarkerShown={isMarkerShown}
                  isInfoBoxShown={isInfoBoxShown}
                />
              </div>
            </div>
          )
          : null

        }
        {Object.keys(estate).length !== 0
          ? (
            <div>
              {/* Passing information from our PlacesAutoComplete component about our property to
               the PropertyInformation component so that it can render it out */}
              <PropertyInformation estate={estate} address={address} savedProperty={this.savedProperty} />
            </div>
          )
          : null
        }


      </div>
    );
  }
}

export default PlacesAutocomplete;
