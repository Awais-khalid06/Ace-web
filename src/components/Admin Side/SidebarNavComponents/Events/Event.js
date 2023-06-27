import React, { useEffect, useState } from "react";
import EventCard from "./Compnents/EventCard";
import "./Event.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Event = () => {
  const [winningCermonys, setWiningCeremonys] = useState([]);
  const [trials, setTrials] = useState([]);
  const Navigate = useNavigate();
  const data = useSelector((data) => data.Data.userData);
  const moveToNexScreen = (item) => {
    Navigate("/dashboard/events/attendEvent", {
      state: {
        item: item,
      },
    });
  };

  const getEvents = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      currentPage: "1",
      pageSize: "9",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/events/getEvents",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        const winningcermonys = result.data.filter(
          (item) => item.category == "winningcermony"
        );
        setWiningCeremonys(winningcermonys);
        const trialsArry = result.data.filter(
          (item) => item.category == "trials"
        );
        setTrials(trialsArry);
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <div className="ace-admin-fixtures-add-fixture-main-heading">
          <h2>Events</h2>
        </div>
      </div>
      <div className="ace-admin-fixtures-add-fixture-fixture_main-container">
        <div className="ace-admin-fixtures-add-fixture-fixture-container">
          <div className="ace-events-trail_events-container">
            <h2>Trail Events</h2>
            <div></div>
          </div>
          {trials.map((item) => {
            return (
              <EventCard onClick={() => moveToNexScreen(item)} item={item} />
            );
          })}

          <div className="ace-events-trail_events-container">
            <h2>Winning Cermony Events</h2>
            <div></div>
          </div>
          {winningCermonys.map((item) => {
            return (
              <EventCard item={item} onClick={() => moveToNexScreen(item)} />
            );
          })}

          <div style={{ marginBottom: "1.8rem" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Event;
