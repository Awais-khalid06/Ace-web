import React from "react";
import "./SocailLogin.css";
import google from "./static/google-icon.png";
import facebook from "./static/logos_facebook.png";
const SocailLogin = () => {
  return (
    <div className="ace-login-socailLogin-main-container">
      <div className="ace-login-socailLogin-container">
        <img className="google-icon" src={google} alt="google-icon" />
      </div>
      <div className="ace-login-socailLogin-container">
        <img className="facebook-icon" src={facebook} alt="google-icon" />
      </div>
    </div>
  );
};

export default SocailLogin;
