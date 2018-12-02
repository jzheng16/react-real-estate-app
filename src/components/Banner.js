import React, { Component } from 'react';
import history from '../history';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };
    this.searchAddress = this.searchAddress.bind(this);
  }

  componentDidMount() {
    const input = document.getElementById('home-finder-input');
    const autoComplete = new window.google.maps.places.Autocomplete(input);

    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace();
      this.setState({
        address: place.formatted_address,
      });
    });
  }

  searchAddress(event) {
    const { address } = this.state;
    event.preventDefault();
    history.push({
      pathname: 'propertysearch',
      state: address,
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
              <a className="feature-links" href="/profile"> <i className="fas fa-3x fa-chart-bar"></i> </a>
            </div>
            <div className="icon-wrapper">
              <a className="feature-links" href="/propertysearch"> <i className="fas fa-3x fa-home"></i> </a>
            </div>
            <div className="icon-wrapper">
              <a className="feature-links" href="#contact"> <i className="fas fa-3x fa-mobile-alt"></i> </a>
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
    );
  }
}

export default Banner;
