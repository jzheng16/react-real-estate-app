import React from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";

import { withScriptjs, withGoogleMap, GoogleMap, Marker, StreetViewPanorama, OverlayView } from "react-google-maps"
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";




import convertXMLtoJson from "../../utilities/convertXMLToJson";
import PropertyInformation from "./PropertyInformation";
import "./PlacesAutocomplete.css";

const API_KEY = 'AIzaSyAN2A_sszCBA2Aymw3EMZKpubpRaOoQLk0';
const { compose, withProps, withStateHandlers } = require("recompose");


const Welcome = props => (
  <h1> Hello, {props.name} </h1>
)


const mapEnvironment = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
);

const StreetViewLayout = props => (
  <GoogleMap defaultZoom={8} >
    <StreetViewPanorama position={{ lat: props.propertyLat, lng: props.propertyLng }} visible>
    </StreetViewPanorama>
  </GoogleMap >
);

const StreetView = mapEnvironment(StreetViewLayout);


const StyledMapWithAnInfoBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 25.03, lng: 121.6 },
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      })
    }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: props.propertyLat, lng: props.propertyLng }}
    center={{ lat: props.propertyLat, lng: props.propertyLng }}

  >
    {props.isMarkerShown && (
      <Marker position={{ lat: props.propertyLat, lng: props.propertyLng }} />
    )}

    <Marker
      position={{ lat: props.propertyLat, lng: props.propertyLng }}
      onClick={props.onToggleOpen}
    >
      {props.isInfoBoxShown && <InfoBox
        onCloseClick={props.toggleInfoBox}
        options={{ closeBoxURL: ``, enableEventPropagation: true }}
      >
        <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            Hello, Kaohsiung!
          </div>
        </div>
      </InfoBox>}
    </Marker>
  </GoogleMap>
);



class PlacesAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '', estate: {}, error: '', isMarkerShown: false, isInfoBoxShown: false, propertyLng: -75.4228, propertyLat: 39.9827, propertyZpid: 0 };
    this.searchZillow = this.searchZillow.bind(this);
  }

  componentDidMount() {
    // initialize the autocomplete functionality using the #pac-input input box
    let inputNode = document.getElementById("pac-input");
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

    autoComplete.addListener("place_changed", () => {
      let place = autoComplete.getPlace();
      // console.log("What is place?", place);
      let location = place.geometry.location;
      this.setState({
        address: place.formatted_address,
        propertyLng: location.lng(),
        propertyLat: location.lat()

      });
    });
  }


  searchZillow() {
    const formattedAddress = this.state.address.split(",");
    const streetAddress = formattedAddress[0];
    const formattedStreetAddress = streetAddress.replace("-", "");
    const city = formattedAddress[1];
    const statezip = formattedAddress[2];
    const formattedCity = city.replace(/' '/g, "");

    const formattedStateZip = statezip.replace(" ", "").split(" ");
    const formattedCityStateZip = formattedStateZip[0];
    // console.log("Street address: ", formattedStreetAddress);
    // console.log("formattedCityStateZip: ", formattedCityStateZip);

    const finalAddress = encodeURIComponent(formattedStreetAddress);
    const finalCityStateZip = encodeURIComponent(
      formattedCity + ", " + formattedCityStateZip
    );
    // console.log("Final address: ", finalAddress);
    // console.log("Final formattedCityStateZip: ", finalCityStateZip);
    axios
      .get(`/deepSearchResults/${finalAddress}/${finalCityStateZip}`)
      .then(response => {
        const xmlDOM = new DOMParser().parseFromString(response.data, "text/xml");
        const json = convertXMLtoJson(xmlDOM);
        console.log('JSON: ', json);
        if (json["SearchResults:searchresults"].response === undefined) {
          this.setState({ error: json["SearchResults:searchresults"].message.text });
          console.log('Zillow API Call error: ', this.state.error);

        }
        else {
          this.setState({
            estate: json["SearchResults:searchresults"].response.results.result,
            propertyZpid: json["SearchResults:searchresults"].response.results.result.zpid
          });
          console.log("Property Information: ", this.state.property);
          console.log("Property Zpid: ", this.state.propertyZpid);

          axios.get(`/deepComparables/${this.state.propertyZpid}`)
            .then(response => {
              const xmlDOM = new DOMParser().parseFromString(response.data, "text/xml");
              const comparables = convertXMLtoJson(xmlDOM);
              console.log('comparables: ', comparables);
            })

        }
      })
      .catch(err => console.log('Error processing zillow request', err));
  }

  render() {

    const { estate, address, propertyLat, propertyLng, isMarkerShown, isInfoBoxShown } = this.state;
    //destructuring very important for rendering component state, or else we'd have to (below)
    // const markershow=this.state.markerShown
    // const address=this.state.address
    // const estate=this.state.estate
    // const propertyLat=this.state.propertyLat
    // const propretyLng=this.state.propertyLng
    // const infoboxShown=this.stat.infoBoxShown

    return (
      <div>
        <div id="pac-container">
          <input id="pac-input" type="text" placeholder="Enter a location" />
          <button onClick={this.searchZillow}> Search </button>
        </div>
        <div className="propertyDisplay">
          <StreetView propertyLat={propertyLat} propertyLng={propertyLng} />
          <div id="googleMap">
            <StyledMapWithAnInfoBox propertyLat={propertyLat} propertyLng={propertyLng} isMarkerShown={isMarkerShown} isInfoBoxShown={isInfoBoxShown} />
            {/* {...this.state} */}
          </div>
        </div>
        {Object.keys(estate).length !== 0 ?
          <div>
            <PropertyInformation estate={estate} address={address} />

          </div>
          :
          <div> </div>

        }

        <i className="far fa-calendar"></i>
        <i className="fas fa-bed"></i>
        <i className="fas fa-expand-arrows-alt"></i>
        <i className="fas fa-home"></i>
        <i className="fas fa-expand"></i>
      </div>

    );
  }
}

export default PlacesAutocomplete;
