import React from "react";
import imgProfile from "./p-image2.png";
import "./LineUpAdd.css";

const LineUpAdd = ({ item, setPosition, index }) => {
  return (
    <div className="ace-admin-team-line-up-modal-comp_contaienr">
      <div className="ace-admin-team-line-up-modal-comp">
        <div className="ace-admin-team-line-up-modal_profile_container">
          <img
            src={
              item.athleteId.profileImage
                ? item.athleteId.profileImage
                : imgProfile
            }
            alt="profile-image"
          />
          <h2>{item.athleteId.name}</h2>
        </div>
        <div
          onClick={() =>
            setPosition(item.athleteId.name, item.athleteId._id, index)
          }
          className="ace-admin-team-line-up-modal-comp-btn"
        >
          <h3>Add</h3>
        </div>
      </div>
    </div>
  );
};

export default LineUpAdd;
