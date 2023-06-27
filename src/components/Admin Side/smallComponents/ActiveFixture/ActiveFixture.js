import React, { useState } from "react";
import ActiveFixture from "../../SidebarNavComponents/Home/components/ActiveFixture";
import vsimg from "./vsimg.png";
import "./ActiveFixture.css";
import moment from "moment";

const ActiveFixtureMain = ({ bg, item }) => {
  return (
    <div style={bg} className="ace-admin-adminHome-fixture-main_continer">
      <div className="ace-admin-adminHome-fixture-vs-main_continer">
        <ActiveFixture teamOne={item?.teamOne} />
        <div className="ace-admin-adminHome-fixture-vsimg-continer">
          <img src={vsimg} alt="vsimg" />
        </div>
        <ActiveFixture teamOne={item?.teamTwo} />
      </div>
      <div className="ace-admin-adminHome-fixture-time-main_container">
        <div className="ace-admin-adminHome-fixture-time_container">
          <h2>Date</h2>
          <h1>
            Today{"  "}
            <span>
              {moment(item?.fixtureTime).format("L")
                ? moment(item?.fixtureTime).format("L")
                : "time"}
            </span>
          </h1>
        </div>

        <div className="ace-admin-adminHome-fixture-start-time_container">
          <h1>Start At</h1>
          <h1>18:00</h1>
        </div>
      </div>
      <div className="ace-admin-adminHome-fixture-results">
        <h1>Results</h1>
      </div>
      <div className="ace-admin-adminHome-fixture-match_results_main-container">
        <div className="ace-admin-adminHome-fixture-match_results-club-name-main-container">
          <div className="ace-admin-adminHome-fixture-match_results-club-name">
            <h1>
              {item?.teamOne?.name ? item?.teamOne?.name : "Club / Team Name"}
            </h1>
            <div className="ace-admin-adminHome-fixture-match_results-scour-container">
              <p>{item?.teamOneGoal?.length}</p>
            </div>
          </div>
        </div>
        <div className="ace-admin-adminHome-fixture-match_results-scour-timer">
          <p>43:01</p>
        </div>
        <div className="ace-admin-adminHome-fixture-match_results-club-name-main-container">
          <div className="ace-admin-adminHome-fixture-match_results-club-name">
            <h1>
              {item?.teamTwo?.name ? item?.teamTwo?.name : "Club / Team Name"}
            </h1>
            <div className="ace-admin-adminHome-fixture-match_results-scour-container">
              <p>{item?.teamTwoGoal?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveFixtureMain;
