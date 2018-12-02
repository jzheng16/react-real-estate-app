import React, { Component } from 'react';

class InfoRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="InfoRequestPageContainer">
        <div className="RequestPageTitle"> Custom Home Request
        </div>
        <div className="InfoText">What are you looking for in a home?
        If you are having trouble finding that perfect house then let us find it for you.
        To begin the process, please fill out this form with all your criteria for the home you're looking for.
        We will do the research to find homes you might be interested in, and arrange a personal tour of the homes we find.
        Please note, all fields marked with an * are required.
        Thank you for your interest in working with us. We will contact you shortly!
        </div>
        <div className="RequestFormContainer"> Your Name &amp; Contact Information
          <form className="request-form" onSubmit={this.submitRequestForm}>
            <label htmlFor="name"> Name:</label>
            <input type="text" name="name" />
            <label htmlFor="email"> Email: </label>
            <input type="email" name="email" />
            <label htmlFor="Zipcode"> Zipcode: </label>
            <input type="number" name="zipcode" maxLength="5" minLength="5" />
            <label htmlFor="Phone Number"> Phone Number: </label>
            <input type="text" name="mobilenumber" placeholder="(123) 456-7890" />

            <fieldset>
              <legend>Contact Preference</legend>
              <div>
                <input type="radio" name="contactpreference" value="email" />
                <label htmlFor="email">Email</label>
              </div>
              <div>
                <input type="radio" name="contactpreference" value="phone" />
                <label htmlFor="phone">Phone</label>
              </div>
            </fieldset>
            Additional Criteria/Questions:
            <textarea rows="8" cols="40" name="comments" id="comments"></textarea>

          </form>
        </div>
      </div>
    );
  }
}


export default InfoRequestPage;
