import React from 'react';
import './Footer.css';

export default props => {
  return (
    <footer>
      <div className="companyInfo">
        <img src="https://content.mediastg.net/static/RealEstate/company/298/013-logo.png" alt="" />
        <div className="footer-logo-subtext">
          PREFERRED REALTORS
      </div>
        <div className="office-address-info">
          12 Park Lane Dr
          <br /> Oldtown Circle, PA. 19073
          <br /> Office Phone: (515)233-5142
        </div>
      </div>



      <div className="realtor-info">
        <div className="realtorName">Mindy Maximus</div>
        <div className="credentials-contact">
          <div className="credentials"> Associate Broker, SRES, GRI, ALHS </div>

          <div className="phone-number"> Mobile Phone: (098)765-3351 </div>
        </div>
        <div className="follow">
          FOLLOW ME
      <div className="follow-icon">
            <i className="fab fa-1x fa-facebook-f"></i>
          </div>
        </div>
      </div>

      <div className="footer-contact">
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
          <button>SEND</button>
        </form>
      </div>


    </footer>
  )
}