import React, { Component } from "react";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
import axios from "axios";

class PropertySearch extends Component {
  constructor(props) {
    super(props);
    this.state = { data: { a: 1, b: 2 } };

  }

  componentDidMount() {
    // axios.get()
  }


  render() {
    return (
      <div>
        <PlacesAutocomplete data={this.state.data} />
      </div>
    );
  }
}

export default PropertySearch;
