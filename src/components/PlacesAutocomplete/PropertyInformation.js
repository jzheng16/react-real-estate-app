import React from 'react';
import './PropertyInformation.css';

export default props => {
  console.log('What is being passed down to me from PlacesAutocomplete.js? ', props);

  // Long way of grabbing values off prop object
  // const address = props.address;
  // const property = props.estate;


  // More efficient way: Destructuring
  const { address, estate } = props;



  return (
    <div className="property-information">
      <div className="address"> {address} </div>
      <div className="general-information">
        <p> Facts and Features </p>
        <div className="facts-at-a-glance">
          <div className="column-1">


            <div>
              <div className="media-image">
                <i className="fas fa-bath"></i>
              </div>
              <div className="facts-details">
                <div className="bathrooms"> Bathrooms </div>
                <div> {estate.bathrooms || 'No Data'} </div>
              </div>
            </div>


            <div>
              <div className="media-image">
                <i className="fas fa-bed"></i>
              </div>
              <div className="facts-details">
                <div className="bedrooms"> Bedrooms </div>
                <div> {estate.bathrooms || 'No Data'} </div>
              </div>
            </div>



            <div>
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

            <div>
              <div className="media-image">
                <i className="far fa-calendar" />
              </div>
              <div className="facts-details">
                <div className=""> Year Built </div>
                <div> {estate.yearBuilt || 'No Data'} </div>
              </div>
            </div>

            <div>
              <div className="media-image">
                <i className="fas fa-home" />
              </div>
              <div className="facts-details">
                <div className="propertyType"> Property Type </div>
                <div> {estate.useCode || 'No Data'} </div>
              </div>
            </div>

            <div>
              <div className="media-image">
                <i className="fas fa-expand" />
              </div>
              <div className="facts-details">
                <div className="lotSizeSqFt"> Lot Size </div>
                <div> {estate.lotSizeSqFt || 'No Data'} </div>
              </div>
            </div>



          </div>
        </div>
        <div className="zestimate">
          Zestimate&reg; {estate.zestimate && typeof estate.zestimate.amount === 'number' && estate.zestimate.amount}
        </div>

      </div>
      <div className="property-links">
        <a href={estate.links && estate.links.comparables} target="_blank" rel="noopener noreferrer"> Comparables </a>
        <a href={estate.links && estate.links.graphsanddata} target="_blank" rel="noopener noreferrer"> Graphs And Data </a>
        <a href={estate.links && estate.links.homedetails} target="_blank" rel="noopener noreferrer"> Home Details</a>
        <a href={estate.links && estate.links.mapthishome} target="_blank" rel="noopener noreferrer">View Property</a>
      </div>

      <button onClick={props.savedProperty}> Save Property </button>

    </div>
  )
}