import React, { useEffect, useState } from "react";
import ActiveFixtureMain from "../../smallComponents/ActiveFixture/ActiveFixture";
import "./AdminHome.css";
import ActiveFixture from "./components/ActiveFixture";
import vsimg from "./static/vsimg.png";
import blueEffect from "./static/blue-effect.png";
import blueEffect2 from "./static/blueEffect2.png";
import UpcomingEvents from "./components/UpcomingEvents";
import { Col, Row } from "antd";
import ListingDetails from "./components/listingDetails";
import sponcerimg from "./static/sponcer-image.png";
import AthleteRequest from "../../smallComponents/athleteRequest/AthleteRequest";
import { useSelector } from "react-redux";
import { notification } from "antd";
import { Link } from "react-router-dom";
import { GeneralFetch } from "../../../../Api/ApiCaller";
import Route from "../../../../Api/Route";

const AdminHome = () => {
  const [mylisting, setMyListing] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [activeFixture, setActiveFixture] = useState({});
  const [viewTeamRequest, setViewTeamRequest] = useState([]);
  const [requestAthlete, setRequestAthlete] = useState({});
  const [requestAthleteRemove, setRequestAthleteRemove] = useState({});
  const [event, setUpComingEvent] = useState([]);
  const data = useSelector((data) => data.Data.userData);

  const openNotification = (name) => {
    notification.open({
      message: "Request Accept",
      description: `Request of ${name} is successfully accepted.`,
      // className: "notificationDesign",
      style: { color: "#fff", background: "green" },
    });
  };

  const openNotification2 = (name) => {
    notification.open({
      message: "Remove Request",
      description: `Request of ${name} is Removed.`,
      // className: "notificationDesign",
      style: { color: "#fff", background: "red" },
    });
  };

  const gettingEventDetial = () => {
    let body = {
      currentPage: "1",
      pageSize: "2",
    };

    const getRes = (res) => {
      console.log("upcoming Events", res);
      // setAthleteProfile(res);
      setUpComingEvent(res.data);
    };

    GeneralFetch(
      data.token,
      "POST",
      Route.gettingEvents,
      body,
      setIsLoading,
      getRes,
      (error) => {}
    );
  };

  const gettingMyListing = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/listings/all",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setMyListing(result);
      })
      .catch((error) => console.log("error", error));
  };

  const ViewTeamRequest = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);

    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      //body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/atheteRequests/teamRequests",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("team Request==>", result);
        setViewTeamRequest(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getFixtureInfo = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);

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
        //console.log("result===.", result.upcomingFixtures);
        setActiveFixture(result.activeFixtures[0]);
      })
      .catch((error) => console.log("error", error));
  };

  const acceptRequest = (id, name) => {
    console.log("id of athlete", id);
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      athlete: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/atheteRequests/acceptRequest",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        setRequestAthlete(result);
        openNotification(name);
      })
      .catch((error) => console.log("error", error));
  };

  const removeRequest = (id, name) => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      athlete: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/atheteRequests/removeRequest",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        setRequestAthleteRemove(result);
        openNotification2(name);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    gettingEventDetial();
    ViewTeamRequest();
    getFixtureInfo();
    gettingMyListing();
  }, [requestAthlete, requestAthleteRemove]);

  return (
    <div className="ace-admin-adminHome-main_container">
      <div className="ace-admin-adminHome-name">
        <div
          // onClick={ViewTeamRequest}
          style={{
            width: "71.5rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <h1>Hi {data.name}!</h1>
        </div>
      </div>
      <div className="ace-admin-adminHome-heading_container">
        <h1>Active Fixture</h1>
        <h1>Upcomming Events</h1>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="ace-admin-adminHome-events-main_container">
          <div className="ace-adminHome-blueEffect-img-container">
            <img src={blueEffect} />
          </div>
          {activeFixture !== undefined ? (
            <ActiveFixtureMain item={activeFixture} />
          ) : (
            <div className="Ace-admin-no-data-text">
              <h2>No Active Fixture Available!</h2>
            </div>
          )}
          <div className="ace-admin-adminHome-Events-main_continer">
            <div className="ace-adminHome-blueEffect2-img-container">
              <img src={blueEffect2} />
            </div>
            {event?.map((item) => {
              return <UpcomingEvents item={item} />;
            })}
          </div>
        </div>
      </div>
      <Row className="ace-adminHome-listings_main-container">
        <div
          style={{
            width: "71.5rem",
            height: "29.9rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Col className="ace-adminHome-listings_container">
            <div className="ace-adminHome-listings_container-heading">
              <h1>My Listings</h1>
              <div className="ace-admin-fixtures-active-fixture-update-result_link">
                <Link to={"/dashboard/listings"}>View all</Link>
              </div>
            </div>
            <div className="ace-adminHome-listings-Details_container">
              {mylisting
                .map((item) => {
                  return <ListingDetails item={item} />;
                })
                .slice(0, 2)}
            </div>
          </Col>
          <Col className="ace-adminHome-listings_container">
            <div className="ace-adminHome-listings_container-heading-sponcer">
              <h1>Sponsored</h1>
            </div>
            <div className="ace-adminHome-listings-Details_container-img">
              <img src={sponcerimg} alt="sponcerImg" />
            </div>
          </Col>
        </div>
      </Row>

      <div className="ace-adminHome-listings_main-container">
        <div
          className="ace-adminHome-athlete-request"
          style={{
            width: "71.5rem",
            display: "flex",
          }}
        >
          <h1>Athlete Requests</h1>
        </div>
      </div>

      <div className="ace-adminHome-athlete-request-main-container">
        <div
          className="ace-adminHome-athlete-request"
          style={{
            width: "71.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {viewTeamRequest?.map((item) => {
            return (
              <AthleteRequest
                item={item}
                acceptRequest={acceptRequest}
                removeRequest={removeRequest}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
