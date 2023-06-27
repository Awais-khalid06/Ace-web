import React, { useState } from "react";
import eventImage from "../Static/event-pic.png";
import "./AttendEvents.css";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import Spiner from "../../../../../smallComponets/Input/spiner/spiner";
import { notification } from "antd";

const AttendEvents = () => {
  const { state } = useLocation();
  const [isloading, setIsloading] = useState(false);
  const data = useSelector((data) => data.Data.userData);

  const openNotification = () => {
    notification.open({
      message: "Event",
      description: "You are successfully added for this event.",
      // className: "notificationDesign",
      style: { color: "#fff", background: "green" },
    });
  };

  const openNotification2 = (value) => {
    notification.open({
      message: "ACE Login",
      description: value,
      style: { color: "#fff", background: "red" },
    });
  };

  const attendEvent = (id) => {
    setIsloading(true);
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", data.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      event: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://athlete-backend.herokuapp.com/api/events/attendEvent",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        //console.log(result);
        try {
          setIsloading(false);

          if (result.message) {
            setIsloading(false);
            openNotification2(result.message);
          }

          if (!result.message) {
            setIsloading(false);
            openNotification();
          }
        } catch (error) {
          if (error) {
            setIsloading(false);
            console.log("error in Catch", error);
          }
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="ace-admin-team_main-container">
      <div className="ace-admin-fixtures-main-heading_container">
        <div className="ace-admin-fixtures-add-fixture-main-heading">
          <h2>Event</h2>
        </div>
      </div>
      <div className="ace-admin-fixtures-add-fixture-fixture_main-container">
        <div className="ace-admin-fixtures-add-fixture-fixture-container">
          <div className="ace-admin-events-event-main-container">
            <img src={eventImage} />
            <div className="ace-admin-events-event-main-event_name">
              <h2>{state.item?.name}</h2>
            </div>
            <div className="ace-admin-events-event-main-event_time">
              <p>Date: {moment(state.item?.updatedAt).format("LLL")}</p>
            </div>
            <div className="ace-admin-events-event-main-event_detial">
              <p>{state.item?.details}</p>
            </div>
            <div className="ace-admin-events-attend_event-main_container">
              <div className="ace-admin-events-attend_event-container">
                <h2>Location</h2>
                <p>{state.item?.location}</p>
              </div>
              <div
                className="ace-admin-events-attend_btn-container"
                onClick={() => attendEvent(state.item._id)}
              >
                {isloading === true ? <Spiner /> : <p>Attend</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendEvents;
