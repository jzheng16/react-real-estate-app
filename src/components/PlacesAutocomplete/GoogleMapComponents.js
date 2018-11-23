import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, StreetViewPanorama } from "react-google-maps"
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";

const API_KEY = 'AIzaSyAN2A_sszCBA2Aymw3EMZKpubpRaOoQLk0';
const { compose, withProps } = require("recompose");

const mapEnvironment = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),

  withGoogleMap
);

const StreetViewLayout = props => {
  console.log('props', props);
  return (
    <GoogleMap heading={170}>
      <StreetViewPanorama
        position={{ lat: props.propertyLat, lng: props.propertyLng }}
        visible
        defaultZoom={8}
        heading={170}
      >
      </StreetViewPanorama>
    </GoogleMap >
  )
};

const GoogleMapView = props => (
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
      onClick={props.toggleMarkerInfoBox}
    >
      {props.isInfoBoxShown && <InfoBox
        onCloseClick={props.toggleInfoBox}
        options={{ closeBoxURL: ``, enableEventPropagation: true }}
      >
        <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            Property Description
          </div>
        </div>
      </InfoBox>}
    </Marker>
  </GoogleMap>
)


export const StreetView = mapEnvironment(StreetViewLayout);
export const StyledMapWithAnInfoBox = mapEnvironment(GoogleMapView);


