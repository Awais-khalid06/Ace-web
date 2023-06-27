import React, { useState } from "react";
import "./inputPassword.css";
import eye from "./static/eye.png";

const Inputpassword = ({ id, name, onChange, onBlur, value, text }) => {
  const [visible, setVisible] = useState(true);
  return (
    <div className="ace-inputPassword-mainContainer">
      <p>{text}</p>
      <div className="ace-inputPassword-container">
        <input
          id={id}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          type={visible == true ? "password" : "text"}
        />
        <img
          style={{
            filter:
              visible == false
                ? " invert(57%) sepia(90%) saturate(1381%) hue-rotate(68deg) brightness(115%) contrast(106%)"
                : null,
          }}
          src={eye}
          alt="Eye-icon"
          onClick={() => {
            setVisible((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
};

export default Inputpassword;
