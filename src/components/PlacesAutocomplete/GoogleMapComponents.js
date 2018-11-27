import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, StreetViewPanorama } from "react-google-maps"
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox";

const API_KEY = 'AIzaSyAN2A_sszCBA2Aymw3EMZKpubpRaOoQLk0';
const { compose, withProps } = require("recompose");

const mapEnvironment = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px`, marginBottom: '1em', display: 'block', border: '1px solid grey', position: 'static' }} />,
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
    defaultOptions={{
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#263c3f' }]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#6b9a76' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#38414e' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#212a37' }]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#9ca5b3' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#746855' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#1f2835' }]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#f3d19c' }]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{ color: '#2f3948' }]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#17263c' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#515c6d' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#17263c' }]
        }
      ]
    }}

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


