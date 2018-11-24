import React from "react";
import axios from "axios";

import { StreetView, StyledMapWithAnInfoBox } from "./GoogleMapComponents";
import convertXMLtoJson from "../../utilities/convertXMLToJson";
import PropertyInformation from "./PropertyInformation";
import "./PlacesAutocomplete.css";

class PlacesAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      estate: {},
      error: "",
      isMarkerShown: false,
      isInfoBoxShown: false,
      propertyLng: -75.4228,
      propertyLat: 39.9827,
      propertyZpid: 0,
      heading: 0
    };
    this.searchZillow = this.searchZillow.bind(this);
    this.toggleMarkerInfoBox = this.toggleMarkerInfoBox.bind(this);
  }

  componentDidMount() {
    // initialize the autocomplete functionality using the #pac-input input box
    let inputNode = document.getElementById("pac-input");
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

    autoComplete.addListener("place_changed", () => {
      let place = autoComplete.getPlace();
      console.log("place", place);
      let location = place.geometry.location;
      this.setState({
        address: place.formatted_address,
        propertyLng: location.lng(),
        propertyLat: location.lat()
      });
      const target = new window.google.maps.LatLng(
        this.state.propertyLat,
        this.state.propertyLng
      );
      const sv = new window.google.maps.StreetViewService();
      const pano = sv.getPanoramaByLocation(target, 100, (result, status) => {
        if (status == window.google.maps.StreetViewStatus.OK) {
          this.setState({
            heading: window.google.maps.geometry.spherical.computeHeading(
              result.location.latLng,
              target
            )
          });
          console.log("heading", this.state.heading);
        } else {
          console.log("Cannot find a street view for this property.");
          return;
        }
      });
    });
  }

  toggleMarkerInfoBox() {
    this.setState({ isInfoBoxShown: !this.state.isInfoBoxShown });
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
        const xmlDOM = new DOMParser().parseFromString(
          response.data,
          "text/xml"
        );
        const json = convertXMLtoJson(xmlDOM);
        console.log("JSON: ", json);
        if (json["SearchResults:searchresults"].response === undefined) {
          this.setState({
            error: json["SearchResults:searchresults"].message.text
          });
          console.log("Zillow API Call error: ", this.state.error);
        } else {
          this.setState({
            estate: json["SearchResults:searchresults"].response.results.result,
            propertyZpid:
              json["SearchResults:searchresults"].response.results.result.zpid
          });
          console.log("Property Information: ", this.state.property);
          console.log("Property Zpid: ", this.state.propertyZpid);

          axios
            .get(`/deepComparables/${this.state.propertyZpid}`)
            .then(response => {
              const xmlDOM = new DOMParser().parseFromString(
                response.data,
                "text/xml"
              );
              const comparables = convertXMLtoJson(xmlDOM);
              console.log("comparables: ", comparables);
            });
        }
      })
      .catch(err => console.log("Error processing zillow request", err));
  }

  render() {
    const {
      estate,
      address,
      propertyLat,
      propertyLng,
      isMarkerShown,
      isInfoBoxShown,
      heading
    } = this.state;
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
            {/* {...this.state} */}
          </div>
        </div>
        {Object.keys(estate).length !== 0 ? (
          <div>
            <PropertyInformation estate={estate} address={address} />
          </div>
        ) : (
            <div> </div>
          )}


      </div>
    );
  }
}

export default PlacesAutocomplete;
