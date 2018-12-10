import React, { Component } from 'react';
import axios from 'axios';
import './InfoRequestPage.css';

class InfoRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  submitRequestForm(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const zipcode = e.target.zipcode.value;
    const phonenumber = e.target.phonenumber.value;

    const emailInfoRequest = {
      sender: name, email, zipcode, phonenumber,
    };
    axios.post('/sendemail', emailInfoRequest);

  }

  render() {
    return (
      <div className="InfoRequestPageContainer">
        <div className="RequestPageTitle">
          <h2> Custom Home Request </h2>
        </div>
        <div className="InfoText">
          <p> What are you looking for in a home? </p>
          <p> If you are having trouble finding that perfect house then let us find it for you. </p>
          <p> To begin the process, please fill out this form with all your criteria for the home you&apos;re looking for. </p>
          <p> We will do the research to find homes you might be interested in, and arrange a personal tour of the homes we find. </p>
          <p> Thank you for your interest in working with us. We will contact you shortly! </p>
          <p> <span id="info-caption"> <i> Please note, all fields marked with an * are required. </i> </span> </p>

        </div>
        <div className="request-form-container">

          <h2>Your Name &amp; Contact Information </h2>
          <form
            className="request-form"
            onSubmit={this.submitRequestForm}
          >
            <div className="leftSideContainer">
              <label htmlFor="name"> Name
                <input className="request-form-input" type="text" name="name" />
              </label>
              <label htmlFor="email"> Email:
                <input className="request-form-input" type="email" name="email" />
              </label>
              <label htmlFor="zipcode"> Zipcode:
                <input className="request-form-input" type="number" name="zipcode" maxLength="5" minLength="5" />
              </label>
              <label htmlFor="Phone Number"> Phone Number:
                <input className="request-form-input" type="text" name="phonenumber" placeholder="(123) 456-7890" />
              </label>

              <fieldset>
                <legend>Contact Preference</legend>
                <div>
                  <label htmlFor="email">Email
                    <input type="radio" name="contactpreference" value="email" />
                  </label>
                </div>
                <div>
                  <label htmlFor="phone">Phone
                    <input type="radio" name="contactpreference" value="phone" />
                  </label>
                </div>
              </fieldset>
              Additional Criteria/Questions:
              <textarea rows="20" cols="40" name="comments" id="comments"></textarea>
            </div>
            <div className="rightSideContainer">

              <label htmlFor="pricerange"> PRICE RANGE:
                <input type="number" name="pricerange" />
              </label>

              <label htmlFor="location"> Where are you looking?:
                <input type="text" name="location" maxLength="30" minLength="5" />
              </label>
              <label htmlFor="yearBuilt"> Minimum Year Built
                <input type="number" name="yearBuilt" />
              </label>
              <label htmlFor="Baths"> How Many Bathrooms?
                <input type="number" name="baths" />
              </label>
              <label htmlFor="Beds"> How Many Bedrooms?
                <input type="number" name="beds" />
              </label>
              <label htmlFor="SquareFt"> Minimum Sq Ft.
                <input type="number" name="minSqFt" />
              </label>

              <fieldset>
                <legend>Property Type</legend>
                <div>
                  <label htmlFor="condo"> Condominium
                    <input type="radio" name="propertytype" value="condo" />
                  </label>
                </div>
              </fieldset>
              <button type="submit"> Submit </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default InfoRequestPage;
