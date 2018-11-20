import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, StreetViewPanorama, OverlayView } from "react-google-maps"
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";

const API_KEY = 'AIzaSyAN2A_sszCBA2Aymw3EMZKpubpRaOoQLk0';
const { compose, withProps, withStateHandlers } = require("recompose");

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
    defaultZoom={20}
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
      {props.isOpen && <InfoBox
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


class GoogleMapTest extends Component {

  constructor(props) {
    super(props);
    this.state = { isMarkerShown: true, isOpen: false, propertyLat: 39.9827, propertyLng: -75.4228 }
  }


  toggleInfoBox() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    return (
      <div>
        <StreetView {...this.state} />
        <StyledMapWithAnInfoBox {...this.state} toggleInfoBox={this.toggleInfoBox} />
      </div>
    )
  }


}


export default GoogleMapTest;


