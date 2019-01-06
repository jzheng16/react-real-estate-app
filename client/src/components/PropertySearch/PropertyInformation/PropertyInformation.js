import React from 'react';
import './PropertyInformation.css';

export default props => {
  // Long way of grabbing values off prop object
  // const address = props.address;
  // const property = props.estate;

  // More efficient way: Destructuring
  const { address, estate } = props;

  return (
    <div className="propertyInformationContainer">
      <div className="address"> {address} </div>
      <div className="general-information">
        <p> Facts and Features </p>
        <div className="facts-at-a-glance">
          <div className="column-1">


            <div className="item">
              <div className="media-image">
                <i className="fas fa-bath"></i>
              </div>
              <div className="facts-details">
                <div className="bathrooms"> Bathrooms </div>
                <div> {estate.bathrooms || 'No Data'} </div>
              </div>
            </div>


            <div className="item">
              <div className="media-image">
                <i className="fas fa-bed"></i>
              </div>
              <div className="facts-details">
                <div className="bedrooms"> Bedrooms </div>
                <div> {estate.bathrooms || 'No Data'} </div>
              </div>
            </div>


            <div className="item">
              <div className="media-image">
                <i className="fas fa-expand-arrows-alt" />
              </div>
              <div className="facts-details">
                <div className="squareFeet"> Square Feet </div>
                <div> {estate.finishedSqFt || 'No Data'} </div>
              </div>
            </div>


          </div>


          <div className="column-2">

            <div className="item">
              <div className="media-image">
                <i className="far fa-calendar" />
              </div>
              <div className="facts-details">
                <div className=""> Year Built </div>
                <div> {estate.yearBuilt || 'No Data'} </div>
              </div>
            </div>

            <div className="item">
              <div className="media-image">
                <i className="fas fa-home" />
              </div>
              <div className="facts-details">
                <div className="propertyType"> Property Type </div>
                <div> {estate.useCode || 'No Data'} </div>
              </div>
            </div>

            <div className="item">
              <div className="media-image">
                <i className="fas fa-expand" />
              </div>
              <div className="facts-details">
                <div className="lotSizeSqFt"> Lot Size </div>
                <div> {estate.lotSizeSqFt || 'No Data'} sqft </div>
              </div>
            </div>


          </div>
        </div>
        <div className="zestimate">
          <p>  Zestimate&reg;:
            <span id="zestimate-price">
              ${estate.zestimate && typeof estate.zestimate.amount === 'string' && estate.zestimate.amount}
            </span>
          </p>


          {/* We need to pass in information about our property through this button so that our main component PAC receives it */}
          <button type="button" onClick={event => props.saveProperty(estate, address, event)}> <span>Save Property &#8594;</span> </button>
        </div>

      </div>
      <div className="property-links">
        <p> Related Links </p>
        <ul className="ul-list">
          <li className="link-list">
            <a className="zillow-link" href={estate.links && estate.links.comparables} target="_blank" rel="noopener noreferrer"> Comparables </a>
          </li>
          <li className="link-list">
            <a className="zillow-link" href={estate.links && estate.links.graphsanddata} target="_blank" rel="noopener noreferrer"> Graphs And Data </a>
          </li>
          <li className="link-list">
            <a className="zillow-link" href={estate.links && estate.links.homedetails} target="_blank" rel="noopener noreferrer"> Home Details</a>
          </li>
          <li className="link-list">
            <a className="zillow-link" href={estate.links && estate.links.mapthishome} target="_blank" rel="noopener noreferrer">View Property</a>
          </li>
        </ul>
      </div>

    </div>
  );
};
