import React from "react";

const TeamsInModal = ({ item, selectedTeam }) => {
  return (
    <div className="ace-admin-team-line-up-modal-comp_contaienr">
      <div className="ace-admin-team-line-up-modal-comp">
        <div className="ace-admin-team-line-up-modal_profile_container">
          <img src={item.image} alt="profile-image" />
          <h2>{item.name}</h2>
        </div>
        <div
          className="ace-admin-team-line-up-modal-comp-btn"
          onClick={() => {
            selectedTeam(item);
          }}
        >
          <h3>Add</h3>
        </div>
      </div>
    </div>
  );
};

export default TeamsInModal;
