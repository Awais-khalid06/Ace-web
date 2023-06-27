import React from "react";
import "./UpcomingEvents.css";
import upcomingimg from "../static/upcomingImg1.png";
import moment from "moment";

const UpcomingEvents = ({ item }) => {
  return (
    <div className="ace-adminHome-upcomingEvents_container">
      <div className="upcomingEvents-title_container">
        <h1>{item?.name}</h1>
        <h2> {item?.details}</h2>
        <h3>Date : {moment(item?.createdAt).format("ll")}</h3>
      </div>

      <div className="upcomingEvents-img_container">
        <img src={item?.image} alt="upcomingImg" />
      </div>
    </div>
  );
};

export default UpcomingEvents;
