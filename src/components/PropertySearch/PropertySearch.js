import React, { Component } from 'react';
import axios from 'axios';
import history from '../../history';
import WithUserContext from '../../WithUserContext';
import SearchAddress from './SearchAddress/SearchAddress';
import PropertyInformation from './PropertyInformation/PropertyInformation';
import { StreetView, StyledMapWithAnInfoBox } from './GoogleMapComponents';
import './PropertySearch.css';

// TODO:  Display markers for similar properties and show property information for each marker

class PropertySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      estate: {},
      isMarkerShown: false,
      isInfoBoxShown: false,
      propertyLng: 0,
      propertyLat: 0,
      propertyZpid: 0,
      heading: 0,
      message: '',
    };
  }

  componentDidMount() {
    console.log('this.props', this.props);
    const { location: { state } } = this.props;


    if (state) {
      this.setState({ address: state.address, propertyLat: state.propertyLat, propertyLng: state.propertyLng });
    }
  }


  setAddress = ({ address, propertyLng, propertyLat, heading }) => {
    console.log('address', address, propertyLng);

    this.setState({ address, propertyLng, propertyLat, heading });
  }

  setProperty = (estate, propertyZpid) => {
    console.log(estate, propertyZpid);
    this.setState({ estate, propertyZpid });
  }

  setError = error => {
    // If zillow couldn't find the address
    if (error === 'Error: no exact match found for input address') {
      this.setState({ message: 'No exact match found! Please try again!' });
    } else {
      this.setState({ message: 'Zillow API Error: Please try again' });
    }


    setTimeout(() => {
      this.setState({ message: '' });
    }, 3000);
  }

  toggleMarkerInfoBox = () => {
    this.setState(prevState => ({ isInfoBoxShown: !prevState.isInfoBoxShown }));
  }

  saveProperty = (estate, address, event) => {
    const { context: { user } } = this.props;
    const { bathrooms, bedrooms, zestimate } = estate;
    event.preventDefault();

    if (!user) {
      history.push({
        pathname: '/login',
        state: 'You must log in before you can save properties',
      });
    }

    axios.post('/saveProperty', { bathrooms, bedrooms, zestimate: zestimate.amount, address })
      .then(response => {
        if (response.data === 'Property successfully saved' || 'Property already saved!') {
          // Set timeout to display a quick toast?
          this.setState({ message: response.data });
        } else {
          this.setState({ message: 'Something went wrong' });
        }
      })
      .catch(err => console.log('error', err));
  }

  render() {
    const { estate, address, propertyLat, propertyLng, isMarkerShown, isInfoBoxShown, heading, message } = this.state;

    // destructuring very important for rendering component state, or else we'd have to (below)
    // const markershow=this.state.markerShown
    // const address=this.state.address
    // const estate=this.state.estate
    // const propertyLat=this.state.propertyLat

    return (

      <div className="propertySearchContainer">
        <div className="message"> {message} </div>

        <SearchAddress
          {...this.state}
          setAddress={this.setAddress}
          setProperty={this.setProperty}
          setError={this.setError}
        />
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
              <PropertyInformation estate={estate} address={address} saveProperty={this.saveProperty} />
            </div>
          )
          : null
        }
      </div>
    );
  }
}

export default WithUserContext(PropertySearch);
