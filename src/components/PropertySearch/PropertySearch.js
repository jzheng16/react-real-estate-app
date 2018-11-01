import React, { Component } from 'react';
import axios from 'axios';
import convertXMLtoJson, { xmlToJson1 } from '../../utilities/convertXMLToJson';

class PropertySearch extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} }
  }

  componentDidMount() {
    axios('/search')
      .then(response => {
        const xmlDOM = new DOMParser().parseFromString(response.data, 'text/xml');

        console.log(convertXMLtoJson(xmlDOM));
      })
      .catch(err => console.log('error', err));
    axios('/deepsearch')
      .then(response => {
        const xmlDOM = new DOMParser().parseFromString(response.data, 'text/xml');
        console.log(xmlToJson1(xmlDOM));
      })
      .catch(err => console.log('error', err));
    axios('/jamaica')
      .then(response => {
        const xmlDOM = new DOMParser().parseFromString(response.data, 'text/xml');
        console.log(xmlToJson1(xmlDOM));
      })
      .catch(err => console.log('error', err));
  }

  render() {
    return (
      <div>  Hello </div>
    )
  }
}

export default PropertySearch;