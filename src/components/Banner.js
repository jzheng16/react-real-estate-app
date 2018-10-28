import React from 'react';


export default props => {
  return (
    <div class="banner">
      <div class="banner-contents">
        <div class="banner-header">
          YOUR NEW HOME IS WAITING
      </div>
        <div class="banner-icons">
          <div class="icon-wrapper">
            <i class="fas fa-3x fa-chart-bar"></i>
          </div>
          <div class="icon-wrapper">
            <i class="fas fa-3x fa-home"></i>
          </div>
          <div class="icon-wrapper">
            <i class="fas fa-3x fa-mobile-alt"></i>
          </div>
        </div>
        <div class="home-finder-wrapper">
          <div class="home-finder-text">
            FIND MY HOME
        </div>
          <div class="home-finder-searchbox">
            <form class="home-finder-form">
              <input class="home-finder-input" type="text" />
              <button class="home-finder-button">
                SEARCH
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}