import React from "react";
import "./EventCard.css";
import eventCardImg from "../Static/ace-event-card.png";
import moment from "moment";

const EventCard = ({ onClick, item }) => {
  return (
    <div
      onClick={onClick}
      className="ace-admin-events-comp-event_card-main_container"
    >
      <div className="ace-admin-events-comp-event_card-content-container">
        <h2>{item?.name}</h2>
        <h3>{item?.details}</h3>
        <p>Date : {moment(item?.updatedAt).format("LLL")}</p>
      </div>
      <div className="ace-admin-events-comp-event_card-content-image-container">
        <img src={eventCardImg} />
      </div>
    </div>
  );
};

export default EventCard;
