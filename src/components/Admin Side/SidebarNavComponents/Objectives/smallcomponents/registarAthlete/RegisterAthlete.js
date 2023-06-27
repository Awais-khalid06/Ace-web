import React from "react";
import "./RegisterAthlete.css";

const RegisterAthlete = ({ text }) => {
  return (
    <div className="acce-admin-objectives-comp-registar-athlete-main_container">
      <h1>{text}</h1>
      <div className="acce-admin-objectives-comp-registar-athlete-counter-container">
        <h1>30</h1>
      </div>
    </div>
  );
};

export default RegisterAthlete;
