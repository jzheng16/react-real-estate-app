import React, { Component } from "react";
import axios from "axios";
import convertXMLtoJson from "../../utilities/convertXMLToJson";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";

class PropertySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:
        "We are successfully passing this to our PlacesAutocomplete component!",
      obj: { a: 2, b: 3 }
    };
    this.searchProperty = this.searchProperty.bind(this);
  }

  componentDidMount() {
    axios("/deepsearch")
      .then(response => {
        const xmlDOM = new DOMParser().parseFromString(
          response.data,
          "text/xml"
        );
        console.log(convertXMLtoJson(xmlDOM));
      })
      .catch(err => console.log("error", err));
  }

  searchProperty(event) {
    event.preventDefault();
    console.log("What is this form giving me? ", event);
    console.log("City: ", event.target.city.value);
    console.log("Zipcode: ", event.target.zipcode.value);
    console.log("Street: ", event.target.streetaddress.value);
    console.log("State: ", event.target.state.value);
    //axios.get('/backend/city/address/zipcode/state')
  }

  render() {
    return (
      <div>
        <PlacesAutocomplete dog={this.state.data} cat={this.state.obj} />
      </div>
    );
  }
}

export default PropertySearch;
