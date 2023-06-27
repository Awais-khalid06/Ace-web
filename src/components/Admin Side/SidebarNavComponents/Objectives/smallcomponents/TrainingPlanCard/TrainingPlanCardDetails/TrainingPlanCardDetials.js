import React from "react";
import "./style.css";
import imageCard from "../../../static/training-card-pic.png";

const TrainingPlanCardDetials = ({ image, title, description }) => {
  return (
    <div className="ace-admin-objectives-comp-training-card-main_container">
      <div className="ace-admin-objectives-comp-training-info-container">
        <h2>{title}</h2>
        <h3>{description}</h3>
      </div>
      <div className="ace-admin-objectives-comp-training-img-container">
        <img src={image} />
      </div>
    </div>
  );
};

export default TrainingPlanCardDetials;
