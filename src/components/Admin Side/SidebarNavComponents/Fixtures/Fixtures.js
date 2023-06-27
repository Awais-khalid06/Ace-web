import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActiveFixtureMain from "../../smallComponents/ActiveFixture/ActiveFixture";
import TopMainHeading from "../../smallComponents/TopMainHeading/TopMainHeading";
import ActiveFixture from "../Home/components/ActiveFixture";
import FixtureResult from "./components/FixtureResult/fixtureResult";
import UpComingFixture from "./components/upcomingFixture/UpComingFixture";
import sponcerAd from "./static/ace-sponcer-ad.png";
import { Col, Row } from "antd";
import "./Fixtures.css";
import { useSelector } from "react-redux";

const Fixtures = () => {
  const [activeFixture, setActiveFixture] = useState([]);
  const [upComingFixture, setComingFixture] = useState([]);
  const [resultOfFixtures, setResultOfFixtures] = useState([]);
  const token = useSelector((data) => data.Data.userData.token);
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
        console.log("result===.", result.upcomingFixtures);
        setActiveFixture(result.activeFixtures[0]);
        setComingFixture(result.upcomingFixtures);
        setResultOfFixtures(result.completedFixtures);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getFixtureInfo();
  }, []);
  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <TopMainHeading
          text1="Fixtures"
          text2="New Fixture"
          link="/dashboard/fixtures/addFixture"
        />
      </div>
      <div className="ace-admin-fixturs-active-fixture--result-main_container">
        <div className="ace-admin-fixturs-active-fixture-main_container">
          <div className="ace-admin-fixturs-active-fixture-text-container">
            <div className="ace-admin-fixtures-active-fixture-text">
              <h2>Active Fixture</h2>
            </div>
            <div className="ace-admin-fixtures-active-fixture-update-result_link">
              <Link to={"/dashboard/fixtures/upDateResult"}>
                Update Results
              </Link>
            </div>
          </div>
          <div className="ace-admin-fixturs-active-fixture-container">
            <ActiveFixtureMain
              item={activeFixture}
              bg={{ background: "#2B2D30", boxShadow: "none" }}
            />
          </div>
        </div>
        <div className="ace-admin-fixturs-active-fixture-result_container">
          <div className="ace-admin-fixturs-active-fixture-text-container">
            <div className="ace-admin-fixtures-active-fixture-text">
              <h2>Fixture Results</h2>
            </div>
            <div className="ace-admin-fixtures-active-fixture-update-result_link"></div>
          </div>
          <div className="ace-admin-fixturs-fixture_result-container">
            {resultOfFixtures.map((item) => {
              return <FixtureResult item={item} />;
            })}
            {/* <FixtureResult /> */}
          </div>
        </div>
      </div>
      <div style={{ marginTop: "4rem" }}> </div>
      <div className="ace-admin-fixturs-active-fixture--result-main_container">
        <div className="ace-admin-fixturs-active-fixture-main_container">
          <div className="ace-admin-fixturs-active-fixture-text-container">
            <div className="ace-admin-fixtures-active-fixture-text">
              <h2>Upcomming Fixture</h2>
            </div>
            <div className="ace-admin-fixtures-active-fixture-update-result_link"></div>
          </div>
          <div className="ace-admin-fixtures-upcoming-fixtures-main_container">
            {upComingFixture.map((item) => {
              return <UpComingFixture item={item} />;
            })}
          </div>
        </div>
        <div>
          <Col className="ace-adminHome-listings_container">
            <div className="ace-adminHome-listings_container-heading-sponcer">
              <h1>Sponsored</h1>
            </div>
            <div className="ace-adminHome-fixture-sponcer-container-img">
              <img src={sponcerAd} alt="sponcerImg" />
            </div>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default Fixtures;
