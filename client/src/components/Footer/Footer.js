import React from 'react';
import './Footer.css';

export default () => (
  <footer>
    <div className="companyInfo">
      <img src="https://content.mediastg.net/static/RealEstate/company/298/013-logo.png" alt="" />
      <div className="footer-logo-subtext">
        PREFERRED REALTORS
      </div>
      <div className="office-address-info">
        12 Park Lane Dr
        <br /> Oldtown Circle, PA. 19073
        <br /> © Zillow, Inc., 2006-2016
      </div>
    </div>

    <div className="realtor-info">
      <div className="realtorName">Ken Garimus</div>
      <div className="credentials-contact">
        <div className="credentials"> Associate Broker, SRES, GRI, ALHS </div>

        <div className="phone-number"> Mobile Phone: (098)765-3351 </div>
      </div>
      <div className="follow">
        FOLLOW ME
        <div className="follow-icon">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-2x fa-facebook-f"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-2x fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>

    <div className="footer-contact" id="contact">
      <div className="form-header">
        CONTACT
      </div>
      <form className="contact-form">
        <input type="text" placeholder="Name" />
        <br />
        <input type="text" placeholder="Email" />
        <br />
        <textarea type="text" placeholder="Message"></textarea>
        <br />
        <button type="submit"> SEND </button>
      </form>
    </div>


  </footer>
);
