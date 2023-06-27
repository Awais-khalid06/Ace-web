import React from "react";
import "./AthleteProfileCard.css";
import profileAthletePic from "./Athlete-pic.png";

const AthleteProfileCard = ({ item }) => {
  return (
    <div className="ace-admin-team-athlete_profile-card-main_conatainer">
      <img src={item?.profileImage} />
      <div className="ace-admin-team-athlete_profile-card-name_conatainer">
        <h2>{item?.name} </h2>
      </div>
    </div>
  );
};

export default AthleteProfileCard;
