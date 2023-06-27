import moment from "moment";
import React from "react";
import AddRemoveBtn from "../addRemoveBtn/AddRemoveBtn";
import "./athleteRequest.css";
import profile1 from "./profile1-athlete.png";

const AthleteRequest = ({ item, acceptRequest, removeRequest }) => {
  return (
    <div>
      <div className="ace-home-admin-athlete-request-main_container">
        <div className="ace-home-admin-athlete-request-profile_container">
          <img
            src={
              item.athlete.profileImage ? item.athlete.profileImage : profile1
            }
            alt="profile-1"
          />
          <h2>{item.athlete.name}</h2>
        </div>
        <div className="ace-home-admin-athlete-request-profile-today">
          <h2>{moment(item.updatedAt).fromNow()}</h2>
        </div>
        <div className="ace-home-admin-athlete-request-btn-container">
          <div style={{ padding: "0 1.3rem 0 0" }}>
            <AddRemoveBtn
              text="Remove"
              bgColor={{ background: "#3A3D41" }}
              onClick={() => removeRequest(item.athlete._id, item.athlete.name)}
            />
          </div>
          <AddRemoveBtn
            text="Accept"
            onClick={() => acceptRequest(item.athlete._id, item.athlete.name)}
          />
        </div>
      </div>
      <hr className="ace-home-admin-athlete-request-line" />
    </div>
  );
};

export default AthleteRequest;
