import React, { useState } from "react";
import "./DropDown.css";
import arrow from "./chevron-down.png";

const DropDown = ({ selected, setSelected, options, text, bg, width }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="dropdown" style={bg}>
      <p>{text}</p>
      <div
        className="dropdown-btn"
        style={bg}
        onClick={(e) => setIsActive(!isActive)}
      >
        {selected.label}
        <img src={arrow} alt="icon" />
      </div>
      {isActive && (
        <div style={bg} className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
