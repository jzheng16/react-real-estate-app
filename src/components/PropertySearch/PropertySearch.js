import React, { Component } from "react";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";

class PropertySearch extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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
