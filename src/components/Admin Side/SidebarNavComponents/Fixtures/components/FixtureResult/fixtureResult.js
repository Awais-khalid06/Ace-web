import React from "react";
import TeamNamePicLeft from "../TeamNamePicLeft/TeamNamePicLeft";
import TeamNamepicRight from "../TeamNamepicRight/TeamNamepicRight";
import "./fixtureResult.css";

const FixtureResult = ({ item }) => {
  return (
    <div className="ace-admin-fixture-comp-fixture-result-main_conatiner">
      <div>
        <TeamNamePicLeft teamOne={item?.teamOne} />
      </div>
      <div className="ace-admin-fixture-comp-fixture-result-show">
        <h2>
          {item?.teamOneGoal.length}: {item?.teamTwoGoal.length}{" "}
        </h2>
      </div>
      <div>
        <TeamNamepicRight teamTwo={item?.teamTwo} />
      </div>
    </div>
  );
};

export default FixtureResult;
