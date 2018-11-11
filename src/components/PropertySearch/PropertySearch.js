import React, { Component } from "react";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
import axios from "axios";

class PropertySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  componentDidMount() {
    // axios.get()
  }


  render() {
    return (
      <div>
        <PlacesAutocomplete />
      </div>
    );
  }
}

export default PropertySearch;
