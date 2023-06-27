import React, { useState } from "react";
import NavBar from "../../../HOC/User Side/NavBar/NavBar";
import "./Choosegender.css";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import SubmitButton from "../../../smallComponets/Input/button/SubmitButton";
import Footer from "../../../HOC/User Side/footer/Footer";
import DropDown from "../../../smallComponets/Input/DropDown/DropDown";

const Choosegender = () => {
  const Navigate = useNavigate();
  const { state } = useLocation();

  // console.log("name", state.name);
  const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const [selected, setSelected] = useState({ label: "Male", value: "male" });

  const signUpData = () => {
    Navigate("/Choosesport", {
      state: {
        email: state.email,
        mobileNumber: state.mobileNumber,
        name: state.name,
        password: state.password,
        gender: selected.value,
      },
    });
  };

  // console.log(selected.value);

  return (
    <div className="ace__container">
      <NavBar />
      <div className="ace-forgetPasswordEmail-iunput-container">
        <h1>Choose your Gender</h1>
        <p className="ace-forgetPasswordEmail-iunput-para">
          Choose your gender to continue
        </p>
        <div style={{ padding: "0 0 15.4rem 0" }}>
          <DropDown
            text={"Gender"}
            options={options}
            selected={selected}
            setSelected={setSelected}
          />
        </div>

        <div style={{ margin: "0 0 16.9rem 0" }}>
          <SubmitButton onClick={signUpData} text={"Continue"} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Choosegender;
