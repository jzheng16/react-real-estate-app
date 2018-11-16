import React from 'react';

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
          <div className="row-1">
            <div>
              <div className="bathMediaImg">
                <span className="fas fa-bath"></span>
              </div>
              <div>
                <div className="bathrooms size-3"> Bathrooms </div>
                <div> {estate.bathrooms || 'No Data'} </div>
              </div>

            </div>
            <div className="bedrooms size-3"> Bedrooms {estate.bedrooms || 'No Data'} </div>
            <div className="squareFeet size-3"> Square Feet {estate.finishedSqFt || 'No Data'} </div>
          </div>
          <div className="row-2">
            <div className="yearBuilt size-3"> Year Built {estate.yearBuilt || 'No Data'} </div>
            <div className="property-type size-3"> Property Type {estate.useCode || 'No Data'} </div>
            <div className="lotSizeSqFt"> Lot Size {estate.lotSizeSqFt || 'No Data'} </div>
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
    </div>
  )
}