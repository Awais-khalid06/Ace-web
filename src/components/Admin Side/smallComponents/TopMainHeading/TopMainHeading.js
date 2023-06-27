import React from "react";
import { Link } from "react-router-dom";
import "./indx.css";

const TopMainHeading = ({ link, text1, text2 }) => {
  return (
    <div className="ace-admin-small-components-main_heading">
      <div className="ace-admin-small-components-heading">
        <h2>{text1}</h2>
      </div>
      <div className="ace-admin-small-components-main_heading-btn">
        <h3>
          <Link to={link}>{text2}</Link>
        </h3>
      </div>
    </div>
  );
};

export default TopMainHeading;
