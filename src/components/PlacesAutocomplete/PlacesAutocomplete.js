import React from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";

import convertXMLtoJson from "../../utilities/convertXMLToJson";
import PropertyInformation from "./PropertyInformation";
import "./PlacesAutocomplete.css";


class PlacesAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '', estate: {}, error: '', propertyLng: -75.4228, propertyLat: 39.9827, propertyZpid: 0 };
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

    const { estate, address, propertyLat, propertyLng } = this.state;

    return (
      <div>
        <div id="pac-container">
          <input id="pac-input" type="text" placeholder="Enter a location" />
          <button onClick={this.searchZillow}> Search </button>
        </div>
        <div className="propertyDisplay">
          <div className="propertyImage" />
          <div id="googleMap">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyAN2A_sszCBA2Aymw3EMZKpubpRaOoQLk0"
              }}
              defaultZoom={10}
              center={{ lng: propertyLng, lat: propertyLat }}
            >
            </GoogleMapReact>
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
