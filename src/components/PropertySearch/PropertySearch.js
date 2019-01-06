import React, { Component } from 'react';
import axios from 'axios';
import history from '../../history';
import WithUserContext from '../../WithUserContext';
import SearchAddress from './SearchAddress/SearchAddress';
import PropertyInformation from './PropertyInformation/PropertyInformation';
import { StreetView, StyledMapWithAnInfoBox } from './GoogleMapComponents';
import './PropertySearch.css';

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
      comparables: [],
      isComparableShown: [],
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
    this.setState({ isComparableShown: new Array(this.state.comparables.length).fill(false) });
  }

  toggleComparableMarkers = index => {
    const { isComparableShown } = this.state;
    const toggleComparable = isComparableShown.map((isShown, idx) => {
      console.log(index, idx, isShown);
      if (index === idx) {
        return !isShown;
      }
      return false;
    });
    this.setState({ isComparableShown: toggleComparable, isInfoBoxShown: false });
  }

  setComparables = comparables => {
    const newComparables = comparables.map(comparable => ({ ...comparable, isShown: false }));
    this.setState({ comparables: newComparables, isComparableShown: new Array(newComparables.length).fill(false) });
  }

  saveProperty = (estate, address, event) => {
    // TODO: Do i need estate and address if I already have it in my local state? Prob not
    const { context: { user } } = this.props;
    const { bathrooms, bedrooms, zestimate } = estate;
    event.preventDefault();
    console.log(user);

    if (Object.keys(user).length === 0) {
      history.push({
        pathname: '/login',
        state: 'You must log in before you can save properties',
      });
    } else {
      axios.post('/api/user/saveProperty', { bathrooms, bedrooms, zestimate: zestimate.amount, address })
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
  }

  render() {
    const { estate, address, propertyLat, propertyLng, comparables, isComparableShown,
      isMarkerShown, isInfoBoxShown, heading, message } = this.state;

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
          setComparables={this.setComparables}
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
                  address={address}
                  estate={estate}
                  propertyLat={propertyLat}
                  propertyLng={propertyLng}
                  isMarkerShown={isMarkerShown}
                  isInfoBoxShown={isInfoBoxShown}
                  comparables={comparables}
                  isComparableShown={isComparableShown}
                  toggleComparableMarkers={this.toggleComparableMarkers}
                  toggleMarkerInfoBox={this.toggleMarkerInfoBox}
                />
              </div>
            </div>
          )
          : <div className="propertySearch-main-message"> Search an address to get started </div>

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
