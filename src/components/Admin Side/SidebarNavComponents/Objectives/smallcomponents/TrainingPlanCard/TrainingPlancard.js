import React, { useState } from "react";
import "./trainingPlanedCard.css";
import trainingimg from "../../static/training-card-pic.png";
import edit from "./edit-card.png";
import deletIcon from "./trash-2.png";

const TrainingPlancard = ({
  item,
  deleteTrain,
  updateTraining,
  editTrainingClass,
}) => {
  return (
    <div className="ace-admin-objectives-comp-training-card-main_container">
      <div className="ace-admin-objectives-comp-training-info-container">
        <h2>
          {item?.title.length > 10
            ? item?.title.substring(0, 15) + "..."
            : item?.title}
        </h2>
        <h3>
          {item?.description.length > 10
            ? item?.description.substring(0, 130) + "..."
            : item?.description}
        </h3>
        {/* <p>Time : 12 Weeks</p> */}
        <div
          className="ace-admin-objectives-comp-training-crud-Main_training"
          style={{ marginTop: "2rem" }}
        >
          <div
            className="ace-admin-objectives-comp-training-crud-editIcon"
            onClick={() => {
              updateTraining(item?._id);
            }}
          >
            <img src={edit} />
          </div>
          <div
            className="ace-admin-objectives-comp-training-crud-deletIcon"
            onClick={() => deleteTrain(item?._id)}
          >
            <img src={deletIcon} />
          </div>
          <div
            className="ace-admin-objectives-comp-training-crud-Edit_section"
            onClick={() => editTrainingClass(item?._id)}
          >
            <h2>Edit Section</h2>
          </div>
        </div>
      </div>
      <div className="ace-admin-objectives-comp-training-img-container">
        <img src={item?.featuredImage} />
      </div>
    </div>
  );
};

export default TrainingPlancard;
