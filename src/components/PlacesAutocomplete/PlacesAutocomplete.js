import React from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";

import convertXMLtoJson from "../../utilities/convertXMLToJson";
import "./PlacesAutocomplete.css";

class PlacesAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "", city: 'Miami', property: {}, error: '', propertyLng: 0, propertyLat: 0 };
    this.searchZillow = this.searchZillow.bind(this);
  }

  componentDidMount() {
    // initialize the autocomplete functionality using the #pac-input input box
    let inputNode = document.getElementById("pac-input");
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

    autoComplete.addListener("place_changed", () => {
      let place = autoComplete.getPlace();
      console.log("What is place?", place);
      let location = place.geometry.location;
      console.log(location.lat(), location.lng());
      this.setState({
        address: place.formatted_address,
        propertyLng: location.lng(),
        propertyLat: location.lat()


      });
    });
  }

  searchZillow() {
    console.log(this.state.address);
    const formattedAddress = this.state.address.split(",");
    const streetAddress = formattedAddress[0];
    const formattedStreetAddress = streetAddress.replace("-", "");
    const city = formattedAddress[1];
    const statezip = formattedAddress[2];
    const formattedCity = city.replace(/' '/g, "");

    const formattedStateZip = statezip.replace(" ", "").split(" ");
    const formattedCityStateZip = formattedStateZip[0];
    console.log("Street address: ", formattedStreetAddress);
    console.log("formattedCityStateZip: ", formattedCityStateZip);

    const finalAddress = encodeURIComponent(formattedStreetAddress);
    const finalCityStateZip = encodeURIComponent(
      formattedCity + ", " + formattedCityStateZip
    );
    console.log("Final address: ", finalAddress);
    console.log("Final formattedCityStateZip: ", finalCityStateZip);
    axios
      .get(`/deepSearchResults/${finalAddress}/${finalCityStateZip}`)
      .then(response => {
        const xmlDOM = new DOMParser().parseFromString(response.data, "text/xml");
        const json = convertXMLtoJson(xmlDOM);
        console.log(json);
        if (json["SearchResults:searchresults"].response === undefined) {
          this.setState({ error: json["SearchResults:searchresults"].message.text });
          console.log('error: ', this.state.error);

        }
        else {
          this.setState({
            property: json["SearchResults:searchresults"].response.results.result
          });
          console.log("What is my property state right now?", this.state.property);
          console.log('WHat is my place location', this.state.place_location);
        }
      })
      .catch(err => console.log('Error processing zillow request', err));
  }

  render() {
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
              defaultCenter={{ lat: 59.995, lng: 30.337 }}
              defaultZoom={11}
              center={{ lng: this.state.propertyLng, lat: this.state.propertyLat }}
            />
          </div>
          <div>
            <h1>{this.state.address}</h1>
            <h2>Bathrooms {this.state.property.bathrooms}
              Bedrooms {this.state.property.bedrooms}
              Square Ft. {this.state.property.finishedSqFt}
              {/* Zestimate {this.state.property.zestimate.amount} */}
            </h2>

          </div>
        </div>
      </div>
    );
  }
}

export default PlacesAutocomplete;
