import moment from "moment";
import React from "react";
import AddRemoveBtn from "../addRemoveBtn/AddRemoveBtn";

import profile1 from "../athleteRequest/profile1-athlete.png";

const AthleteView = ({ item, removeAhlete, viewAthlete }) => {
  return (
    <div className="ace-admin-team-athlete_view-container">
      <div
        style={{ padding: "0 2.6rem" }}
        className="ace-home-admin-athlete-request-main_container"
      >
        <div className="ace-home-admin-athlete-request-profile_container">
          <img
            src={
              item?.athleteId?.profileImage
                ? item?.athleteId?.profileImage
                : profile1
            }
            alt="profile-1"
          />
          <h2>{item?.name}</h2>
        </div>
        {/* <div className="ace-home-admin-athlete-request-profile-today">
          <h2>{moment(item.updatedAt).fromNow()}</h2>
        </div> */}
        <div className="ace-home-admin-athlete-request-btn-container">
          <div style={{ padding: "0 1.3rem 0 0" }}>
            <AddRemoveBtn
              text="Remove"
              bgColor={{ background: "#3A3D41" }}
              onClick={() => removeAhlete(item?._id)}
            />
          </div>
          <AddRemoveBtn
            text="View"
            onClick={() => viewAthlete(item?.athleteId?._id)}
          />
        </div>
      </div>
      <hr className="ace-home-admin-athlete-view-line" />
    </div>
  );
};

export default AthleteView;
