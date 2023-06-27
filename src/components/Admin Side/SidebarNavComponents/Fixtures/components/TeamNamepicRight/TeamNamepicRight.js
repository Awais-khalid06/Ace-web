import React from "react";
import "./TeamNamePicRight.css";
import team2badg from "../../static/Team2badg.png";

const TeamNamepicRight = ({ teamTwo }) => {
  return (
    <div className="ace-admin-fixture-team-name-pic-right-comp-main_conatiner">
      <img src={teamTwo?.image ? teamTwo?.image : team2badg} />
      <h2> {teamTwo?.name ? teamTwo?.name : "Team Name"} </h2>
    </div>
  );
};

export default TeamNamepicRight;
