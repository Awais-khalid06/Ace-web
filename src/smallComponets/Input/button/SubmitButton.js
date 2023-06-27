import React from "react";
import Spiner from "../spiner/spiner";
import "./SubmitButton.css";

const SubmitButton = ({ text, onClick, isloading }) => {
  return (
    <div className="ace-submit_button">
      <button onClick={onClick} type="submit">
        {isloading === true ? <Spiner /> : <div>{text}</div>}
      </button>
    </div>
  );
};

export default SubmitButton;
