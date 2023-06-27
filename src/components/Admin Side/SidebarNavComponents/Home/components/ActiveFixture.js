import React from "react";
import img from "../static/fixture-image1.png";
import "./ActiveFixture.css";

const ActiveFixture = ({ teamOne }) => {
  return (
    <div className="ace-adminHome-activeFixture_container">
      <img src={teamOne?.image ? teamOne?.image : img} alt="fixture-match" />
      <h1>{teamOne?.name ? teamOne?.name : "Club / Team Name"}</h1>
    </div>
  );
};

export default ActiveFixture;
