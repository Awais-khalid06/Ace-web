import React, { useState, useEffect } from "react";
import ActiveFixture from "../../Home/components/ActiveFixture";
import "./UpDSateResult.css";
import righrArrow from "../Addfixture/static/Arrow - Left 2.png";
import leftArrow from "../Addfixture/static/Arrow - Left 4.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpDateResult = () => {
  const [activeFixture, setActiveFixture] = useState([]);
  const token = useSelector((data) => data.Data.userData.token);
  const Navigate = useNavigate();
  const getFixtureInfo = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/fixtures/getFixtures",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("result===.", result.activeFixtures[0].teamOne.name);
        setActiveFixture(result.activeFixtures[0]);
      })
      .catch((error) => console.log("error", error));
  };

  const teamOneGoalUpdate = (teamInfo) => {
    Navigate("/dashboard/fixtures/goalOfPlayerAdd", {
      state: {
        teamInfo: teamInfo?.teamOne,
        teamOneLineup: teamInfo?.teamOneLineup,
        fixtureId: teamInfo._id,
      },
    });
    // console.log("teamInfo===", teamInfo);
  };

  const teamTwoGoalUpdate = (teamInfo) => {
    Navigate("/dashboard/fixtures/goalOfPlayerAdd", {
      state: {
        teamInfo: teamInfo?.teamTwo,
        teamOneLineup: teamInfo?.teamTwoLineup,
        fixtureId: teamInfo._id,
      },
    });
    // console.log("teamInfo===", teamInfo);
  };

  useEffect(() => {
    getFixtureInfo();
  }, []);
  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <div
          className="ace-admin-fixtures-add-fixture-main-heading"
          //   onClick={completeDate}
        >
          <h2>Update Result</h2>
        </div>
        <div className="ace-admin-fixtures-add-fixture-fixture-container">
          <ActiveFixture teamOne={activeFixture?.teamOne} />
          <div className="ace-admin-fixtures-update-result-goal-container">
            {/* team one goal */}
            <div className="ace-admin-fixtures-update-result-goal-update-container">
              <div className="ace-admin-fixtures-update-result-goal-update-left-arrow">
                <Link to={"#"}>
                  <img src={leftArrow} />
                </Link>
              </div>
              <div className="ace-admin-fixtures-update-result-goal">
                <h3>{activeFixture?.teamOneGoal?.length}</h3>
              </div>
              <div
                className="ace-admin-fixtures-update-result-goal-update-left-right"
                onClick={() => teamOneGoalUpdate(activeFixture)}
              >
                <Link to={"#"}>
                  <img src={righrArrow} />
                </Link>
              </div>
            </div>
            <div className="ace-admin-fixtures-update-result-goal-divider"></div>
            {/* Team two  goal*/}
            <div className="ace-admin-fixtures-update-result-goal-update-container">
              <div className="ace-admin-fixtures-update-result-goal-update-left-arrow">
                <Link to={"#"}>
                  <img src={leftArrow} />
                </Link>
              </div>
              <div className="ace-admin-fixtures-update-result-goal">
                <h3>{activeFixture?.teamTwoGoal?.length}</h3>
              </div>
              <div
                className="ace-admin-fixtures-update-result-goal-update-left-right"
                onClick={() => teamTwoGoalUpdate(activeFixture)}
              >
                <Link to={"#"}>
                  <img src={righrArrow} />
                </Link>
              </div>
            </div>
          </div>
          <ActiveFixture teamOne={activeFixture?.teamTwo} />
          <div style={{ margin: "1rem" }}></div>
        </div>
      </div>
    </div>
  );
};

export default UpDateResult;
