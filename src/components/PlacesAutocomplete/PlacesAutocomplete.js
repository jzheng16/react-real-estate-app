import React from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";

import convertXMLtoJson from "../../utilities/convertXMLToJson";
import "./PlacesAutocomplete.css";



// const Wrapper = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   width: 18px;
//   height: 18px;
//   background-color: #000;
//   border: 2px solid #fff;
//   border-radius: 100%;
//   user-select: none;
//   transform: translate(-50%, -50%);
//   cursor: ${props => (props.onClick ? 'pointer' : 'default')};
//   &:hover {
//     z-index: 1;
//   }
// `;

// const Marker = props => (
//   <Wrapper
//     alt={props.text}
//     {...props.onClick ? { onClick: props.onClick } : {}}
//   />
// );

// Marker.defaultProps = {
//   onClick: null,
// };

// Marker.propTypes = {
//   onClick: PropTypes.func,
//   text: PropTypes.string.isRequired,
// };

// export default Marker;

class PlacesAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '', property: {}, error: '', propertyLng: -75.4228, propertyLat: 39.9827, propertyZpid: 0 };
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
            property: json["SearchResults:searchresults"].response.results.result,
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

    const { property, address, propertyLat, propertyLng } = this.state;

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

          {Object.keys(property).length !== 0 ?
            <div className="property-information">
              <h1>{address}</h1>
              <h2>Bathrooms {property.bathrooms}
                Bedrooms {property.bedrooms}
                Square Ft. {property.finishedSqFt}
                Year Built {property.yearBuilt}
                Property Type {property.useCode}
                Zestimate {property.zestimate && typeof property.zestimate.amount === 'number' && property.zestimate.amount}
              </h2>
              <a href={property.links && property.links.comparables} target="_blank" rel="noopener noreferrer"> Comparables </a>
              <a href={property.links && property.links.graphsanddata} target="_blank" rel="noopener noreferrer"> Graphs And Data </a>
              <a href={property.links && property.links.homedetails} target="_blank" rel="noopener noreferrer"> Home Details</a>
              <a href={property.links && property.links.mapthishome} target="_blank" rel="noopener noreferrer">View Property</a>
            </div>

            :
            <div> </div>

          }


        </div>
      </div >
    );
  }
}

export default PlacesAutocomplete;
