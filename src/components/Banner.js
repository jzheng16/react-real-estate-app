import React, { Component } from 'react';
import { renderComponent } from 'recompose';
import history from '../history';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
    }
    this.searchAddress = this.searchAddress.bind(this);
  }

  componentDidMount() {
    const input = document.getElementById("home-finder-input");
    const autoComplete = new window.google.maps.places.Autocomplete(input);

    autoComplete.addListener("place_changed", () => {
      let place = autoComplete.getPlace();
      console.log("place", place);
      let location = place.geometry.location;
      this.setState({
        address: place.formatted_address,
      });
    });

  }

  searchAddress(event) {
    event.preventDefault();
    history.push({
      pathname: "propertysearch",
      state: this.state.address
    });
  }

  render() {
    return (
      <div className="banner">
        <div className="banner-contents">
          <div className="banner-header">
            YOUR NEW HOME IS WAITING
      </div>
          <div className="banner-icons">
            <div className="icon-wrapper">
              <i className="fas fa-3x fa-chart-bar"></i>
            </div>
            <div className="icon-wrapper">
              <i className="fas fa-3x fa-home"></i>
            </div>
            <div className="icon-wrapper">
              <i className="fas fa-3x fa-mobile-alt"></i>
            </div>
          </div>
          <div className="home-finder-wrapper">
            <div className="home-finder-text">
              FIND MY HOME
        </div>
            <div className="home-finder-searchbox">
              <form className="home-finder-form" onSubmit={this.searchAddress}>
                <input className="home-finder-input" required id="home-finder-input" type="text" />
                <button type="submit" className="home-finder-button">
                  SEARCH
            </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Banner;