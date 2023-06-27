import React from "react";
import TeamNamePicLeft from "../TeamNamePicLeft/TeamNamePicLeft";
import TeamNamepicRight from "../TeamNamepicRight/TeamNamepicRight";
import "./UpcomingFixtures.css";
import Vs from "../../static/Vs-ace.png";
import moment from "moment";

const UpComingFixture = ({ item }) => {
  return (
    <div className="ace-admin-fixtures-comp-upcoming-fixtures-main_container">
      <div className="ace-admin-fixtures-comp-upcoming-fixtures-team-info-container">
        <TeamNamePicLeft teamOne={item?.teamOne} />
        <div className="ace-admin-fixtures-comp-upcoming-fixtures-VS-container">
          <img src={Vs} alt="VS" />
        </div>
        <TeamNamepicRight teamTwo={item?.teamTwo} />
      </div>
      <div className="ace-admin-fixtures-comp-upcoming-fixtures-date-time-container">
        <div className="ace-admin-fixtures-comp-upcoming-fixtures-date-time">
          <h2>
            {" "}
            {moment(item?.fixtureTime).format("L")
              ? moment(item?.fixtureTime).format("L")
              : "Date 02-03-2022"}
          </h2>
        </div>
        <div className="ace-admin-fixtures-comp-upcoming-fixtures-Kicksoff">
          <h2>Kicksoff 18:00</h2>
        </div>
      </div>
    </div>
  );
};

export default UpComingFixture;
