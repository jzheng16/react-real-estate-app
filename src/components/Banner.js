import React from 'react';


export default props => {
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
            <form className="home-finder-form">
              <input className="home-finder-input" type="text" />
              <button className="home-finder-button">
                SEARCH
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}