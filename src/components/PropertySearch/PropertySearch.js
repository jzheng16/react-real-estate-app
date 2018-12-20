import React, { Component } from 'react';
import axios from 'axios';
import history from '../../history';
import WithUserContext from '../../WithUserContext';
import SearchAddress from './SearchAddress/SearchAddress';
import PropertyInformation from './PropertyInformation/PropertyInformation';
import { StreetView, StyledMapWithAnInfoBox } from './GoogleMapComponents';

class PropertySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      estate: {},
      errorFindingProperty: '',
      isMarkerShown: false,
      isInfoBoxShown: false,
      propertyLng: 0,
      propertyLat: 0,
      propertyZpid: 0,
      heading: 0,
      message: '',
    };
    this.toggleMarkerInfoBox = this.toggleMarkerInfoBox.bind(this);
    this.saveProperty = this.saveProperty.bind(this);
    this.setAddress = this.setAddress.bind(this);
    this.setProperty = this.setProperty.bind(this);
    this.setError = this.setError.bind(this);
  }

  componentDidMount() {
    console.log('this.props', this.props);
  }


  setAddress({ address, propertyLng, propertyLat, heading }) {
    console.log('address', address, propertyLng);

    this.setState({ address, propertyLng, propertyLat, heading });
  }

  setProperty(estate, propertyZpid) {
    console.log(estate, propertyZpid);
    this.setState({ estate, propertyZpid });
  }

  setError(error) {
    this.setState({ errorFindingProperty: error });
  }

  toggleMarkerInfoBox() {
    this.setState(prevState => ({ isInfoBoxShown: !prevState.isInfoBoxShown }));
  }

  saveProperty(estate, event) {
    const { user } = this.props;
    const { bathrooms, bedrooms, zestimate, address } = estate;
    event.preventDefault();

    if (!user) {
      history.push({
        pathname: '/login',
        state: 'You must log in before you can save properties',
      });
    }

    axios.post('/saveProperty', { bathrooms, bedrooms, zestimate: zestimate.amount, address })
      .then(response => {
        if (response.data === 'Property successfully saved') {
          // Set timeout to display a quick toast?
          this.setState({ message: response.data });
        } else {
          this.setState({ message: 'Something went wrong' });
        }
      })
      .catch(err => console.log('error', err));
  }

  render() {
    const { estate, address, propertyLat, propertyLng, isMarkerShown, isInfoBoxShown, heading } = this.state;
    console.log(estate, address);
    // destructuring very important for rendering component state, or else we'd have to (below)
    // const markershow=this.state.markerShown
    // const address=this.state.address
    // const estate=this.state.estate
    // const propertyLat=this.state.propertyLat

    return (
      <div>
        <SearchAddress
          {...this.state}
          setAddress={this.setAddress}
          setProperty={this.setProperty}
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
