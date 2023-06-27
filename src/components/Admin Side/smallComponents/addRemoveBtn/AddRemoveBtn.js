import React from "react";
import "./AddRemoveBtn.css";

const AddRemoveBtn = ({ text, bgColor, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="ace-homeAdmin-addRemove-btn-container"
      style={bgColor}
    >
      <h2>{text}</h2>
    </div>
  );
};

export default AddRemoveBtn;
