import React from "react";
import "./TeamNamePicLeft.css";
import team1badg from "../../static/Team1badg.png";

const TeamNamePicLeft = ({ teamOne }) => {
  return (
    <div className="ace-admin-fiture-team-name-pic-left-comp-main_container">
      <h2>{teamOne?.name ? teamOne?.name : "Team Name"}</h2>
      <img src={teamOne?.image ? teamOne?.image : team1badg} />
    </div>
  );
};

export default TeamNamePicLeft;
