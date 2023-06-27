import React from "react";
import "./footer.css";
import logo from "./static/ace-logo.png";
import email from "./static/email-ace.png";
import facebook from "./static/facebook-ace.png";
import insta from "./static/insta-ace.png";

const Footer = () => {
  return (
    <div className="ace__home__footer-container">
      <div className="ace__home__footer__links-container">
        <div className="ace__home__footer__links-section1">
          <div className="ace__home__footer__links-section1__links">
            <h1>About us</h1>
            <img src={logo} />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
              auctor nec at feugiat.
            </p>
            <div className="ace__home__footer-container__social-media_contianer">
              <img src={email} />
              <img src={facebook} />
              <img src={insta} />
            </div>
          </div>
        </div>
        <div className="ace__home__footer__links-section2">
          <div className="ace__home__footer__links-section2__links">
            <h1>Website</h1>
            <p>Contact Us</p>
            <p>About Us</p>
            <p>Testimonials</p>
            <p>Privacy Policy</p>
            <p>Terms and Conditions</p>
          </div>
        </div>
        <div className="ace__home__footer__links-section3">
          <div className="ace__home__footer__links-section2__links">
            <h1>Support</h1>
            <p>Contact Us</p>
            <p>Share With Friends</p>
          </div>
        </div>
      </div>
      <div className="ace__home__footer__last-line">
        <p>© 2022 Ace All Rights Reserved. Terms of Use | Privacy Policy</p>
      </div>
    </div>
  );
};

export default Footer;
