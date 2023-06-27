import React from "react";
import "./teamProfile.css";
import teamProfile from "../static/team-profile-pic.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TeamProfile = ({ item }) => {
  const Navigate = useNavigate();
  const moveNextScreen = () => {
    Navigate("/dashboard/team/editProfile", {
      state: {
        item: item,
      },
    });
  };
  return (
    <div className="ace-admin-team-my_team-com-main_container">
      <img src={item?.image} alt="team-profile" />
      <div className="ace-admin-team-my_team-com-heading_container">
        <h1>{item?.name}</h1>
      </div>
      <div className="ace-admin-team-my_team-com-heading_para">
        <p>{item?.bio}</p>
      </div>
      <div
        className="ace-admin-team-my_team-com-heading_edit_profile"
        onClick={moveNextScreen}
      >
        <h2>Edit Profile</h2>
      </div>
    </div>
  );
};

export default TeamProfile;
