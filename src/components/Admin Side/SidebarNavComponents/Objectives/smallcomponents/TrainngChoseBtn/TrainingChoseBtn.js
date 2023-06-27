import React from "react";
import { Link } from "react-router-dom";
import "./TrainingChoseBtn.css";

const TrainingChoseBtn = ({ text, bg, link }) => {
  return (
    <div style={bg} className="ace-admin-objectives-comp-trainig-btn-contianer">
      <h1>
        <Link to={link}>{text}</Link>
      </h1>
    </div>
  );
};

export default TrainingChoseBtn;
